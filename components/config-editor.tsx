"use client"

import { useState } from "react"
import { X, Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const defaultConfig = {
  editor: {
    fontSize: 14,
    fontFamily: "JetBrains Mono, monospace",
    tabSize: 2,
    lineHeight: 1.6,
    wordWrap: true,
    minimap: true,
    lineNumbers: true,
  },
  theme: {
    current: "phantom-black",
    customColors: {},
  },
  terminal: {
    shell: "bash",
    fontSize: 13,
  },
  ai: {
    model: "gpt-4",
    autoSuggest: true,
  },
  git: {
    autoFetch: true,
    showInlineBlame: true,
  },
}

interface ConfigEditorProps {
  onClose: () => void
}

export function ConfigEditor({ onClose }: ConfigEditorProps) {
  const [config, setConfig] = useState(JSON.stringify(defaultConfig, null, 2))
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    try {
      JSON.parse(config)
      setError(null)
      // Save config logic here
      console.log("[v0] Config saved:", config)
      onClose()
    } catch (e) {
      setError("Invalid JSON format")
    }
  }

  const handleReset = () => {
    setConfig(JSON.stringify(defaultConfig, null, 2))
    setError(null)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-4xl mx-4 h-[80vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Ghost Config</h2>
            <p className="text-sm text-muted-foreground mt-1">Edit your IDE settings in JSON format</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden p-4">
          <textarea
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            className="w-full h-full bg-background border border-border rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            spellCheck={false}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 py-3 bg-destructive/10 border-t border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
