import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminBlogs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();

  // Fetch Blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, status, published_at, views, category, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    },
    onError: (error) => {
      toast.error("Failed to delete blog: " + error.message);
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  const filteredBlogs = blogs?.filter((blog) => {
    if (activeTab === "all") return true;
    return blog.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">Published</Badge>;
      case "draft":
        return <Badge variant="secondary" className="bg-stone-100 text-stone-600">Draft</Badge>;
      case "archived":
        return <Badge variant="outline" className="text-muted-foreground">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-foreground">SEO Blogs Engine</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your autonomous AI SEO blogs and tracking</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-blogs"] })}
            title="Refresh list"
            className="rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Link to="/admin/blog-editor">
            <Button className="gap-2 font-heading rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              <Plus className="w-4 h-4" /> Create Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-border/50 px-6 py-4 flex items-center justify-between bg-muted/20">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All ({blogs?.length || 0})</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-muted-foreground">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 opacity-50" />
                <p>Loading blogs database...</p>
              </div>
            ) : filteredBlogs?.length === 0 ? (
              <div className="p-16 text-center text-muted-foreground">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-foreground font-heading font-semibold text-lg mb-2">No blogs found</h3>
                <p className="text-sm mb-6 max-w-sm mx-auto">
                  {activeTab === "all" 
                    ? "Create your first autonomous SEO blog to start driving organic traffic."
                    : `No blogs found with status "${activeTab}".`}
                </p>
                {activeTab === "all" && (
                  <Link to="/admin/blog-editor">
                    <Button variant="outline" className="rounded-full">Get Started</Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Blog Post</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Analytics</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredBlogs?.map((blog) => (
                      <tr key={blog.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground mb-1 line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{blog.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(blog.status || "draft")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded-md">
                            {blog.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                            <Eye className="w-3.5 h-3.5" />
                            {blog.views?.toLocaleString() || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                          {blog.published_at 
                            ? format(new Date(blog.published_at), "MMM d, yyyy")
                            : format(new Date(blog.created_at), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to={`/blog/${blog.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link to={`/admin/blog-editor/${blog.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(blog.id, blog.title)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
