"use client"

import { useTransition, useState } from "react"
import { Upload, FileText, Download, Trash2 } from "lucide-react"
import { updateCV } from "@/app/actions/profile"
import { useToast } from "@/app/components/ToastProvider"

export default function CVClient({ cvUrl }: { cvUrl: string | null }) {
  const [isPending, startTransition] = useTransition()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentCvUrl, setCurrentCvUrl] = useState(cvUrl)
  const { showToast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        showToast("Only PDF files are allowed", "error")
        e.target.value = ""
        return
      }
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        showToast("File too large (max 10MB)", "error")
        e.target.value = ""
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!selectedFile) {
      showToast("Please select a PDF file", "error")
      return
    }

    const formData = new FormData()
    formData.append("cv", selectedFile)

    startTransition(async () => {
      try {
        const result = await updateCV(formData)
        setCurrentCvUrl(result.cvUrl)
        setSelectedFile(null)
        // Reset file input
        const fileInput = document.getElementById("cv-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
        showToast("CV updated successfully!", "success")
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Failed to update CV", "error")
      }
    })
  }

  const handleClear = () => {
    setSelectedFile(null)
    const fileInput = document.getElementById("cv-file") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Current CV */}
      {currentCvUrl && (
        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
            <FileText className="h-5 w-5" /> Current CV
          </h2>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium">Happy Syahrul Ramadhan-resume.pdf</p>
                <p className="text-sm text-muted-foreground">PDF Document</p>
              </div>
            </div>
            <a
              href={currentCvUrl}
              download
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-border bg-transparent hover:bg-accent h-9 px-4 gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      )}

      {/* Upload New CV */}
      <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
          <Upload className="h-5 w-5" /> Upload New CV
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="cv-file" className="text-sm font-medium">
              Select PDF File (Max 10MB)
            </label>
            <input
              id="cv-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p className="text-xs text-muted-foreground">
              The uploaded CV will replace the existing one with filename: <strong>Happy Syahrul Ramadhan-resume.pdf</strong>
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending || !selectedFile}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2 disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              {isPending ? "Uploading..." : "Upload CV"}
            </button>
            {selectedFile && !isPending && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-border bg-transparent hover:bg-accent h-10 px-4 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
