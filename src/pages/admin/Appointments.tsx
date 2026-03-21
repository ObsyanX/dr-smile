import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Search, CheckCircle2, XCircle, Trash2, Check } from "lucide-react";
import TimeSelectionModal from "@/components/admin/TimeSelectionModal";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferred_date: string | null;
  appointment_time: string | null;
  clinic_location: string | null;
  status: string;
  message: string | null;
  created_at: string;
  reminder_sent: boolean;
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

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clinicFilter, setClinicFilter] = useState("all");
  const [timeModal, setTimeModal] = useState<{ open: boolean; appointment: Appointment | null }>({ open: false, appointment: null });

  useEffect(() => {
    fetchAppointments();
    const channel = supabase
      .channel("admin-appointments")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => fetchAppointments())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setAppointments((data as Appointment[]) || []);
    setLoading(false);
  };

  const handleAccept = (apt: Appointment) => {
    setTimeModal({ open: true, appointment: apt });
  };

  const confirmWithTime = async (time: string) => {
    if (!timeModal.appointment) return;
    const { error } = await supabase
      .from("appointments")
      .update({ status: "confirmed" as const, appointment_time: time })
      .eq("id", timeModal.appointment.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Confirmed", description: `Appointment confirmed at ${time}` });
      // WhatsApp notification to patient
      const apt = timeModal.appointment;
      const msg = [
        "✅ *Appointment Confirmed*",
        "",
        `*Patient:* ${apt.name}`,
        `*Treatment:* ${apt.treatment}`,
        `*Date:* ${apt.preferred_date || "TBD"}`,
        `*Time:* ${time}`,
        `*Clinic:* ${apt.clinic_location || "TBD"}`,
      ].join("\n");
      window.open(`https://wa.me/${apt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
    }
    setTimeModal({ open: false, appointment: null });
  };

  const cancelAppointment = async (apt: Appointment) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" as const })
      .eq("id", apt.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cancelled", description: "Appointment cancelled" });
      const msg = [
        "❌ *Appointment Update*",
        "",
        `Dear ${apt.name},`,
        "Your appointment could not be scheduled at this time.",
        "Please rebook at your convenience.",
        "",
        "📞 +91 9804214790",
      ].join("\n");
      window.open(`https://wa.me/${apt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  const completeAppointment = async (id: string) => {
    const { error } = await supabase.from("appointments").update({ status: "completed" as const }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Completed", description: "Appointment marked complete" });
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Appointment removed" });
    }
  };

  const clinics = [...new Set(appointments.map((a) => a.clinic_location).filter(Boolean))];

  const filtered = appointments.filter((a) => {
    const matchSearch = a.name?.toLowerCase().includes(search.toLowerCase()) || a.phone?.includes(search);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchClinic = clinicFilter === "all" || a.clinic_location === clinicFilter;
    return matchSearch && matchStatus && matchClinic;
  });

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
      <div className="space-y-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={clinicFilter} onValueChange={setClinicFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl"><SelectValue placeholder="Clinic" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  {clinics.map((c) => <SelectItem key={c} value={c!}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Clinic</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No appointments found</TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.name}</TableCell>
                        <TableCell>{apt.phone}</TableCell>
                        <TableCell>{apt.treatment}</TableCell>
                        <TableCell>{apt.preferred_date || "—"}</TableCell>
                        <TableCell>{apt.appointment_time || "—"}</TableCell>
                        <TableCell>{apt.clinic_location || "—"}</TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {apt.status === "pending" && (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50" onClick={() => handleAccept(apt)} title="Accept & Assign Time">
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                            )}
                            {apt.status === "confirmed" && (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={() => completeAppointment(apt.id)} title="Complete">
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            {(apt.status === "pending" || apt.status === "confirmed") && (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => cancelAppointment(apt)} title="Cancel">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteAppointment(apt.id)} title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <TimeSelectionModal
        open={timeModal.open}
        onClose={() => setTimeModal({ open: false, appointment: null })}
        onConfirm={confirmWithTime}
        patientName={timeModal.appointment?.name || ""}
        treatment={timeModal.appointment?.treatment || ""}
        date={timeModal.appointment?.preferred_date || null}
      />
    </AdminLayout>
  );
};

export default Appointments;
