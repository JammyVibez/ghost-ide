"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Zap, Code2 } from "lucide-react"

interface DeveloperProfile {
  id: string
  username: string
  avatar: string
  bio: string
  skills: string[]
  languages: string[]
  followers: number
  following: number
  totalCommits: number
  reputation: number
  level: number
  status: "online" | "offline" | "streaming"
  currentProject?: string
  badges: string[]
  joinedDate: string
}

export function DeveloperProfile({ profile }: { profile: DeveloperProfile }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState(profile.followers)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowers(isFollowing ? followers - 1 : followers + 1)
  }

  const getLevelColor = (level: number) => {
    if (level >= 50) return "bg-yellow-500"
    if (level >= 30) return "bg-purple-500"
    if (level >= 10) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.username}
                  className="w-24 h-24 rounded-full border-2 border-primary"
                />
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-card ${
                    profile.status === "online"
                      ? "bg-green-500"
                      : profile.status === "streaming"
                        ? "bg-red-500"
                        : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profile.username}</h1>
                  <div
                    className={`${getLevelColor(profile.level)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    Level {profile.level}
                  </div>
                </div>
                <p className="text-muted-foreground mt-1">{profile.bio}</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="text-foreground">
                    <strong>{followers}</strong> followers
                  </span>
                  <span className="text-foreground">
                    <strong>{profile.following}</strong> following
                  </span>
                  <span className="text-foreground">
                    <strong>{profile.reputation}</strong> reputation
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"} className="gap-2">
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-card/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-muted-foreground">Commits</span>
            </div>
            <p className="text-2xl font-bold">{profile.totalCommits}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-card/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Achievements</span>
            </div>
            <p className="text-2xl font-bold">{profile.badges.length}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-card/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <p className="text-2xl font-bold">12 days</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-card/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-muted-foreground">Likes</span>
            </div>
            <p className="text-2xl font-bold">342</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills & Languages */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Skills & Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {profile.badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-xs text-center font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
