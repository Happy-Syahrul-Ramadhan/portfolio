"use client"

import { useState } from "react"
import { Facebook, Twitter, MessageCircle, Instagram, Link2, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
  hashtags?: string
}

export default function ShareButtons({ title, url, hashtags }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedHashtags = hashtags ? encodeURIComponent(hashtags) : ""

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${hashtags ? `&hashtags=${encodedHashtags}` : ""}`,
    whatsapp: `https://wa.me/?text=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleInstagramClick = () => {
    handleCopyLink()
    window.open(shareLinks.instagram, "_blank")
  }

  return (
    <div className="flex flex-col gap-3 py-6 border-t border-b">
      <p className="text-sm font-medium text-muted-foreground">Share this:</p>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => window.open(shareLinks.facebook, "_blank")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-colors text-sm font-medium"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </button>

        <button
          onClick={() => window.open(shareLinks.twitter, "_blank")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-black/90 text-white transition-colors text-sm font-medium"
          aria-label="Share on X"
        >
          <Twitter className="h-4 w-4" />
          X
        </button>

        <button
          onClick={() => window.open(shareLinks.whatsapp, "_blank")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#25D366]/90 text-white transition-colors text-sm font-medium"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>

        <button
          onClick={handleInstagramClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white transition-opacity text-sm font-medium"
          aria-label="Share on Instagram"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
      
      {hashtags && (
        <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
          {hashtags.split(",").map((tag, idx) => (
            <span key={idx} className="text-primary">
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
