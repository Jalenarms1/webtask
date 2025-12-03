"use client"

import type React from "react"

import { useState } from "react"
import { TaskCard } from "./task-card"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: string
  assignee?: string
}

interface TaskBoardProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskBoard({ tasks, onUpdateTask, onDeleteTask }: TaskBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const columns = [
    { status: "todo" as const, title: "To Do", color: "from-yellow-500/20 to-yellow-500/5" },
    { status: "in-progress" as const, title: "In Progress", color: "from-blue-500/20 to-blue-500/5" },
    { status: "completed" as const, title: "Completed", color: "from-emerald-500/20 to-emerald-500/5" },
  ]

  const columnTasks = (status: Task["status"]) => tasks.filter((t) => t.status === status)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: Task["status"]) => {
    if (!draggedTask) return

    const task = tasks.find((t) => t.id === draggedTask)
    if (task) {
      onUpdateTask({ ...task, status })
    }
    setDraggedTask(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((column) => (
        <div
          key={column.status}
          className={`bg-gradient-to-br ${column.color} border border-border/30 rounded-lg p-4 min-h-[500px]`}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.status)}
        >
          <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
          <div className="space-y-3">
            {columnTasks(column.status).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={() => handleDragStart(task.id)}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
