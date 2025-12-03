"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    status: "active" | "archived" | "planning"
    progress: number
    taskCount: number
    teamMembers: number
    dueDate?: string
    color: string
  }
  onDelete: (projectId: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const statusColors = {
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
    planning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/50",
  }

  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="bg-gradient-to-br from-background to-background/50 border-border/30 hover:border-border/60 transition-colors overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10">
        {/* Color header */}
        <div className={`h-2 bg-gradient-to-r ${project.color}`} />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-foreground/60 mt-1">{project.description}</p>
            </div>
            <div onClick={(e) => e.preventDefault()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-red-500">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[project.status]}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            {project.dueDate && <span className="text-xs text-foreground/60">{project.dueDate}</span>}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">Progress</span>
              <span className="font-semibold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border/20">
            <div className="text-center flex-1">
              <p className="text-sm font-semibold">{project.taskCount}</p>
              <p className="text-xs text-foreground/60">Tasks</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm font-semibold">{project.teamMembers}</p>
              <p className="text-xs text-foreground/60">Members</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
