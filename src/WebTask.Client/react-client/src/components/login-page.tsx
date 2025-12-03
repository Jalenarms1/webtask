import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../lib/auth"
import { useAuth } from "../../lib/auth-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [email, setEmail] = useState("demo@orbit.space")
  const [password, setPassword] = useState("demo123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = login(email, password)
    if (result) {
      authLogin(result.user, result.token)
      navigate("/dashboard")
    } else {
      setError("Invalid email or password. Try demo@orbit.space / demo123")
    }

    setIsLoading(false)
  }

  return (
    <main className="relative min-h-screen bg-linear-to-b from-background via-background to-primary/5 flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(168, 85, 247, 0.15) 100px,
              rgba(168, 85, 247, 0.15) 200px
            )`,
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Card className="relative w-full max-w-md glass-effect border-primary/10">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground">
              O
            </div>
            <span className="text-2xl font-bold gradient-heading animate-neon-glow">Orbit</span>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="bg-background/50 border-border/30"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white font-bold uppercase tracking-wide group relative overflow-hidden hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 border border-primary/20 hover:border-primary/40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Signing in..." : "Sign In"}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </form>

          <p className="text-sm text-foreground/60 mt-4 text-center">Demo credentials: demo@orbit.space / demo123</p>

          <div className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              Learn more
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
