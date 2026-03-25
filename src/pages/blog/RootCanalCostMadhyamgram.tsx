import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin } from "lucide-react";

const faqs = [
  { question: "What is the root canal cost in Madhyamgram?", answer: "Root canal costs in Madhyamgram typically range: Front teeth ₹2,000–₹3,500, Premolars ₹2,500–₹4,000, Molars ₹3,500–₹5,500 (excluding crown). Contact ToothZone for an exact quote after X-ray assessment." },
  { question: "Does root canal cost include the crown?", answer: "Usually no — root canal treatment and crown are priced separately. A crown after RCT is highly recommended to protect the tooth and typically costs ₹3,000–₹8,000 depending on the material chosen." },
  { question: "Is root canal treatment costly in Madhyamgram vs Kolkata?", answer: "Root canal in Madhyamgram at clinics like ToothZone is significantly more affordable than central Kolkata clinics, with the same or better quality treatment and materials." },
  { question: "Can I pay in instalments for root canal at ToothZone?", answer: "Yes, we offer flexible payment options for larger treatment plans. Speak to our team at ToothZone Madhyamgram to discuss payment arrangements that suit your budget." },
  { question: "What affects the cost of root canal treatment in Madhyamgram?", answer: "Key factors: which tooth (front, premolar, or molar), number of root canals in the tooth, severity of infection, whether a crown is needed, and the materials used. All costs are discussed upfront at ToothZone." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Root Canal Treatment Cost in Madhyamgram (2026)",
  "description": "Complete guide to root canal treatment cost in Madhyamgram. Per-tooth breakdown, what's included, and tips to save money.",
  "author": { "@type": "Organization", "name": "ToothZone Dental Clinic" },
  "publisher": { "@type": "Organization", "name": "ToothZone Dental Clinic", "url": "https://thetoothzone.vercel.app" },
  "datePublished": "2026-03-25",
  "url": "https://thetoothzone.vercel.app/blog/root-canal-cost-madhyamgram",
};

const RootCanalCostMadhyamgram = () => (
  <Layout>
    <SEOHead
      title="Root Canal Treatment Cost in Madhyamgram (2026) | ToothZone Blog"
      description="Complete guide to root canal treatment cost in Madhyamgram — per-tooth pricing, what's included, crown costs, and how to save money. Expert info from ToothZone Dental Clinic."
      canonical="https://thetoothzone.vercel.app/blog/root-canal-cost-madhyamgram"
      keywords="root canal cost madhyamgram, RCT price madhyamgram, root canal treatment price near dum dum, cost of root canal west bengal"
      schema={schema}
      faqSchema={faqs}
    />
    <PageTransition>
      <div className="container-dental pt-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      <section className="section-padding pb-0">
        <div className="container-dental max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-heading font-semibold">Treatment Guide</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 7 min read</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Madhyamgram</span>
              <span>March 2026</span>
            </div>
            <h1 className="text-h1 font-heading font-bold text-foreground mb-6 leading-tight">
              Root Canal Treatment Cost in Madhyamgram (2026)
            </h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Root canal treatment is one of the most searched dental topics in Madhyamgram and Dum Dum — and for good reason. Many people delay treatment because they are unsure of the cost. This guide breaks it all down clearly so you can make an informed decision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-8 section-padding">
        <div className="container-dental max-w-3xl">
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
              alt="Root canal treatment cost in Madhyamgram 2026 guide"
              className="w-full h-64 object-cover"
              loading="eager"
            />
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Root Canal Cost in Madhyamgram — Quick Summary</h2>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border/50">
                      <th className="text-left p-4 font-heading font-semibold text-foreground">Tooth Type</th>
                      <th className="text-left p-4 font-heading font-semibold text-foreground">RCT Cost</th>
                      <th className="text-left p-4 font-heading font-semibold text-foreground">Crown Cost</th>
                      <th className="text-left p-4 font-heading font-semibold text-foreground">Total Approx.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Front Tooth (1 canal)", "₹2,000–₹3,500", "₹3,000–₹5,000", "₹5,000–₹8,500"],
                      ["Premolar (2 canals)", "₹2,500–₹4,000", "₹3,500–₹6,000", "₹6,000–₹10,000"],
                      ["Molar (3–4 canals)", "₹3,500–₹5,500", "₹4,000–₹8,000", "₹7,500–₹13,500"],
                    ].map(([t, rct, crown, total], i) => (
                      <tr key={t} className={`border-b border-border/30 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                        <td className="p-4 text-foreground font-medium">{t}</td>
                        <td className="p-4 text-primary font-semibold">{rct}</td>
                        <td className="p-4 text-muted-foreground">{crown}</td>
                        <td className="p-4 text-foreground font-bold">{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2">* Prices are approximate guides for Madhyamgram dental clinics in 2026. Exact costs confirmed by X-ray assessment at ToothZone.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Why Does Root Canal Cost Vary in Madhyamgram?</h2>
              <p>
                The cost of root canal treatment in Madhyamgram is not one-size-fits-all. Several factors affect the final price — understanding these helps you budget accurately and avoid sticker shock:
              </p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  ["Which tooth is affected", "Front teeth (incisors, canines) have one canal and are the least expensive. Premolars typically have two canals. Molars — the most complex — have three or four canals and are the most costly."],
                  ["Severity of infection", "A tooth with a minor infection caught early is simpler to treat. An advanced infection with abscess formation near the root tip (periapical lesion) requires more time and materials, affecting cost."],
                  ["Re-treatment cases", "If a previous root canal failed and requires retreatment, the cost is typically higher due to the additional complexity of removing existing filling material."],
                  ["Crown material", "After root canal, a crown is essential. Metal crowns are cheapest, ceramic-metal (PFM) mid-range, and full zirconia or e.max crowns the most premium."],
                ].map(([title, desc]) => (
                  <li key={title as string} className="p-4 rounded-xl bg-card border border-border/50 space-y-1">
                    <span className="font-heading font-semibold text-foreground block">• {title as string}</span>
                    <span className="text-sm">{desc as string}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Madhyamgram vs Kolkata — Root Canal Cost Comparison</h2>
              <p>
                One of the biggest advantages of getting root canal treatment in Madhyamgram (at a clinic like ToothZone) versus central Kolkata is cost. Typically, you can expect to pay 20–35% less for the same quality treatment in Madhyamgram compared to clinics in areas like Salt Lake, Gariahat, or Park Street — without any compromise on materials or expertise.
              </p>
              <p>
                This makes ToothZone Madhyamgram an excellent option for patients from Dum Dum as well, who are looking for the quality of a city clinic without city prices.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Signs You Need Root Canal Treatment in Madhyamgram</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Severe, persistent toothache",
                  "Pain when biting or chewing",
                  "Prolonged sensitivity to hot/cold",
                  "Darkening or discolouration of the tooth",
                  "Swollen or tender gums near the tooth",
                  "A pimple or bump on the gums",
                ].map(sign => (
                  <div key={sign} className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                    <span className="text-red-500">⚠️</span>
                    <span className="text-sm text-foreground">{sign}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                If you are experiencing any of these symptoms in Madhyamgram or Dum Dum, do not delay. The longer an infected tooth goes untreated, the more complex and costly the treatment becomes. Early root canal treatment saves both the tooth and money.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Root Canal Cost in Madhyamgram" />

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">Get an Exact Root Canal Quote in Madhyamgram</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Book a consultation at ToothZone. We will X-ray and give you a full, transparent cost breakdown before any treatment begins.
            </p>
            <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Consultation</Button></Link>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  </Layout>
);

export default RootCanalCostMadhyamgram;
