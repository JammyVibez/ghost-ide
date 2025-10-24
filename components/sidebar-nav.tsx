"use client"

import { Code2, Users, Zap, Settings, LogOut, FileText } from "lucide-react"
import { useState } from "react"

interface SidebarNavProps {
  onNavigate: (section: string) => void
  currentSection: string
}

export function SidebarNav({ onNavigate, currentSection }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mainItems = [
    { id: "editor", label: "Editor", icon: Code2 },
    { id: "social", label: "Community", icon: Users },
    { id: "projects", label: "Projects", icon: FileText },
  ]

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut },
  ]

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} h-screen bg-card border-r border-border flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Ghost</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-secondary rounded-lg transition-colors"
        >
          <Zap className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {mainItems.map((item) => {
          const Icon = item.icon
          const isActive = currentSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <nav className="px-3 py-4 space-y-2 border-t border-border">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
