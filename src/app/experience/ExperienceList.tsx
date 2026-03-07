"use client"

import { useEffect, useRef, useState } from "react"

interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string | null
  logoUrl: string | null
  current: boolean
  order: number
  skills: string | null
}

interface ExperienceListProps {
  experiences: Experience[]
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id")
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id))
            }
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    )

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [experiences])

  const setItemRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      itemRefs.current.set(id, element)
    } else {
      itemRefs.current.delete(id)
    }
  }

  if (experiences.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 border rounded-2xl border-dashed">
        <p className="text-muted-foreground">No work experience entries yet.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 md:gap-16 mt-4">
      {experiences.map((exp, index) => {
        const isEven = index % 2 === 0
        const isVisible = visibleItems.has(exp.id)

        return (
          <div
            key={exp.id}
            ref={(el) => setItemRef(exp.id, el)}
            data-id={exp.id}
            className={`
              grid md:grid-cols-2 gap-8 md:gap-12 items-center
              transition-all duration-700 ease-out
              ${isVisible ? "opacity-100" : "opacity-0"}
              ${isEven ? (isVisible ? "md:translate-x-0" : "md:-translate-x-12") : (isVisible ? "md:translate-x-0" : "md:translate-x-12")}
            `}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Content - Left on even, Right on odd */}
            <div
              className={`
                flex flex-col gap-4 bg-card p-8 rounded-2xl border border-border/50 shadow-sm
                hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden min-w-0
                ${isEven ? "md:order-1" : "md:order-2"}
              `}
            >
              {/* Header */}
              <div className="flex flex-col gap-3 min-w-0">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <h3 className="font-bold text-2xl leading-tight break-words">{exp.role}</h3>
                  {exp.current && (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-green-500/15 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">
                      Current Position
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-lg text-foreground/90 break-words">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium break-words">{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <div className="pt-2 border-t border-border/50 min-w-0">
                  <p className="text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere text-justify">
                    {exp.description}
                  </p>
                </div>
              )}

              {/* Skills */}
              {exp.skills && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {exp.skills.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-500/30"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Element - Right on even, Left on odd */}
            <div
              className={`
                flex items-center justify-center
                ${isEven ? "md:order-2 md:justify-start" : "md:order-1 md:justify-end"}
              `}
            >
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150 animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-full blur-2xl"></div>
                
                {/* Logo Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/30 flex items-center justify-center shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-500">
                  {exp.logoUrl ? (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-background/80 backdrop-blur-sm p-3 flex items-center justify-center">
                      <img
                        src={exp.logoUrl}
                        alt={exp.company}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-5xl md:text-6xl font-bold text-primary/70 font-heading">
                      {exp.company.charAt(0)}
                    </div>
                  )}
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary/40 animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                </div>

                {/* Connecting line */}
                {index < experiences.length - 1 && (
                  <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/30 via-border to-transparent mt-6"></div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
