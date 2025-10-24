"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Theme {
  id: string
  name: string
  description: string
  isDark: boolean
}

const themes: Theme[] = [
  {
    id: "phantom-black",
    name: "Phantom Black",
    description: "The classic Ghost theme with deep blacks and indigo accents",
    isDark: true,
  },
  {
    id: "blue-blaze",
    name: "Blue Blaze",
    description: "Electric blue theme for focused coding sessions",
    isDark: true,
  },
  {
    id: "ghost-white",
    name: "Ghost White",
    description: "Light theme for daytime coding",
    isDark: false,
  },
  {
    id: "matrix-green",
    name: "Matrix Green",
    description: "Classic hacker aesthetic with green terminals",
    isDark: true,
  },
  {
    id: "soul-circuit",
    name: "Soul Circuit",
    description: "Neon blue-green cyber theme inspired by digital circuits",
    isDark: true,
  },
  {
    id: "kiro-neon",
    name: "Kiro Neon",
    description: "Purple-magenta futuristic theme with vibrant neon accents",
    isDark: true,
  },
]

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
  onClose: () => void
}

export function ThemeSelector({ currentTheme, onThemeChange, onClose }: ThemeSelectorProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Choose Your Theme</h2>
            <p className="text-sm text-muted-foreground mt-1">Customize Ghost IDE to match your style</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {themes.map((theme) => {
            const isActive = currentTheme === theme.id

            return (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id)
                  onClose()
                }}
                className={`group relative p-4 rounded-lg border-2 transition-all text-left ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}

                {/* Theme Name */}
                <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{theme.description}</p>

                {/* Theme Badge */}
                <div className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground">
                  {theme.isDark ? "Dark" : "Light"}
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            More themes coming soon. Create your own in Settings.
          </p>
        </div>
      </div>
    </div>
  )
}
