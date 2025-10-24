"use client"

import { useState } from "react"
import { FileText, Sparkles, TrendingUp, Clock, Play, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  onStartCoding: () => void
  recentFiles: string[]
  onOpenFile: (file: string) => void
}

export function Dashboard({ onStartCoding, recentFiles, onOpenFile }: DashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const aiTips = [
    "Use Cmd+K to open the command palette",
    "Drag and drop files to import them instantly",
    "Toggle live preview to see your changes in real-time",
    "Ask Ghost AI for code suggestions and debugging help",
  ]

  const learningResources = [
    { title: "React Hooks Tutorial", duration: "15 min", type: "Video" },
    { title: "TypeScript Best Practices", duration: "20 min", type: "Article" },
    { title: "CSS Grid Mastery", duration: "30 min", type: "Course" },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse-glow">
              👻 Ghost IDE
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">Your AI-Powered Coding Companion</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Code smarter, learn faster, and build better with Ghost by your side
          </p>
          <Button
            onClick={onStartCoding}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-6 text-lg holo-glow animate-float"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Coding
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <FileText className="w-6 h-6" />,
              label: "Files Created",
              value: recentFiles.length,
              color: "cyan",
            },
            { icon: <Zap className="w-6 h-6" />, label: "AI Assists", value: "24", color: "purple" },
            { icon: <TrendingUp className="w-6 h-6" />, label: "Productivity", value: "+45%", color: "pink" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-lg animate-scale-in glow-border"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`text-${stat.color}-500 mb-3`}>{stat.icon}</div>
              <div className="text-3xl font-bold mb-1 text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Files & AI Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Recent Files */}
          <div className="glass-panel p-6 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-500" />
              <h2 className="text-xl font-bold text-foreground">Recent Files</h2>
            </div>
            {recentFiles.length > 0 ? (
              <div className="space-y-2">
                {recentFiles.slice(0, 5).map((file, index) => (
                  <button
                    key={index}
                    onClick={() => onOpenFile(file)}
                    className="w-full text-left p-3 rounded hover:bg-secondary/50 transition-colors text-foreground"
                  >
                    <FileText className="w-4 h-4 inline mr-2 text-cyan-500" />
                    {file}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent files. Start coding to see them here!</p>
            )}
          </div>

          {/* AI Tips */}
          <div className="glass-panel p-6 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-foreground">AI Tips</h2>
            </div>
            <div className="space-y-3">
              {aiTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="glass-panel p-6 rounded-lg animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-pink-500" />
            <h2 className="text-xl font-bold text-foreground">Recommended Learning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningResources.map((resource, index) => (
              <button
                key={index}
                className="glass-panel p-4 rounded-lg text-left hover:bg-secondary/50 transition-colors glow-border"
              >
                <div className="text-sm text-cyan-500 mb-2">{resource.type}</div>
                <div className="font-semibold mb-2 text-foreground">{resource.title}</div>
                <div className="text-xs text-muted-foreground">{resource.duration}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
