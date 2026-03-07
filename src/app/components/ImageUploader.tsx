"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  name?: string
  defaultValue?: string
  value?: string
  onChange?: (url: string) => void
  label?: string
}

export default function ImageUploader({ 
  name, 
  defaultValue, 
  value, 
  onChange, 
  label = "Thumbnail Image" 
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(defaultValue || value || "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (value !== undefined) {
      setPreview(value)
    }
  }, [value])

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
        onChange?.(data.url)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch {
      setError("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview("")
    onChange?.("")
  }

  const isPDF = preview && (preview.toLowerCase().endsWith('.pdf') || preview.includes('.pdf'))

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {name && <input type="hidden" name={name} value={preview} />}
      {preview ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
          {isPDF ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <p className="text-sm font-medium">PDF File Selected</p>
                <p className="text-xs text-muted-foreground mt-1">Preview not available</p>
              </div>
            </div>
          ) : (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Upload className="h-6 w-6" />
            <span className="text-sm">{uploading ? "Uploading..." : "Click to upload file"}</span>
            <span className="text-xs">Images (PNG, JPG, WEBP) or PDF up to 5MB</span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
