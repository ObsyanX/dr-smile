import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp, Users, CalendarCheck } from "lucide-react";
import { format, subDays, parseISO } from "date-fns";

const COLORS = ["hsl(187,62%,48%)", "hsl(224,70%,33%)", "hsl(0,84%,60%)", "#f59e0b", "#10b981", "#8b5cf6", "#f97316"];

const Analytics = () => {
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [treatmentData, setTreatmentData] = useState<any[]>([]);
  const [clinicData, setClinicData] = useState<any[]>([]);
  const [revenue, setRevenue] = useState({ total: 0, daily: 0, byClinic: [] as any[] });
  const [topStats, setTopStats] = useState({
    totalPatients: 0, returningPatients: 0, mostPopular: "", appointmentsToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const [appointmentsRes, pricesRes] = await Promise.all([
      supabase.from("appointments").select("*"),
      supabase.from("treatment_prices").select("*"),
    ]);

    const appointments = appointmentsRes.data || [];
    const prices = pricesRes.data || [];
    const priceMap = new Map(prices.map((p) => [p.treatment_name, Number(p.price)]));
    const today = format(new Date(), "yyyy-MM-dd");

    // Daily appointments (last 14 days)
    const dailyMap = new Map<string, number>();
    for (let i = 13; i >= 0; i--) {
      const d = format(subDays(new Date(), i), "yyyy-MM-dd");
      dailyMap.set(d, 0);
    }
    appointments.forEach((a) => {
      const date = a.preferred_date;
      if (date && dailyMap.has(date)) {
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
      }
    });
    setDailyData(
      Array.from(dailyMap.entries()).map(([date, count]) => ({
        date: format(parseISO(date), "MMM dd"),
        appointments: count,
      }))
    );

    // Treatment distribution
    const treatmentMap = new Map<string, number>();
    appointments.forEach((a) => {
      treatmentMap.set(a.treatment, (treatmentMap.get(a.treatment) || 0) + 1);
    });
    setTreatmentData(
      Array.from(treatmentMap.entries()).map(([name, value]) => ({ name, value }))
    );

    // Clinic-wise
    const clinicMap = new Map<string, number>();
    appointments.forEach((a) => {
      const loc = a.clinic_location || "Unspecified";
      clinicMap.set(loc, (clinicMap.get(loc) || 0) + 1);
    });
    setClinicData(Array.from(clinicMap.entries()).map(([name, count]) => ({ name, count })));

    // Revenue
    const confirmedOrCompleted = appointments.filter(
      (a) => a.status === "confirmed" || a.status === "completed"
    );
    const totalRevenue = confirmedOrCompleted.reduce(
      (sum, a) => sum + (priceMap.get(a.treatment) || 0), 0
    );
    const todayRevenue = confirmedOrCompleted
      .filter((a) => a.preferred_date === today)
      .reduce((sum, a) => sum + (priceMap.get(a.treatment) || 0), 0);

    const clinicRevMap = new Map<string, number>();
    confirmedOrCompleted.forEach((a) => {
      const loc = a.clinic_location || "Unspecified";
      clinicRevMap.set(loc, (clinicRevMap.get(loc) || 0) + (priceMap.get(a.treatment) || 0));
    });

    setRevenue({
      total: totalRevenue,
      daily: todayRevenue,
      byClinic: Array.from(clinicRevMap.entries()).map(([name, amount]) => ({ name, amount })),
    });

    // Top stats
    const uniquePhones = new Set(appointments.map((a) => a.phone));
    const phoneCounts = new Map<string, number>();
    appointments.forEach((a) => phoneCounts.set(a.phone, (phoneCounts.get(a.phone) || 0) + 1));
    const returning = Array.from(phoneCounts.values()).filter((c) => c > 1).length;

    let mostPopular = "";
    let maxCount = 0;
    treatmentMap.forEach((count, name) => {
      if (count > maxCount) { maxCount = count; mostPopular = name; }
    });

    setTopStats({
      totalPatients: uniquePhones.size,
      returningPatients: returning,
      mostPopular,
      appointmentsToday: appointments.filter((a) => a.preferred_date === today).length,
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Revenue + Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-heading">Total Revenue</p>
                  <p className="text-xl font-heading font-bold">₹{revenue.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-heading">Today's Revenue</p>
                  <p className="text-xl font-heading font-bold">₹{revenue.daily.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-heading">Returning Patients</p>
                  <p className="text-xl font-heading font-bold">{topStats.returningPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-heading">Most Popular</p>
                  <p className="text-sm font-heading font-bold truncate">{topStats.mostPopular || "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Appointments Bar Chart */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Daily Appointments (14 days)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="hsl(187,62%,48%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Distribution Pie Chart */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Treatment Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={treatmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {treatmentData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinic-wise Revenue + Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Bookings by Clinic</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clinicData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(224,70%,33%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Revenue by Clinic</h3>
              <div className="space-y-4">
                {revenue.byClinic.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No revenue data yet</p>
                ) : (
                  revenue.byClinic.map((c) => (
                    <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                      <span className="font-medium text-sm text-foreground">{c.name}</span>
                      <span className="font-heading font-bold text-green-600">₹{c.amount.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
