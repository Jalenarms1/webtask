export const AUTH_TOKEN_KEY = "auth_token"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

// Mock user database (in production, this would be a real database)
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@orbit.space",
    password: "demo123", // In production, this would be hashed
    name: "Alex Navigator",
    avatar: "/placeholder-user.jpg",
  },
]

export function generateToken(user: User): string {
  // Simple token generation (in production, use proper JWT library)
  return btoa(JSON.stringify({ userId: user.id, iat: Date.now() }))
}

export function validateToken(token: string): User | null {
  try {
    const decoded = JSON.parse(atob(token))
    const user = MOCK_USERS.find((u) => u.id === decoded.userId)
    return user ? { id: user.id, email: user.email, name: user.name, avatar: user.avatar } : null
  } catch {
    return null
  }
}

export function login(email: string, password: string): { user: User; token: string } | null {
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)
  if (!user) return null

  const userData: User = { id: user.id, email: user.email, name: user.name, avatar: user.avatar }
  const token = generateToken(userData)
  return { user: userData, token }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}
