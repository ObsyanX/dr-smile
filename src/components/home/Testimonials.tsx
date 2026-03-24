import { useState, useEffect } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", text: "Very professional and painless treatment. The clinic is spotless and the staff is incredibly kind. Highly recommended!", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80", type: "General Checkup" },
  { name: "James R.", text: "Got my dental implants done here. The results are amazing — feels and looks completely natural. Best decision I made!", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", type: "Dental Implants" },
  { name: "Priya K.", text: "My kids love visiting this clinic. The pediatric dentist is so gentle and makes every visit fun for the little ones.", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80", type: "Pediatric Care" },
  { name: "Michael T.", text: "Teeth whitening results exceeded my expectations. The whole process was comfortable and quick. Will definitely come back!", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80", type: "Teeth Whitening" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slide = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === 'next') {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    } else {
      setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <section className="section-padding section-alt relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-dental relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-h2 font-heading font-bold text-foreground">Patient Success Stories</h2>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative">
              {/* Main card */}
              <div
                className={`glass-card p-10 lg:p-14 text-center rounded-[2.5rem] border border-white/20 shadow-2xl transition-all duration-500 transform ${isAnimating ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
              >
                <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6 rotate-180" />

                <p className="text-xl lg:text-2xl text-foreground font-medium italic mb-10 leading-relaxed font-heading">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-4 group">
                    <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-20 h-20 rounded-full object-cover relative z-10 border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-sm" />
                    ))}
                  </div>

                  <h4 className="font-heading font-bold text-lg text-foreground">{testimonials[current].name}</h4>
                  <p className="text-sm font-medium text-primary mt-1">{testimonials[current].type}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={() => slide('prev')}
                  disabled={isAnimating}
                  className="w-12 h-12 rounded-full glass-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all shadow-md disabled:opacity-50"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-3">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => !isAnimating && setCurrent(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8 shadow-sm shadow-primary/30" : "bg-border w-2.5 hover:bg-primary/50"}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => slide('next')}
                  disabled={isAnimating}
                  className="w-12 h-12 rounded-full glass-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all shadow-md disabled:opacity-50"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
