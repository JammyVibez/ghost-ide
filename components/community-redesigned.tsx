"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Flame, Clock, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Post {
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
  timestamp: string
  tags: string[]
  type: "project" | "snippet" | "tutorial" | "discussion"
  liked?: boolean
  views: number
}

export function CommunityRedesigned() {
  const [sortBy, setSortBy] = useState<"trending" | "hot" | "recent">("trending")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Alex Chen",
      avatar: "/developer-working.png",
      title: "Building a Real-time Collaborative Editor",
      description:
        "Deep dive into building a real-time collaborative code editor with WebSockets and Operational Transformation. Includes performance optimization tips.",
      language: "TypeScript",
      likes: 1240,
      comments: 89,
      shares: 234,
      timestamp: "2 hours ago",
      tags: ["websockets", "typescript", "realtime", "collaboration"],
      type: "tutorial",
      views: 5420,
      liked: false,
    },
    {
      id: "2",
      author: "Sarah Williams",
      avatar: "/developer-working.png",
      title: "React Performance Optimization Patterns",
      description:
        "Comprehensive guide to optimizing React applications. Covers memoization, code splitting, lazy loading, and profiling techniques.",
      language: "React",
      likes: 2150,
      comments: 156,
      shares: 412,
      timestamp: "4 hours ago",
      tags: ["react", "performance", "optimization", "javascript"],
      type: "tutorial",
      views: 8920,
      liked: false,
    },
    {
      id: "3",
      author: "Mike Johnson",
      avatar: "/developer-working.png",
      title: "Advanced TypeScript Patterns",
      description:
        "Explore advanced TypeScript patterns including generics, conditional types, and utility types for building scalable applications.",
      code: "type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T",
      language: "TypeScript",
      likes: 892,
      comments: 67,
      shares: 145,
      timestamp: "6 hours ago",
      tags: ["typescript", "patterns", "advanced"],
      type: "snippet",
      views: 3210,
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

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "trending") return b.likes - a.likes
    if (sortBy === "hot") return b.views - a.views
    return 0
  })

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold mb-4">Community</h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, snippets, tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Sort Tabs */}
        <div className="flex gap-2">
          {[
            { id: "trending", label: "Trending", icon: TrendingUp },
            { id: "hot", label: "Hot", icon: Flame },
            { id: "recent", label: "Recent", icon: Clock },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSortBy(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                sortBy === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                {/* Author */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-12 h-12 rounded-full border border-border"
                    />
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {post.type}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.description}</p>

                {/* Code Block */}
                {post.code && (
                  <div className="bg-background border border-border rounded-lg p-4 mb-4 font-mono text-xs overflow-x-auto">
                    <code className="text-cyan-400">{post.code}</code>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                  <span>{post.views.toLocaleString()} views</span>
                  <span>{post.comments} comments</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                        post.liked
                          ? "text-red-500 bg-red-500/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
