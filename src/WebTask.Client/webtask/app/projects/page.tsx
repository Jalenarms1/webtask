"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "archived" | "planning"
  progress: number
  taskCount: number
  teamMembers: number
  partnerOrgs: number
  dueDate?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Platform Migration",
      description: "Migrate legacy systems to cloud infrastructure",
      status: "active",
      progress: 65,
      taskCount: 24,
      teamMembers: 8,
      partnerOrgs: 2,
      dueDate: "2025-12-15",
    },
    {
      id: "2",
      name: "API Integration",
      description: "Integrate partner APIs and webhooks for data sync",
      status: "active",
      progress: 40,
      taskCount: 16,
      teamMembers: 5,
      partnerOrgs: 3,
      dueDate: "2025-12-28",
    },
    {
      id: "3",
      name: "Security Audit",
      description: "Comprehensive security assessment and compliance",
      status: "planning",
      progress: 10,
      taskCount: 32,
      teamMembers: 6,
      partnerOrgs: 1,
      dueDate: "2026-02-01",
    },
    {
      id: "4",
      name: "Documentation Suite",
      description: "Create comprehensive API and user documentation",
      status: "archived",
      progress: 100,
      taskCount: 12,
      teamMembers: 3,
      partnerOrgs: 0,
    },
  ])

  const [filter, setFilter] = useState<"all" | "active" | "planning" | "archived">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    planning: projects.filter((p) => p.status === "planning").length,
    archived: projects.filter((p) => p.status === "archived").length,
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-foreground/60 mt-2">Manage cross-organization initiatives</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>+ New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Project name" />
              <Input placeholder="Description" className="h-20" />
              <Button className="w-full">Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => setFilter("all")}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-foreground/60 mt-2">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => setFilter("active")}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.active}</div>
            <p className="text-sm text-foreground/60 mt-2">Active</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => setFilter("planning")}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.planning}</div>
            <p className="text-sm text-foreground/60 mt-2">In Planning</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => setFilter("archived")}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.archived}</div>
            <p className="text-sm text-foreground/60 mt-2">Archived</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2 w-5 h-5 text-foreground/40" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Projects List */}
      <div className="space-y-3 flex flex-col gap-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <a key={project.id} href={`/projects/${project.id}`}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                      </div>
                      <p className="text-sm text-foreground/60">{project.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t">
                    <div>
                      <p className="text-xs text-foreground/50 uppercase font-medium">Progress</p>
                      <div className="mt-2">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                        </div>
                        <p className="text-sm font-medium mt-1">{project.progress}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase font-medium">Tasks</p>
                      <p className="text-2xl font-bold mt-2">{project.taskCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase font-medium">Team</p>
                      <p className="text-2xl font-bold mt-2">{project.teamMembers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase font-medium">Partners</p>
                      <p className="text-2xl font-bold mt-2">{project.partnerOrgs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase font-medium">Due Date</p>
                      <p className="text-sm font-medium mt-2">
                        {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "—"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-foreground/60">No projects found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
