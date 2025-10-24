"use client"

import { useState, useEffect } from "react"
import { Ghost, Sparkles, Zap, Heart } from "lucide-react"

type Mood = "idle" | "thinking" | "excited" | "happy"

export function GhostSpirit() {
  const [mood, setMood] = useState<Mood>("idle")
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Randomly change mood and show messages
    const interval = setInterval(() => {
      const moods: Mood[] = ["idle", "thinking", "excited", "happy"]
      const randomMood = moods[Math.floor(Math.random() * moods.length)]
      setMood(randomMood)

      // Occasionally show a message
      if (Math.random() > 0.7) {
        const messages = [
          "Looking good!",
          "Keep coding!",
          "You're doing great!",
          "Need help?",
          "I'm watching...",
          "Nice work!",
        ]
        setMessage(messages[Math.floor(Math.random() * messages.length)])
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 3000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getMoodIcon = () => {
    switch (mood) {
      case "thinking":
        return <Sparkles className="w-3 h-3 text-cyan-500" />
      case "excited":
        return <Zap className="w-3 h-3 text-yellow-400" />
      case "happy":
        return <Heart className="w-3 h-3 text-pink-500" />
      default:
        return null
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {/* Message Bubble */}
      {showMessage && (
        <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-lg animate-fade-in-up">
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Ghost Spirit */}
      <div className="relative group cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center animate-float hover:scale-110 transition-transform">
          <Ghost
            className="w-8 h-8 text-primary animate-pulse"
            style={{ filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))" }}
          />
          {getMoodIcon() && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
              {getMoodIcon()}
            </div>
          )}
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-primary/20 -z-10 rounded-full" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-xs font-medium">Ghost is watching</p>
            <p className="text-xs text-muted-foreground">Click for help</p>
          </div>
        </div>
      </div>
    </div>
  )
}
