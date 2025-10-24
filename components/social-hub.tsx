"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Zap, TrendingUp, MessageSquare, BookOpen, Trophy } from "lucide-react"
import { DeveloperProfile } from "./developer-profile"
import { FriendSystem } from "./friend-system"
import { LiveSession } from "./live-session"
import { CommunityFeed } from "./community-feed"
import { Leaderboard } from "./leaderboard"
import { MentorHub } from "./mentor-hub"

export function SocialHub() {
  const [activeTab, setActiveTab] = useState("profile")

  const currentUser = {
    id: "user-123",
    username: "You",
    avatar: "/placeholder.svg?height=96&width=96",
    bio: "Full-stack developer passionate about building amazing things",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    languages: ["JavaScript", "TypeScript", "Python", "Go"],
    followers: 342,
    following: 128,
    totalCommits: 1247,
    reputation: 2850,
    level: 28,
    status: "online" as const,
    currentProject: "Ghost IDE",
    badges: ["Code Master", "Mentor", "Contributor", "Streamer"],
    joinedDate: "2023-01-15",
  }

  return (
    <div className="w-full h-screen bg-background flex flex-col">
      {/* Header - Fixed */}
      <div className="px-6 pt-6 pb-4 border-b border-border/50">
        <h1 className="text-4xl font-bold mb-2">Ghost Community</h1>
        <p className="text-muted-foreground">Connect, collaborate, and grow with developers worldwide</p>
      </div>

      {/* Quick Stats - Fixed */}
      <div className="px-6 py-4 border-b border-border/50">
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">12.4K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Live Sessions</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Projects Shared</p>
                  <p className="text-2xl font-bold">3.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Messages Today</p>
                  <p className="text-2xl font-bold">8.9K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation - Fixed */}
      <div className="px-6 border-b border-border/50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="gap-2">
              <Users className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="friends" className="gap-2">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Zap className="w-4 h-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="mentor" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Mentor
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <div className="overflow-hidden">
            <TabsContent value="profile" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <DeveloperProfile profile={currentUser} />
            </TabsContent>

            <TabsContent value="friends" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <FriendSystem />
            </TabsContent>

            <TabsContent value="live" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <LiveSession />
            </TabsContent>

            <TabsContent value="community" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <CommunityFeed />
            </TabsContent>

            <TabsContent value="mentor" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <MentorHub />
            </TabsContent>

            <TabsContent value="leaderboard" className="h-[calc(100vh-380px)] overflow-y-auto pr-4">
              <Leaderboard />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
