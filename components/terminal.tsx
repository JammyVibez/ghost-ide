"use client"

import { useState } from "react"
import { TerminalIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Terminal() {
  const [output] = useState([
    "$ ghost --version",
    "Ghost IDE v1.0.0",
    "$ git status",
    "On branch main",
    "Your branch is up to date with 'origin/main'.",
    "",
    "nothing to commit, working tree clean",
    "$",
  ])

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-cyan-500" />
          <span className="text-sm font-semibold">Terminal</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X className="w-3 h-3" />
        </Button>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {output.map((line, i) => (
          <div key={i} className={line.startsWith("$") ? "text-cyan-500" : "text-muted-foreground"}>
            {line}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-cyan-500">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}
