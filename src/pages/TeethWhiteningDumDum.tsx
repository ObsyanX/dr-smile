import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Star, CheckCircle, Sparkles } from "lucide-react";

const steps = [
  { n: "01", title: "Shade Assessment", desc: "We photograph and assess your current tooth shade using a professional shade guide." },
  { n: "02", title: "Teeth Preparation", desc: "Gums are protected and the whitening gel is applied carefully to your teeth." },
  { n: "03", title: "Activation", desc: "LED light or laser activates the whitening agent to break down stains." },
  { n: "04", title: "Result & Aftercare", desc: "Immediate visible results — up to 8 shades whiter. Aftercare instructions provided." },
];

const faqs = [
  { question: "Where can I get teeth whitening near Dum Dum?", answer: "ToothZone Dental Clinic in Madhyamgram is the nearest professional teeth whitening clinic to Dum Dum — just 20–25 minutes away. We offer both in-office and take-home whitening options." },
  { question: "How much does teeth whitening cost near Dum Dum?", answer: "Professional teeth whitening at ToothZone near Dum Dum is available at competitive prices. Contact us for current pricing. We offer options for every budget, from in-office to home whitening kits." },
  { question: "Is teeth whitening safe?", answer: "Yes, professional teeth whitening done by a qualified dentist is completely safe. We use clinically tested, dentist-grade whitening agents. Home kits purchased online are often less safe — always get whitening done professionally." },
  { question: "How long does teeth whitening last?", answer: "Professional whitening results can last 6 months to 2 years depending on your diet and oral hygiene habits. Avoiding tea, coffee, and tobacco helps maintain results longer." },
  { question: "Will teeth whitening work on crowns or veneers?", answer: "Whitening agents do not affect artificial restorations like crowns, veneers, or fillings. We will assess your situation and recommend the best cosmetic solution for your smile." },
  { question: "Does teeth whitening near Dum Dum hurt?", answer: "You may experience mild, temporary sensitivity during and after treatment — this is normal and passes within 24–48 hours. We use desensitising agents to minimise this." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "ToothZone Dental Clinic — Teeth Whitening Near Dum Dum",
  "description": "Professional teeth whitening near Dum Dum at ToothZone Dental Clinic Madhyamgram. Get up to 8 shades whiter in 60 minutes.",
  "url": "https://thetoothzone.vercel.app/teeth-whitening-dum-dum",
  "address": { 
    "@type": "PostalAddress", 
    "streetAddress": "Jessore Rd, Basak Bagan, South Dumdum",
    "addressLocality": "Kolkata", 
    "addressRegion": "West Bengal", 
    "postalCode": "700048",
    "addressCountry": "IN" 
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.608571",
    "longitude": "88.395793"
  },
  "priceRange": "₹₹",
  "openingHours": ["Mo-Sa 10:30-14:00", "Su 18:15-21:00"],
};

const TeethWhiteningDumDum = () => (
  <Layout>
    <SEOHead
      title="Professional Teeth Whitening Near Dum Dum | ToothZone Madhyamgram"
      description="Get professional teeth whitening near Dum Dum at ToothZone Dental Clinic Madhyamgram. Up to 8 shades whiter in just 60 minutes. Safe, affordable & effective. Book today!"
      canonical="https://thetoothzone.vercel.app/teeth-whitening-dum-dum"
      keywords="teeth whitening dum dum, teeth whitening near dum dum, professional teeth whitening madhyamgram, smile whitening dum dum, laser teeth whitening near dum dum, cosmetic dentist dum dum"
      schema={schema}
      faqSchema={faqs}
    />
    <PageTransition>

      {/* Hero */}
      <section className="relative section-padding gradient-hero overflow-hidden">
        <div className="container-dental">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-heading font-semibold mb-4">
                <Sparkles className="w-4 h-4" /> Up to 8 Shades Whiter
              </div>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-5 leading-tight">
                Professional Teeth Whitening Near{" "}
                <span className="text-primary">Dum Dum</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
                Achieve a brighter, more confident smile in just 60 minutes at ToothZone Dental
                Clinic — Madhyamgram's leading cosmetic dental practice, just a short drive from
                Dum Dum. Professional whitening that's safe, fast, and dramatically effective.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full font-heading px-8">Book Whitening</Button>
                </Link>
                <a href="tel:+919804214790">
                  <Button size="lg" variant="outline" className="rounded-full font-heading px-8 gap-2">
                    <Phone className="w-4 h-4" /> Call Us
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm text-muted-foreground">Loved by patients from Dum Dum &amp; Madhyamgram</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
                  alt="Professional teeth whitening near Dum Dum at ToothZone Madhyamgram"
                  className="w-full h-80 object-cover"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Results Banner */}
      <section className="py-8 bg-yellow-400/5 border-y border-yellow-400/20">
        <div className="container-dental">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "8 Shades", l: "Whiter Guaranteed" },
              { n: "60 Min", l: "Procedure Time" },
              { n: "0", l: "Pain or Downtime" },
              { n: "2 Years", l: "Results Last" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-heading font-bold text-primary">{n}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Professional Whitening */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
              Why Get Professional Teeth Whitening Near Dum Dum?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you are searching for "teeth whitening near Dum Dum" or "cosmetic dentist near Dum Dum", you have found the right clinic. ToothZone Dental Clinic in Madhyamgram provides professional, in-office teeth whitening that delivers dramatically better results than over-the-counter products available in chemists and online stores.
              </p>
              <p>
                Our professional teeth whitening near Dum Dum uses clinically tested, dentist-grade whitening gel that penetrates deep tooth enamel to break down years of staining from tea, coffee, tobacco, and food. The treatment is activated by LED technology to accelerate the whitening process — delivering up to 8 shades of improvement in a single 60-minute appointment.
              </p>
              <p>
                Unlike DIY whitening kits that can cause uneven results and gum irritation, our teeth whitening procedure at Madhyamgram is performed safely by qualified dental professionals. Your gums are fully protected, and we use desensitising treatments to minimise any post-treatment sensitivity.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-h2 font-heading font-bold text-foreground mb-3">
                How Teeth Whitening Works at ToothZone Near Dum Dum
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 text-center">
                  <div className="text-4xl font-heading font-bold text-primary/20 mb-3">{step.n}</div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-8 text-center">
              Benefits of Teeth Whitening at ToothZone
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Immediate, dramatic results in one visit",
              "Safe, clinically tested whitening agents",
              "Performed by qualified dental professionals",
              "Up to 8 shades whiter guaranteed",
              "No damage to tooth enamel",
              "Long-lasting results up to 2 years",
              "Desensitising agents to prevent sensitivity",
              "Serving Dum Dum, Madhyamgram & Kolkata",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Teeth Whitening Near Dum Dum" />

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary-foreground/70" />
            <h2 className="text-h2 font-heading font-bold mb-4">Ready for a Brighter Smile?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Book professional teeth whitening near Dum Dum today at ToothZone Madhyamgram. 60 minutes to a confident new smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Whitening Session</Button></Link>
              <a href="https://www.google.com/maps/dir//Tooth+Zone+Dental+Clinic,+Jessore+Rd,+Basak+Bagan,+South+Dumdum,+Kolkata,+West+Bengal+700048/@22.6085595,88.3957902,17z/data=!4m16!1m7!3m6!1s0x3a027733376dce25:0x7d897aace8f1b0d6!2sTooth+Zone+Dental+Clinic!8m2!3d22.6085595!4d88.3957902!16s%2Fg%2F11tnn5qtz3!4m7!1m0!1m5!1m1!1s0x3a027733376dce25:0x7d897aace8f1b0d6!2m2!1d88.3957806!2d22.608558!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full font-heading px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-black">
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

export default TeethWhiteningDumDum;
