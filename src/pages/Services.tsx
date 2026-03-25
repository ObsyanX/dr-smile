import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Calendar, Clock, Activity, Repeat } from "lucide-react";

const treatments = [
  {
    icon: "🦷",
    title: "Fixed Partial Denture",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png",
    short: "Permanent replacement of missing teeth anchored to adjacent teeth.",
    description: "A fixed partial denture (dental bridge) replaces one or more missing teeth by anchoring artificial teeth to adjacent natural teeth or crowns, restoring function and aesthetics.",
    duration: "2–3 visits over 1–2 weeks",
    recovery: "Minimal, 1–3 days adjustment",
    painLevel: "Minimal discomfort",
    visits: "2–3 visits total",
    benefits: ["Restores chewing function", "Improves smile aesthetics", "Prevents teeth shifting", "Quick and reliable solution"],
  },
  {
    icon: "✨",
    title: "Tooth Scaling",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
    short: "Professional cleaning to remove plaque and tartar.",
    description: "Tooth scaling is a preventive dental procedure that removes plaque, tartar, and stains from teeth surfaces and below the gum line, helping maintain healthy gums and prevent periodontal disease.",
    duration: "30–60 minutes",
    recovery: "No downtime, mild sensitivity for 1–2 days",
    painLevel: "Mild discomfort (usually painless)",
    visits: "Single visit (routine every 6 months)",
    benefits: ["Prevents gum disease", "Removes stains and buildup", "Freshens breath", "Maintains overall oral hygiene"],
  },
  {
    icon: "🔧",
    title: "Oral Cyst & Tumor Surgery",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283182/ChatGPT_Image_Mar_23_2026_09_56_04_PM_hndsut.png",
    short: "Safe removal of cysts and abnormal oral growths.",
    description: "Oral cyst and tumor surgery involves the diagnosis and surgical removal of abnormal growths in the mouth or jaw to restore oral health and prevent further complications.",
    duration: "1–2 hours depending on case",
    recovery: "1–2 weeks healing period",
    painLevel: "Moderate (managed with medication)",
    visits: "2–4 visits including follow-up",
    benefits: ["Prevents serious complications", "Relieves pain or swelling", "Restores oral function", "Ensures early diagnosis and treatment"],
  },
  {
    icon: "😁",
    title: "Braces & Aligners",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png",
    short: "Advanced solutions for perfectly aligned teeth.",
    description: "Braces and clear aligners are orthodontic treatments used to correct misaligned, crowded, or spaced teeth, improving both function and aesthetics over time.",
    duration: "6–18 months depending on case",
    recovery: "Initial discomfort for a few days after adjustments",
    painLevel: "Mild to moderate pressure",
    visits: "Monthly follow-ups",
    benefits: ["Straightens teeth effectively", "Improves bite and function", "Enhances smile confidence", "Options include nearly invisible aligners"],
  },
  {
    icon: "🦷",
    title: "Removable Partial Denture",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774325831/ChatGPT_Image_Mar_24_2026_09_46_48_AM_j3hhre.png",
    short: "Removable solution to replace multiple missing teeth.",
    description: "A removable partial denture replaces one or more missing teeth and can be easily taken out for cleaning. It restores function, improves appearance, and is a cost-effective alternative to fixed solutions.",
    duration: "2–3 visits over 1–2 weeks",
    recovery: "Minimal, 2–5 days adjustment",
    painLevel: "Minimal discomfort",
    visits: "2–3 visits total",
    benefits: ["Affordable tooth replacement", "Improves chewing ability", "Easy to clean and maintain", "Non-invasive procedure"],
  },
  {
    icon: "✨",
    title: "Tooth Color Filling",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&q=80",
    short: "Natural-looking fillings that blend with your teeth.",
    description: "Tooth-colored fillings (composite restorations) are used to repair decayed or damaged teeth while matching the natural shade of your teeth for a seamless appearance.",
    duration: "30–45 minutes per tooth",
    recovery: "Immediate (can eat after a few hours)",
    painLevel: "Minimal with local anesthesia",
    visits: "Single visit",
    benefits: ["Matches natural tooth color", "Preserves more tooth structure", "Quick and effective treatment", "Strong and durable"],
  },
  {
    icon: "🛡️",
    title: "Tooth Capping",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80",
    short: "Protective caps to restore damaged teeth.",
    description: "Tooth capping (dental crowns) involves placing a custom-made cap over a damaged or weakened tooth to restore its shape, strength, and appearance.",
    duration: "2 visits over 1–2 weeks",
    recovery: "1–3 days mild sensitivity",
    painLevel: "Minimal discomfort",
    visits: "2 visits",
    benefits: ["Strengthens weak teeth", "Improves appearance", "Protects after root canal", "Long-lasting solution"],
  },
  {
    title: "Dental Implants",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&q=80",
    short: "Permanent tooth replacement with natural-looking results.",
    description: "Dental implants are titanium posts surgically placed into the jawbone to serve as artificial tooth roots. They provide a strong foundation for permanent or removable replacement teeth.",
    duration: "2–3 visits over 3–6 months",
    recovery: "1–2 weeks initial healing",
    painLevel: "Minimal with local anesthesia",
    visits: "3–5 visits total",
    benefits: ["Looks and feels natural", "Preserves jawbone", "Lasts a lifetime", "No diet restrictions"],
  },
  {
    icon: "🔧",
    title: "Root Canal Treatment",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80",
    short: "Pain-free root canal procedures with modern techniques.",
    description: "Root canal treatment removes infected tissue from inside a tooth, cleans and shapes the root canals, and seals them to prevent reinfection. Modern techniques make this virtually painless.",
    duration: "1–2 visits",
    recovery: "Same day",
    painLevel: "Minimal — comparable to a filling",
    visits: "1–2 visits",
    benefits: ["Saves natural tooth", "Eliminates infection", "Pain-free procedure", "Quick recovery"],
  },
  {
    icon: "✨",
    title: "Teeth Whitening",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&q=80",
    short: "Professional whitening for a brighter, confident smile.",
    description: "Professional in-office teeth whitening uses concentrated bleaching agents to remove deep stains and discoloration, delivering dramatic results in a single visit.",
    duration: "45–60 minutes",
    recovery: "None",
    painLevel: "None to very mild sensitivity",
    visits: "1 visit",
    benefits: ["Immediate results", "Up to 8 shades whiter", "Safe and supervised", "Long-lasting results"],
  },
  {
    icon: "😁",
    title: "Braces & Aligners",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80",
    short: "Modern braces and invisible aligners for perfect alignment.",
    description: "We offer traditional metal braces, ceramic braces, and clear aligners like Invisalign. Each option is customized to gradually move your teeth into the ideal position.",
    duration: "12–24 months",
    recovery: "No downtime",
    painLevel: "Mild discomfort during adjustments",
    visits: "Monthly check-ups",
    benefits: ["Straighter teeth", "Improved bite", "Invisible options available", "Boosts confidence"],
  },
  {
    icon: "💎",
    title: "Smile Design",
    image: "https://images.unsplash.com/photo-1581585837449-0bfc2b21b03c?w=500&q=80",
    short: "Complete smile makeover with veneers and cosmetic treatments.",
    description: "Smile design combines multiple cosmetic procedures — veneers, bonding, whitening, and gum contouring — to create your ideal smile based on digital planning.",
    duration: "2–4 visits over 2–4 weeks",
    recovery: "Minimal",
    painLevel: "Minimal",
    visits: "2–4 visits",
    benefits: ["Customized to your face", "Natural-looking results", "Digital preview available", "Comprehensive transformation"],
  },
  {
    icon: "👶",
    title: "Pediatric Dentistry",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80",
    short: "Gentle, fun dental care for children of all ages.",
    description: "Our pediatric dental team creates a fun, comfortable environment for children. We focus on prevention, education, and gentle treatment to build positive dental habits early.",
    duration: "30–45 minutes per visit",
    recovery: "None",
    painLevel: "None",
    visits: "Every 6 months",
    benefits: ["Child-friendly environment", "Preventive focus", "Gentle approach", "Fun and educational"],
  },
];

