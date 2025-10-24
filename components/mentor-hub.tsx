"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Clock, Star, Play, Plus } from "lucide-react"

interface MentorSession {
  id: string
  mentor: string
  mentorAvatar: string
  topic: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  students: number
  maxStudents: number
  startTime: Date
  duration: number
  rating: number
  reviews: number
  isLive: boolean
}

export function MentorHub() {
  const [sessions, setSessions] = useState<MentorSession[]>([
    {
      id: "1",
      mentor: "Sarah Code",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "React Hooks Mastery",
      description: "Deep dive into React Hooks - useState, useEffect, useContext, and custom hooks",
      level: "intermediate",
      students: 12,
      maxStudents: 20,
      startTime: new Date(Date.now() + 1800000),
      duration: 90,
      rating: 4.8,
      reviews: 156,
      isLive: false,
    },
    {
      id: "2",
      mentor: "Alex Dev",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "WebSocket Real-time Apps",
      description: "Build real-time applications with WebSockets and Socket.io",
      level: "advanced",
      students: 8,
      maxStudents: 15,
      startTime: new Date(Date.now() + 3600000),
      duration: 120,
      rating: 4.9,
      reviews: 203,
      isLive: false,
    },
    {
      id: "3",
      mentor: "Mike Builder",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript - variables, functions, objects, and async",
      level: "beginner",
      students: 24,
      maxStudents: 30,
      startTime: new Date(Date.now() - 600000),
      duration: 60,
      rating: 4.7,
      reviews: 89,
      isLive: true,
    },
  ])

  const [myMentoringSessions, setMyMentoringSessions] = useState<MentorSession[]>([
    {
      id: "101",
      mentor: "You",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "TypeScript Advanced Patterns",
      description: "Learn advanced TypeScript patterns and best practices",
      level: "advanced",
      students: 5,
      maxStudents: 20,
      startTime: new Date(Date.now() + 7200000),
      duration: 90,
      rating: 4.6,
      reviews: 42,
      isLive: false,
    },
  ])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-700"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-700"
      case "advanced":
        return "bg-red-500/20 text-red-700"
      default:
        return ""
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderSessionCard = (session: MentorSession, isMySession = false) => (
    <Card key={session.id} className="border-primary/20 bg-card/50 hover:bg-card/70 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <img
              src={session.mentorAvatar || "/placeholder.svg"}
              alt={session.mentor}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{session.topic}</h3>
                {session.isLive && <Badge className="bg-red-500">LIVE</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">by {session.mentor}</p>
              <p className="text-xs text-muted-foreground mt-1">{session.description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={getLevelColor(session.level)}>{session.level}</Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {session.duration}m
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {session.students}/{session.maxStudents}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {session.rating} ({session.reviews})
            </span>
            <span className="text-muted-foreground">{formatTime(session.startTime)}</span>
          </div>
          <Button size="sm" className="gap-2">
            {session.isLive ? (
              <>
                <Play className="w-4 h-4" />
                Join Now
              </>
            ) : isMySession ? (
              <>
                <Plus className="w-4 h-4" />
                Edit
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Enroll
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Ghost Mentor Hub
          </CardTitle>
          <CardDescription>Learn from experienced developers or share your knowledge</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Sessions</TabsTrigger>
          <TabsTrigger value="myMentoring">My Mentoring</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Available Sessions</h2>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Create Session
            </Button>
          </div>
          {sessions.map((session) => renderSessionCard(session))}
        </TabsContent>

        <TabsContent value="myMentoring" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Mentoring Sessions</h2>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Session
            </Button>
          </div>
          {myMentoringSessions.map((session) => renderSessionCard(session, true))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
