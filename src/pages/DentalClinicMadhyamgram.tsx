import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Star, CheckCircle, Clock, Shield } from "lucide-react";

const services = [
  { icon: "🦷", name: "Root Canal Treatment", desc: "Painless, single-visit root canal with modern rotary technology." },
  { icon: "✨", name: "Teeth Whitening", desc: "Professional in-office whitening for a brighter smile in 60 minutes." },
  { icon: "😁", name: "Braces & Aligners", desc: "Metal, ceramic & clear aligners for perfectly aligned teeth." },
  { icon: "🔧", name: "Dental Implants", desc: "Permanent titanium implants — the gold standard in tooth replacement." },
  { icon: "🛡️", name: "Tooth Capping", desc: "High-quality porcelain crowns to restore damaged or weak teeth." },
  { icon: "👶", name: "Pediatric Dentistry", desc: "Gentle, child-friendly dental care in a fun and safe environment." },
];

const faqs = [
  { question: "Is ToothZone the best dental clinic in Madhyamgram?", answer: "ToothZone is one of the most trusted dental clinics in Madhyamgram, offering advanced technology, experienced dentists, and affordable pricing. We serve hundreds of patients from Madhyamgram, Dum Dum, and across North Kolkata every month." },
  { question: "What dental services are available in Madhyamgram?", answer: "We offer a full range of dental services including root canal treatment, teeth whitening, dental implants, braces, tooth scaling, crowns, smile design, and pediatric dentistry — all under one roof in Madhyamgram." },
  { question: "Is root canal painful at your clinic?", answer: "No. Our root canal procedures use modern painless techniques under local anaesthesia. Most patients report feeling no more discomfort than a routine filling." },
  { question: "How do I book an appointment at ToothZone Madhyamgram?", answer: "You can book an appointment online via our website's Contact page, or call us directly. Walk-ins are also welcome during clinic hours." },
  { question: "Do you serve patients from Dum Dum and Kolkata?", answer: "Yes! We regularly serve patients from Dum Dum, Barasat, Bangaon, and across greater Kolkata who choose us for our quality care and affordable prices." },
  { question: "What is the cost of teeth whitening in Madhyamgram?", answer: "Our professional teeth whitening is available at competitive prices in Madhyamgram. Contact us or visit the clinic for the latest pricing — we offer options for every budget." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "ToothZone Dental Clinic Madhyamgram",
  "description": "Best dental clinic in Madhyamgram offering root canal, teeth whitening, braces, implants and more.",
  "url": "https://thetoothzone.vercel.app/dental-clinic-madhyamgram",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Madhyamgram",
    "addressRegion": "West Bengal",
    "postalCode": "700129",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "22.7007", "longitude": "88.4355" },
  "areaServed": ["Madhyamgram", "Dum Dum", "Kolkata"],
  "priceRange": "₹₹",
  "openingHours": "Mo-Sa 09:00-20:00",
  "medicalSpecialty": "Dentistry",
};

const DentalClinicMadhyamgram = () => (
  <Layout>
    <SEOHead
      title="Best Dental Clinic in Madhyamgram | ToothZone Dental Care"
      description="Looking for the best dental clinic in Madhyamgram? ToothZone offers root canal, teeth whitening, braces, implants & more. Affordable, painless & professional care. Book now!"
      canonical="https://thetoothzone.vercel.app/dental-clinic-madhyamgram"
      keywords="best dental clinic in madhyamgram, dental clinic madhyamgram, dentist madhyamgram, root canal madhyamgram, teeth whitening madhyamgram, dental implants madhyamgram"
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
                <MapPin className="w-4 h-4" />
                <span>Madhyamgram, West Bengal</span>
              </div>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-5 leading-tight">
                Best Dental Clinic in{" "}
                <span className="text-primary">Madhyamgram</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
                ToothZone Dental Clinic is Madhyamgram's most trusted dental practice. We provide
                painless, affordable, and world-class dental care — from routine check-ups to
                advanced root canal treatment, dental implants, and smile makeovers. Also serving
                patients from Dum Dum, Barasat, and across North Kolkata.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full font-heading px-8">
                    Book Appointment
                  </Button>
                </Link>
                <a href="tel:+919999999999">
                  <Button size="lg" variant="outline" className="rounded-full font-heading px-8 gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-sm text-muted-foreground">4.9★ — Trusted by 500+ patients in Madhyamgram</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png"
                  alt="Best dental clinic in Madhyamgram - ToothZone interior"
                  className="w-full h-80 object-cover"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container-dental">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "500+", l: "Patients in Madhyamgram" },
              { n: "10+", l: "Years of Experience" },
              { n: "15+", l: "Dental Treatments" },
              { n: "4.9★", l: "Google Rating" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-heading font-bold text-primary">{n}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-4">Our Dental Services in Madhyamgram</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Comprehensive dental treatments under one roof — from preventive care to full smile transformations.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" className="rounded-full font-heading px-8">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">Why ToothZone</p>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-4">
                Why Choose ToothZone — #1 Dental Clinic in Madhyamgram
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6 text-primary" />, title: "Painless Procedures", desc: "Modern anaesthesia and latest rotary instruments ensure a completely pain-free experience." },
              { icon: <Clock className="w-6 h-6 text-primary" />, title: "Single-Visit Treatments", desc: "Root canal, fillings, and scaling completed in a single comfortable visit where possible." },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: "Affordable Pricing", desc: "Quality dental care at transparent, honest prices with flexible payment options." },
              { icon: <Star className="w-6 h-6 text-primary" />, title: "Experienced Doctors", desc: "Our team of BDS & MDS qualified dentists bring years of expertise to every treatment." },
              { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Conveniently Located", desc: "Centrally located in Madhyamgram, easily accessible from Dum Dum, Barasat & Bangaon." },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: "Modern Equipment", desc: "Digital X-rays, rotary endodontics, and sterilized instruments for your safety." },
            ].map(({ icon, title, desc }) => (
              <ScrollReveal key={title}>
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <div className="mb-3">{icon}</div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About / SEO Content Block */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
              About Our Dental Clinic in Madhyamgram
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ToothZone Dental Clinic is one of the premier dental clinics serving the Madhyamgram community and surrounding areas including Dum Dum, Barasat, Bangaon, and North Kolkata. Established with the mission of providing world-class dental care to every family, we have built a reputation for painless procedures, transparent pricing, and genuine patient care.
              </p>
              <p>
                Our Madhyamgram dental clinic is equipped with the latest dental technology including digital OPG X-rays, rotary endodontic systems for painless root canals, LED teeth whitening modules, and sterilised instrument management systems. Every patient who walks through our doors in Madhyamgram receives a personalised treatment plan tailored to their needs and budget.
              </p>
              <p>
                Whether you are suffering from tooth pain and need emergency treatment in Madhyamgram, looking for affordable braces in Dum Dum, or wanting a full smile makeover with veneers and whitening — ToothZone is your one-stop dental destination in West Bengal.
              </p>
              <p>
                We proudly serve as the go-to dental clinic for families across Madhyamgram, offering preventive care, paediatric dentistry for children, and advanced cosmetic procedures for adults. Our team of BDS and MDS qualified dentists are committed to continuing education and use only ISO-certified dental materials for your safety.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion faqs={faqs} title="FAQs — Dental Clinic in Madhyamgram" />

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">
              Ready to Visit the Best Dental Clinic in Madhyamgram?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Book your appointment today. Walk-ins welcome. Serving Madhyamgram, Dum Dum &amp; all of North Kolkata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="rounded-full font-heading px-10">
                  Book Appointment
                </Button>
              </Link>
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

export default DentalClinicMadhyamgram;
