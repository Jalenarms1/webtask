"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login } from "@/lib/auth"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [email, setEmail] = useState("demo@orbit.space")
  const [password, setPassword] = useState("demo123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = login(email, password)
    if (result) {
      authLogin(result.user, result.token)
      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Try demo@orbit.space / demo123")
    }

    setIsLoading(false)
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Card className="relative w-full max-w-md border-border/40 backdrop-blur-xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-bold text-white">
              O
            </div>
            <span className="text-2xl font-bold glow-text">Orbit</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Navigate your work universe</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@orbit.space"
                disabled={isLoading}
                className="bg-background/50 border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="bg-background/50 border-border/30"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-foreground/60 mt-4 text-center">Demo credentials: demo@orbit.space / demo123</p>

          <div className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/" className="text-indigo-500 hover:text-indigo-400 transition-colors">
              Learn more
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
