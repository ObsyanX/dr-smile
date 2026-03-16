import Layout from "@/components/layout/Layout";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Award, BookOpen, Cpu, ShieldCheck } from "lucide-react";

const techItems = [
  { icon: Cpu, title: "Digital X-Ray", description: "Low-radiation digital imaging" },
  { icon: Cpu, title: "Laser Dentistry", description: "Minimally invasive treatments" },
  { icon: Cpu, title: "Intraoral Scanner", description: "3D digital impressions" },
  { icon: ShieldCheck, title: "Advanced Sterilization", description: "Hospital-grade protocols" },
];

const interiorImages = [
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80", label: "Reception" },
  { src: "https://images.unsplash.com/photo-1631549916768-4e9861c6af09?w=500&q=80", label: "Treatment Room" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80", label: "Equipment" },
  { src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80", label: "Consultation Area" },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding gradient-hero">
      <div className="container-dental">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
            <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-6">Meet Dr. Sarah Chen</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">BDS, MDS</span>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">10+ Years Experience</span>
            </div>
            <p className="text-body-lg text-muted-foreground mb-4">
              Dr. Sarah Chen is a board-certified dental surgeon with over a decade of experience in cosmetic and restorative dentistry. She graduated with honors from NYU College of Dentistry and completed advanced training in implantology.
            </p>
            <p className="text-body text-muted-foreground">
              Her philosophy centers on patient comfort, transparent communication, and delivering exceptional results using the latest dental technology. She believes every patient deserves a healthy, beautiful smile.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="right">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" alt="Dr. Sarah Chen, Lead Dentist" className="w-full h-full object-cover" loading="eager" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="section-padding bg-background">
      <div className="container-dental max-w-3xl text-center">
        <ScrollReveal>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-h2 font-heading font-bold text-foreground mb-6">Our Philosophy</h2>
          <p className="text-body-lg text-muted-foreground leading-relaxed mb-4">
            At SmileCare, we believe dental care should be a positive, comfortable experience. We combine clinical excellence with genuine compassion to build lasting relationships with our patients.
          </p>
          <p className="text-body text-muted-foreground leading-relaxed">
            Every treatment plan is customized to your unique needs, goals, and comfort level. We take the time to listen, explain, and empower you to make informed decisions about your oral health.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Technology */}
    <section className="section-padding section-alt">
      <div className="container-dental">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Technology</p>
            <h2 className="text-h2 font-heading font-bold text-foreground">Advanced Equipment</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {techItems.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-400">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <t.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Clinic Interior */}
    <section className="section-padding bg-background">
      <div className="container-dental">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Our Clinic</p>
            <h2 className="text-h2 font-heading font-bold text-foreground">Clinic Interior</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {interiorImages.map((img, i) => (
            <ScrollReveal key={img.label} delay={i * 0.1}>
              <div className="group relative rounded-xl overflow-hidden aspect-[4/3]">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent">
                  <p className="text-primary-foreground text-sm font-heading font-medium">{img.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
