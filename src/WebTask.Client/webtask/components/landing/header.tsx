"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

export default function Header() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <header className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-lg font-black text-foreground">P</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter">PRISM</span>
              <p className="text-xs text-foreground/50 tracking-widest uppercase">COLLAB</p>
            </div>
          </Link>

          <nav className="hidden md:flex gap-10">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-wide"
            >
              Features
            </Link>
            <Link
              href="#capabilities"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-wide"
            >
              Platform
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-wide"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex gap-3">
            {user ? (
              <Button onClick={() => router.push("/dashboard")} variant="default" size="sm" className="font-bold">
                Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => router.push("/login")} variant="ghost" size="sm" className="font-bold">
                  Sign in
                </Button>
                <Button onClick={() => router.push("/login")} variant="default" size="sm" className="font-bold">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
