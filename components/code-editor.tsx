"use client"

import { useEffect, useRef, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeEditorProps {
  activeFile: string | null
  content: string
  onContentChange: (content: string) => void
}

export function CodeEditor({ activeFile, content, onContentChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [lineCount, setLineCount] = useState(1)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 })

  useEffect(() => {
    const lines = content.split("\n").length
    setLineCount(lines)
  }, [content])

  const handleCursorChange = () => {
    if (!textareaRef.current) return
    const textarea = textareaRef.current
    const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart)
    const lines = textBeforeCursor.split("\n")
    const line = lines.length
    const col = lines[lines.length - 1].length + 1
    setCursorPosition({ line, col })
  }

  const handleExport = () => {
    if (!activeFile) return
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = activeFile
    a.click()
    URL.revokeObjectURL(url)
  }

  const getLanguage = (fileName: string | null) => {
    if (!fileName) return "Text"
    const ext = fileName.split(".").pop()?.toLowerCase()
    const langMap: Record<string, string> = {
      ts: "TypeScript",
      tsx: "TypeScript React",
      js: "JavaScript",
      jsx: "JavaScript React",
      py: "Python",
      md: "Markdown",
      json: "JSON",
      css: "CSS",
      html: "HTML",
      txt: "Text",
    }
    return langMap[ext || ""] || "Text"
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Editor Tabs */}
      {activeFile && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-border bg-card animate-fade-in">
          <div className="px-3 py-1.5 bg-secondary rounded text-sm font-mono transition-all hover:bg-secondary/80">
            {activeFile}
          </div>
          <Button variant="ghost" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden flex animate-fade-in">
        {/* Line Numbers */}
        <div className="w-12 bg-card border-r border-border flex-shrink-0 overflow-hidden">
          <div className="py-4 px-2 text-right text-xs text-muted-foreground font-mono leading-6">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>
        </div>

        {/* Text Editor */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onKeyUp={handleCursorChange}
          onClick={handleCursorChange}
          placeholder={activeFile ? "Start coding..." : "Select a file to start coding"}
          className="flex-1 p-4 bg-background text-foreground font-mono text-sm leading-6 resize-none outline-none"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-border bg-card flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>LF</span>
          <span>{getLanguage(activeFile)}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.col}
          </span>
          <span>{content.length} chars</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            Ghost Active
          </span>
        </div>
      </div>
    </div>
  )
}
