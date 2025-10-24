"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Mic, MicOff, Video, VideoOff, Copy, Trash2, UserPlus } from "lucide-react"

interface CoderInRoom {
  id: string
  username: string
  avatar: string
  role: "owner" | "editor" | "viewer"
  cursorLine: number
  cursorCol: number
  isActive: boolean
  audioEnabled: boolean
  videoEnabled: boolean
}

export function CoCodingRoom() {
  const [room, setRoom] = useState({
    id: "room-12345",
    name: "React Dashboard Project",
    owner: "Alex Dev",
    createdAt: new Date(Date.now() - 1800000),
    coders: [
      {
        id: "1",
        username: "Alex Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "owner" as const,
        cursorLine: 42,
        cursorCol: 15,
        isActive: true,
        audioEnabled: true,
        videoEnabled: false,
      },
      {
        id: "2",
        username: "Sarah Code",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "editor" as const,
        cursorLine: 38,
        cursorCol: 8,
        isActive: true,
        audioEnabled: true,
        videoEnabled: true,
      },
      {
        id: "3",
        username: "Mike Builder",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "viewer" as const,
        cursorLine: 0,
        cursorCol: 0,
        isActive: false,
        audioEnabled: false,
        videoEnabled: false,
      },
    ] as CoderInRoom[],
  })

  const [inviteLink, setInviteLink] = useState(false)
  const [myAudio, setMyAudio] = useState(true)
  const [myVideo, setMyVideo] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://ghost.dev/room/${room.id}`)
    setInviteLink(true)
    setTimeout(() => setInviteLink(false), 2000)
  }

  const handleRemoveCoder = (coderId: string) => {
    setRoom({
      ...room,
      coders: room.coders.filter((c) => c.id !== coderId),
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-500/20 text-yellow-700"
      case "editor":
        return "bg-blue-500/20 text-blue-700"
      case "viewer":
        return "bg-gray-500/20 text-gray-700"
      default:
        return ""
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Room Header */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{room.name}</CardTitle>
              <CardDescription>
                Hosted by {room.owner} - {room.coders.length} collaborators
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopyLink} className="gap-2">
                <Copy className="w-4 h-4" />
                {inviteLink ? "Copied!" : "Copy Link"}
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <UserPlus className="w-4 h-4" />
                Invite
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Editor Area */}
      <div className="grid grid-cols-4 gap-4">
        {/* Code Editor */}
        <div className="col-span-3">
          <Card className="border-primary/20 bg-card/50 h-96">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 bg-background/50 rounded-lg p-4 font-mono text-sm overflow-auto">
                <div className="text-cyan-400">
                  <div>{"// React Dashboard Component"}</div>
                  <div>{"export function Dashboard() {"}</div>
                  <div className="ml-4">
                    {"const [data, setData] = useState([]);"}
                    <span className="ml-2 text-yellow-400">// Sarah's cursor here</span>
                  </div>
                  <div className="ml-4">
                    {"return ("} <span className="ml-2 text-green-400">// Alex's cursor here</span>
                  </div>
                  <div className="ml-8">{'<div className="dashboard">'}</div>
                  <div className="ml-12">{"<Chart data={data} />"}</div>
                  <div className="ml-8">{"</div>"}</div>
                  <div className="ml-4">{")"}</div>
                  <div>{"}"}</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>Real-time sync enabled - All changes synchronized instantly</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaborators Panel */}
        <div className="space-y-4">
          <Card className="border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4" />
                Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {room.coders.map((coder) => (
                <div key={coder.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-background/50">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative">
                      <img
                        src={coder.avatar || "/placeholder.svg"}
                        alt={coder.username}
                        className="w-8 h-8 rounded-full"
                      />
                      {coder.isActive && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{coder.username}</p>
                      <Badge variant="outline" className={`text-xs ${getRoleColor(coder.role)}`}>
                        {coder.role}
                      </Badge>
                    </div>
                  </div>
                  {coder.id !== "1" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveCoder(coder.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Media Controls */}
          <Card className="border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={myAudio ? "default" : "outline"}
                onClick={() => setMyAudio(!myAudio)}
                className="w-full gap-2"
              >
                {myAudio ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                {myAudio ? "Mute" : "Unmute"}
              </Button>
              <Button
                variant={myVideo ? "default" : "outline"}
                onClick={() => setMyVideo(!myVideo)}
                className="w-full gap-2"
              >
                {myVideo ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                {myVideo ? "Stop Video" : "Start Video"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terminal Output */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Shared Terminal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background/50 rounded-lg p-4 font-mono text-sm h-32 overflow-auto">
            <div className="text-green-400">
              <div>{"$ npm run dev"}</div>
              <div className="text-gray-400">{"Compiling..."}</div>
              <div className="text-green-400">{"✓ Compiled successfully"}</div>
              <div className="text-blue-400">{"Server running at http://localhost:3000"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
