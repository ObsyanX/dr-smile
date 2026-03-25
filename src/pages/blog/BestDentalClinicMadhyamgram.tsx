import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin } from "lucide-react";

const faqs = [
  { question: "Which is the best dental clinic in Madhyamgram in 2026?", answer: "ToothZone Dental Clinic is widely regarded as one of the best dental clinics in Madhyamgram in 2026, offering modern technology, experienced dentists, and comprehensive services at affordable prices." },
  { question: "What should I look for in a dental clinic in Madhyamgram?", answer: "Look for: qualified dentists (BDS/MDS), sterilised equipment, digital X-ray capability, range of treatments under one roof, transparent pricing, and good patient reviews. ToothZone ticks every box." },
  { question: "Do dental clinics in Madhyamgram use modern equipment?", answer: "Top clinics in Madhyamgram like ToothZone use digital OPG X-rays, rotary endodontic systems, LED whitening, and ISO-sterilised instruments — comparable to the best clinics in central Kolkata." },
  { question: "Is dental treatment in Madhyamgram affordable?", answer: "Yes! Dental clinics in Madhyamgram, including ToothZone, generally offer much more competitive pricing than central Kolkata clinics without any compromise in quality or materials." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Dental Clinic in Madhyamgram (2026 Guide)",
  "description": "A comprehensive guide to finding the best dental clinic in Madhyamgram in 2026.",
  "author": { "@type": "Organization", "name": "ToothZone Dental Clinic" },
  "publisher": { "@type": "Organization", "name": "ToothZone Dental Clinic", "url": "https://thetoothzone.vercel.app" },
  "datePublished": "2026-03-25",
  "dateModified": "2026-03-25",
  "url": "https://thetoothzone.vercel.app/blog/best-dental-clinic-madhyamgram",
};

const BestDentalClinicMadhyamgram = () => (
  <Layout>
    <SEOHead
      title="Best Dental Clinic in Madhyamgram (2026 Guide) | ToothZone Blog"
      description="A complete 2026 guide to finding the best dental clinic in Madhyamgram. What to look for, how to compare clinics, and why ToothZone is the top choice for families in Madhyamgram & Dum Dum."
      canonical="https://thetoothzone.vercel.app/blog/best-dental-clinic-madhyamgram"
      keywords="best dental clinic in madhyamgram, top dentist madhyamgram 2026, dental clinic guide madhyamgram, how to choose dentist madhyamgram"
      schema={schema}
      faqSchema={faqs}
    />
    <PageTransition>

      {/* Back */}
      <div className="container-dental pt-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <section className="section-padding pb-0">
        <div className="container-dental max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-heading font-semibold">Local Guide</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 6 min read</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Madhyamgram, West Bengal</span>
              <span>March 2026</span>
            </div>
            <h1 className="text-h1 font-heading font-bold text-foreground mb-6 leading-tight">
              Best Dental Clinic in Madhyamgram (2026 Guide)
            </h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Finding a good dental clinic in Madhyamgram is easier than you think — if you know what to look for. This 2026 guide covers everything: the qualities that distinguish a top dental clinic, what treatments to expect, typical cost ranges, and why ToothZone Dental Clinic is consistently rated as the best dental clinic in Madhyamgram by local families.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-0 section-padding">
        <div className="container-dental max-w-3xl">
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src="https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png"
              alt="Best dental clinic in Madhyamgram 2026 — ToothZone interior"
              className="w-full h-64 object-cover"
              loading="eager"
            />
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Why Choosing the Right Dental Clinic in Madhyamgram Matters</h2>
              <p>
                Oral health directly affects your overall health. Studies have consistently linked untreated gum disease to cardiovascular problems, diabetes complications, and premature births. Yet many people in Madhyamgram delay dental treatment because they are unsure which clinic to trust, or worry about costs. This guide is designed to remove that uncertainty.
              </p>
              <p>
                Madhyamgram has seen significant development in healthcare infrastructure over the past decade. Today, residents do not need to travel to central Kolkata for quality dental care — there are excellent dental clinics in Madhyamgram offering the same standard of care at substantially more competitive prices.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">What Makes a Dental Clinic the Best in Madhyamgram?</h2>
              <p>When evaluating dental clinics in Madhyamgram, consider these key factors:</p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  ["Qualified Dentists", "Look for BDS (Bachelor of Dental Surgery) and MDS (Master of Dental Surgery) qualified professionals. Specialist qualifications matter for complex treatments like root canals, implants, and orthodontics."],
                  ["Modern Equipment", "The best dental clinics in Madhyamgram use digital OPG X-rays (much lower radiation than traditional X-rays), rotary endodontic systems for painless root canals, and LED whitening systems."],
                  ["Sterilisation Protocols", "Every instrument should be autoclave-sterilised. Ask the clinic about their sterilisation process — top clinics are always transparent about this."],
                  ["Range of Services", "A clinic that offers everything — from routine scaling to dental implants and smile design — saves you the inconvenience of visiting multiple specialists."],
                  ["Patient Reviews", "Google reviews from real Madhyamgram patients are invaluable. Look for reviews mentioning painless procedures, honest pricing, and professional care."],
                  ["Transparent Pricing", "The best dental clinic in Madhyamgram provides a clear breakdown of costs before starting treatment. No hidden fees, no surprises."],
                ].map(([title, desc]) => (
                  <li key={title as string} className="flex flex-col gap-1 p-4 rounded-xl bg-card border border-border/50">
                    <span className="font-heading font-semibold text-foreground">✓ {title as string}</span>
                    <span className="text-sm">{desc as string}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Dental Services Available in Madhyamgram</h2>
              <p>
                The best dental clinics in Madhyamgram offer a comprehensive range of treatments. Here is what you should expect to find available locally:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Root Canal Treatment (RCT)",
                  "Teeth Whitening",
                  "Dental Implants",
                  "Braces & Clear Aligners",
                  "Teeth Scaling & Cleaning",
                  "Dental Crowns & Bridges",
                  "Tooth Extractions",
                  "Smile Design",
                  "Paediatric Dentistry",
                  "Emergency Dental Care",
                ].map(service => (
                  <div key={service} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <span className="text-primary">🦷</span>
                    <span className="text-sm font-heading font-medium text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Typical Dental Treatment Costs in Madhyamgram (2026)</h2>
              <p>
                One major advantage of dental clinics in Madhyamgram over central Kolkata is pricing. Here is a rough guide to what you can expect to pay:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border/50">
                      <th className="text-left p-4 font-heading font-semibold text-foreground">Treatment</th>
                      <th className="text-left p-4 font-heading font-semibold text-foreground">Approx. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Teeth Scaling & Cleaning", "₹600 – ₹1,200"],
                      ["Tooth-Colored Filling", "₹500 – ₹1,500"],
                      ["Root Canal (Front Tooth)", "₹2,000 – ₹3,500"],
                      ["Root Canal (Molar)", "₹3,500 – ₹5,500"],
                      ["Dental Crown", "₹3,000 – ₹8,000"],
                      ["Teeth Whitening", "₹3,000 – ₹7,000"],
                      ["Braces (Full Treatment)", "₹20,000 – ₹60,000"],
                      ["Dental Implant (Single)", "₹25,000 – ₹50,000"],
                    ].map(([t, c], i) => (
                      <tr key={t} className={`border-b border-border/30 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                        <td className="p-4 text-foreground">{t}</td>
                        <td className="p-4 text-primary font-semibold">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2">* Prices are approximate ranges. Actual costs depend on complexity and materials. All prices at ToothZone Madhyamgram are confirmed before treatment begins.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Why ToothZone is the Best Dental Clinic in Madhyamgram (2026)</h2>
              <p>
                After evaluating clinics in the area against all the criteria above, ToothZone Dental Clinic consistently stands out as the best dental clinic in Madhyamgram for these reasons:
              </p>
              <p>
                Our team of BDS and MDS qualified dentists brings extensive experience across all dental disciplines. We invest continuously in the latest equipment — from digital X-rays that reduce radiation exposure to rotary endodontic systems that make root canals virtually painless in Madhyamgram.
              </p>
              <p>
                We also serve as the preferred dental clinic for patients from Dum Dum, Barasat, Bangaon, and all of North Kolkata who value quality dental care without the price premium of central Kolkata clinics. With over 500 satisfied patients and a 4.9-star rating, ToothZone is the trusted name in Madhyamgram dentistry.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Best Dental Clinic in Madhyamgram" />

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">Visit the Best Dental Clinic in Madhyamgram</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">ToothZone Dental Clinic — affordable, professional, and highly rated. Book your appointment today.</p>
            <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Appointment</Button></Link>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  </Layout>
);

export default BestDentalClinicMadhyamgram;
