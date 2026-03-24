import ScrollReveal from "@/components/shared/ScrollReveal";

const certificates = [
  {
    title: "ADA Board Certified",
    issuer: "American Dental Association",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description: "Certified in Advanced Restorative Dentistry"
  },
  {
    title: "Invisalign Platinum Provider",
    issuer: "Align Technology",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description: "Recognized for excellence in clear aligner therapy"
  },
  {
    title: "Implant Excellence",
    issuer: "International Congress of Oral Implantologists",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description: "Fellowship status in implant surgical procedures"
  },
  {
    title: "Cosmetic Dentistry Honors",
    issuer: "American Academy of Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description: "Excellence in aesthetic smile design"
  }
];

const Certifications = () => {
  return (
    <section className="section-padding bg-background/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container-dental relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
              Awards & Recognition
            </p>
            <h2 className="text-h2 font-heading font-bold text-foreground">
              Our Certifications
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We maintain the highest standards of dental care, continuously updating our skills and technology to provide you with world-class treatment.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.1}>
              <div className="glass-card p-6 rounded-2xl border border-white/20 hover:border-primary/30 transition-all duration-[400ms] hover:shadow-2xl hover:-translate-y-2 group h-full flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-500 relative">
                  {/* Overlay for premium feel */}
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                    loading="lazy" 
                  />
                </div>
                
                <h3 className="font-heading font-bold text-foreground mb-2 leading-tight">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-medium text-primary mb-3">
                  {cert.issuer}
                </p>
                
                <p className="text-sm text-muted-foreground mt-auto">
                  {cert.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
