"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const projectColors = [
  { label: "Indigo Purple", value: "from-indigo-500 to-purple-500" },
  { label: "Blue Cyan", value: "from-blue-500 to-cyan-500" },
  { label: "Emerald Teal", value: "from-emerald-500 to-teal-500" },
  { label: "Pink Rose", value: "from-pink-500 to-rose-500" },
  { label: "Orange Amber", value: "from-orange-500 to-amber-500" },
]

interface ProjectFormProps {
  onSubmit: (project: {
    name: string
    description: string
    status: "active" | "archived" | "planning"
    progress: number
    taskCount: number
    teamMembers: number
    dueDate?: string
    color: string
  }) => void
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"active" | "archived" | "planning">("planning")
  const [dueDate, setDueDate] = useState("")
  const [color, setColor] = useState(projectColors[0].value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    onSubmit({
      name,
      description,
      status,
      dueDate,
      color,
      progress: 0,
      taskCount: 0,
      teamMembers: 1,
    })

    setName("")
    setDescription("")
    setStatus("planning")
    setDueDate("")
    setColor(projectColors[0].value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          className="bg-background/50 border-border/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          className="bg-background/50 border-border/30"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger id="status" className="bg-background/50 border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger id="color" className="bg-background/50 border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projectColors.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-background/50 border-border/30"
        />
      </div>

      <Button
        type="submit"
        disabled={!name}
        className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 hover:shadow-lg hover:shadow-indigo-500/50"
      >
        Create Project
      </Button>
    </form>
  )
}
