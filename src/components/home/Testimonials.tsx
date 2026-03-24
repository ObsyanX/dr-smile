import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", text: "Very professional and painless treatment. The clinic is spotless and the staff is incredibly kind. Highly recommended!", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" },
  { name: "James R.", text: "Got my dental implants done here. The results are amazing — feels and looks completely natural. Best decision I made!", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
  { name: "Priya K.", text: "My kids love visiting this clinic. The pediatric dentist is so gentle and makes every visit fun for the little ones.", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" },
  { name: "Michael T.", text: "Teeth whitening results exceeded my expectations. The whole process was comfortable and quick. Will definitely come back!", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding section-alt">
      <div className="container-dental">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-h2 font-heading font-bold text-foreground">What Our Patients Say</h2>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-8 lg:p-10 text-center relative">
              <img src={testimonials[current].image} alt={testimonials[current].name} className="w-16 h-16 rounded-full object-cover mx-auto mb-5 border-2 border-primary/20" loading="lazy" />
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-body-lg text-foreground/80 italic mb-6 leading-relaxed">"{testimonials[current].text}"</p>
              <p className="font-heading font-semibold text-foreground">{testimonials[current].name}</p>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" aria-label="Previous testimonial">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`} aria-label={`Go to testimonial ${i + 1}`} />
                  ))}
                </div>
                <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" aria-label="Next testimonial">
                  <ChevronRight className="w-4 h-4" />
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
