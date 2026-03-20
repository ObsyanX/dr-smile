import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const EmergencyBanner = () => (
  <section className="py-16 bg-accent text-accent-foreground">
    <div className="container-dental">
      <ScrollReveal>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-h2 font-heading font-bold mb-2">🚨 Dental Emergency?</h2>
            <p className="text-accent-foreground/80 text-body-lg">Call now for immediate appointment. We're here when you need us most.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+919804214790">
              <Button size="lg" variant="secondary" className="rounded-full font-heading gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="rounded-full font-heading gap-2 bg-primary-foreground text-accent hover:bg-primary-foreground/90">
                <Calendar className="w-4 h-4" /> Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default EmergencyBanner;
