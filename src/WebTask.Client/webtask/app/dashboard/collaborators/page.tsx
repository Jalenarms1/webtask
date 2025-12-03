"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Collaborator {
  id: string
  name: string
  email: string
  organization: string
  projects: number
  role: string
  avatar?: string
}

export default function CollaboratorsPage() {
  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "Emma Davis",
      email: "emma@techflow.com",
      organization: "TechFlow Inc",
      projects: 3,
      role: "Project Lead",
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james@designstudios.com",
      organization: "Design Studios LLC",
      projects: 2,
      role: "Designer",
    },
    {
      id: "3",
      name: "Sara Chen",
      email: "sara@acmecorp.com",
      organization: "Acme Corp",
      projects: 5,
      role: "Product Manager",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Collaborators</h1>
        <p className="text-foreground/60 mt-2">View and manage collaborators across all projects</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Collaborators</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
          <Input placeholder="Search collaborators..." className="pl-10" />
        </div>

        <TabsContent value="all" className="space-y-3">
          {collaborators.map((collab) => (
            <Card key={collab.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{collab.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{collab.name}</p>
                      <p className="text-sm text-foreground/60">{collab.email}</p>
                      <p className="text-xs text-foreground/50 mt-1">{collab.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-foreground/60">Shared Projects</p>
                      <p className="font-semibold">{collab.projects}</p>
                    </div>
                    <Badge variant="outline">{collab.role}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active">
          {collaborators.map((collab) => (
            <Card key={collab.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full" />
                    <div>
                      <p className="font-semibold">{collab.name}</p>
                      <p className="text-sm text-foreground/60">{collab.organization}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{collab.projects} projects</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="pt-6">
              <p className="text-foreground/60 text-center py-8">No archived collaborators</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
