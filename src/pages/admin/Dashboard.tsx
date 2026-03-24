import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
<<<<<<< HEAD
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0, today: 0, pending: 0, confirmed: 0, totalPatients: 0, estimatedRevenue: 0,
  });
<<<<<<< HEAD
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
=======
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchData(mounted);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

    const channel = supabase
      .channel("admin-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
<<<<<<< HEAD
        fetchData();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchData = async () => {
=======
        fetchData(mounted);
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async (mounted = true) => {
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    const today = format(new Date(), "yyyy-MM-dd");

    const [appointmentsRes, pricesRes] = await Promise.all([
      supabase.from("appointments").select("*").order("created_at", { ascending: false }),
      supabase.from("treatment_prices").select("*"),
    ]);

<<<<<<< HEAD
=======
    if (!mounted) return; // Component was unmounted while awaiting — bail out.

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    const appointments = appointmentsRes.data || [];
    const prices = pricesRes.data || [];
    const priceMap = new Map(prices.map((p) => [p.treatment_name, Number(p.price)]));

    const uniquePhones = new Set(appointments.map((a) => a.phone));

    const revenue = appointments
      .filter((a) => a.status === "confirmed" || a.status === "completed")
      .reduce((sum, a) => sum + (priceMap.get(a.treatment) || 0), 0);

    setStats({
      total: appointments.length,
      today: appointments.filter((a) => a.preferred_date === today).length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      totalPatients: uniquePhones.size,
      estimatedRevenue: revenue,
    });

<<<<<<< HEAD
    setRecentAppointments(appointments.slice(0, 5));
=======
    setAppointments(appointments);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
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

<<<<<<< HEAD
=======
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayApts = appointments.filter(a => a.preferred_date === todayStr).slice(0, 5);
  const upcomingApts = appointments.filter(a => a.preferred_date && a.preferred_date > todayStr).slice(0, 5);
  const pastApts = appointments.filter(a => !a.preferred_date || a.preferred_date < todayStr).slice(0, 5);

  const renderAppointmentList = (data: any[]) => {
    if (data.length === 0) {
      return <p className="text-sm text-muted-foreground">No appointments in this category.</p>;
    }
    return (
      <div className="space-y-3">
        {data.map((apt) => (
          <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium text-foreground text-sm">{apt.name}</p>
              <p className="text-xs text-muted-foreground">{apt.treatment} • {apt.preferred_date || "No date"}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(apt.status)}`}>
              {apt.status}
            </span>
          </div>
        ))}
      </div>
    );
  };

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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

<<<<<<< HEAD
        {/* Recent Appointments */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">Recent Appointments</h2>
            {recentAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {recentAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground text-sm">{apt.name}</p>
                      <p className="text-xs text-muted-foreground">{apt.treatment} • {apt.preferred_date || "No date"}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
=======
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">Recent Appointments</h2>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="past" className="m-0 focus-visible:outline-none">
                {renderAppointmentList(pastApts)}
              </TabsContent>
              <TabsContent value="today" className="m-0 focus-visible:outline-none">
                {renderAppointmentList(todayApts)}
              </TabsContent>
              <TabsContent value="upcoming" className="m-0 focus-visible:outline-none">
                {renderAppointmentList(upcomingApts)}
              </TabsContent>
            </Tabs>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
