import ScrollReveal from "@/components/shared/ScrollReveal";

const tech = [


  { title: "Digital X-Ray", description: "Low-radiation digital imaging for precise diagnostics.", image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283969/ChatGPT_Image_Mar_23_2026_10_09_11_PM_iurghy.png" },
  { title: "Laser Dentistry", description: "Minimally invasive laser treatments for faster healing.", image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774284186/ChatGPT_Image_Mar_23_2026_10_12_50_PM_fpldxh.png" },
  { title: "Intraoral Scanner", description: "3D digital impressions for accurate treatment planning.", image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774284584/ChatGPT_Image_Mar_23_2026_10_17_26_PM_e9lcjq.png" },
  { title: "Advanced Sterilization", description: "Hospital-grade autoclave sterilization for every instrument.", image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774284698/Class_N_gokf1n.jpg" },
];

const TechnologyGrid = () => (
  <section className="section-padding bg-background">
    <div className="container-dental">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Technology</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">State-of-the-Art Equipment</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">We invest in the latest dental technology to provide you with the best possible care.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {tech.map((t, i) => (
          <ScrollReveal key={t.title} delay={i * 0.1}>
            <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyGrid;
