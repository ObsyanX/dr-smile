import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Tag } from "lucide-react";

const posts = [
  {
    slug: "best-dental-clinic-madhyamgram",
    title: "Best Dental Clinic in Madhyamgram (2026 Guide)",
    excerpt: "A comprehensive guide to finding the best dental clinic in Madhyamgram. What to look for, what to expect, and why ToothZone is the #1 choice for families across Madhyamgram and Dum Dum.",
    tag: "Local Guide",
    readTime: "6 min read",
    date: "March 2026",
    image: "https://res.cloudinary.com/dpmtulfdy/image/upload/v1774282815/ChatGPT_Image_Mar_23_2026_09_47_21_PM_y4fcg9.png",
    imageAlt: "Best dental clinic in Madhyamgram guide 2026",
  },
  {
    slug: "root-canal-cost-madhyamgram",
    title: "Root Canal Treatment Cost in Madhyamgram (2026)",
    excerpt: "Everything you need to know about root canal treatment cost in Madhyamgram — broken down by tooth type, what's included, and how to get the best value without compromising on quality.",
    tag: "Treatment Guide",
    readTime: "7 min read",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    imageAlt: "Root canal cost in Madhyamgram 2026 complete guide",
  },
  {
    slug: "tooth-pain-treatment-dum-dum",
    title: "Tooth Pain Treatment Near Dum Dum — What To Do",
    excerpt: "Experiencing tooth pain near Dum Dum? This guide covers why tooth pain happens, when it's an emergency, home remedies that work, and when to visit a dentist near Dum Dum immediately.",
    tag: "Emergency Guide",
    readTime: "8 min read",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80",
    imageAlt: "Tooth pain treatment near Dum Dum guide",
  },
];

const Blog = () => (
  <Layout>
    <SEOHead
      title="Dental Health Blog | ToothZone — Madhyamgram & Dum Dum"
      description="Expert dental health guides for Madhyamgram & Dum Dum residents. Find information on dental treatments, costs, tips, and how to choose the best dentist near you."
      canonical="https://thetoothzone.vercel.app/blog"
      keywords="dental blog madhyamgram, dental tips dum dum, dental health advice, root canal guide madhyamgram, dentist near me guide"
    />
    <PageTransition>

      {/* Hero */}
      <section className="section-padding gradient-hero">
        <div className="container-dental text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" />
              <span>ToothZone Blog</span>
            </div>
            <h1 className="text-h1 lg:text-display font-heading font-bold text-foreground mb-4">
              Dental Health Guides
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Expert articles on dental treatments, costs, and oral health tips — especially for patients in Madhyamgram, Dum Dum, and North Kolkata.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="block group">
                  <article className="rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-heading font-semibold flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {post.tag}
                        </span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <h2 className="font-heading font-bold text-foreground mb-3 text-base group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-primary font-heading font-semibold text-sm group-hover:underline">Read Article →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming Soon */}
          <ScrollReveal>
            <div className="mt-16 text-center p-10 rounded-3xl bg-secondary/40 border border-border/50">
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">More Coming Soon</p>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-4">50+ Articles Planned</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                We are publishing new guides every week covering dental costs, treatments, oral hygiene tips, and local Madhyamgram &amp; Dum Dum dental guides.
              </p>
              <Link to="/contact">
                <Button className="rounded-full font-heading px-8">Book an Appointment</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  </Layout>
);

export default Blog;
