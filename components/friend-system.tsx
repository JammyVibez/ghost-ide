"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Search, Send } from "lucide-react"

interface Friend {
  id: string
  username: string
  avatar: string
  status: "online" | "offline"
  lastMessage?: string
  unread: number
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: "text" | "snippet"
}

export function FriendSystem() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      username: "Alex Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Great work on that PR!",
      unread: 0,
    },
    {
      id: "2",
      username: "Sarah Code",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Want to pair program?",
      unread: 2,
    },
    {
      id: "3",
      username: "Mike Builder",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "See you tomorrow",
      unread: 0,
    },
  ])

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(friends[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Alex Dev",
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "2",
      sender: "You",
      content: "Great! Just finished the feature",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
    },
    {
      id: "3",
      sender: "Alex Dev",
      content: "Great work on that PR!",
      timestamp: new Date(Date.now() - 600000),
      type: "text",
    },
  ])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: String(messages.length + 1),
          sender: "You",
          content: messageInput,
          timestamp: new Date(),
          type: "text",
        },
      ])
      setMessageInput("")
    }
  }

  const filteredFriends = friends.filter((f) => f.username.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredFriends.map((friend) => (
              <Card
                key={friend.id}
                className="border-primary/20 bg-card/50 cursor-pointer hover:bg-card/70 transition-colors"
                onClick={() => setSelectedFriend(friend)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={friend.avatar || "/placeholder.svg"}
                          alt={friend.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-card ${friend.status === "online" ? "bg-green-500" : "bg-gray-500"}`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{friend.username}</p>
                        <p className="text-sm text-muted-foreground">{friend.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {friend.unread > 0 && (
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                          {friend.unread}
                        </span>
                      )}
                      <Button size="sm" variant="ghost" className="gap-1">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          {selectedFriend && (
            <Card className="border-primary/20 bg-card/50 h-96 flex flex-col">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedFriend.avatar || "/placeholder.svg"}
                    alt={selectedFriend.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-base">{selectedFriend.username}</CardTitle>
                    <CardDescription className="text-xs">
                      {selectedFriend.status === "online" ? "Online" : "Offline"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t border-border/50 p-4 flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
