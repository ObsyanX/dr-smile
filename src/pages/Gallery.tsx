import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

const transformations = [
  {
    before: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774680918/WhatsApp_Image_2026-03-27_at_7.31.16_PM_nxbfhu.jpg",
    after: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774680918/WhatsApp_Image_2026-03-27_at_7.31.42_PM_a7l4no.jpg", type: "Teeth Whitening", duration: "45 minutes", result: "3 shades brighter smile"
  },
  {
    before: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681127/WhatsApp_Image_2026-03-27_at_7.26.04_PM_jjuk2m.jpg",
    after: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681231/WhatsApp_Image_2026-03-27_at_7.26.31_PM_gba5ff.jpg", type: "Dental Veneers", duration: "2 visits over 2 weeks", result: "Complete smile makeover"
  },
  { before: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681476/WhatsApp_Image_2026-03-27_at_7.23.52_PM_wbnlou.jpg", after: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681127/WhatsApp_Image_2026-03-27_at_7.25.16_PM_dy4tgz.jpg", type: "Braces Treatment", duration: "18 months", result: "Perfectly aligned teeth" },
];

const categories = ["All", "Whitening", "Braces", "Veneers", "Implants", "Smile Makeover"] as const;

const galleryImages = [
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682048/576ebcfede208f85a419e35e064a2cfd-2_f8pue9.jpg", category: "Whitening", title: "Professional Whitening" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682158/jcdr-10-ZJ09-g003_zbzvzm.jpg", category: "Braces", title: "Clear Aligners" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682255/emax-before-after.jpg_codkfb.webp", category: "Veneers", title: "Porcelain Veneers" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682501/all-on-4-before-after-1-768x768_ge5rq2.jpg", category: "Implants", title: "Dental Implant" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682048/576ebcfede208f85a419e35e064a2cfd-2_f8pue9.jpg", category: "Whitening", title: "Laser Whitening" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682158/jcdr-10-ZJ09-g003_zbzvzm.jpg", category: "Braces", title: "Metal Braces" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682255/emax-before-after.jpg_codkfb.webp", category: "Veneers", title: "Smile Design" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774682608/all-on-4-implants-before-after-results-case-04_n8u6a3.jpg", category: "Implants", title: "Full Arch Implants" },
  { src: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681688/smile_makeover_rqpglg.jpg", category: "Smile Makeover", title: "Smile" }
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
                    className={`px-5 py-2 rounded-full text-sm font-heading font-medium transition-all ${activeCategory === cat
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
