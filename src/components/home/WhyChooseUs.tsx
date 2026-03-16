import ScrollReveal from "@/components/shared/ScrollReveal";
import { Cpu, Heart, UserCheck, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Cpu, title: "Modern Dental Technology", description: "Latest digital equipment for accurate diagnosis and comfortable treatments." },
  { icon: Heart, title: "Pain-Free Treatments", description: "Advanced anesthesia techniques ensuring comfortable, anxiety-free dental care." },
  { icon: UserCheck, title: "Experienced Specialists", description: "Team of qualified dental professionals with years of clinical excellence." },
  { icon: ShieldCheck, title: "Sterilized & Safe", description: "Hospital-grade sterilization protocols for your complete safety." },
];

const WhyChooseUs = () => (
  <section className="section-padding section-alt">
    <div className="container-dental">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">The SmileCare Difference</h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {reasons.map((r, i) => (
          <ScrollReveal key={r.title} delay={i * 0.1}>
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
