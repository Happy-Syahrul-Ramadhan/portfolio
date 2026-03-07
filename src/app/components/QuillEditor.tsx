"use client"

import { useEffect, useRef, useState } from "react"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [QuillComponent, setQuillComponent] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    import("react-quill-new").then((mod) => {
      setQuillComponent(() => mod.default)
    })
  }, [])

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: function (this: any) {
          const input = document.createElement("input")
          input.setAttribute("type", "file")
          input.setAttribute("accept", "image/*")
          input.click()
          input.onchange = async () => {
            const file = input.files?.[0]
            if (!file) return
            const formData = new FormData()
            formData.append("file", file)
            try {
              const res = await fetch("/api/upload", { method: "POST", body: formData })
              const data = await res.json()
              if (data.url) {
                const quill = this.quill
                const range = quill.getSelection()
                quill.insertEmbed(range?.index ?? 0, "image", data.url)
              }
            } catch (e) {
              console.error("Image upload failed", e)
            }
          }
        },
      },
    },
  }

  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "indent", "blockquote", "code-block",
    "link", "image", "color", "background", "align",
  ]

  if (!mounted || !QuillComponent) {
    return (
      <div className="min-h-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground animate-pulse">
        Loading editor...
      </div>
    )
  }

  return (
    <>
      <style>{`
        .ql-toolbar.ql-snow { border-radius: 6px 6px 0 0; background: hsl(var(--muted)); border-color: hsl(var(--border)); }
        .ql-container.ql-snow { border-radius: 0 0 6px 6px; border-color: hsl(var(--border)); min-height: 300px; font-size: 15px; }
        .ql-editor { min-height: 300px; color: inherit; }
        .dark .ql-toolbar.ql-snow { border-color: #27272a; background: #18181b; }
        .dark .ql-container.ql-snow { border-color: #27272a; background: #09090b; color: #fafafa; }
        .dark .ql-toolbar .ql-stroke { stroke: #a1a1aa; }
        .dark .ql-toolbar .ql-fill { fill: #a1a1aa; }
        .dark .ql-toolbar .ql-picker { color: #a1a1aa; }
        .dark .ql-toolbar button:hover .ql-stroke { stroke: #fff; }
        .dark .ql-toolbar button:hover .ql-fill { fill: #fff; }
      `}</style>
      <QuillComponent
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </>
  )
}