const Services = () => {
  const [selected, setSelected] = useState<typeof treatments[0] | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Dental Treatments in Madhyamgram & Dum Dum | ToothZone Services"
        description="Comprehensive dental treatments in Madhyamgram & Dum Dum — root canal, teeth whitening, dental implants, braces, smile design & more at ToothZone Dental Clinic."
        canonical="https://thetoothzone.vercel.app/services"
        keywords="dental treatments madhyamgram, root canal dum dum, dental implants madhyamgram, teeth whitening near dum dum, braces madhyamgram, dental services north kolkata"
      />
      <PageTransition>
        {/* Hero */}
        <section className="relative section-padding gradient-hero">
          <div className="container-dental text-center">
            <ScrollReveal>
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-4">Our Dental Treatments</h1>
              <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">
                We provide comprehensive dental care using the latest technology for comfortable, effective treatments.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Treatment grid */}
        <section className="section-padding bg-background">
          <div className="container-dental">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {treatments.map((t, i) => (
                <ScrollReveal key={t.title} delay={i * 0.08}>
                  <button
                    onClick={() => setSelected(t)}
                    className="w-full text-left group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <div className="text-2xl mb-3">{t.icon}</div>
                      <h3 className="text-h3 font-heading font-semibold text-foreground mb-2">{t.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.short}</p>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="text-3xl mb-2">{selected.icon}</div>
                <DialogTitle className="font-heading text-h3">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary text-sm">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium text-foreground">{selected.duration}</p></div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary text-sm">
                  <Activity className="w-4 h-4 text-primary shrink-0" />
                  <div><p className="text-xs text-muted-foreground">Pain Level</p><p className="font-medium text-foreground">{selected.painLevel}</p></div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary text-sm">
                  <Repeat className="w-4 h-4 text-primary shrink-0" />
                  <div><p className="text-xs text-muted-foreground">Recovery</p><p className="font-medium text-foreground">{selected.recovery}</p></div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary text-sm">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div><p className="text-xs text-muted-foreground">Visits</p><p className="font-medium text-foreground">{selected.visits}</p></div>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-heading font-semibold text-sm mb-2">Benefits</p>
                <ul className="space-y-1.5">
                  {selected.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contact" onClick={() => setSelected(null)}>
                <Button className="w-full rounded-full font-heading">Book Consultation</Button>
              </Link>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Services;
