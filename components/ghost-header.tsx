"use client"

import { Ghost, Bot, Youtube, TerminalIcon, Settings, GitBranch, Palette, Eye, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GhostHeaderProps {
  onToggleAI: () => void
  onToggleYouTube: () => void
  onToggleTerminal: () => void
  onToggleGit: () => void
  onToggleTheme: () => void
  onTogglePreview: () => void
  onOpenCommandPalette: () => void
  onBackToDashboard: () => void
  onToggleSocialMode: () => void
  socialMode: boolean
  showAI: boolean
  showYouTube: boolean
  showTerminal: boolean
  showGit: boolean
  showPreview: boolean
}

export function GhostHeader({
  onToggleAI,
  onToggleYouTube,
  onToggleTerminal,
  onToggleGit,
  onToggleTheme,
  onTogglePreview,
  onOpenCommandPalette,
  onBackToDashboard,
  onToggleSocialMode,
  socialMode,
  showAI,
  showYouTube,
  showTerminal,
  showGit,
  showPreview,
}: GhostHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 animate-fade-in-up">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative animate-float">
          <Ghost className="w-6 h-6 text-primary animate-pulse" />
          <div className="absolute inset-0 blur-xl bg-primary/20 -z-10" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-cyan-500 bg-clip-text text-transparent">
          Ghost IDE
        </h1>
      </div>

      {/* Center - File Info */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-muted-foreground font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          {socialMode ? "Social Mode" : "Ready to code"}
        </div>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-2">
        <Button variant={socialMode ? "default" : "ghost"} size="sm" onClick={onToggleSocialMode} className="gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden md:inline">Social</span>
        </Button>

        {!socialMode && (
          <>
            <Button variant={showPreview ? "default" : "ghost"} size="sm" onClick={onTogglePreview} className="gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline">Preview</span>
            </Button>

            <Button variant={showAI ? "default" : "ghost"} size="sm" onClick={onToggleAI} className="gap-2">
              <Bot className="w-4 h-4" />
              <span className="hidden md:inline">AI</span>
            </Button>

            <Button variant={showYouTube ? "default" : "ghost"} size="sm" onClick={onToggleYouTube} className="gap-2">
              <Youtube className="w-4 h-4" />
              <span className="hidden md:inline">Learn</span>
            </Button>

            <Button variant={showGit ? "default" : "ghost"} size="sm" onClick={onToggleGit} className="gap-2">
              <GitBranch className="w-4 h-4" />
              <span className="hidden md:inline">Git</span>
            </Button>

            <Button variant={showTerminal ? "default" : "ghost"} size="sm" onClick={onToggleTerminal} className="gap-2">
              <TerminalIcon className="w-4 h-4" />
              <span className="hidden md:inline">Terminal</span>
            </Button>

            <div className="w-px h-6 bg-border mx-2" />
          </>
        )}

        <Button variant="ghost" size="icon" onClick={onToggleTheme}>
          <Palette className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onOpenCommandPalette}>
          <Zap className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
