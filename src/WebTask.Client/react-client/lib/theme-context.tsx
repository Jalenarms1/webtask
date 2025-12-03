import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  theme: "light" | "dark" | "auto"
  setTheme: (theme: "light" | "dark" | "auto") => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark" | "auto">("dark")
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "auto" | null
    const initialTheme = savedTheme || "dark"
    setThemeState(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "auto") => {
    const htmlElement = document.documentElement

    if (newTheme === "auto") {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      htmlElement.classList.toggle("dark", prefersDark)
    } else {
      // Apply explicit light or dark
      htmlElement.classList.toggle("dark", newTheme === "dark")
    }
  }

  const setTheme = (newTheme: "light" | "dark" | "auto") => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  // Only render after hydration to avoid mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
