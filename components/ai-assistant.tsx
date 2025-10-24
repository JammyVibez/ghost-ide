"use client"

import { useState } from "react"
import { Bot, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Ghost, your AI coding companion. I can help you debug, explain code, suggest improvements, and find relevant tutorials. What are you working on?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "I'm analyzing your request... (AI integration coming soon!)",
      },
    ])
    setInput("")
  }

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bot className="w-5 h-5 text-primary" />
            <Sparkles className="w-3 h-3 text-cyan-500 absolute -top-1 -right-1" />
          </div>
          <h2 className="text-sm font-semibold">Ghost Assistant</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Ghost anything..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
