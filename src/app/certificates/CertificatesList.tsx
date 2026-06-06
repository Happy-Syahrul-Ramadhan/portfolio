"use client"

import { useState } from "react"
import { Award, ExternalLink, Calendar, X, ZoomIn, ZoomOut, RotateCcw, Hash, Tag, FileText } from "lucide-react"

type Certificate = {
  id: string
  title: string
  description: string
  imageUrl: string
  issuer: string | null
  issueDate: Date | null
  credentialUrl: string | null
  credentialId: string | null
  skills: string | null
}

export default function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; isPDF: boolean } | null>(null)
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))
  const handleResetZoom = () => setZoom(1)

  const openImage = (url: string, title: string) => {
    const isPDF = url.toLowerCase().endsWith('.pdf') || url.includes('.pdf')
    setSelectedImage({ url, title, isPDF })
    setZoom(1)
  }

  const closeImage = () => {
    setSelectedImage(null)
    setZoom(1)
  }

  const isPDFUrl = (url: string) => url.toLowerCase().endsWith('.pdf') || url.includes('.pdf')

  return (
    <>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">Certificates</h1>
          <p className="text-muted-foreground">My professional certifications and achievements</p>
        </header>

        {certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Award className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No certificates available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((cert) => (
              <article
                key={cert.id}
                className="group flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div 
                  className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted cursor-pointer transition-transform active:scale-95"
                  onClick={() => openImage(cert.imageUrl, cert.title)}
                >
                  {isPDFUrl(cert.imageUrl) ? (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                      <FileText className="h-16 w-16 text-red-500" />
                    </div>
                  ) : (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold font-heading line-clamp-2">{cert.title}</h2>
                
                <p className="text-sm text-muted-foreground line-clamp-3">{cert.description}</p>

                {cert.issuer && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                )}

                {cert.issueDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Issued on{" "}
                      {new Date(cert.issueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                )}

                {cert.credentialId && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span className="font-mono">ID Credential: {cert.credentialId}</span>
                  </div>
                )}

                {cert.skills && (
                  <div className="flex items-start gap-2 text-sm">
                    <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.split(",").map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline w-fit"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Credential
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>

    {/* Image Modal */}
    {selectedImage && (
      <div 
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={closeImage}
      >
        {/* Close Button */}
        <button
          onClick={closeImage}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Zoom Controls - Centered Top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleZoomOut()
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <div className="px-3 py-1 text-white text-sm font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleZoomIn()
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <div className="w-px h-6 bg-white/20 mx-1"></div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleResetZoom()
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>

        {/* Content Container - Fit to screen, zoom without constraints */}
        <div className="relative w-full h-full flex items-center justify-center overflow-auto animate-in zoom-in-95 duration-300 p-4">
          {selectedImage.isPDF ? (
            <div className="relative w-[90vw] h-[85vh] bg-white rounded-lg overflow-hidden flex flex-col">
              <div className="flex-1 relative">
                {/* Use Google Docs Viewer for reliable PDF preview */}
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedImage.url)}&embedded=true`}
                  className="w-full h-full absolute inset-0"
                  title={selectedImage.title}
                  style={{ border: 'none' }}
                />
              </div>
              {/* Download button overlay */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black/70 hover:bg-black/80 backdrop-blur-sm text-white rounded-lg transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open PDF
                </a>
              </div>
            </div>
          ) : (
            <div 
              className="relative transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="rounded-lg cursor-move max-w-[85vw] max-h-[75vh] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    )}
  </>
  )
}
