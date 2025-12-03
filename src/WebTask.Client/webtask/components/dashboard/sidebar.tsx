"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderOpen, Users, BarChart3, Building2, Settings, Zap } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Team", href: "/dashboard/collaborators", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Organization", href: "/dashboard/organization", icon: Building2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 border-r border-sidebar-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-accent rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tighter text-sidebar-foreground">PRISM</span>
            <span className="text-xs font-bold text-sidebar-foreground/60 uppercase tracking-widest block">
              Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent/10 text-sidebar-primary border border-sidebar-primary/30"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-primary/5",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="uppercase tracking-wide text-xs font-bold">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className="px-4 py-4 rounded-lg bg-gradient-to-br from-sidebar-primary/10 to-sidebar-accent/5 border border-sidebar-primary/20">
          <p className="text-xs font-bold uppercase tracking-widest text-sidebar-foreground/70 mb-2">Current Org</p>
          <p className="text-sm font-bold text-sidebar-foreground truncate">Acme Corporation</p>
          <p className="text-xs text-sidebar-foreground/60 mt-1 uppercase font-bold">Owner</p>
        </div>
      </div>
    </aside>
  )
}
