import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { BlogSeoScore } from "@/components/admin/BlogSeoScore";
import { calculateSeoScore, SeoCheck } from "@/utils/seoScorer";
import { parseDocx, parsePdf, parseTxt } from "@/utils/blogParsers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Save, UploadCloud, Link as LinkIcon, Loader2, Send } from "lucide-react";

export default function AdminBlogEditor(): React.ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p>Start writing your dental blog here...</p>");
  const [plainText, setPlainText] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General Dentistry");
  const [tags, setTags] = useState("");
  
  // SEO Meta State
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // SEO Score Calculation
  const seoResult = calculateSeoScore(
    content, plainText, title, seoTitle, seoDescription, 
    keywords.split(",").map(k => k.trim()).filter(Boolean)
  );

  // Generate slug automatically when title changes if it's new
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(
        title.toLowerCase()
          .replace(/[^a-z0-9\\s-]/g, "")
          .replace(/\\s+/g, "-")
      );
    }
  }, [title, isEditing]);

  // Fetch if editing
  useEffect(() => {
    if (isEditing) {
      const fetchBlog = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("blogs" as any).select("*").eq("id", id).single();
        if (data && !error) {
          const blogParams = data as any;
          setTitle(blogParams.title || "");
          setSlug(blogParams.slug || "");
          setContent(blogParams.content?.toString() || "");
          setExcerpt(blogParams.excerpt || "");
          setCategory(blogParams.category || "");
          setTags(blogParams.tags?.join(", ") || "");
          setSeoTitle(blogParams.seo_title || "");
          setSeoDescription(blogParams.seo_description || "");
          setKeywords(blogParams.keywords?.join(", ") || "");
        }
        setIsLoading(false);
      };
      fetchBlog();
    }
  }, [id, isEditing]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Parsing document...", { id: "parse" });
      let html = "";
      if (file.name.endsWith(".docx")) {
        html = await parseDocx(file);
      } else if (file.name.endsWith(".pdf")) {
        html = await parsePdf(file);
      } else if (file.name.endsWith(".txt")) {
        html = await parseTxt(file);
      } else {
        throw new Error("Unsupported file format");
      }
      
      setContent(html);
      toast.success("Document imported successfully!", { id: "parse" });
    } catch (err: any) {
      toast.error(err.message, { id: "parse" });
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title || !slug) {
      toast.error("Title and Slug are required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title,
        slug,
        content,
        excerpt,
        category,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        seo_title: seoTitle,
        seo_description: seoDescription,
        keywords: keywords.split(",").map(k => k.trim()).filter(Boolean),
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (isEditing) {
        // We know id is defned because isEditing is true
        // Increment version in a real app, but omitting here to keep simple
        const { error } = await supabase.from("blogs" as any).update(payload).eq("id", id as string);
        if (error) throw error;
        toast.success(`Blog ${status} successfully updated!`);
      } else {
        const { error } = await supabase.from("blogs" as any).insert([payload]);
        if (error) throw error;
        toast.success(`New blog ${status} successfully!`);
        navigate("/admin/blogs");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const generateAI = async () => {
    if (!title) {
      toast.error("Please enter a Blog Title first so the AI knows what to write about.");
      return;
    }

    setIsGenerating(true);
    toast.loading("AI is writing your article... This usually takes 5-10 seconds.", { id: "ai-gen" });

    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-ai', {
        body: { 
          prompt: title, 
          keywords: keywords,
          tone: "professional, empathetic, and authoritative"
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.content) {
        setContent(data.content);
        toast.success("AI Generation Complete!", { id: "ai-gen" });
      } else {
        throw new Error("No content received from AI generator");
      }
    } catch (err: any) {
      console.error("AI Error:", err);
      toast.error(`AI Generation Failed: ${err.message}`, { id: "ai-gen" });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <AdminLayout><div className="p-8 text-center text-muted-foreground"><Loader2 className="animate-spin w-8 h-8 mx-auto" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {isEditing ? "Edit Blog" : "Create New Blog"}
          </h1>
          <p className="text-muted-foreground text-sm">Autonomous SEO Blog Engine</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={isSaving}>
            <Send className="w-4 h-4 mr-2" /> Publish Live
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <Label>Blog Title</Label>
                <Input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="e.g. 5 Warning Signs You Need a Root Canal" 
                  className="font-heading text-lg mt-1"
                />
              </div>
              
              <Tabs defaultValue="editor" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="editor">Rich Text</TabsTrigger>
                    <TabsTrigger value="meta">Meta & Classification</TabsTrigger>
                    <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                  </TabsList>

                  {/* Input Methods Dropdown / Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={generateAI} 
                      disabled={isGenerating}
                      className="gap-1.5 text-xs text-amber-600 bg-amber-500/10 hover:bg-amber-500/20"
                    >
                      {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
                      {isGenerating ? "Writing..." : "Auto AI"}
                    </Button>
                    <div className="relative">
                      <Input type="file" onChange={handleFileUpload} accept=".pdf,.docx,.txt" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <UploadCloud className="w-3.5 h-3.5" /> Import
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="editor" className="mt-0">
                  <TipTapEditor 
                    content={content} 
                    onChange={(html, text) => {
                      setContent(html);
                      setPlainText(text);
                    }} 
                  />
                </TabsContent>

                <TabsContent value="meta" className="mt-0 space-y-4">
                  <div>
                    <Label>URL Slug</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground text-sm">/blog/</span>
                      <Input value={slug} onChange={e => setSlug(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Dentistry">General Dentistry</SelectItem>
                        <SelectItem value="Cosmetic">Cosmetic</SelectItem>
                        <SelectItem value="Orthodontics">Orthodontics</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Textarea 
                      value={excerpt} 
                      onChange={e => setExcerpt(e.target.value)} 
                      placeholder="Short summary for the blog card..." 
                      className="mt-1 h-20"
                    />
                  </div>
                  <div>
                    <Label>Tags (Comma separated)</Label>
                    <Input 
                      value={tags} 
                      onChange={e => setTags(e.target.value)} 
                      placeholder="e.g. pain, root canal, madhyamgram" 
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="mt-0 space-y-4">
                  <div>
                    <Label>SEO Target Keywords (Comma separated)</Label>
                    <Input 
                      value={keywords} 
                      onChange={e => setKeywords(e.target.value)} 
                      placeholder="e.g. root canal treatment near me, best dentist" 
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">The first keyword is used as the Primary Target for the Yoast Score.</p>
                  </div>
                  <div>
                    <Label>Meta SEO Title</Label>
                    <Input 
                      value={seoTitle} 
                      onChange={e => setSeoTitle(e.target.value)} 
                      placeholder="Appears in Google Search results" 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Textarea 
                      value={seoDescription} 
                      onChange={e => setSeoDescription(e.target.value)} 
                      placeholder="150-160 characters describing the page for Google." 
                      className="mt-1 h-24"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm sticky top-24">
            <BlogSeoScore score={seoResult.score} checks={seoResult.checks} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
