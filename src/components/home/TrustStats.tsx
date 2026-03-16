import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Star, Users, Award, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Star, value: 4.8, suffix: "", prefix: "", decimals: 1, label: "Google Rating", emoji: "⭐" },
  { icon: Users, value: 5000, suffix: "+", prefix: "", decimals: 0, label: "Happy Patients", emoji: "🦷" },
  { icon: Award, value: 10, suffix: "+", prefix: "", decimals: 0, label: "Years Experience", emoji: "🏆" },
  { icon: ShieldCheck, value: 100, suffix: "%", prefix: "", decimals: 0, label: "Sterilized Equipment", emoji: "🛡" },
];

const TrustStats = () => (
  <section className="section-padding bg-background">
    <div className="container-dental">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="text-center p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-400 hover:shadow-lg group">
              <div className="text-3xl mb-3">{stat.emoji}</div>
              <div className="text-h2 lg:text-display text-primary">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} />
              </div>
              <p className="text-sm text-muted-foreground font-medium mt-2">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStats;
