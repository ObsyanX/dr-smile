import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

const FAQAccordion = ({ faqs, title = "Frequently Asked Questions" }: FAQAccordionProps) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-dental max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">{title}</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-secondary/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-heading font-semibold text-foreground text-sm md:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm md:text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
