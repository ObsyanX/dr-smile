import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { 
  Bold, Italic, List, ListOrdered, Quote, 
  Heading2, Heading3, Undo, Redo, ImageIcon,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useRef } from "react";

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading image...", { id: "image-upload" });
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      if (data.publicUrl) {
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
        toast.success("Image added!", { id: "image-upload" });
      }
    } catch (error: any) {
      toast.error("Failed to upload image: " + error.message, { id: "image-upload" });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border/50 bg-muted/20 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <Heading3 className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <Quote className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost" size="sm" type="button"
        onClick={setLink}
        className={editor.isActive("link") ? "bg-muted text-foreground" : "text-muted-foreground"}
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-muted-foreground hover:text-foreground"
      >
        <ImageIcon className="w-4 h-4" />
      </Button>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={addImage} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost" size="sm" type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="text-muted-foreground"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="sm" type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="text-muted-foreground"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export const TipTapEditor = ({ 
  content, 
  onChange 
}: { 
  content: string; 
  onChange: (html: string, plainText: string) => void; 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl border border-border/50 shadow-sm max-w-full h-auto my-6',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline hover:text-primary/80 transition-colors cursor-pointer',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-stone dark:prose-invert prose-headings:font-heading prose-p:text-muted-foreground focus:outline-none min-h-[400px] p-6 max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
    },
  });

  // Effect to update content if it changes externally (e.g. initial load or AI generation)
  if (editor && content && editor.getHTML() !== content) {
    // Only update if it's not currently focused (prevents cursor jumping)
    if (!editor.isFocused) {
      editor.commands.setContent(content);
    }
  }

  return (
    <div className="border border-border/50 rounded-xl bg-card overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-shadow">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
