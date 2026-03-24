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
import {
  CalendarIcon, Phone, Mail, MapPin, Clock, CheckCircle2,
  Star, Award, Users, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  treatment: z.string().min(1, "Please select a treatment"),
  preferred_date: z.date().optional(),
  message: z.string().trim().max(1000).optional(),
  clinic_location: z.string().optional(),
  website: z.string().max(0, "Bot detected").optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

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
      `👤 Name: ${data.name}`,
      `📞 Phone: ${data.phone}`,
      `📧 Email: ${data.email}`,
      `🦷 Treatment: ${data.treatment}`,
      data.preferred_date ? `📅 Date: ${format(data.preferred_date, "PPP")}` : "",
      data.clinic_location ? `📍 Clinic: ${data.clinic_location}` : "",
      data.message ? `💬 Message: ${data.message}` : "",
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919804214790?text=${encoded}`, "_blank");
  };

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // honeypot triggered
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        treatment: data.treatment,
        preferred_date: data.preferred_date ? format(data.preferred_date, "yyyy-MM-dd") : null,
        message: data.message || null,
        clinic_location: data.clinic_location || null,
      };
      const { error } = await supabase.from("appointments").insert([payload]);
      if (error) throw error;
      sendWhatsAppNotification(data);
      setSubmitted(true);
      toast({ title: "Appointment Requested!", description: "We'll confirm your booking shortly." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast({ title: "Submission Failed", description: message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <Layout>
    <SEOHead
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
          </ScrollReveal>
        </div>
      </section>

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
                      Book Another Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-card border border-border/50">
                    <h2 className="text-h3 font-heading font-bold text-foreground mb-6">Appointment Form</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Full Name</FormLabel>
                              <FormControl><Input placeholder="John Doe" className="rounded-xl" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Phone Number</FormLabel>
                              <FormControl><Input placeholder="+91 98042 14790" className="rounded-xl" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-heading">Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="john@example.com" className="rounded-xl" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField control={form.control} name="treatment" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Treatment Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select treatment" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {treatments.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="preferred_date" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-heading">Preferred Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button variant="outline" className={cn("w-full rounded-xl justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
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
                      </form>
                    </Form>
                  </div>
                )}
              </ScrollReveal>
            </div>

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
                  </div>
                </div>
              </ScrollReveal>

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
