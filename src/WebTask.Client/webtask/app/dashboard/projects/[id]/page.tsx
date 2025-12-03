"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Plus, Share2 } from "lucide-react"

// Mock project data - in a real app, this would come from a database or API
const projectsData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Platform Migration",
    description: "Migrate legacy systems to cloud infrastructure with zero downtime",
    status: "active",
    progress: 65,
    dueDate: "2025-12-15",
    ownerOrg: "Acme Corp",
    partnerOrgs: ["TechFlow Inc", "CloudServices Co"],
    teamMembers: [
      { id: "1", name: "Alice Johnson", org: "Acme Corp", role: "Project Lead" },
      { id: "2", name: "Bob Smith", org: "TechFlow Inc", role: "Infrastructure Lead" },
      { id: "3", name: "Carol White", org: "Acme Corp", role: "Backend Engineer" },
    ],
    milestones: [
      { id: "1", name: "Phase 1: Assessment", progress: 100, dueDate: "2025-11-30" },
      { id: "2", name: "Phase 2: Planning", progress: 80, dueDate: "2025-12-05" },
      { id: "3", name: "Phase 3: Implementation", progress: 45, dueDate: "2025-12-15" },
    ],
    activity: [
      {
        id: "1",
        type: "milestone-completed",
        user: "Alice Johnson",
        message: "Completed Phase 1: Assessment",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        type: "member-added",
        user: "Alice Johnson",
        message: "Added Bob Smith from TechFlow Inc",
        timestamp: "5 days ago",
      },
    ],
  },
  "2": {
    id: "2",
    name: "API Integration",
    description: "Integrate partner APIs and webhooks for real-time data sync",
    status: "active",
    progress: 40,
    dueDate: "2025-12-28",
    ownerOrg: "Acme Corp",
    partnerOrgs: ["Design Studios LLC", "TechFlow Inc"],
    teamMembers: [
      { id: "4", name: "David Park", org: "Acme Corp", role: "API Lead" },
      { id: "5", name: "Sarah Johnson", org: "TechFlow Inc", role: "Integration Specialist" },
    ],
    milestones: [
      { id: "4", name: "API Specification", progress: 100, dueDate: "2025-11-20" },
      { id: "5", name: "Core Integration", progress: 50, dueDate: "2025-12-10" },
    ],
    activity: [],
  },
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const project = projectsData[params.id]
  const [activeTab, setActiveTab] = useState("overview")

  if (!project) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const completedMilestones = project.milestones?.filter((m: any) => m.progress === 100).length || 0

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-foreground/60 mt-1">{project.ownerOrg}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{project.progress}%</div>
            <p className="text-sm text-foreground/60 mt-2">Overall Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {completedMilestones}/{project.milestones?.length || 0}
            </div>
            <p className="text-sm text-foreground/60 mt-2">Milestones</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{project.teamMembers.length}</div>
            <p className="text-sm text-foreground/60 mt-2">Team Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{project.partnerOrgs.length}</div>
            <p className="text-sm text-foreground/60 mt-2">Partner Orgs</p>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Project Overview</span>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-foreground/60 uppercase font-medium mb-2">Description</p>
                <p className="text-foreground">{project.description}</p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 uppercase font-medium mb-3">Progress</p>
                <Progress value={project.progress} className="h-2" />
                <p className="text-sm font-medium mt-2">{project.progress}% complete</p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 uppercase font-medium mb-3">Partner Organizations</p>
                <div className="flex flex-wrap gap-2">
                  {project.partnerOrgs.map((org: string, idx: number) => (
                    <Badge key={idx} variant="outline">
                      {org}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-foreground/60 uppercase font-medium mb-2">Due Date</p>
                <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {project.milestones?.map((milestone: any) => (
            <Card key={milestone.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{milestone.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      Due {new Date(milestone.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{milestone.progress}%</Badge>
                </div>
                <Progress value={milestone.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {project.teamMembers.map((member: any) => (
            <Card key={member.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-foreground/60">{member.role}</p>
                  </div>
                  <Badge variant="outline">{member.org}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {project.activity?.length > 0 ? (
            project.activity.map((item: any, idx: number) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      •
                    </div>
                    <div>
                      <p className="font-semibold">{item.user}</p>
                      <p className="text-sm text-foreground/60 mt-1">{item.message}</p>
                      <p className="text-xs text-foreground/40 mt-2">{item.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-8">
                <p className="text-foreground/60">No activity yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
