"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  name: string
  defaultValue?: string
  label?: string
}

export default function ImageUploader({ name, defaultValue, label = "Thumbnail Image" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(defaultValue || "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        setPreview(data.url)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch {
      setError("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input type="hidden" name={name} value={preview} />
      {preview ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => setPreview("")}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Upload className="h-6 w-6" />
            <span className="text-sm">{uploading ? "Uploading..." : "Click to upload image"}</span>
            <span className="text-xs">PNG, JPG, WEBP up to 5MB</span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
