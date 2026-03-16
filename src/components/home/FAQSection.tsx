import ScrollReveal from "@/components/shared/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is root canal treatment painful?", a: "Modern root canal treatments are virtually pain-free. We use advanced anesthesia techniques to ensure your complete comfort throughout the procedure." },
  { q: "How long does teeth whitening last?", a: "Professional teeth whitening results typically last 6 months to 2 years, depending on your diet and oral hygiene habits." },
  { q: "Do you treat children?", a: "Yes! Our pediatric dentistry team specializes in gentle, fun dental care for children of all ages." },
  { q: "How often should I visit a dentist?", a: "We recommend regular check-ups every 6 months for optimal oral health. Some patients may need more frequent visits." },
  { q: "How long do dental implants last?", a: "With proper care, dental implants can last a lifetime. They are designed to be a permanent tooth replacement solution." },
];

const FAQSection = () => (
  <section className="section-padding section-alt">
    <div className="container-dental">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-h2 font-heading font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
      </ScrollReveal>

      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="text-left font-heading font-medium hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default FAQSection;
