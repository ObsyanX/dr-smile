import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
<<<<<<< HEAD
import { CalendarIcon, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
=======
import {
  CalendarIcon, Phone, Mail, MapPin, Clock, CheckCircle2,
  Star, Award, Users, ChevronDown
} from "lucide-react";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

<<<<<<< HEAD
=======
// ─── Clinic Configuration ────────────────────────────────────────────────────

type ClinicKey = "Madhyamgram" | "Dum Dum";

const CLINIC_DATA: Record<ClinicKey, {
  label: string;
  address: string;
  phone: string;
  shortAddress: string;
  mapSrc: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  timingLabel: string;
  timingNote: string;
  waNumber: string;
}> = {
  Madhyamgram: {
    label: "Madhyamgram",
    address: "9 No Railgate, Station Road, Kora, Madhyamgram, Kolkata, West Bengal 700130",
    shortAddress: "Station Road, Kora, Madhyamgram — 700130",
    phone: "+91 98042 14790",
    mapSrc: "https://maps.google.com/maps?q=9+No+Railgate+Station+Road+Kora+Madhyamgram+Kolkata+West+Bengal+700130&z=15&output=embed",
    openHour: 18, openMinute: 15,
    closeHour: 21, closeMinute: 0,
    timingLabel: "6:15 PM – 9:00 PM",
    timingNote: "Evening Clinic",
    waNumber: "919804214790",
  },
  "Dum Dum": {
    label: "Dum Dum",
    address: "Jessore Road, Basak Bagan, South Dum Dum, Kolkata, West Bengal 700048",
    shortAddress: "Jessore Road, Basak Bagan, South Dum Dum — 700048",
    phone: "+91 98042 14790",
    mapSrc: "https://maps.google.com/maps?q=Jessore+Road+Basak+Bagan+South+Dum+Dum+Kolkata+West+Bengal+700048&z=15&output=embed",
    openHour: 10, openMinute: 30,
    closeHour: 14, closeMinute: 0,
    timingLabel: "10:30 AM – 2:00 PM",
    timingNote: "Morning Clinic",
    waNumber: "919804214790",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getClinicStatus(clinic: ClinicKey): { open: boolean; text: string } {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const { openHour, openMinute, closeHour, closeMinute, timingLabel } = CLINIC_DATA[clinic];
  const openTotal = openHour * 60 + openMinute;
  const closeTotal = closeHour * 60 + closeMinute;

  if (totalMinutes >= openTotal && totalMinutes < closeTotal) {
    const closeStr = CLINIC_DATA[clinic].timingLabel.split("–")[1].trim();
    return { open: true, text: `Open Now — Closes at ${closeStr}` };
  }
  if (totalMinutes < openTotal) {
    const openStr = timingLabel.split("–")[0].trim();
    return { open: false, text: `Closed — Opens at ${openStr}` };
  }
  return { open: false, text: `Closed — Opens tomorrow at ${timingLabel.split("–")[0].trim()}` };
}

// ─── Form Schema ─────────────────────────────────────────────────────────────

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  treatment: z.string().min(1, "Please select a treatment"),
  preferred_date: z.date().optional(),
  message: z.string().trim().max(1000).optional(),
  clinic_location: z.string().optional(),
<<<<<<< HEAD
  website: z.string().max(0, "Bot detected").optional(), // honeypot
=======
  website: z.string().max(0, "Bot detected").optional(),
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
});

type FormValues = z.infer<typeof formSchema>;

<<<<<<< HEAD
const treatments = ["Dental Implants", "Root Canal", "Teeth Whitening", "Braces & Aligners", "Smile Design", "Pediatric Dentistry", "General Check-up"];
const locations = ["SmileCare Downtown", "SmileCare Midtown", "SmileCare Brooklyn"];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", treatment: "", message: "", clinic_location: "", website: "" },
  });

  const sendWhatsAppNotification = (data: FormValues) => {
    const message = [
      "🦷 *New Appointment Booking*",
      "",
=======
const treatments = [
  "Fixed Partial Denture", "Removable Partial Denture", "Oral Cyst and Tumor Surgery",
  "Tooth Scaling", "Tooth Color Filling", "Tooth Capping", "Dental Implants",
  "Root Canal Treatment", "Teeth Whitening", "Braces & Aligners", "Smile Design",
  "Pediatric Dentistry", "General Check-up",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ClinicToggle({
  selected, onChange,
}: { selected: ClinicKey; onChange: (c: ClinicKey) => void }) {
  return (
    <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-border/60 rounded-full p-1 shadow-sm">
      {(["Madhyamgram", "Dum Dum"] as ClinicKey[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-semibold font-heading transition-all duration-300",
            selected === c
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ clinic }: { clinic: ClinicKey }) {
  const status = getClinicStatus(clinic);
  return (
    <div className={cn(
      "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium font-heading transition-all",
      status.open
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "bg-red-50 border-red-200 text-red-600"
    )}>
      <span className={cn(
        "w-2.5 h-2.5 rounded-full flex-shrink-0",
        status.open ? "bg-emerald-500 animate-pulse" : "bg-red-400"
      )} />
      <span>{status.text}</span>
    </div>
  );
}

function SidebarTabBar({
  active, onChange, tabs,
}: { active: string; onChange: (t: string) => void; tabs: string[] }) {
  return (
    <div className="flex gap-1 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={cn(
            "flex-1 py-1.5 text-xs font-semibold font-heading rounded-lg transition-all duration-200",
            active === t
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const Contact = () => {
  const [selectedClinic, setSelectedClinic] = useState<ClinicKey>("Madhyamgram");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timingTab, setTimingTab] = useState<ClinicKey>("Madhyamgram");
  const [mapTab, setMapTab] = useState<ClinicKey>("Madhyamgram");

  const clinic = CLINIC_DATA[selectedClinic];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", phone: "", email: "", treatment: "",
      message: "", clinic_location: selectedClinic, website: "",
    },
  });

  // Sync form clinic_location when toggle changes
  const handleClinicChange = (c: ClinicKey) => {
    setSelectedClinic(c);
    setTimingTab(c);
    setMapTab(c);
    form.setValue("clinic_location", c);
  };

  const sendWhatsAppNotification = (data: FormValues) => {
    const message = [
      "🦷 *New Appointment Booking*", "",
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Email:* ${data.email}`,
      `*Treatment:* ${data.treatment}`,
      `*Date:* ${data.preferred_date ? format(data.preferred_date, "PPP") : "Not specified"}`,
      `*Clinic:* ${data.clinic_location || "Not specified"}`,
      data.message ? `*Message:* ${data.message}` : "",
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(message);
<<<<<<< HEAD
    window.open(`https://wa.me/919804214790?text=${encoded}`, "_blank");
  };

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // honeypot triggered — silently reject
=======
    window.open(`https://wa.me/${clinic.waNumber}?text=${encoded}`, "_blank");
  };

  const onSubmit = async (data: FormValues) => {
    if (data.website) return;

    const lastSubmitTime = localStorage.getItem("last_booking_submit");
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeSinceLastSubmit < 15 * 60 * 1000) {
        toast({
          title: "Please wait",
          description: "You've already submitted a request recently. Please wait a few minutes or call us directly.",
          variant: "destructive",
        });
        return;
      }
    }

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        treatment: data.treatment,
        preferred_date: data.preferred_date ? format(data.preferred_date, "yyyy-MM-dd") : null,
        message: data.message || null,
<<<<<<< HEAD
        clinic_location: data.clinic_location || null,
      });
      if (error) throw error;
      sendWhatsAppNotification(data);
      setSubmitted(true);
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
=======
        clinic_location: data.clinic_location || selectedClinic,
      });
      if (error) throw error;

      localStorage.setItem("last_booking_submit", Date.now().toString());
      sendWhatsAppNotification(data);
      setSubmitted(true);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
  const clinicStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 0) return { open: false, text: "Closed — Opens Monday at 10 AM" };
    if (day === 6) {
      if (hour >= 10 && hour < 17) return { open: true, text: "Open Now — Closes at 5 PM" };
      return { open: false, text: "Closed — Opens Monday at 10 AM" };
    }
    if (hour >= 10 && hour < 19) return { open: true, text: `Open Now — Closes at 7 PM` };
    if (hour < 10) return { open: false, text: "Closed — Opens at 10 AM today" };
    return { open: false, text: "Closed — Opens tomorrow at 10 AM" };
  }, []);
