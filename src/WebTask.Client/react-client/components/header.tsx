"use client"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function Header() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  return (
    <header className="relative z-50 border-b border-border/30 backdrop-blur-md bg-background/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-bold text-white glow-text">
              O
            </div>
            <span className="text-xl font-bold glow-text hidden sm:inline">Orbit</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
