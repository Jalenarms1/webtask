"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Zap, Users, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "planning" | "archived"
  progress: number
  organization: string
  members: number
  dueDate: string
}

export default function DashboardPage() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Platform Migration",
      description: "Migrate legacy systems to cloud infrastructure",
      status: "active",
      progress: 65,
      organization: "Acme Corp",
      members: 8,
      dueDate: "2025-12-15",
    },
    {
      id: "2",
      name: "API Integration",
      description: "Integrate partner APIs and webhooks",
      status: "active",
      progress: 40,
      organization: "TechFlow Inc",
      members: 5,
      dueDate: "2025-12-20",
    },
    {
      id: "3",
      name: "Security Audit",
      description: "Conduct comprehensive security assessment",
      status: "planning",
      progress: 10,
      organization: "Acme Corp",
      members: 3,
      dueDate: "2026-01-10",
    },
  ])

  const activeProjects = projects.filter((p) => p.status === "active").length
  const totalCollaborators = projects.reduce((sum, p) => sum + p.members, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden px-8 py-16 sm:py-24 border-b border-border/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl">
          <div className="mb-4 inline-flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Welcome back</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-balance leading-none mb-4">
            <span className="text-foreground">Manage your </span>
            <span className="gradient-heading inline-block">cross-org</span>
            <span className="text-foreground"> projects</span>
          </h1>

          <p className="text-lg text-foreground/60 max-w-2xl font-medium">
            Real-time collaboration across organizational boundaries. Track, synchronize, and accelerate your most
            complex initiatives.
          </p>
        </div>
      </div>

      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Quick Stats</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">Active Projects</p>
                      <p className="text-5xl font-black mt-3 text-gradient-heading">{activeProjects}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary font-bold">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>2 started this week</span>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">Team Members</p>
                      <p className="text-5xl font-black mt-3">{totalCollaborators}</p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">On-Time Delivery</p>
                      <p className="text-5xl font-black mt-3">92%</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Active Projects</h2>
              <Link
                to="/projects"
                className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {projects
                .filter((p) => p.status === "active")
                .map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}`}>
                    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative space-y-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                {project.name}
                              </h3>
                              <Badge variant="outline" className="font-bold uppercase text-xs">
                                {project.organization}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground/60 font-medium">{project.description}</p>
                          </div>

                          <div className="flex flex-col items-end gap-4 ml-8">
                            <div className="text-right">
                              <p className="text-4xl font-black">{project.progress}%</p>
                              <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">Complete</p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end">
                                <Users className="w-4 h-4 text-foreground/50" />
                                <span className="font-bold">{project.members}</span>
                              </div>
                              <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">Members</p>
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>

                        <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                          <p className="text-xs text-foreground/50 font-bold uppercase">
                            Due: {new Date(project.dueDate).toLocaleDateString()}
                          </p>
                          <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-12 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative text-center">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Scale Your Collaboration</h3>
              <p className="text-foreground/60 mb-8 max-w-2xl mx-auto font-medium">
                Connect with new organizations, synchronize workflows, and unlock seamless cross-org project management
              </p>
              <Link to="/dashboard/organization">
                <Button size="lg" className="font-bold uppercase tracking-wide">
                  Manage Partners
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
