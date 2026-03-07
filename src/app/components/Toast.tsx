"use client"

import { useEffect } from "react"
import { CheckCircle2, XCircle, Info, AlertCircle, X } from "lucide-react"

export type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  }

  const styles = {
    success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    warning: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
  }

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        ${styles[type]}
        animate-in slide-in-from-top-5 duration-300
      `}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
