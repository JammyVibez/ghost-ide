"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Zap, Heart, Code2, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  points: number
  level: number
  streak: number
  achievement?: string
}

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("week")

  const leaderboards = {
    topCoders: [
      {
        rank: 1,
        username: "Alex Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2450,
        level: 45,
        streak: 28,
        achievement: "Code Master",
      },
      {
        rank: 2,
        username: "Sarah Code",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2180,
        level: 42,
        streak: 21,
        achievement: "Mentor",
      },
      {
        rank: 3,
        username: "Mike Builder",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1950,
        level: 38,
        streak: 15,
        achievement: "Contributor",
      },
      {
        rank: 4,
        username: "Emma Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1720,
        level: 35,
        streak: 12,
        achievement: "",
      },
      {
        rank: 5,
        username: "John Code",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1580,
        level: 32,
        streak: 8,
        achievement: "",
      },
    ],
    mentors: [
      {
        rank: 1,
        username: "Sarah Code",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1850,
        level: 42,
        streak: 21,
        achievement: "Top Mentor",
      },
      {
        rank: 2,
        username: "Alex Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1620,
        level: 45,
        streak: 28,
        achievement: "Mentor",
      },
      {
        rank: 3,
        username: "Lisa Learn",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1420,
        level: 38,
        streak: 18,
        achievement: "Educator",
      },
    ],
    streamers: [
      {
        rank: 1,
        username: "Alex Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 3200,
        level: 45,
        streak: 28,
        achievement: "Streaming Legend",
      },
      {
        rank: 2,
        username: "Mike Builder",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2850,
        level: 38,
        streak: 15,
        achievement: "Popular Streamer",
      },
      {
        rank: 3,
        username: "Emma Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2100,
        level: 35,
        streak: 12,
        achievement: "",
      },
    ],
  }

  const renderLeaderboard = (entries: LeaderboardEntry[]) => (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Card key={entry.rank} className="border-primary/20 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1
                      ? "bg-yellow-500 text-black"
                      : entry.rank === 2
                        ? "bg-gray-400 text-black"
                        : entry.rank === 3
                          ? "bg-orange-600 text-white"
                          : "bg-primary/20 text-foreground"
                  }`}
                >
                  {entry.rank}
                </div>
                <img src={entry.avatar || "/placeholder.svg"} alt={entry.username} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{entry.username}</p>
                  {entry.achievement && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {entry.achievement}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-bold text-lg">{entry.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="font-bold text-lg flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    {entry.streak}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Points</p>
                  <p className="font-bold text-lg text-primary">{entry.points}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-300px)] overflow-y-auto pr-4 space-y-6">
      <Card className="border-primary/20 bg-card/50 sticky top-0 z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Ghost IDE Leaderboard
          </CardTitle>
          <CardDescription>Compete with developers worldwide and earn achievements</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="topCoders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sticky top-24 z-10">
          <TabsTrigger value="topCoders" className="gap-2">
            <Code2 className="w-4 h-4" />
            Top Coders
          </TabsTrigger>
          <TabsTrigger value="mentors" className="gap-2">
            <Heart className="w-4 h-4" />
            Mentors
          </TabsTrigger>
          <TabsTrigger value="streamers" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Streamers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topCoders" className="space-y-4">
          {renderLeaderboard(leaderboards.topCoders)}
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          {renderLeaderboard(leaderboards.mentors)}
        </TabsContent>

        <TabsContent value="streamers" className="space-y-4">
          {renderLeaderboard(leaderboards.streamers)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
