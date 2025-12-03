import { useAuth } from "../../lib/auth-context"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Bell, Plus } from "lucide-react"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleProfile = () => {
    navigate("/dashboard/profile")
  }

  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Welcome back, {user?.name}</h2>
          <p className="text-sm text-foreground/60">Manage your cross-org projects</p>
        </div>

        <div className="flex items-center gap-4 relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </Button>

          <Button size="sm" className="gap-2 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0">
            <Plus className="w-4 h-4" />
            New Project
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-accent/10 transition-colors"
                aria-label="Profile menu"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 z-50 bg-popover/98 backdrop-blur-xl border-border/20 shadow-lg"
            >
              <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-accent/10 focus:bg-accent/10 dark:hover:bg-accent/20">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/30" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-muted-foreground hover:bg-muted/20 focus:bg-muted/20 hover:text-foreground"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
