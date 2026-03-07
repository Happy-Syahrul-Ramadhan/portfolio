"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { useState } from "react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Link2,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  FileCode,
  ChevronDown,
} from "lucide-react"

// Create a lowlight instance with common language support
const lowlight = createLowlight(common)

// Common programming languages
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "plaintext", label: "Plain Text" },
]

interface TiptapEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TiptapEditor({ value, onChange, placeholder = "Start writing your blog post..." }: TiptapEditorProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const handleImageUpload = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.url && editor) {
          editor.chain().focus().setImage({ src: data.url }).run()
        }
      } catch (error) {
        console.error("Image upload failed:", error)
      }
    }
    input.click()
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  if (!editor) {
    return (
      <div className="min-h-[500px] rounded-xl border border-border bg-muted/50 animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading editor...</p>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
      {/* Toolbar */}
      <div className="border-b border-border bg-muted/50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("bold") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("italic") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("underline") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("strike") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("code") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("heading", { level: 1 }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("heading", { level: 3 }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("bulletList") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("orderedList") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("blockquote") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>
          
          {/* Code Block with Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`p-2 rounded-lg hover:bg-accent transition-colors flex items-center gap-1 ${
                editor.isActive("codeBlock") ? "bg-accent text-primary" : "text-muted-foreground"
              }`}
              title="Code Block"
            >
              <FileCode className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {showLanguageMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowLanguageMenu(false)}
                />
                <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[140px] max-h-[300px] overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => {
                        if (editor.isActive("codeBlock")) {
                          // If already in code block, just update the language
                          editor.chain().focus().updateAttributes("codeBlock", { language: lang.value }).run()
                        } else {
                          // If not in code block, create one with selected language
                          editor.chain().focus().setCodeBlock({ language: lang.value }).run()
                        }
                        setShowLanguageMenu(false)
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive({ textAlign: "left" }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive({ textAlign: "center" }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive({ textAlign: "right" }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive({ textAlign: "justify" }) ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </button>
        </div>

        {/* Media & Links */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("link") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Add Link"
          >
            <Link2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleImageUpload}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              editor.isActive("highlight") ? "bg-accent text-primary" : "text-muted-foreground"
            }`}
            title="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground disabled:opacity-50"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground disabled:opacity-50"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}
