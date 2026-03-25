import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Star, CheckCircle, Clock, Zap } from "lucide-react";

const steps = [
  { n: "01", title: "Consultation & X-ray", desc: "Digital X-ray examination to assess the infected tooth and plan the procedure." },
  { n: "02", title: "Local Anaesthesia", desc: "Complete numbing of the area — you will feel no pain throughout the procedure." },
  { n: "03", title: "Canal Cleaning", desc: "Infected pulp is removed and canals are shaped using modern rotary files." },
  { n: "04", title: "Filling & Sealing", desc: "Canals are filled with biocompatible material and the tooth is sealed." },
  { n: "05", title: "Crown Placement", desc: "A protective crown is placed to restore the tooth's strength and appearance." },
  { n: "06", title: "Recovery", desc: "Most patients resume normal activity the same day. Recovery is quick and comfortable." },
];

const faqs = [
  { question: "Is root canal treatment painful in Madhyamgram?", answer: "No. At ToothZone Madhyamgram, root canal treatment is performed under effective local anaesthesia using modern rotary instruments. Most patients report the experience is no more uncomfortable than getting a regular filling." },
  { question: "How many visits does root canal treatment take in Madhyamgram?", answer: "Most cases at our Madhyamgram clinic can be completed in 1–2 visits. Simple cases are often done in a single appointment. We will advise you after the initial X-ray assessment." },
  { question: "What is the cost of root canal treatment in Madhyamgram?", answer: "Root canal costs in Madhyamgram at ToothZone depend on the tooth involved (front, premolar, or molar) and the complexity. Contact us for current pricing — we offer transparent, no-hidden-fee quotes." },
  { question: "What happens if I don't get root canal treatment?", answer: "Untreated root infections can spread, cause severe pain, lead to abscess formation, and ultimately require tooth extraction. Root canal saves your natural tooth and prevents further complications." },
  { question: "How long does root canal treatment last?", answer: "A properly done root canal treatment, followed by a good crown, can last a lifetime with proper oral hygiene. Our Madhyamgram clinic uses the highest quality materials for long-lasting results." },
  { question: "Can I eat after root canal treatment?", answer: "You should avoid eating for 1–2 hours after treatment while the anaesthesia wears off. After that, soft foods are recommended for a day or two. Your dentist will give you specific post-care instructions." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalOrganization"],
  "name": "ToothZone Dental Clinic — Root Canal Treatment Madhyamgram",
  "description": "Painless root canal treatment in Madhyamgram. Modern rotary endodontics, single-visit RCT available. Serving Dum Dum & North Kolkata.",
  "url": "https://thetoothzone.vercel.app/root-canal-madhyamgram",
  "address": { "@type": "PostalAddress", "addressLocality": "Madhyamgram", "addressRegion": "West Bengal", "addressCountry": "IN" },
  "medicalSpecialty": "Endodontics",
  "availableService": { "@type": "MedicalProcedure", "name": "Root Canal Treatment", "procedureType": "Therapeutic" },
};

const RootCanalMadhyamgram = () => (
  <Layout>
    <SEOHead
      title="Painless Root Canal Treatment in Madhyamgram | ToothZone"
      description="Get painless root canal treatment in Madhyamgram at ToothZone Dental Clinic. Modern rotary technology, single-visit option, affordable cost. Serving Dum Dum & Kolkata."
      canonical="https://thetoothzone.vercel.app/root-canal-madhyamgram"
      keywords="root canal treatment madhyamgram, root canal madhyamgram cost, painless root canal madhyamgram, root canal dentist near dum dum, RCT madhyamgram, endodontist madhyamgram"
      schema={schema}
      faqSchema={faqs}
    />
    <PageTransition>

      {/* Hero */}
      <section className="relative section-padding gradient-hero overflow-hidden">
        <div className="container-dental">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-heading font-semibold mb-4">
                <Zap className="w-4 h-4" /> Painless &amp; Modern
              </div>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-5 leading-tight">
                Root Canal Treatment in{" "}
                <span className="text-primary">Madhyamgram</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
                Suffering from tooth pain in Madhyamgram or Dum Dum? ToothZone offers completely
                painless root canal treatment using modern rotary endodontic technology. Save your
                natural tooth with our experienced dental team — single-visit options available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full font-heading px-8">Book Root Canal</Button>
                </Link>
                <a href="tel:+919804214790">
                  <Button size="lg" variant="outline" className="rounded-full font-heading px-8 gap-2">
                    <Phone className="w-4 h-4" /> Emergency Call
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm text-muted-foreground">500+ successful root canals in Madhyamgram</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                  alt="Painless root canal treatment in Madhyamgram at ToothZone dental clinic"
                  className="w-full h-80 object-cover"
                  loading="eager"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container-dental">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "1–2", l: "Visits Required" },
              { n: "0", l: "Pain During Procedure" },
              { n: "Same Day", l: "Back to Normal" },
              { n: "Lifetime", l: "Tooth Preservation" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-heading font-bold text-primary">{n}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Root Canal */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
              What is Root Canal Treatment?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Root canal treatment (RCT) is a dental procedure that treats infection deep inside a tooth. When bacteria reach the pulp (the soft tissue inside the tooth containing nerves and blood vessels), it causes intense pain and infection. Root canal treatment removes this infected tissue, cleans the inside of the tooth, and seals it to prevent further infection — saving the tooth that might otherwise need to be extracted.
              </p>
              <p>
                At ToothZone Madhyamgram, our root canal procedures are performed with modern rotary endodontic instruments that make the procedure faster, safer, and virtually painless. We use effective local anaesthesia, so you will feel comfortable throughout. Most patients are surprised at how easy the procedure actually is at our clinic in Madhyamgram.
              </p>
              <p>
                Root canal treatment at our Madhyamgram clinic is the best option for patients from Dum Dum, Barasat, Bangaon, and surrounding areas who want to save a painful or infected tooth without resorting to extraction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-h2 font-heading font-bold text-foreground mb-3">
                Root Canal Treatment Process at ToothZone Madhyamgram
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Step-by-step — modern, safe, and completely painless.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="text-4xl font-heading font-bold text-primary/20 mb-3">{step.n}</div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-6">
              Root Canal Treatment Cost in Madhyamgram
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The cost of root canal treatment in Madhyamgram at ToothZone varies depending on which tooth is affected (front teeth, premolars, or molars are priced differently due to complexity) and whether a crown is required afterward. We offer transparent, upfront pricing — you will always know the cost before we begin.
              </p>
              <p>
                We believe quality dental care should be accessible to everyone. Compared to clinics in central Kolkata, our root canal treatment in Madhyamgram is offered at highly competitive prices without any compromise on quality or materials used.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { tooth: "Front Tooth", range: "₹2,000–₹3,500" },
                  { tooth: "Premolar", range: "₹2,500–₹4,000" },
                  { tooth: "Molar", range: "₹3,500–₹5,500" },
                ].map(({ tooth, range }) => (
                  <div key={tooth} className="p-5 rounded-xl bg-primary/5 border border-primary/20 text-center">
                    <p className="font-heading font-semibold text-foreground mb-1">{tooth}</p>
                    <p className="text-primary font-bold text-lg">{range}</p>
                    <p className="text-xs text-muted-foreground">Approx. (excl. crown)</p>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                * Prices are indicative. Final cost is confirmed after X-ray examination. Call us or visit our Madhyamgram clinic for exact quotes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why ToothZone for RCT */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-foreground mb-8 text-center">
              Why Choose ToothZone for Root Canal in Madhyamgram?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Modern rotary endodontic instruments",
              "Effective local anaesthesia — zero pain",
              "Single-visit root canal option available",
              "Digital X-rays for accurate diagnosis",
              "Experienced BDS & MDS dentists",
              "Affordable pricing with transparent quotes",
              "Post-treatment care and follow-up",
              "Conveniently located for Dum Dum patients",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Root Canal Treatment in Madhyamgram" />

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">Stop the Pain — Book Root Canal in Madhyamgram Today</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Emergency and same-day appointments available. Serving Madhyamgram, Dum Dum &amp; North Kolkata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Now</Button></Link>
              <a href="tel:+919804214790">
                <Button size="lg" variant="outline" className="rounded-full font-heading px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="w-4 h-4 mr-2" /> Emergency Call
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  </Layout>
);

export default RootCanalMadhyamgram;
