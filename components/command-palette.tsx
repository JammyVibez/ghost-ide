"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Terminal, GitBranch, Youtube, Sparkles, Eye, Palette, FileText, X } from "lucide-react"

interface Command {
  id: string
  label: string
  icon: React.ReactNode
  shortcut?: string
}

const commands: Command[] = [
  { id: "new-file", label: "New File", icon: <FileText className="w-4 h-4" />, shortcut: "⌘N" },
  { id: "toggle-ai", label: "Toggle AI Assistant", icon: <Sparkles className="w-4 h-4" />, shortcut: "⌘A" },
  { id: "toggle-terminal", label: "Toggle Terminal", icon: <Terminal className="w-4 h-4" />, shortcut: "⌘T" },
  { id: "toggle-git", label: "Toggle Git Panel", icon: <GitBranch className="w-4 h-4" />, shortcut: "⌘G" },
  { id: "toggle-youtube", label: "Toggle YouTube", icon: <Youtube className="w-4 h-4" />, shortcut: "⌘Y" },
  { id: "toggle-preview", label: "Toggle Live Preview", icon: <Eye className="w-4 h-4" />, shortcut: "⌘P" },
  { id: "change-theme", label: "Change Theme", icon: <Palette className="w-4 h-4" />, shortcut: "⌘," },
]

interface CommandPaletteProps {
  onClose: () => void
  onCommand: (commandId: string) => void
}

export function CommandPalette({ onClose, onCommand }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands.filter((cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          onCommand(filteredCommands[selectedIndex].id)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filteredCommands, selectedIndex, onCommand])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32 animate-fade-in">
      <div className="glass-panel rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-scale-in holo-glow">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-cyan-500" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => onCommand(cmd.id)}
              className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                index === selectedIndex ? "bg-secondary/50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-cyan-500">{cmd.icon}</div>
                <span className="text-foreground">{cmd.label}</span>
              </div>
              {cmd.shortcut && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{cmd.shortcut}</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border text-xs text-muted-foreground text-center">
          Use ↑↓ to navigate • Enter to select • Esc to close
        </div>
      </div>
    </div>
  )
}
