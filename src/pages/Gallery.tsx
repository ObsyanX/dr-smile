import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

const transformations = [
  { before: "https://images.unsplash.com/photo-1595005659592-09e78a1825dc?w=600&q=80", after: "https://images.unsplash.com/photo-1581585837449-0bfc2b21b03c?w=600&q=80", type: "Teeth Whitening", duration: "45 minutes", result: "3 shades brighter smile" },
  { before: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80", after: "https://images.unsplash.com/photo-1581585837449-0bfc2b21b03c?w=600&q=80", type: "Dental Veneers", duration: "2 visits over 2 weeks", result: "Complete smile makeover" },
  { before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80", after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80", type: "Braces Treatment", duration: "18 months", result: "Perfectly aligned teeth" },
];

const categories = ["All", "Whitening", "Braces", "Veneers", "Implants"] as const;

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80", category: "Whitening", title: "Professional Whitening" },
  { src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80", category: "Braces", title: "Clear Aligners" },
  { src: "https://images.unsplash.com/photo-1581585837449-0bfc2b21b03c?w=400&q=80", category: "Veneers", title: "Porcelain Veneers" },
  { src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80", category: "Implants", title: "Dental Implant" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80", category: "Whitening", title: "Laser Whitening" },
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80", category: "Braces", title: "Metal Braces" },
  { src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80", category: "Veneers", title: "Smile Design" },
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80", category: "Implants", title: "Full Arch Implants" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <Layout>
      <SEOHead
        title="Smile Gallery — ToothZone Dental Clinic"
        description="View our smile transformation gallery. Before and after photos of teeth whitening, braces, veneers, and dental implant treatments."
      />
      <PageTransition>
        {/* Hero */}
        <section className="section-padding gradient-hero">
          <div className="container-dental text-center">
            <ScrollReveal>
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Gallery</p>
              <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-4">Smile Gallery</h1>
              <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">Explore our portfolio of beautiful smile transformations.</p>
            </ScrollReveal>
          </div>
        </section>

        {/* Before/After */}
        <section className="section-padding bg-background">
          <div className="container-dental">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground text-center mb-12">Smile Transformations</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transformations.map((t, i) => (
                <ScrollReveal key={t.type} delay={i * 0.1}>
                  <BeforeAfterSlider beforeImage={t.before} afterImage={t.after} treatmentType={t.type} duration={t.duration} result={t.result} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment Gallery */}
        <section className="section-padding section-alt">
          <div className="container-dental">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-foreground text-center mb-8">Treatment Gallery</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-heading font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((img, i) => (
                <ScrollReveal key={`${img.src}-${i}`} delay={i * 0.05}>
                  <div className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-primary-foreground font-heading font-semibold text-sm">{img.title}</p>
                        <p className="text-primary-foreground/70 text-xs">{img.category}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Gallery;
