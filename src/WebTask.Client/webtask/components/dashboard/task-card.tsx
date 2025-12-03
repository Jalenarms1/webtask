"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: string
  assignee?: string
}

interface TaskCardProps {
  task: Task
  onDragStart: () => void
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, onDragStart, onUpdate, onDelete }: TaskCardProps) {
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      className="cursor-grab active:cursor-grabbing bg-background/60 border-border/50 hover:border-border/80 transition-colors"
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                ⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-foreground/60">{task.description}</p>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              task.priority === "high"
                ? "bg-red-500/20 text-red-400"
                : task.priority === "medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
            }`}
          >
            {task.priority}
          </span>
          {task.dueDate && <span className="text-xs text-foreground/60">{task.dueDate}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
