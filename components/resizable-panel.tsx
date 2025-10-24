"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface ResizablePanelProps {
  children: ReactNode
  defaultWidth: number
  minWidth: number
  maxWidth: number
  side: "left" | "right"
}

export function ResizablePanel({ children, defaultWidth, minWidth, maxWidth, side }: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return

      const rect = panelRef.current.getBoundingClientRect()
      let newWidth: number

      if (side === "right") {
        newWidth = window.innerWidth - e.clientX
      } else {
        newWidth = e.clientX - rect.left
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, minWidth, maxWidth, side])

  return (
    <div ref={panelRef} className="relative flex-shrink-0" style={{ width: `${width}px` }}>
      {/* Resize Handle */}
      <div
        className={`absolute top-0 ${side === "right" ? "left-0" : "right-0"} w-1 h-full bg-border hover:bg-primary transition-colors cursor-col-resize z-10`}
        onMouseDown={() => setIsResizing(true)}
      />
      {children}
    </div>
  )
}
