"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

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

interface WorkExperienceSectionProps {
  experiences: Experience[]
}

export default function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
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
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
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

  if (experiences.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Work Experience
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0
          const isVisible = visibleItems.has(exp.id)

          return (
            <div
              key={exp.id}
              ref={(el) => setItemRef(exp.id, el)}
              data-id={exp.id}
              className={`
                grid md:grid-cols-2 gap-6 md:gap-8 items-center
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
                  flex flex-col gap-3 bg-card p-6 rounded-2xl border border-border/50 shadow-sm
                  hover:shadow-md hover:border-border transition-all duration-300 overflow-hidden min-w-0
                  ${isEven ? "md:order-1" : "md:order-2"}
                `}
              >
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <h3 className="font-semibold text-xl leading-tight break-words">{exp.role}</h3>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-500/15 text-green-600 dark:text-green-400 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm min-w-0">
                  <span className="font-medium text-foreground/90 break-words">{exp.company}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground break-words">{exp.period}</span>
                </div>

                {exp.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1 break-words overflow-wrap-anywhere text-justify">
                    {exp.description}
                  </p>
                )}

                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-500/30"
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
                  {/* Decorative background circle */}
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl scale-150"></div>
                  
                  {/* Logo or Icon */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    {exp.logoUrl ? (
                      <img
                        src={exp.logoUrl}
                        alt={exp.company}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-3xl md:text-4xl font-bold text-primary/70 font-heading">
                        {exp.company.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Connecting line */}
                  {index < experiences.length - 1 && (
                    <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-border to-transparent mt-4"></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2">
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          See all experience{" "}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
