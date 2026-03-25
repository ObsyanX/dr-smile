import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight, Eye, RefreshCw, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

// Memory cache for blogs to prevent excessive Supabase queries
let cachedBlogs: any[] | null = null;
let lastFetch = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>(cachedBlogs || []);
  const [isLoading, setIsLoading] = useState(!cachedBlogs);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      // Check cache validity
      if (cachedBlogs && Date.now() - lastFetch < CACHE_TTL) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from("blogs" as any)
        .select("slug, title, excerpt, cover_image, category, tags, published_at, views, author")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (data && !error) {
        cachedBlogs = data;
        lastFetch = Date.now();
        setBlogs(data);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  return (
    <Layout>
      <SEOHead
        title={activeCategory === "All" 
          ? "Dental Health Blog & Treatment Guides — ToothZone" 
          : `${activeCategory} Guides & Practical Tips — ToothZone`}
        description="Read the latest articles on root canals, dental implants, braces, and oral hygiene from the experts at ToothZone Dental Clinic."
      />

      <div className="pb-20">
        {/* Header Section */}
        <section className="bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent py-16 md:py-24 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-colors border-0 px-4 py-1.5 rounded-full font-medium">
              ToothZone Academy
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Expert Dental Insights & Guides
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the latest treatments, cost guides, and oral hygiene tips straight from our senior dental surgeons in Madhyamgram & Dum Dum.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20">
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c: any) => (
              <Button
                key={c}
                variant={activeCategory === c ? "default" : "outline"}
                className={activeCategory === c ? "rounded-full shadow-md shadow-primary/20" : "rounded-full bg-card"}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-24 text-center text-muted-foreground flex flex-col items-center justify-center">
              <RefreshCw className="w-10 h-10 animate-spin mb-4 text-primary opacity-50" />
              <p className="font-medium">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-24 text-center bg-card border border-border/50 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📝</div>
              <h3 className="text-xl font-heading font-semibold mb-2">Check back soon!</h3>
              <p className="text-muted-foreground">We are currently writing new helpful guides for our patients.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article key={blog.slug} className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden bg-muted">
                    {blog.cover_image ? (
                      <img 
                        src={blog.cover_image} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-muted text-primary/40 font-heading font-medium text-lg">
                        ToothZone Blog
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-md shadow-sm border-0 font-medium">
                        {blog.category || "Guide"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {blog.published_at ? format(new Date(blog.published_at), "MMM d, yyyy") : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> {blog.views?.toLocaleString() || 0}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                        <span className="absolute inset-0 z-10" />
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1 flex-grow">
                      {blog.excerpt}
                    </p>
                    
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between font-medium mt-auto">
                      <span className="text-sm text-foreground">{blog.author}</span>
                      <span className="text-sm text-primary flex items-center gap-1 inline-flex group/link">
                        Read Guide <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Emergency CTA Section */}
        <section className="bg-blue-900 text-white py-12 px-6 mt-16 rounded-2xl mx-4 mb-8 relative overflow-hidden shadow-xl">
          <div className="container-dental max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🚨</span> Dental Emergency?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Call now for immediate appointment. We're here when you need us most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 rounded-full font-heading px-8 w-full h-14 text-base">
                  <Calendar className="w-5 h-5 mr-3" /> Book Appointment
                </Button>
              </Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto tracking-wide">
                <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-full font-heading px-8 w-full border-none h-14 text-base">
                  <MessageCircle className="w-5 h-5 mr-3" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
