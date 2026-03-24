import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { BookOpen, Award, ShieldCheck, HeartPulse } from "lucide-react";
import TechnologyGrid from "@/components/home/TechnologyGrid";

const interiorImages = [
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80", label: "Reception" },
  { src: "https://images.unsplash.com/photo-1631549916768-4e9861c6af09?w=500&q=80", label: "Treatment Room" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80", label: "Equipment" },
  { src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80", label: "Consultation Area" },
];

const About = () => (
  <Layout>
    <SEOHead
      title="About Dr. Tamal Roy — Premium Dental Clinic"
      description="Meet Dr. Tamal Roy, BDS. Providing exceptional, comfortable, and advanced dental care using state-of-the-art technology."
    />
    <PageTransition>
      {/* Premium Hero / Doctor Profile */}
      <section className="section-padding relative overflow-hidden bg-background">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container-dental relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Image Side (Left on Desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <ScrollReveal direction="left">
                {/* Image Card Container */}
                <div className="relative rounded-[2rem] p-3 bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl">
                  <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                      alt="Dr. Tamal Roy, Lead Dentist"
                      className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                      loading="eager"
                    />
                    {/* Inner Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Image Caption overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <p className="font-heading font-medium tracking-wide text-sm text-white/80 mb-1">LEAD DENTIST</p>
                      <h3 className="font-heading font-bold text-2xl">Dr. Tamal Roy</h3>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -right-6 top-12 glass-card rounded-2xl p-4 shadow-xl border border-white/40 dark:border-white/10 flex items-center gap-4 animate-float">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground leading-tight">10+ Years</p>
                      <p className="text-xs text-muted-foreground">Excellence</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Content Side (Right on Desktop) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal direction="right" delay={0.2}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                  <span className="text-sm font-medium text-primary tracking-wide">ABOUT THE DOCTOR</span>
                </div>

                <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-6 leading-tight">
                  <span className="block text-muted-foreground text-3xl lg:text-4xl mb-2 font-medium">Meet</span>
                  Dr. Tamal Roy
                </h1>

                {/* Credentials tags */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide"> BDS </span>
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide">Orthodontist</span>
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide">Pedodontist</span>
                </div>

                {/* Description paragraph with premium typography */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <p className="text-xl leading-relaxed font-medium text-foreground/80 mb-6 border-l-4 border-primary pl-6">
                    Dr. Tamal Roy is a dental surgeon specializing in orthodontics and pediatric care, with a BDS from North Bengal Medical College and a strong patient-focused approach.
                  </p>

                  <p className="mb-6 leading-relaxed">
                    With expertise spanning orthodontic treatments, preventive care, and restorative procedures, Dr. Roy is dedicated to delivering precise, aesthetic, and long-lasting results. His approach combines modern dental technology with gentle, personalized care tailored to patients of all ages.
                  </p>

                  <p className="leading-relaxed">
                    His philosophy is rooted in patient comfort, transparent communication, and ethical practice. He believes that every individual deserves not only a healthy smile but also the confidence that comes with it, and he strives to create a stress-free, welcoming dental experience for every patient.
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy - Enhanced */}
      <section className="section-padding bg-muted/30">
        <div className="container-dental">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 rounded-[2rem] border border-border/50 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Patient First</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Dr. Tamal Roy prioritizes patient comfort, clear communication, and gentle care, delivering precise, ethical treatments that build trust and ensure confident lasting smiles.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 rounded-[2rem] border border-border/50 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 relative z-10">
                  <HeartPulse className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 relative z-10">Compassionate Care</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow relative z-10">
                  Dr. Tamal Roy provides gentle dental care focusing on comfort, trust, and personalized treatment, ensuring every patient feels safe, valued, and confident in their smile.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="glass-card p-8 rounded-[2rem] border border-border/50 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Integrity</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Dr. Tamal Roy practices with integrity, offering honest guidance and ethical treatments, ensuring every patient receives trustworthy care and reliable results.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TechnologyGrid />

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
                <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-lg font-heading font-bold tracking-wide">{img.label}</p>
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

export default About;
