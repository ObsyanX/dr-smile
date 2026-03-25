import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin } from "lucide-react";

const faqs = [
  { question: "What should I do for sudden toothache near Dum Dum?", answer: "Rinse with warm saltwater, avoid very hot or cold foods, take over-the-counter pain relief if needed, and book an emergency dental appointment at ToothZone Madhyamgram (nearest clinic to Dum Dum) as soon as possible. Don't ignore it — dental pain rarely disappears on its own." },
  { question: "Is tooth pain near Dum Dum a dental emergency?", answer: "Severe or persistent tooth pain, swelling, fever alongside toothache, or a knocked-out tooth are all dental emergencies. ToothZone Madhyamgram offers same-day emergency appointments for Dum Dum-area patients." },
  { question: "What causes tooth pain?", answer: "Common causes include dental decay (cavities), cracked teeth, gum disease, dental abscess, exposed tooth roots, wisdom tooth eruption, and grinding (bruxism). A dentist can identify the exact cause with a quick examination and X-ray." },
  { question: "Can tooth pain go away on its own?", answer: "Mild sensitivity can fluctuate, but significant tooth pain rarely resolves without dental treatment. Leaving it untreated often leads to infection spreading, abscess, and more costly treatment later." },
  { question: "Where is the nearest dentist for tooth pain near Dum Dum?", answer: "ToothZone Dental Clinic in Madhyamgram is the nearest full-service dental clinic to Dum Dum. We are approximately 20–25 minutes away and offer same-day emergency appointments for tooth pain." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tooth Pain Treatment Near Dum Dum — What to Do",
  "description": "Guide to tooth pain causes, home remedies, when to see an emergency dentist near Dum Dum, and how ToothZone Madhyamgram can help.",
  "author": { "@type": "Organization", "name": "ToothZone Dental Clinic" },
  "publisher": { "@type": "Organization", "name": "ToothZone Dental Clinic", "url": "https://thetoothzone.vercel.app" },
  "datePublished": "2026-03-25",
  "url": "https://thetoothzone.vercel.app/blog/tooth-pain-treatment-dum-dum",
};

const ToothPainDumDum = () => (
  <Layout>
    <SEOHead
      title="Tooth Pain Treatment Near Dum Dum — What To Do | ToothZone Blog"
      description="Experiencing tooth pain near Dum Dum? This guide covers causes, home remedies, when to see an emergency dentist, and why ToothZone Madhyamgram is your nearest trusted dental clinic."
      canonical="https://thetoothzone.vercel.app/blog/tooth-pain-treatment-dum-dum"
      keywords="tooth pain treatment dum dum, emergency dentist near dum dum, toothache dum dum, severe toothache near me dum dum, dental emergency near dum dum"
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
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-heading font-semibold">Emergency Guide</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 min read</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Dum Dum Area</span>
              <span>March 2026</span>
            </div>
            <h1 className="text-h1 font-heading font-bold text-foreground mb-6 leading-tight">
              Tooth Pain Treatment Near Dum Dum — What To Do
            </h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Tooth pain can strike suddenly and be completely debilitating. If you are experiencing toothache near Dum Dum, this guide will help you understand the cause, manage the pain, and get the right treatment from a trusted dentist near you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-8 section-padding">
        <div className="container-dental max-w-3xl">
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
              alt="Tooth pain treatment near Dum Dum - guide for toothache"
              className="w-full h-64 object-cover"
              loading="eager"
            />
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Common Causes of Toothache Near Dum Dum</h2>
              <p>
                Before understanding what to do about tooth pain, it helps to understand what is likely causing it. The most common causes of toothache in patients from Dum Dum and Madhyamgram who visit our clinic include:
              </p>
              <div className="space-y-3">
                {[
                  { c: "Dental Decay (Cavities)", d: "The most common cause. Bacteria produce acid that erodes tooth enamel and reaches the sensitive inner layers, causing pain. Early cavities cause mild sensitivity; advanced decay causes severe, throbbing pain." },
                  { c: "Dental Abscess", d: "A severe bacterial infection at the root of a tooth or in the gums. Causes intense, throbbing pain, swelling, and sometimes fever. This is a dental emergency — visit ToothZone near Dum Dum immediately." },
                  { c: "Cracked Tooth", d: "A crack in the tooth (often from grinding or biting hard food) causes sharp pain when biting. Sometimes invisible on X-rays, it requires an experienced dentist to diagnose." },
                  { c: "Gum Disease", d: "Advanced gum disease causes bone loss around teeth, leading to sensitivity, pain, and loosening of teeth. Common in adults who skip regular scaling in Madhyamgram." },
                  { c: "Tooth Sensitivity", d: "Pain with hot/cold foods. Often caused by enamel erosion or exposed tooth roots. Usually manageable but requires dental evaluation." },
                  { c: "Wisdom Tooth Eruption", d: "Wisdom teeth often become impacted in Dum Dum-area patients, causing significant pain, swelling, and difficulty opening the mouth." },
                ].map(({ c, d }) => (
                  <div key={c} className="p-4 rounded-xl bg-card border border-border/50">
                    <p className="font-heading font-semibold text-foreground mb-1">• {c}</p>
                    <p className="text-sm">{d}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Temporary Home Remedies for Tooth Pain Near Dum Dum</h2>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-xl p-4">
                ⚠️ Important: Home remedies provide temporary relief only. They do not treat the underlying cause. Always see a dentist as soon as possible.
              </p>
              <ul className="space-y-3 list-none pl-0 mt-4">
                {[
                  ["Warm Salt Water Rinse", "Dissolve half a teaspoon of salt in a glass of warm water. Rinse for 30 seconds every few hours. Reduces inflammation and kills surface bacteria."],
                  ["Clove Oil", "Apply a small amount of clove oil (eugenol) directly to the affected tooth and gum using a cotton ball. Natural anaesthetic — provides temporary numbing."],
                  ["Cold Compress", "Apply an ice pack to the outside of your cheek for 15–20 minutes. Reduces swelling and numbs the area. Do not apply ice directly to the tooth."],
                  ["Over-the-Counter Pain Relief", "Ibuprofen (Brufen) or paracetamol as directed on the packaging. Ibuprofen has the added benefit of reducing inflammation."],
                  ["Avoid Triggers", "Avoid very hot, cold, sweet, or acidic foods and drinks on the affected side until you can see a dentist near Dum Dum."],
                ].map(([title, desc]) => (
                  <li key={title as string} className="p-4 rounded-xl bg-card border border-border/50 space-y-1">
                    <span className="font-heading font-semibold text-foreground block">🩹 {title as string}</span>
                    <span className="text-sm">{desc as string}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">When Is Tooth Pain Near Dum Dum a Dental Emergency?</h2>
              <p>Some dental situations near Dum Dum require immediate care — do not wait for a regular appointment:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Severe, uncontrollable tooth pain",
                  "Swollen face or jaw",
                  "Fever alongside toothache",
                  "Knocked-out or broken tooth",
                  "Difficulty swallowing or breathing",
                  "Pus or bad taste near the tooth",
                  "Lost filling or crown causing sharp pain",
                  "Bleeding from the gums that won't stop",
                ].map(emergency => (
                  <div key={emergency} className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                    <span className="text-red-500 shrink-0">🚨</span>
                    <span className="text-sm text-foreground">{emergency}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                If you are experiencing any of the above near Dum Dum, call ToothZone Madhyamgram immediately. We offer same-day emergency appointments and are just 20–25 minutes from Dum Dum.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground">Professional Tooth Pain Treatments at ToothZone Near Dum Dum</h2>
              <p>
                Once you visit a dentist near Dum Dum at ToothZone Madhyamgram, the treatment will depend on the diagnosis. Common treatments for tooth pain include:
              </p>
              <div className="space-y-3">
                {[
                  ["Dental Filling", "For cavities — removes decay and fills the tooth with tooth-coloured composite material."],
                  ["Root Canal Treatment", "For infected pulp — removes infection, cleans canals, and seals the tooth to save it."],
                  ["Tooth Extraction", "For severely damaged or impacted wisdom teeth — painless under local anaesthesia."],
                  ["Abscess Drainage", "For dental abscess — drains the infection, prescribes antibiotics, and plans definitive treatment."],
                  ["Gum Treatment", "For gum disease — deep scaling, antibiotics, and home care instructions."],
                ].map(([t, d]) => (
                  <div key={t as string} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <span className="text-2xl">🦷</span>
                    <div>
                      <p className="font-heading font-semibold text-foreground">{t as string}</p>
                      <p className="text-sm">{d as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="FAQs — Tooth Pain Treatment Near Dum Dum" />

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-dental text-center">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold mb-4">Toothache Near Dum Dum? Call ToothZone Now</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Same-day emergency appointments for tooth pain. ToothZone Madhyamgram — 20 minutes from Dum Dum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" variant="secondary" className="rounded-full font-heading px-10">Book Emergency Slot</Button></Link>
              <a href="tel:+919804214790"><Button size="lg" variant="outline" className="rounded-full font-heading px-10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Call Now</Button></a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  </Layout>
);

export default ToothPainDumDum;
