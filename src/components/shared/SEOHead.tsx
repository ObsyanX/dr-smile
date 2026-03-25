import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  faqSchema?: FAQItem[];
}

const SEOHead = ({ title, description, canonical, keywords, ogImage, schema, faqSchema }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (keywords) setMeta("name", "keywords", keywords);
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Inject page-level schema
    const removeSchema = (id: string) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };

    removeSchema("page-schema");
    removeSchema("faq-schema");

    if (schema) {
      const scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.id = "page-schema";
      scriptEl.textContent = JSON.stringify(Array.isArray(schema) ? schema : schema);
      document.head.appendChild(scriptEl);
    }

    if (faqSchema && faqSchema.length > 0) {
      const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer },
        })),
      };
      const faqEl = document.createElement("script");
      faqEl.type = "application/ld+json";
      faqEl.id = "faq-schema";
      faqEl.textContent = JSON.stringify(faqJsonLd);
      document.head.appendChild(faqEl);
    }

    return () => {
      removeSchema("page-schema");
      removeSchema("faq-schema");
    };
  }, [title, description, canonical, keywords, ogImage, schema, faqSchema]);

  return null;
};

export default SEOHead;
