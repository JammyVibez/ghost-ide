"use client"

import { useState } from "react"
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  GitMerge,
  Plus,
  Check,
  Clock,
  User,
  Github,
  Upload,
  Download,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Commit {
  hash: string
  message: string
  author: string
  time: string
  branch: string
}

const demoCommits: Commit[] = [
  {
    hash: "a3f2c1d",
    message: "Add AI assistant integration",
    author: "You",
    time: "2 hours ago",
    branch: "main",
  },
  {
    hash: "b7e4d2a",
    message: "Implement file explorer with tree view",
    author: "You",
    time: "5 hours ago",
    branch: "main",
  },
  {
    hash: "c9f1a3b",
    message: "Setup Ghost IDE theme system",
    author: "You",
    time: "1 day ago",
    branch: "main",
  },
  {
    hash: "d2e5b4c",
    message: "Initial commit - Ghost IDE foundation",
    author: "You",
    time: "2 days ago",
    branch: "main",
  },
]

interface ChangedFile {
  path: string
  status: "modified" | "added" | "deleted"
  additions: number
  deletions: number
}

const demoChanges: ChangedFile[] = [
  { path: "src/components/ghost-ide.tsx", status: "modified", additions: 12, deletions: 3 },
  { path: "src/components/git-panel.tsx", status: "added", additions: 150, deletions: 0 },
  { path: "src/styles/globals.css", status: "modified", additions: 5, deletions: 2 },
]

export function GitPanel() {
  const [commitMessage, setCommitMessage] = useState("")
  const [currentBranch] = useState("main")
  const [activeTab, setActiveTab] = useState("changes")

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-500" />
            <h2 className="text-sm font-semibold">Source Control</h2>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Branch */}
        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <GitBranch className="w-4 h-4 text-cyan-500" />
          <span className="text-sm font-mono">{currentBranch}</span>
          <div className="ml-auto flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Upload className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
          <TabsTrigger value="changes" className="data-[state=active]:bg-secondary">
            Changes
          </TabsTrigger>
          <TabsTrigger value="commits" className="data-[state=active]:bg-secondary">
            Commits
          </TabsTrigger>
          <TabsTrigger value="branches" className="data-[state=active]:bg-secondary">
            Branches
          </TabsTrigger>
        </TabsList>

        {/* Changes Tab */}
        <TabsContent value="changes" className="flex-1 flex flex-col m-0">
          {/* Commit Message */}
          <div className="p-4 border-b border-border space-y-2">
            <Input
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message..."
              className="w-full"
            />
            <Button className="w-full gap-2" disabled={!commitMessage.trim()}>
              <Check className="w-4 h-4" />
              Commit Changes
            </Button>
          </div>

          {/* Changed Files */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3">CHANGES ({demoChanges.length})</h3>
            <div className="space-y-2">
              {demoChanges.map((file) => (
                <div
                  key={file.path}
                  className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {file.status === "modified" && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                        {file.status === "added" && <div className="w-2 h-2 rounded-full bg-green-500" />}
                        {file.status === "deleted" && <div className="w-2 h-2 rounded-full bg-red-500" />}
                        <span className="text-sm font-mono truncate">{file.path}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="text-green-500">+{file.additions}</span>
                        <span className="text-red-500">-{file.deletions}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Commits Tab */}
        <TabsContent value="commits" className="flex-1 overflow-y-auto m-0 p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">COMMIT HISTORY</h3>
          <div className="space-y-3">
            {demoCommits.map((commit) => (
              <div
                key={commit.hash}
                className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GitCommit className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">{commit.message}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {commit.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {commit.time}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {commit.hash}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Branches Tab */}
        <TabsContent value="branches" className="flex-1 overflow-y-auto m-0 p-4">
          <div className="space-y-4">
            {/* Create Branch */}
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <h3 className="text-sm font-semibold mb-3">Create New Branch</h3>
              <div className="flex gap-2">
                <Input placeholder="feature/new-branch" className="flex-1" />
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </div>
            </div>

            {/* Branch List */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-3">LOCAL BRANCHES</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-primary bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-primary" />
                      <span className="text-sm font-mono">main</span>
                      <span className="text-xs text-primary">current</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-mono">feature/ai-improvements</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <GitMerge className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-mono">fix/terminal-bug</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <GitMerge className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Integration */}
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center gap-2 mb-3">
                <Github className="w-5 h-5" />
                <h3 className="text-sm font-semibold">GitHub</h3>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full gap-2 justify-start bg-transparent" size="sm">
                  <GitPullRequest className="w-4 h-4" />
                  Create Pull Request
                </Button>
                <Button variant="outline" className="w-full gap-2 justify-start bg-transparent" size="sm">
                  <Upload className="w-4 h-4" />
                  Push to Remote
                </Button>
                <Button variant="outline" className="w-full gap-2 justify-start bg-transparent" size="sm">
                  <Download className="w-4 h-4" />
                  Pull from Remote
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
