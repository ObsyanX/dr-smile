import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  totalPatients: number;
  estimatedRevenue: number;
}

const statusColor = (s: string) => {
  switch (s) {
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "confirmed": return "bg-green-100 text-green-700";
    case "completed": return "bg-muted text-muted-foreground";
    case "cancelled": return "bg-red-100 text-red-700";
    default: return "bg-muted text-muted-foreground";
  }
};

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0, today: 0, pending: 0, confirmed: 0, totalPatients: 0, estimatedRevenue: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("admin-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
        fetchData();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchData = async () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const [appointmentsRes, pricesRes] = await Promise.all([
      supabase.from("appointments").select("*").order("preferred_date", { ascending: true }),
      supabase.from("treatment_prices").select("*"),
    ]);

    const apts = appointmentsRes.data || [];
    const prices = pricesRes.data || [];
    const priceMap = new Map(prices.map((p) => [p.treatment_name, Number(p.price)]));
    const uniquePhones = new Set(apts.map((a) => a.phone));
    const revenue = apts
      .filter((a) => a.status === "confirmed" || a.status === "completed")
      .reduce((sum, a) => sum + (priceMap.get(a.treatment) || 0), 0);

    setStats({
      total: apts.length,
      today: apts.filter((a) => a.preferred_date === today).length,
      pending: apts.filter((a) => a.status === "pending").length,
      confirmed: apts.filter((a) => a.status === "confirmed").length,
      totalPatients: uniquePhones.size,
      estimatedRevenue: revenue,
    });

    setAppointments(apts);
    setLoading(false);
  };

  const statCards = [
    { label: "Total Appointments", value: stats.total, icon: CalendarCheck, color: "text-primary" },
    { label: "Today's Appointments", value: stats.today, icon: Clock, color: "text-accent" },
    { label: "Pending", value: stats.pending, icon: TrendingUp, color: "text-yellow-500" },
    { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2, color: "text-green-500" },
    { label: "Total Patients", value: stats.totalPatients, icon: Users, color: "text-primary" },
    { label: "Est. Revenue", value: `₹${stats.estimatedRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayApts = appointments.filter(a => a.preferred_date === todayStr).slice(0, 8);
  const upcomingApts = appointments.filter(a => a.preferred_date && a.preferred_date > todayStr).slice(0, 8);
  const pastApts = appointments.filter(a => !a.preferred_date || a.preferred_date < todayStr).slice(0, 8);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderList = (data: any[]) => {
    if (data.length === 0) {
      return <p className="text-sm text-muted-foreground py-4">No appointments in this category.</p>;
    }
    return (
      <div className="space-y-2">
        {data.map((apt) => (
          <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
            <div>
              <p className="font-medium text-foreground text-sm">{apt.name}</p>
              <p className="text-xs text-muted-foreground">{apt.treatment} • {apt.preferred_date || "No date set"} {apt.appointment_time ? `at ${apt.appointment_time}` : ""}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(apt.status)}`}>
              {apt.status}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <Card key={card.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider">{card.label}</p>
                    <p className="text-2xl font-heading font-bold text-foreground mt-1">{card.value}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-muted flex items-center justify-center ${card.color}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Appointments by Category */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">Appointments</h2>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 mb-4">
                <TabsTrigger value="past" className="gap-1.5">
                  Past
                  <span className="bg-muted-foreground/20 text-muted-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{appointments.filter(a => !a.preferred_date || a.preferred_date < todayStr).length}</span>
                </TabsTrigger>
                <TabsTrigger value="today" className="gap-1.5">
                  Today
                  <span className="bg-primary/15 text-primary text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{appointments.filter(a => a.preferred_date === todayStr).length}</span>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="gap-1.5">
                  Upcoming
                  <span className="bg-muted-foreground/20 text-muted-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{appointments.filter(a => a.preferred_date && a.preferred_date > todayStr).length}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="past" className="mt-0 focus-visible:outline-none">
                {renderList(pastApts)}
              </TabsContent>
              <TabsContent value="today" className="mt-0 focus-visible:outline-none">
                {renderList(todayApts)}
              </TabsContent>
              <TabsContent value="upcoming" className="mt-0 focus-visible:outline-none">
                {renderList(upcomingApts)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