=======
  const bothStatuses = useMemo(() => ({
    Madhyamgram: getClinicStatus("Madhyamgram"),
    "Dum Dum": getClinicStatus("Dum Dum"),
  }), []);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

  return (
    <Layout>
      <SEOHead
<<<<<<< HEAD
        title="Book Appointment — SmileCare Dental Clinic"
        description="Schedule your dental appointment at SmileCare. Contact us for dental implants, whitening, braces, and more. Open Mon–Fri 10AM–7PM, Sat 10AM–5PM."
      />
      <PageTransition>
        {/* Hero */}
        <section className="section-padding gradient-hero">
          <div className="container-dental text-center">
            <ScrollReveal>
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Contact</p>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-4">Book Your Appointment</h1>
              <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">Schedule your visit today and take the first step towards a healthier smile.</p>
=======
        title="Book Appointment — Dr. Smile Dental Clinic"
        description="Book your dental appointment at Dr. Smile. Two locations: Madhyamgram (6:15 PM–9 PM) and Dum Dum (10:30 AM–2 PM). Expert care by Dr. Tamal Roy, BDS."
      />
      <PageTransition>

        {/* ── Hero ── */}
        <section className="section-padding gradient-hero">
          <div className="container-dental text-center">
            <ScrollReveal>
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
                Appointment Booking
              </p>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-4">
                Book Your Visit
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Choose your preferred clinic and reserve your appointment with
                Dr. Tamal Roy — a specialist you can trust.
              </p>

              {/* ── Dual Status Row ── */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {(["Madhyamgram", "Dum Dum"] as ClinicKey[]).map((c) => (
                  <div
                    key={c}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold font-heading transition-all",
                      bothStatuses[c].open
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-red-50 border-red-200 text-red-500"
                    )}
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      bothStatuses[c].open ? "bg-emerald-500 animate-pulse" : "bg-red-400"
                    )} />
                    <span className="font-bold">{c}</span>
                    <span className="font-normal opacity-80">—</span>
                    <span>{bothStatuses[c].text}</span>
                  </div>
                ))}
              </div>

              {/* ── Clinic Toggle ── */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Select Clinic
                </p>
                <ClinicToggle selected={selectedClinic} onChange={handleClinicChange} />
              </div>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
            </ScrollReveal>
          </div>
        </section>

<<<<<<< HEAD
        <section className="section-padding bg-background">
          <div className="container-dental">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <ScrollReveal>
                  {submitted ? (
                    <div className="text-center p-12 rounded-2xl bg-card border border-primary/20">
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                      <h2 className="text-h2 font-heading font-bold text-foreground mb-3">Appointment Request Sent!</h2>
                      <p className="text-muted-foreground mb-6">We'll confirm your appointment shortly via phone or email.</p>
                      <Button onClick={() => { setSubmitted(false); form.reset(); }} variant="outline" className="rounded-full font-heading">
=======
        {/* ── Doctor Trust Section ── */}
        <section className="py-10 bg-background border-b border-border/40">
          <div className="container-dental">
            <ScrollReveal>
              <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--dental-blue-light))] to-[hsl(var(--deep-blue-light))] border border-primary/10">
                {/* Doctor Info */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-2xl font-heading font-bold text-primary">TR</span>
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-foreground text-lg leading-tight">
                      Dr. Tamal Roy
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">
                      BDS &nbsp;·&nbsp; Orthodontist &nbsp;·&nbsp; Pedodontist
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Trust Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">1000+ Happy Patients</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">Certified Specialist</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">2 Locations</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="section-padding bg-background">
          <div className="container-dental">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14">

              {/* ── Appointment Form ── */}
              <div className="lg:col-span-3">
                <ScrollReveal>
                  {submitted ? (
                    <div className="text-center p-12 rounded-2xl bg-card border border-primary/20 shadow-[var(--shadow-elevated)]">
                      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h2 className="text-h2 font-heading font-bold text-foreground mb-3">
                        Appointment Request Sent!
                      </h2>
                      <p className="text-muted-foreground mb-2">
                        We'll confirm your appointment at our{" "}
                        <span className="font-semibold text-foreground">{selectedClinic}</span> clinic shortly.
                      </p>
                      <p className="text-sm text-muted-foreground mb-8">
                        Confirmation via phone or email within a few hours.
                      </p>
                      <Button
                        onClick={() => { setSubmitted(false); form.reset({ clinic_location: selectedClinic }); }}
                        variant="outline"
                        className="rounded-full font-heading"
                      >
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                        Book Another Appointment
                      </Button>
                    </div>
                  ) : (
<<<<<<< HEAD
                    <div className="p-8 rounded-2xl bg-card border border-border/50">
                      <h2 className="text-h3 font-heading font-bold text-foreground mb-6">Appointment Form</h2>
=======
                    <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-card)]">
                      {/* Form Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-border/50">
                        <div>
                          <h2 className="text-h3 font-heading font-bold text-foreground">
                            Reserve Your Appointment
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Booking for{" "}
                            <span className="text-primary font-semibold">{selectedClinic}</span> clinic
                          </p>
                        </div>
                        {/* Inline clinic re-selector */}
                        <div className="self-start md:self-auto">
                          <ClinicToggle selected={selectedClinic} onChange={handleClinicChange} />
                        </div>
                      </div>

                      {/* Clinic timing helper */}
                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 mb-6">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-primary font-heading">
                            {CLINIC_DATA[selectedClinic].timingNote}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Clinic hours: {CLINIC_DATA[selectedClinic].timingLabel}
                          </p>
                        </div>
                        <StatusBadge clinic={selectedClinic} />
                      </div>

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormField control={form.control} name="name" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">Full Name</FormLabel>
<<<<<<< HEAD
                                <FormControl><Input placeholder="John Doe" className="rounded-xl" {...field} /></FormControl>
=======
                                <FormControl>
                                  <Input placeholder="John Doe" className="rounded-xl h-11" {...field} />
                                </FormControl>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">Phone Number</FormLabel>
<<<<<<< HEAD
                                <FormControl><Input placeholder="+91 98042 14790" className="rounded-xl" {...field} /></FormControl>
=======
                                <FormControl>
                                  <Input placeholder="+91 98042 14790" className="rounded-xl h-11" {...field} />
                                </FormControl>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
<<<<<<< HEAD
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Email Address</FormLabel>
                              <FormControl><Input type="email" placeholder="john@example.com" className="rounded-xl" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
=======

                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" className="rounded-xl h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormField control={form.control} name="treatment" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">Treatment Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
<<<<<<< HEAD
                                  <FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select treatment" /></SelectTrigger></FormControl>
                                  <SelectContent>
                                    {treatments.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
=======
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl h-11">
                                      <SelectValue placeholder="Select treatment" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {treatments.map((t) => (
                                      <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
<<<<<<< HEAD
=======

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                            <FormField control={form.control} name="preferred_date" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">Preferred Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
<<<<<<< HEAD
                                      <Button variant="outline" className={cn("w-full rounded-xl justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
=======
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full rounded-xl h-11 justify-start text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
<<<<<<< HEAD
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
=======
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      className="p-3 pointer-events-auto"
                                    />
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
<<<<<<< HEAD
                          <FormField control={form.control} name="clinic_location" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Preferred Clinic</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select location (optional)" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Message (optional)</FormLabel>
                              <FormControl><Textarea placeholder="Any additional information..." className="rounded-xl min-h-[100px]" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          {/* Honeypot field - hidden from real users, catches bots */}
                          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                            <FormField control={form.control} name="website" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl><Input tabIndex={-1} autoComplete="off" {...field} /></FormControl>
                              </FormItem>
                            )} />
                          </div>
                          <Button type="submit" size="lg" className="w-full rounded-full font-heading" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Book Appointment"}
                          </Button>
=======

                          {/* Clinic location — hidden display, auto-filled */}
                          <div className="px-4 py-3 rounded-xl bg-muted/40 border border-border/40 flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium">Selected Clinic</p>
                              <p className="text-sm font-semibold text-foreground font-heading">{selectedClinic}</p>
                            </div>
                          </div>

                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Message (optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any additional information or concerns..."
                                  className="rounded-xl min-h-[90px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          {/* Honeypot */}
                          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                            <FormField control={form.control} name="website" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input tabIndex={-1} autoComplete="off" {...field} />
                                </FormControl>
                              </FormItem>
                            )} />
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-full font-heading text-base h-12"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting…" : "Book Your Visit Now →"}
                          </Button>

                          <p className="text-xs text-center text-muted-foreground">
                            🔒 Your information is secure and will never be shared.
                          </p>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                        </form>
                      </Form>
                    </div>
                  )}
                </ScrollReveal>
              </div>

<<<<<<< HEAD
              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <ScrollReveal delay={0.1}>
                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-3 h-3 rounded-full ${clinicStatus.open ? "bg-primary animate-pulse-soft" : "bg-destructive"}`} />
                      <span className={`font-heading font-semibold ${clinicStatus.open ? "text-green-600" : "text-red-500"}`}>
                        {clinicStatus.open ? "OPEN NOW" : "CLOSED"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{clinicStatus.text}</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Clinic Timings</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Mon – Fri</span><span className="font-medium text-foreground">10 AM – 7 PM</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-medium text-foreground">10 AM – 5 PM</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-medium text-foreground text-red-500">Closed</span></div>
=======
              {/* ── Sidebar ── */}
              <div className="lg:col-span-2 space-y-5">

                {/* Current Status */}
                <ScrollReveal delay={0.05}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
                      Live Clinic Status
                    </h3>
                    <div className="space-y-2.5">
                      {(["Madhyamgram", "Dum Dum"] as ClinicKey[]).map((c) => {
                        const s = getClinicStatus(c);
                        return (
                          <div key={c} className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium",
                            s.open ? "bg-emerald-50 border-emerald-200" : "bg-red-50/60 border-red-200/60"
                          )}>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0",
                                s.open ? "bg-emerald-500 animate-pulse" : "bg-red-400"
                              )} />
                              <span className="font-semibold font-heading text-foreground">{c}</span>
                            </div>
                            <span className={s.open ? "text-emerald-700" : "text-red-500"}>{s.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Clinic Timings */}
                <ScrollReveal delay={0.1}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Clinic Timings
                    </h3>
                    <SidebarTabBar
                      active={timingTab}
                      onChange={(t) => setTimingTab(t as ClinicKey)}
                      tabs={["Madhyamgram", "Dum Dum"]}
                    />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="text-muted-foreground font-medium">
                          {CLINIC_DATA[timingTab].timingNote}
                        </span>
                        <span className="font-bold text-foreground font-heading">
                          {CLINIC_DATA[timingTab].timingLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
                        <span>Mon – Sat</span>
                        <span className="text-primary font-medium">Appointments available</span>
                      </div>
                      <div className="flex items-center justify-between px-1 text-xs">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="text-red-500 font-medium">Closed</span>
                      </div>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                    </div>
                  </div>
                </ScrollReveal>

<<<<<<< HEAD
                <ScrollReveal delay={0.2}>
                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Contact Information</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /><a href="tel:+919804214790" className="text-muted-foreground hover:text-primary transition-colors">+91 9804214790</a></li>
                      <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /><a href="mailto:roy.tamaall@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">roy.tamaall@gmail.com</a></li>
                      <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-primary mt-0.5" /><span className="text-muted-foreground">123 Dental Avenue, Downtown, NY 10001<br />Near Central Park, parking available</span></li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.25}>
                  <div className="rounded-2xl overflow-hidden border border-border/50">
                    <iframe
                      title="SmileCare Clinic Location"
                      src="https://maps.google.com/maps?q=40.7128,-74.0060&z=15&output=embed"
                      className="w-full h-60 border-0"
=======
                {/* Contact Info */}
                <ScrollReveal delay={0.15}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-4">
                      Contact Information
                    </h3>

                    {/* Shared email */}
                    <a
                      href="mailto:roy.tamaall@gmail.com"
                      className="flex items-center gap-3 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      roy.tamaall@gmail.com
                    </a>

                    {/* Per-clinic blocks */}
                    {(["Madhyamgram", "Dum Dum"] as ClinicKey[]).map((c) => (
                      <div
                        key={c}
                        className={cn(
                          "mb-4 last:mb-0 p-3.5 rounded-xl border transition-all",
                          selectedClinic === c
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted/30 border-border/40"
                        )}
                      >
                        <p className={cn(
                          "text-xs font-bold font-heading uppercase tracking-wide mb-2",
                          selectedClinic === c ? "text-primary" : "text-muted-foreground"
                        )}>
                          {c}
                        </p>
                        <a
                          href={`tel:${CLINIC_DATA[c].phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
                        >
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          {CLINIC_DATA[c].phone}
                        </a>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs leading-relaxed">{CLINIC_DATA[c].shortAddress}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Map */}
                <ScrollReveal delay={0.2}>
                  <div className="rounded-2xl overflow-hidden border border-border/50 shadow-[var(--shadow-soft)]">
                    <div className="p-3 bg-card border-b border-border/50">
                      <SidebarTabBar
                        active={mapTab}
                        onChange={(t) => setMapTab(t as ClinicKey)}
                        tabs={["Madhyamgram", "Dum Dum"]}
                      />
                      <p className="text-xs text-muted-foreground px-1 -mt-1">
                        {CLINIC_DATA[mapTab].address}
                      </p>
                    </div>
                    <iframe
                      key={mapTab}
                      title={`${mapTab} Clinic Location`}
                      src={CLINIC_DATA[mapTab].mapSrc}
                      className="w-full h-56 border-0"
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </ScrollReveal>
<<<<<<< HEAD
=======

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
              </div>
            </div>
          </div>
        </section>
<<<<<<< HEAD
=======

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
      </PageTransition>
    </Layout>
  );
};

export default Contact;
