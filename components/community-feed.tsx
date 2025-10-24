"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, TrendingUp, Flame } from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  title: string
  description: string
  code?: string
  language?: string
  likes: number
  comments: number
  shares: number
  timestamp: Date
  tags: string[]
  type: "project" | "snippet" | "tutorial" | "discussion"
  liked?: boolean
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Alex Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Built a Real-time Chat App with WebSockets",
      description:
        "Just finished building a real-time chat application using Node.js and Socket.io. Check out the repo!",
      language: "JavaScript",
      likes: 342,
      comments: 28,
      shares: 15,
      timestamp: new Date(Date.now() - 3600000),
      tags: ["websockets", "nodejs", "realtime"],
      type: "project",
      liked: false,
    },
    {
      id: "2",
      author: "Sarah Code",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "React Hooks Best Practices",
      description: "A comprehensive guide to using React Hooks effectively in your projects.",
      language: "React",
      likes: 521,
      comments: 45,
      shares: 32,
      timestamp: new Date(Date.now() - 7200000),
      tags: ["react", "hooks", "tutorial"],
      type: "tutorial",
      liked: false,
    },
    {
      id: "3",
      author: "Mike Builder",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Elegant Debounce Implementation",
      description: "A clean and efficient debounce function for handling rapid events.",
      code: "const debounce = (fn, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), delay); }; }",
      language: "JavaScript",
      likes: 189,
      comments: 12,
      shares: 8,
      timestamp: new Date(Date.now() - 10800000),
      tags: ["javascript", "utility", "performance"],
      type: "snippet",
      liked: false,
    },
  ])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "project":
        return "🚀"
      case "snippet":
        return "📝"
      case "tutorial":
        return "📚"
      case "discussion":
        return "💬"
      default:
        return "✨"
    }
  }

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes)

  return (
    <div className="w-full max-w-2xl mx-auto h-[calc(100vh-300px)] overflow-y-auto pr-4 space-y-4">
      <div className="flex gap-2 mb-4 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
        <Button variant="default" className="gap-2">
          <TrendingUp className="w-4 h-4" />
          Trending
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Flame className="w-4 h-4" />
          Hot
        </Button>
        <Button variant="outline">Recent</Button>
      </div>

      {sortedPosts.map((post) => (
        <Card key={post.id} className="border-primary/20 bg-card/50 hover:bg-card/70 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{post.author}</span>
                  <Badge variant="outline" className="text-xs">
                    {getPostIcon(post.type)} {post.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{post.timestamp.toLocaleString()}</p>
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{post.description}</p>

            {post.code && (
              <div className="bg-background/50 border border-border/50 rounded-lg p-3 mb-3 font-mono text-xs overflow-x-auto">
                <code className="text-cyan-400">{post.code}</code>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => handleLike(post.id)}>
                <Heart className="w-4 h-4 mr-2" />
                {post.likes} Likes
              </Button>
              <Button variant="ghost">
                <MessageCircle className="w-4 h-4 mr-2" />
                {post.comments} Comments
              </Button>
              <Button variant="ghost">
                <Share2 className="w-4 h-4 mr-2" />
                {post.shares} Shares
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
