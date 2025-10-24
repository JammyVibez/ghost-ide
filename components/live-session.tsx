"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, MessageSquare, Play, Square, Share2, Lock, Globe } from "lucide-react"

interface LiveSession {
  id: string
  host: string
  title: string
  description: string
  viewers: number
  mode: "spectate" | "collaborate"
  visibility: "public" | "private" | "invite"
  isLive: boolean
  startTime: Date
}

export function LiveSession() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [sessionMode, setSessionMode] = useState<"spectate" | "collaborate">("spectate")
  const [visibility, setVisibility] = useState<"public" | "private" | "invite">("public")
  const [viewers, setViewers] = useState(0)
  const [chatMessages, setChatMessages] = useState([
    { id: "1", user: "Alex Dev", message: "Great stream!", timestamp: new Date(Date.now() - 60000) },
    { id: "2", user: "Sarah Code", message: "How did you solve that bug?", timestamp: new Date(Date.now() - 30000) },
  ])
  const [messageInput, setMessageInput] = useState("")

  const handleStartStream = () => {
    setIsStreaming(true)
    setViewers(5)
  }

  const handleStopStream = () => {
    setIsStreaming(false)
    setViewers(0)
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: String(chatMessages.length + 1),
          user: "You",
          message: messageInput,
          timestamp: new Date(),
        },
      ])
      setMessageInput("")
    }
  }

  const activeSessions: LiveSession[] = [
    {
      id: "1",
      host: "Alex Dev",
      title: "Building a React Dashboard",
      description: "Live coding session - building a real-time dashboard",
      viewers: 24,
      mode: "spectate",
      visibility: "public",
      isLive: true,
      startTime: new Date(Date.now() - 1800000),
    },
    {
      id: "2",
      host: "Sarah Code",
      title: "Debugging WebSocket Issues",
      description: "Collaborative debugging session",
      viewers: 8,
      mode: "collaborate",
      visibility: "invite",
      isLive: true,
      startTime: new Date(Date.now() - 900000),
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Stream Control Panel */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle>Start a Live Session</CardTitle>
          <CardDescription>Stream your coding or collaborate with others in real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Session Mode</label>
              <div className="flex gap-2">
                <Button
                  variant={sessionMode === "spectate" ? "default" : "outline"}
                  onClick={() => setSessionMode("spectate")}
                  className="flex-1 gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Spectate Only
                </Button>
                <Button
                  variant={sessionMode === "collaborate" ? "default" : "outline"}
                  onClick={() => setSessionMode("collaborate")}
                  className="flex-1 gap-2"
                >
                  <Users className="w-4 h-4" />
                  Collaborate
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Visibility</label>
              <div className="flex gap-2">
                <Button
                  variant={visibility === "public" ? "default" : "outline"}
                  onClick={() => setVisibility("public")}
                  size="sm"
                  className="flex-1 gap-1"
                >
                  <Globe className="w-3 h-3" />
                  Public
                </Button>
                <Button
                  variant={visibility === "invite" ? "default" : "outline"}
                  onClick={() => setVisibility("invite")}
                  size="sm"
                  className="flex-1 gap-1"
                >
                  <Users className="w-3 h-3" />
                  Invite
                </Button>
                <Button
                  variant={visibility === "private" ? "default" : "outline"}
                  onClick={() => setVisibility("private")}
                  size="sm"
                  className="flex-1 gap-1"
                >
                  <Lock className="w-3 h-3" />
                  Private
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {!isStreaming ? (
              <Button onClick={handleStartStream} className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4" />
                Start Streaming
              </Button>
            ) : (
              <Button onClick={handleStopStream} className="flex-1 gap-2 bg-red-600 hover:bg-red-700">
                <Square className="w-4 h-4" />
                Stop Streaming
              </Button>
            )}
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
          </div>

          {isStreaming && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Live - {viewers} viewers</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Active Live Sessions</h2>
        <div className="grid gap-4">
          {activeSessions.map((session) => (
            <Card
              key={session.id}
              className="border-primary/20 bg-card/50 hover:bg-card/70 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500">LIVE</Badge>
                      <span className="text-sm text-muted-foreground">{session.host}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{session.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {session.viewers} watching
                      </span>
                      <span className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {session.mode === "spectate" ? "Spectate" : "Collaborate"}
                        </Badge>
                      </span>
                    </div>
                  </div>
                  <Button>Join</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      {isStreaming && (
        <Card className="border-primary/20 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 overflow-y-auto space-y-2 p-3 bg-background/50 rounded-lg">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="font-semibold text-primary">{msg.user}:</span>
                  <span className="ml-2 text-foreground">{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
              />
              <Button onClick={handleSendMessage} size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
