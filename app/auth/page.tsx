"use client"

import { useState } from "react"
import { Github, Chrome, Zap } from "lucide-react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-cyan-500 bg-clip-text text-transparent">
              Ghost IDE
            </h1>
          </div>
          <p className="text-muted-foreground">{isSignUp ? "Join the developer community" : "Welcome back to Ghost"}</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
              <Zap className="w-5 h-5" />
              Continue with Replit
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form className="space-y-4 mb-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-medium">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
