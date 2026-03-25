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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CalendarIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Award,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// ─── Types ───────────────────────────────────────────────────────────────────

type ClinicKey = "Madhyamgram" | "Dum Dum";

// ─── Clinic Configuration ────────────────────────────────────────────────────

interface TimingShift {
  days: string;
  hours: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  note: string;
}

interface ClinicInfo {
  label: string;
  address: string;
  shortAddress: string;
  phone: string;
  mapSrc: string;
  mapUrl: string;
  shifts: TimingShift[];
  waNumber: string;
}

const CLINIC_DATA: Record<ClinicKey, ClinicInfo> = {
  Madhyamgram: {
    label: "Madhyamgram",
    address:
      "9 No Railgate, Madhyamgram, Station Road, Kora, Madhyamgram, Kolkata, West Bengal 700130",
    shortAddress: "9 No Railgate, Station Road, Madhyamgram — 700130",
    phone: "+91 98042 14790",
    mapSrc:
      "https://maps.google.com/maps?q=22.702722,88.460868&z=15&output=embed",
    mapUrl: "https://maps.app.goo.gl/caB9HBPh61tJKgX36",
    shifts: [
      {
        days: "Mon – Sat",
        hours: "6:15 PM – 9:00 PM",
        openHour: 18,
        openMinute: 15,
        closeHour: 21,
        closeMinute: 0,
        note: "Evening Clinic",
      },
      {
        days: "Sunday",
        hours: "Closed",
        openHour: -1,
        openMinute: -1,
        closeHour: -1,
        closeMinute: -1,
        note: "Closed",
      },
    ],
    waNumber: "919804214790",
  },
  "Dum Dum": {
    label: "Dum Dum",
    address:
      "Jessore Rd, Basak Bagan, South Dumdum, Kolkata, West Bengal 700048",
    shortAddress: "Basak Bagan, South Dumdum — 700048",
    phone: "+91 98042 14790",
    mapSrc:
      "https://maps.google.com/maps?q=22.608571,88.395793&z=15&output=embed",
    mapUrl: "https://maps.app.goo.gl/7ZHCytdYZHkiDpKP8",
    shifts: [
      {
        days: "Mon – Sat",
        hours: "10:30 AM – 2:00 PM",
        openHour: 10,
        openMinute: 30,
        closeHour: 14,
        closeMinute: 0,
        note: "Morning Clinic",
      },
      {
        days: "Sunday",
        hours: "6:15 PM – 9:00 PM",
        openHour: 18,
        openMinute: 15,
        closeHour: 21,
        closeMinute: 0,
        note: "Evening Clinic",
      },
    ],
    waNumber: "919804214790",
  },
};

