import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, User, Eye, ArrowLeft, Tag, Loader2, Share2, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      // Fetch the blog
      const { data, error } = await supabase
        .from("blogs" as any)
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .single();

      if (error || !data) {
        setError(true);
        setIsLoading(false);
        return;
      }

      setBlog(data);
      setIsLoading(false);

      // Increment view count via Postgres RPC function
      try {
        await supabase.rpc('increment_blog_views' as any, { blog_slug: slug });
      } catch (e) {
        console.error("Failed to increment view", e);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /> Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) return <Navigate to="/blog" replace />;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      <SEOHead 
        title={`${blog.title} — ToothZone Dental Blog`}
        description={blog.excerpt}
        ogImage={blog.cover_image}
        keywords={blog.keywords || []}
        schema={{
          "@type": "Article",
          "headline": blog.seo_title || blog.title,
          "description": blog.seo_description || blog.excerpt,
          "image": blog.cover_image,
          "author": { "@type": "Person", "name": blog.author },
          "datePublished": blog.published_at || blog.created_at,
          "publisher": { "@type": "Organization", "name": "ToothZone Dental Care" }
        }}
      />
      <div className="flex-1 pt-12 pb-24">
        {/* Header Region */}
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to all articles
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-primary/10 text-primary border-0 rounded-full font-medium shadow-sm">{blog.category || "General Dentistry"}</Badge>
            {blog.tags?.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="rounded-full flex items-center gap-1"><Tag className="w-3 h-3" /> {tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground pt-6 border-t border-border/50 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                {blog.author?.[0] || "T"}
              </div>
              <span className="text-foreground">{blog.author}</span>
            </div>
            {blog.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(blog.published_at), "MMMM d, yyyy")}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {(blog.views || 0) + 1} Reads
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.cover_image && (
          <div className="container mx-auto px-4 max-w-5xl mb-16">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 isolate ring-1 ring-border/50">
              <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content Region */}
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {/* TipTap content uses standard prose classes which we apply globally in CSS, but adding here as safety wrapper */}
          <article 
            className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary prose-a:font-medium prose-img:rounded-xl prose-img:border prose-img:border-border/50 prose-img:shadow-md w-full max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer Social Sharing & Tags */}
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-foreground mr-2 py-1">Tagged:</span>
                {blog.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="rounded-full bg-muted/50">{tag}</Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground flex items-center gap-2"><Share2 className="w-4 h-4" /> Share:</span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"><Facebook className="w-4 h-4" /></Button>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 hover:bg-sky-500/20"><Twitter className="w-4 h-4" /></Button>
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-blue-700/10 text-blue-700 hover:bg-blue-700/20"><Linkedin className="w-4 h-4" /></Button>
              </a>
            </div>
          </div>
        </div>

        {/* Emergency CTA Section */}
        <section className="bg-blue-900 text-white py-12 px-6 mt-8 rounded-2xl mx-4 lg:mx-auto max-w-5xl mb-12 relative overflow-hidden shadow-xl">
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
              <a href="https://wa.me/919804214790" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto tracking-wide">
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
