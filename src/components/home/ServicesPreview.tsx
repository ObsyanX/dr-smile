import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: "🦷",
    title: "Fixed Partial Denture",
    description: "Permanent replacement of missing teeth anchored to adjacent teeth, restoring function and aesthetics.",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png",
  },
  {
    icon: "✨",
    title: "Tooth Scaling",
    description: "A professional cleaning procedure that removes plaque and tartar to maintain healthy gums and prevent dental issues.",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283039/ChatGPT_Image_Mar_23_2026_09_53_22_PM_vf5jy1.png",
  },
  {
    icon: "🔧",
    title: "Oral cyst and tumor surgery",
    description: "A surgical procedure to remove abnormal growths in the mouth, restoring oral health and preventing complications.",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283182/ChatGPT_Image_Mar_23_2026_09_56_04_PM_hndsut.png",
  },
  {
    icon: "😁",
    title: "Braces & Aligners",
    description: "Invisible aligners and modern braces for perfectly aligned teeth at any age.",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774283315/ChatGPT_Image_Mar_23_2026_09_58_17_PM_xh5isa.png",
  },
];

const ServicesPreview = () => (
  <section className="section-padding section-alt">
    <div className="container-dental">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">Comprehensive Dental Care</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">We offer a wide range of dental treatments using state-of-the-art technology for optimal results.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {services.map((service, i) => (
          <ScrollReveal key={service.title} delay={i * 0.1}>
            <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="text-2xl mb-3">{service.icon}</div>
                <h3 className="text-h3 font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="rounded-full font-heading gap-2">
              View All Treatments <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ServicesPreview;
