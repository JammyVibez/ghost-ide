"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { GhostHeader } from "./ghost-header"
import { FileExplorer } from "./file-explorer"
import { CodeEditor } from "./code-editor"
import { Terminal } from "./terminal"
import { AIAssistant } from "./ai-assistant"
import { YouTubeSidebar } from "./youtube-sidebar"
import { GitPanel } from "./git-panel"
import { ThemeSelector } from "./theme-selector"
import { GhostSpirit } from "./ghost-spirit"
import { ResizablePanel } from "./resizable-panel"
import { LivePreview } from "./live-preview"
import { CommandPalette } from "./command-palette"
import { Dashboard } from "./dashboard"
import { SocialHub } from "./social-hub"
import { X } from "lucide-react"

export function GhostIDE() {
  const [showDashboard, setShowDashboard] = useState(true)
  const [socialMode, setSocialMode] = useState(false)
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [showAI, setShowAI] = useState(true)
  const [showYouTube, setShowYouTube] = useState(false)
  const [showGit, setShowGit] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [replaceQuery, setReplaceQuery] = useState("")
  const [theme, setTheme] = useState("phantom-black")
  const [fileContent, setFileContent] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<string[]>([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowCommandPalette(true)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault()
        setShowSearch(true)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === "Escape") {
        setShowCommandPalette(false)
        setShowSearch(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)

    droppedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        const fileName = file.name
        setFiles((prev) => (prev.includes(fileName) ? prev : [...prev, fileName]))
        setFileContent((prev) => ({ ...prev, [fileName]: content }))
        setOpenTabs((prev) => (prev.includes(fileName) ? prev : [...prev, fileName]))
        setActiveTab(fileName)
        setShowDashboard(false)
      }
      reader.readAsText(file)
    })
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleCodeChange = useCallback((fileName: string, content: string) => {
    setFileContent((prev) => ({ ...prev, [fileName]: content }))
  }, [])

  const handleCreateFile = useCallback(
    (fileName: string) => {
      if (!files.includes(fileName)) {
        setFiles((prev) => [...prev, fileName])
        setFileContent((prev) => ({ ...prev, [fileName]: "" }))
        setOpenTabs((prev) => [...prev, fileName])
        setActiveTab(fileName)
        setShowDashboard(false)
      }
    },
    [files],
  )

  const handleDeleteFile = useCallback(
    (fileName: string) => {
      setFiles((prev) => prev.filter((f) => f !== fileName))
      setFileContent((prev) => {
        const newContent = { ...prev }
        delete newContent[fileName]
        return newContent
      })
      setOpenTabs((prev) => prev.filter((f) => f !== fileName))
      if (activeTab === fileName) {
        const remainingTabs = openTabs.filter((f) => f !== fileName)
        setActiveTab(remainingTabs[0] || null)
      }
    },
    [files, activeTab, openTabs],
  )

  const handleRenameFile = useCallback(
    (oldName: string, newName: string) => {
      setFiles((prev) => prev.map((f) => (f === oldName ? newName : f)))
      setFileContent((prev) => {
        const newContent = { ...prev }
        newContent[newName] = newContent[oldName]
        delete newContent[oldName]
        return newContent
      })
      setOpenTabs((prev) => prev.map((f) => (f === oldName ? newName : f)))
      if (activeTab === oldName) {
        setActiveTab(newName)
      }
    },
    [activeTab],
  )

  const handleFileSelect = useCallback((fileName: string) => {
    setOpenTabs((prev) => (prev.includes(fileName) ? prev : [...prev, fileName]))
    setActiveTab(fileName)
  }, [])

  const handleCloseTab = useCallback(
    (fileName: string) => {
      const newTabs = openTabs.filter((f) => f !== fileName)
      setOpenTabs(newTabs)
      if (activeTab === fileName) {
        setActiveTab(newTabs[newTabs.length - 1] || null)
      }
    },
    [openTabs, activeTab],
  )

  const handleSearch = useCallback(() => {
    if (!activeTab || !searchQuery) return
    const content = fileContent[activeTab]
    const index = content.toLowerCase().indexOf(searchQuery.toLowerCase())
    if (index !== -1) {
      // Highlight found text (simplified - in real implementation would use editor API)
      console.log("[v0] Found at index:", index)
    }
  }, [activeTab, searchQuery, fileContent])

  const handleReplace = useCallback(() => {
    if (!activeTab || !searchQuery) return
    const content = fileContent[activeTab]
    const newContent = content.replace(new RegExp(searchQuery, "gi"), replaceQuery)
    handleCodeChange(activeTab, newContent)
  }, [activeTab, searchQuery, replaceQuery, fileContent, handleCodeChange])

  const handleReplaceAll = useCallback(() => {
    if (!activeTab || !searchQuery) return
    const content = fileContent[activeTab]
    const newContent = content.replaceAll(searchQuery, replaceQuery)
    handleCodeChange(activeTab, newContent)
  }, [activeTab, searchQuery, replaceQuery, fileContent, handleCodeChange])

  const handleStartCoding = () => {
    setShowDashboard(false)
    if (files.length === 0) {
      handleCreateFile("index.html")
    }
  }

  const parallaxOffset =
    windowSize.width > 0
      ? {
          x: (cursorPosition.x - windowSize.width / 2) / 50,
          y: (cursorPosition.y - windowSize.height / 2) / 50,
        }
      : { x: 0, y: 0 }

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)

    // Apply dark class for dark themes
    const darkThemes = ["phantom-black", "soul-circuit", "kiro-neon"]
    if (darkThemes.includes(theme)) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  return (
    <div
      className="flex flex-col h-screen w-screen bg-background overflow-hidden relative animated-gradient"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <div
        className="cursor-trail"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      />

      <GhostSpirit />

      {showCommandPalette && (
        <CommandPalette
          onClose={() => setShowCommandPalette(false)}
          onCommand={(cmd) => {
            if (cmd === "toggle-ai") setShowAI(!showAI)
            if (cmd === "toggle-terminal") setShowTerminal(!showTerminal)
            if (cmd === "toggle-git") setShowGit(!showGit)
            if (cmd === "toggle-youtube") setShowYouTube(!showYouTube)
            if (cmd === "toggle-preview") setShowPreview(!showPreview)
            if (cmd === "change-theme") setShowThemeSelector(true)
            if (cmd === "new-file") {
              const fileName = prompt("Enter file name:")
              if (fileName) handleCreateFile(fileName)
            }
            setShowCommandPalette(false)
          }}
        />
      )}

      {showSearch && (
        <div className="fixed top-20 right-4 z-50 bg-card border border-border rounded-lg shadow-2xl p-4 w-96 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Find and Replace</h3>
            <button onClick={() => setShowSearch(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Find..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:opacity-90"
              >
                Find
              </button>
              <button
                onClick={handleReplace}
                className="flex-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:opacity-90"
              >
                Replace
              </button>
              <button
                onClick={handleReplaceAll}
                className="flex-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:opacity-90"
              >
                Replace All
              </button>
            </div>
          </div>
        </div>
      )}

      {showDashboard ? (
        <Dashboard
          onStartCoding={handleStartCoding}
          recentFiles={files}
          onOpenFile={(file) => {
            handleFileSelect(file)
            setShowDashboard(false)
          }}
        />
      ) : socialMode ? (
        <>
          <GhostHeader
            onToggleAI={() => setShowAI(!showAI)}
            onToggleYouTube={() => setShowYouTube(!showYouTube)}
            onToggleGit={() => setShowGit(!showGit)}
            onToggleTerminal={() => setShowTerminal(!showTerminal)}
            onToggleTheme={() => setShowThemeSelector(!showThemeSelector)}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onOpenCommandPalette={() => setShowCommandPalette(true)}
            onBackToDashboard={() => setShowDashboard(true)}
            onToggleSocialMode={() => setSocialMode(false)}
            socialMode={socialMode}
            showAI={showAI}
            showYouTube={showYouTube}
            showGit={showGit}
            showTerminal={showTerminal}
            showPreview={showPreview}
          />
          <div className="flex-1 overflow-hidden">
            <SocialHub />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <GhostHeader
              onToggleAI={() => setShowAI(!showAI)}
              onToggleYouTube={() => setShowYouTube(!showYouTube)}
              onToggleGit={() => setShowGit(!showGit)}
              onToggleTerminal={() => setShowTerminal(!showTerminal)}
              onToggleTheme={() => setShowThemeSelector(!showThemeSelector)}
              onTogglePreview={() => setShowPreview(!showPreview)}
              onOpenCommandPalette={() => setShowCommandPalette(true)}
              onBackToDashboard={() => setShowDashboard(true)}
              onToggleSocialMode={() => setSocialMode(true)}
              socialMode={socialMode}
              showAI={showAI}
              showYouTube={showYouTube}
              showGit={showGit}
              showTerminal={showTerminal}
              showPreview={showPreview}
            />
          </div>

          {showThemeSelector && (
            <ThemeSelector currentTheme={theme} onThemeChange={setTheme} onClose={() => setShowThemeSelector(false)} />
          )}

          <div className="flex flex-1 overflow-hidden">
            <div
              className="w-64 border-r border-border bg-card animate-fade-in"
              style={{
                transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <FileExplorer
                activeFile={activeTab}
                onFileSelect={handleFileSelect}
                files={files}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onRenameFile={handleRenameFile}
              />
            </div>

            <div className="flex-1 flex flex-col relative">
              <div className="code-aura" />

              {openTabs.length > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-card border-b border-border overflow-x-auto">
                  {openTabs.map((tab) => (
                    <div
                      key={tab}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-t cursor-pointer transition-colors ${
                        activeTab === tab
                          ? "bg-background text-foreground border-t border-l border-r border-border"
                          : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <span className="text-sm">{tab}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCloseTab(tab)
                        }}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex-1 overflow-hidden flex">
                <div className={showPreview ? "flex-1" : "w-full"}>
                  <CodeEditor
                    activeFile={activeTab}
                    content={activeTab ? fileContent[activeTab] : ""}
                    onContentChange={(content) => activeTab && handleCodeChange(activeTab, content)}
                  />
                </div>
                {showPreview && (
                  <div className="flex-1 border-l border-border bg-card">
                    <LivePreview
                      code={activeTab ? fileContent[activeTab] : ""}
                      fileType={activeTab?.split(".").pop() || ""}
                    />
                  </div>
                )}
              </div>

              {showTerminal && (
                <div className="h-64 border-t border-border bg-card animate-fade-in">
                  <Terminal />
                </div>
              )}
            </div>

            {showGit && (
              <ResizablePanel defaultWidth={400} minWidth={300} maxWidth={600} side="right">
                <div className="h-full bg-card animate-scale-in">
                  <GitPanel />
                </div>
              </ResizablePanel>
            )}

            {showAI && (
              <ResizablePanel defaultWidth={400} minWidth={300} maxWidth={600} side="right">
                <div className="h-full bg-card animate-scale-in shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <AIAssistant />
                </div>
              </ResizablePanel>
            )}

            {showYouTube && (
              <ResizablePanel defaultWidth={400} minWidth={300} maxWidth={600} side="right">
                <div className="h-full bg-card animate-scale-in">
                  <YouTubeSidebar />
                </div>
              </ResizablePanel>
            )}
          </div>
        </>
      )}
    </div>
  )
}
