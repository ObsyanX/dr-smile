import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

const HeroSection = () => (
  <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
    {/* Floating abstract shapes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 left-[5%] w-20 h-20 rounded-2xl border-2 border-primary/20 rotate-12" />
      <motion.div animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-[8%] w-16 h-16 rounded-full border-2 border-accent/15" />
    </div>

    <div className="container-dental relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <ScrollReveal>
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              ✨ Premium Dental Care
            </motion.div>
            <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-6">
              Creating{" "}
              <span className="text-primary">Confident</span>{" "}
              Smiles
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-md">
              Advanced dental care with modern technology and compassionate treatment for your entire family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full font-heading gap-2 px-8">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </Link>
              <a href="https://wa.me/919804214790" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-full font-heading gap-2 px-8">
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Right image */}
        <ScrollReveal delay={0.2} direction="right">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                alt="Professional dentist smiling"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-4 -left-4 lg:-left-8 glass-card p-4 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">🦷</div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg">5000+</p>
                <p className="text-xs text-muted-foreground">Happy Patients</p>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default HeroSection;
