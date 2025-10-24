"use client"

import { useState } from "react"
import { Search, Download, Star, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Extension {
  id: string
  name: string
  description: string
  author: string
  downloads: string
  rating: number
  installed: boolean
}

const extensions: Extension[] = [
  {
    id: "prettier",
    name: "Prettier",
    description: "Code formatter for consistent style",
    author: "Prettier",
    downloads: "10M+",
    rating: 4.9,
    installed: false,
  },
  {
    id: "eslint",
    name: "ESLint",
    description: "JavaScript linting utility",
    author: "ESLint",
    downloads: "8M+",
    rating: 4.8,
    installed: false,
  },
  {
    id: "live-server",
    name: "Live Server",
    description: "Launch a local development server with live reload",
    author: "Ghost Team",
    downloads: "5M+",
    rating: 4.7,
    installed: true,
  },
  {
    id: "git-lens",
    name: "Git Lens",
    description: "Supercharge Git capabilities",
    author: "Ghost Team",
    downloads: "3M+",
    rating: 4.9,
    installed: false,
  },
]

interface ExtensionsMarketplaceProps {
  onClose: () => void
}

export function ExtensionsMarketplace({ onClose }: ExtensionsMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [installedExtensions, setInstalledExtensions] = useState<string[]>(
    extensions.filter((e) => e.installed).map((e) => e.id),
  )

  const filteredExtensions = extensions.filter(
    (ext) =>
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleInstall = (id: string) => {
    setInstalledExtensions((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-4xl mx-4 h-[80vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-bold">Extensions Marketplace</h2>
              <p className="text-sm text-muted-foreground mt-1">Enhance Ghost IDE with community extensions</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search extensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Extensions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredExtensions.map((ext) => {
            const isInstalled = installedExtensions.includes(ext.id)

            return (
              <div
                key={ext.id}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{ext.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span>{ext.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{ext.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{ext.author}</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {ext.downloads}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isInstalled ? "secondary" : "default"}
                    size="sm"
                    onClick={() => toggleInstall(ext.id)}
                  >
                    {isInstalled ? "Uninstall" : "Install"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
