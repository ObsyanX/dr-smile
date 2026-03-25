import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Star, CheckCircle, Navigation } from "lucide-react";

const faqs = [
  { question: "Is there a good dentist near Dum Dum?", answer: "Yes! ToothZone Dental Clinic is located in Madhyamgram, just a short drive from Dum Dum. We regularly serve patients from Dum Dum, Shyamnagar, and all areas along the Dum Dum–Madhyamgram corridor." },
  { question: "What dental treatments are available near Dum Dum?", answer: "We offer root canal treatment, teeth whitening, braces, aligners, dental implants, tooth extraction, pediatric dentistry, and smile design — all available near Dum Dum at ToothZone Madhyamgram." },
  { question: "How far is ToothZone from Dum Dum?", answer: "ToothZone is conveniently located in Madhyamgram, approximately 20–25 minutes from Dum Dum by road. We are easily accessible by train, bus, and auto-rickshaw." },
  { question: "Do you have emergency dental services near Dum Dum?", answer: "Yes, we provide emergency dental care for severe toothache, broken teeth, lost fillings, and dental trauma. Call us for same-day emergency appointments." },
  { question: "Is the dentist near Dum Dum affordable?", answer: "Absolutely. We offer competitive and transparent pricing for all dental procedures. Our team will discuss all cost options before starting any treatment." },
  { question: "Can I book an online appointment for a dentist near Dum Dum?", answer: "Yes! Visit our Contact page to book an appointment online, or call us directly. Flexible morning and evening slots are available for working professionals." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "ToothZone Dental Clinic — Near Dum Dum",
  "description": "Best dentist near Dum Dum, located in Madhyamgram. Full-service dental clinic serving Dum Dum, Shyamnagar, Bangaon & North Kolkata.",
  "url": "https://thetoothzone.vercel.app/dentist-dum-dum",
  "address": { "@type": "PostalAddress", "addressLocality": "Madhyamgram", "addressRegion": "West Bengal", "addressCountry": "IN" },
  "areaServed": ["Dum Dum", "Madhyamgram", "Kolkata", "Barasat"],
  "priceRange": "₹₹",
  "openingHours": "Mo-Sa 09:00-20:00",
};

const DentistDumDum = () => (
  <Layout>
    <SEOHead
      title="Best Dentist Near Dum Dum | ToothZone Dental Clinic Madhyamgram"
      description="Looking for the best dentist near Dum Dum? ToothZone Dental Clinic in Madhyamgram is just minutes away. Root canal, braces, whitening & more. Book today!"
      canonical="https://thetoothzone.vercel.app/dentist-dum-dum"
      keywords="dentist near dum dum, best dentist dum dum, dental clinic dum dum, root canal dum dum, teeth whitening dum dum, dental treatment near dum dum"
      schema={schema}
      faqSchema={faqs}
    />
    <PageTransition>

      {/* Hero */}
      <section className="relative section-padding gradient-hero overflow-hidden">
        <div className="container-dental">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                <Navigation className="w-4 h-4" />
                <span>Serving Dum Dum &amp; North Kolkata</span>
              </div>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-5 leading-tight">
                Best Dentist Near{" "}
                <span className="text-primary">Dum Dum</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
                ToothZone Dental Clinic, located in Madhyamgram, is the most trusted dental clinic
                serving patients from Dum Dum, Shyamnagar, Bangaon, and all of North Kolkata. Just
                20–25 minutes from Dum Dum — world-class dental care at doorstep distance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full font-heading px-8">Book Appointment</Button>
                </Link>
                <a href="tel:+919999999999">
                  <Button size="lg" variant="outline" className="rounded-full font-heading px-8 gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm text-muted-foreground">Trusted by patients across Dum Dum &amp; Madhyamgram</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283182/ChatGPT_Image_Mar_23_2026_09_56_04_PM_hndsut.png"
                  alt="Dentist near Dum Dum - ToothZone dental treatment"
                  className="w-full h-80 object-cover"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Proximity Section */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
              ToothZone — The Nearest Premium Dental Clinic to Dum Dum
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you are searching for "dentist near Dum Dum" or "dental clinic near me" in the Dum Dum area, ToothZone Dental Clinic in Madhyamgram is your answer. We are strategically located on the Dum Dum–Madhyamgram–Barasat corridor, making us easily accessible from Dum Dum, Dum Dum Cantonment, Shyamnagar, Bangaon Junction, and all nearby localities.
              </p>
              <p>
                Unlike smaller neighbourhood clinics, ToothZone offers the full range of modern dental treatments — from routine scaling and fillings to advanced dental implants and full smile makeovers — all in a single, state-of-the-art facility near Dum Dum. Our clinic is open 6 days a week with flexible morning and evening slots to fit around your work schedule.
              </p>
              <p>
                Our Dum Dum-area patients consistently praise our painless root canal procedures, affordable pricing, and the warm, professional care delivered by our team of experienced dentists. Whether it's a dental emergency or a planned cosmetic procedure, we welcome patients from Dum Dum and across West Bengal.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services near Dum Dum */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-h2 font-heading font-bold text-foreground mb-3">
                Dental Services Available Near Dum Dum
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">All major dental services — no need to travel to central Kolkata.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🦷", name: "Root Canal Treatment" },
              { icon: "✨", name: "Teeth Whitening" },
              { icon: "😁", name: "Braces & Aligners" },
              { icon: "🔧", name: "Dental Implants" },
              { icon: "🛡️", name: "Tooth Capping" },
              { icon: "👶", name: "Pediatric Dentistry" },
              { icon: "💎", name: "Smile Design" },
              { icon: "❗", name: "Emergency Dentistry" },
            ].map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.06}>
                <div className="p-5 rounded-xl bg-card border border-border/50 flex items-center gap-3 hover:border-primary/30 transition-all duration-300">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-heading font-semibold text-sm text-foreground">{s.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why patients from Dum Dum choose us */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-8 text-center">
              Why Dum Dum Patients Choose ToothZone
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Easy access from Dum Dum by train, bus & auto",
              "Modern clinic with digital X-rays & rotary RCT",
              "Painless procedures with advanced anaesthesia",
              "Affordable, transparent pricing — no hidden fees",
              "6-day availability with evening appointments",
              "BDS & MDS qualified dental team",
              "Emergency same-day slots available",
              "Child-friendly environment for family visits",
            ].map((point) => (
              <ScrollReveal key={point}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Dentist Near Dum Dum" />

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">Visit the Best Dentist Near Dum Dum Today</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              ToothZone Madhyamgram — 20 minutes from Dum Dum. Book your appointment and experience painless, affordable dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Appointment</Button></Link>
              <a href="https://maps.google.com/?q=Madhyamgram+West+Bengal" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full font-heading px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <MapPin className="w-4 h-4 mr-2" /> Get Directions
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  </Layout>
);

export default DentistDumDum;
