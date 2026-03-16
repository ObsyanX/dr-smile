import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const FinalCTA = () => (
  <section className="section-padding bg-background">
    <div className="container-dental">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div>
            <h2 className="text-h2 lg:text-h1 font-heading font-bold text-foreground mb-6">
              Ready for a{" "}
              <span className="text-primary">Healthier Smile?</span>
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-md">
              Take the first step towards your perfect smile. Book your appointment today and experience the SmileCare difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full font-heading gap-2 px-8">
                  <Calendar className="w-4 h-4" /> Book Appointment
                </Button>
              </Link>
              <a href="tel:+15551234567">
                <Button variant="outline" size="lg" className="rounded-full font-heading gap-2 px-8">
                  <Phone className="w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="right">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
              alt="Happy patient smiling at dental clinic"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default FinalCTA;
