import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    before: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774680918/WhatsApp_Image_2026-03-27_at_7.31.16_PM_nxbfhu.jpg",
    after: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774680918/WhatsApp_Image_2026-03-27_at_7.31.42_PM_a7l4no.jpg",
    type: "Teeth Whitening",
    duration: "45 minutes",
    result: "3 shades brighter smile",
  },
  {
    before: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681127/WhatsApp_Image_2026-03-27_at_7.26.04_PM_jjuk2m.jpg",
    after: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774681231/WhatsApp_Image_2026-03-27_at_7.26.31_PM_gba5ff.jpg",
    type: "Dental Veneers",
    duration: "2 visits over 2 weeks",
    result: "Complete smile makeover",
  },
];

const SmileTransformations = () => (
  <section className="section-padding bg-background">
    <div className="container-dental">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Smile Gallery</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">Smile Transformations</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">See the amazing results our patients have achieved. Drag the slider to compare before and after.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {cases.map((c, i) => (
          <ScrollReveal key={c.type} delay={i * 0.15}>
            <BeforeAfterSlider
              beforeImage={c.before}
              afterImage={c.after}
              treatmentType={c.type}
              duration={c.duration}
              result={c.result}
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center mt-12">
          <Link to="/gallery">
            <Button variant="outline" size="lg" className="rounded-full font-heading gap-2">
              See More Transformations <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SmileTransformations;
