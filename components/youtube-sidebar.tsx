"use client"

import { useState } from "react"
import { Youtube, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Tutorial {
  id: string
  title: string
  channel: string
  duration: string
}

const recommendedTutorials: Tutorial[] = [
  {
    id: "1",
    title: "TypeScript Crash Course",
    channel: "Traversy Media",
    duration: "1:32:15",
  },
  {
    id: "2",
    title: "React Hooks Explained",
    channel: "Web Dev Simplified",
    duration: "45:20",
  },
  {
    id: "3",
    title: "Git & GitHub Tutorial",
    channel: "freeCodeCamp",
    duration: "2:15:30",
  },
]

export function YouTubeSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" />
          <h2 className="text-sm font-semibold">Tutorials</h2>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tutorials..."
          className="w-full"
        />
      </div>

      {/* Recommended */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3">RECOMMENDED FOR YOU</h3>
        <div className="space-y-3">
          {recommendedTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-12 bg-secondary rounded flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Play className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">{tutorial.title}</h4>
                  <p className="text-xs text-muted-foreground">{tutorial.channel}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tutorial.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
          <ExternalLink className="w-4 h-4" />
          Open in YouTube
        </Button>
      </div>
    </div>
  )
}