const CLINIC_KEYS: ClinicKey[] = ["Madhyamgram", "Dum Dum"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getClinicStatus(key: ClinicKey): { open: boolean; text: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun
  const total = now.getHours() * 60 + now.getMinutes();
  const info = CLINIC_DATA[key];
  
  // Find shift for today
  const shift = info.shifts.find(s => {
    if (day === 0) return s.days === "Sunday";
    return s.days === "Mon – Sat";
  });

  if (!shift || shift.openHour === -1) {
    // Check if it opens tomorrow
    const nextDay = (day + 1) % 7;
    const tomorrowShift = info.shifts.find(s => {
      if (nextDay === 0) return s.days === "Sunday";
      return s.days === "Mon – Sat";
    });
    const tomorrowOpener = tomorrowShift && tomorrowShift.openHour !== -1 
      ? `Opens tomorrow at ${tomorrowShift.hours.split("–")[0].trim()}`
      : "Closed tomorrow";
    return { open: false, text: "Closed — " + tomorrowOpener };
  }

  const opens = shift.openHour * 60 + shift.openMinute;
  const closes = shift.closeHour * 60 + shift.closeMinute;
  const openStr = shift.hours.split("–")[0].trim();
  const closeStr = shift.hours.split("–")[1].trim();

  if (total >= opens && total < closes) {
    return { open: true, text: "Open Now — Closes at " + closeStr };
  }
  if (total < opens) {
    return { open: false, text: "Closed — Opens at " + openStr };
  }
  
  // After hours, check tomorrow
  const nextDay = (day + 1) % 7;
  const tomorrowShift = info.shifts.find(s => {
    if (nextDay === 0) return s.days === "Sunday";
    return s.days === "Mon – Sat";
  });
  const tomorrowOpener = tomorrowShift && tomorrowShift.openHour !== -1 
    ? `Opens tomorrow at ${tomorrowShift.hours.split("–")[0].trim()}`
    : "Closed tomorrow";
  return { open: false, text: "Closed — " + tomorrowOpener };
}

// ─── Form Schema ─────────────────────────────────────────────────────────────

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  treatment: z.string().min(1, "Please select a treatment"),
  preferred_date: z.date().optional(),
  message: z.string().trim().max(1000).optional(),
  clinic_location: z.string().optional(),
  website: z.string().max(0, "Bot detected").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TREATMENTS = [
  "Fixed Partial Denture",
  "Removable Partial Denture",
  "Oral Cyst and Tumor Surgery",
  "Tooth Scaling",
  "Tooth Color Filling",
  "Tooth Capping",
  "Dental Implants",
  "Root Canal Treatment",
  "Teeth Whitening",
  "Braces & Aligners",
  "Smile Design",
  "Pediatric Dentistry",
  "General Check-up",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ClinicToggle({
  selected,
  onChange,
}: {
  selected: ClinicKey;
  onChange: (c: ClinicKey) => void;
}) {
  return (
    <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-border/60 rounded-full p-1 shadow-sm">
      {CLINIC_KEYS.map((c) => (
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

function SidebarTabs({
  active,
  onChange,
}: {
  active: ClinicKey;
  onChange: (c: ClinicKey) => void;
}) {
  return (
    <div className="flex gap-1 mb-4">
      {CLINIC_KEYS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            "flex-1 py-1.5 text-xs font-semibold font-heading rounded-lg transition-all duration-200",
            active === c
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Contact = () => {
  const [selectedClinic, setSelectedClinic] = useState<ClinicKey>("Madhyamgram");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timingTab, setTimingTab] = useState<ClinicKey>("Madhyamgram");
  const [mapTab, setMapTab] = useState<ClinicKey>("Madhyamgram");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      treatment: "",
      message: "",
      clinic_location: "Madhyamgram",
      website: "",
    },
  });

  const handleClinicChange = (c: ClinicKey) => {
    setSelectedClinic(c);
    setTimingTab(c);
    setMapTab(c);
    form.setValue("clinic_location", c);
  };

  const sendWhatsApp = (data: FormValues) => {
    const lines = [
      "🦷 *New Appointment Booking*",
      "",
      "👤 Name: " + data.name,
      "📞 Phone: " + data.phone,
      "📧 Email: " + data.email,
      "🦷 Treatment: " + data.treatment,
      data.preferred_date
        ? "📅 Date: " + format(data.preferred_date, "PPP")
        : "",
      "📍 Clinic: " + (data.clinic_location || selectedClinic),
      data.message ? "💬 Message: " + data.message : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      "https://wa.me/" +
        CLINIC_DATA[selectedClinic].waNumber +
        "?text=" +
        encodeURIComponent(lines),
      "_blank"
    );
  };

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // honeypot

    // Rate limiting: 15 minutes between submissions
    const lastSubmit = localStorage.getItem("last_booking_submit");
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      if (elapsed < 15 * 60 * 1000) {
        toast({
          title: "Please wait",
          description:
            "You've already submitted a request recently. Please wait a few minutes or call us directly.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        treatment: data.treatment,
        preferred_date: data.preferred_date
          ? format(data.preferred_date, "yyyy-MM-dd")
          : null,
        message: data.message || null,
        clinic_location: data.clinic_location || selectedClinic,
      });
      if (error) throw error;

      localStorage.setItem("last_booking_submit", Date.now().toString());
      sendWhatsApp(data);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast({ title: "Submission Failed", description: msg, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bothStatuses = useMemo(
    () => ({
      Madhyamgram: getClinicStatus("Madhyamgram"),
      "Dum Dum": getClinicStatus("Dum Dum"),
    }),
    []
  );

  const activeStatus = bothStatuses[selectedClinic];
  const activeClinic = CLINIC_DATA[selectedClinic];
  const timingClinic = CLINIC_DATA[timingTab];
  const mapClinic = CLINIC_DATA[mapTab];

  return (
    <Layout>
      <SEOHead
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
                Dr.&nbsp;Tamal Roy — a specialist you can trust.
              </p>

              {/* Both clinic statuses */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {CLINIC_KEYS.map((c) => {
                  const s = bothStatuses[c];
                  return (
                    <div
                      key={c}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold font-heading",
                        s.open
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-red-50 border-red-200 text-red-500"
                      )}
                    >
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          s.open ? "bg-emerald-500 animate-pulse" : "bg-red-400"
                        )}
                      />
                      <span className="font-bold">{c}</span>
                      <span className="opacity-60">—</span>
                      <span className="font-normal">{s.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Clinic selector */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Select Clinic
                </p>
                <ClinicToggle selected={selectedClinic} onChange={handleClinicChange} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Doctor Trust Section ── */}
        <section className="py-10 bg-background border-b border-border/40">
          <div className="container-dental">
            <ScrollReveal>
              <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--dental-blue-light))] to-[hsl(var(--deep-blue-light))] border border-primary/10">
                {/* Doctor profile */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-2xl font-heading font-bold text-primary">
                      TR
                    </span>
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
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">
                      1000+ Happy Patients
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">
                      Certified Specialist
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 shadow-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold font-heading text-foreground">
                      2 Locations
                    </span>
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

              {/* ── Form Column ── */}
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
                        We&apos;ll confirm your appointment at our{" "}
                        <span className="font-semibold text-foreground">
                          {selectedClinic}
                        </span>{" "}
                        clinic shortly.
                      </p>
                      <p className="text-sm text-muted-foreground mb-8">
                        Confirmation via phone or email within a few hours.
                      </p>
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          form.reset({ clinic_location: selectedClinic });
                        }}
                        variant="outline"
                        className="rounded-full font-heading"
                      >
                        Book Another Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-card)]">
                      {/* Form header — row on mobile, column on md+ */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-border/50">
                        <div>
                          <h2 className="text-h3 font-heading font-bold text-foreground">
                            Reserve Your Appointment
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Booking for{" "}
                            <span className="text-primary font-semibold">
                              {selectedClinic}
                            </span>{" "}
                            clinic
                          </p>
                        </div>
                        <div className="self-start md:self-center">
                          <ClinicToggle
                            selected={selectedClinic}
                            onChange={handleClinicChange}
                          />
                        </div>
                      </div>

                      {/* Timing + status helper */}
                      <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 mb-6">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {(() => {
                            const day = new Date().getDay();
                            const shift = activeClinic.shifts.find(s => {
                              if (day === 0) return s.days === "Sunday";
                              return s.days === "Mon – Sat";
                            });
                            return (
                              <>
                                <p className="text-xs font-semibold text-primary font-heading">
                                  {shift ? shift.note : "Closed Today"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Clinic hours: {shift ? shift.hours : "N/A"}
                                </p>
                              </>
                            );
                          })()}
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium font-heading",
                            activeStatus.open
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-red-50 border-red-200 text-red-600"
                          )}
                        >
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full flex-shrink-0",
                              activeStatus.open
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-red-400"
                            )}
                          />
                          {activeStatus.text}
                        </div>
                      </div>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-5"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-heading">
                                    Full Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John Doe"
                                      className="rounded-xl h-11"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-heading">
                                    Phone Number
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="+91 98042 14790"
                                      className="rounded-xl h-11"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="rounded-xl h-11"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="treatment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-heading">
                                    Treatment Type
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl h-11">
                                        <SelectValue placeholder="Select treatment" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {TREATMENTS.map((t) => (
                                        <SelectItem key={t} value={t}>
                                          {t}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="preferred_date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-heading">
                                    Preferred Date
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full rounded-xl h-11 justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {field.value
                                            ? format(field.value, "PPP")
                                            : "Pick a date"}
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                        className="p-3 pointer-events-auto"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Selected clinic display */}
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium">
                                Selected Clinic
                              </p>
                              <p className="text-sm font-semibold text-foreground font-heading">
                                {selectedClinic}
                              </p>
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-heading">
                                  Message (optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any additional information or concerns..."
                                    className="rounded-xl min-h-[90px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Honeypot — hidden from real users */}
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              left: "-9999px",
                              opacity: 0,
                              height: 0,
                              overflow: "hidden",
                            }}
                          >
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website</FormLabel>
                                  <FormControl>
                                    <Input
                                      tabIndex={-1}
                                      autoComplete="off"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
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
                        </form>
                      </Form>
                    </div>
                  )}
                </ScrollReveal>
              </div>

              {/* ── Sidebar Column ── */}
              <div className="lg:col-span-2 space-y-5">

                {/* Live Status */}
                <ScrollReveal delay={0.05}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
                      Live Clinic Status
                    </h3>
                    <div className="space-y-2">
                      {CLINIC_KEYS.map((c) => {
                        const s = bothStatuses[c];
                        return (
                          <div
                            key={c}
                            className={cn(
                              "flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium",
                              s.open
                                ? "bg-emerald-50 border-emerald-200"
                                : "bg-red-50/60 border-red-200/60"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full flex-shrink-0",
                                  s.open
                                    ? "bg-emerald-500 animate-pulse"
                                    : "bg-red-400"
                                )}
                              />
                              <span className="font-semibold font-heading text-foreground">
                                {c}
                              </span>
                            </div>
                            <span
                              className={
                                s.open ? "text-emerald-700" : "text-red-500"
                              }
                            >
                              {s.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Timings */}
                <ScrollReveal delay={0.1}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Clinic Timings
                    </h3>
                    <SidebarTabs active={timingTab} onChange={setTimingTab} />
                    <div className="space-y-3 pt-4 text-sm font-heading">
                      {timingClinic.shifts.map((shift, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "flex items-center justify-between py-2.5 px-3 rounded-lg border",
                            shift.openHour !== -1 
                              ? "bg-primary/5 border-primary/10"
                              : "bg-red-50/50 border-red-100 opacity-80"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">
                              {shift.days}
                            </span>
                            <span className="text-muted-foreground font-medium">
                              {shift.note}
                            </span>
                          </div>
                          <span className={cn(
                            "font-bold font-heading",
                            shift.openHour !== -1 ? "text-foreground" : "text-red-500"
                          )}>
                            {shift.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Contact Info */}
                <ScrollReveal delay={0.15}>
                  <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-4">
                      Contact Information
                    </h3>

                    <a
                      href="mailto:roy.tamaall@gmail.com"
                      className="flex items-center gap-3 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      roy.tamaall@gmail.com
                    </a>

                    {CLINIC_KEYS.map((c) => {
                      const info = CLINIC_DATA[c];
                      return (
                        <div
                          key={c}
                          className={cn(
                            "mb-3 last:mb-0 p-3.5 rounded-xl border transition-all",
                            selectedClinic === c
                              ? "bg-primary/5 border-primary/20"
                              : "bg-muted/30 border-border/40"
                          )}
                        >
                          <p
                            className={cn(
                              "text-xs font-bold font-heading uppercase tracking-wide mb-2",
                              selectedClinic === c
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            {c}
                          </p>
                          <a
                            href={"tel:" + info.phone.replace(/\s/g, "")}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
                          >
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            {info.phone}
                          </a>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {info.shortAddress}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollReveal>

                {/* Map */}
                <ScrollReveal delay={0.2}>
                  <div className="rounded-2xl overflow-hidden border border-border/50 shadow-[var(--shadow-soft)]">
                    <div className="p-3 bg-card border-b border-border/50">
                      <SidebarTabs active={mapTab} onChange={setMapTab} />
                      <p className="text-xs text-muted-foreground px-1 -mt-1 truncate">
                        {mapClinic.address}
                      </p>
                    </div>
                    <iframe
                      key={mapTab}
                      title={mapClinic.label + " Clinic Location"}
                      src={mapClinic.mapSrc}
                      className="w-full h-56 border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </ScrollReveal>

              </div>
            </div>
          </div>
        </section>

      </PageTransition>
    </Layout>
  );
};

export default Contact;
