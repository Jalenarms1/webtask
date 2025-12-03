"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, validateToken, AUTH_TOKEN_KEY } from "./auth"

const AuthContext = createContext<
  (AuthState & { login: (user: User, token: string) => void; logout: () => void }) | undefined
>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  })

  const [isLoading, setIsLoading] = useState(true)

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      const user = validateToken(token)
      if (user) {
        setState({ user, isAuthenticated: true, token })
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    setState({ user, isAuthenticated: true, token })
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setState({ user: null, isAuthenticated: false, token: null })
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
