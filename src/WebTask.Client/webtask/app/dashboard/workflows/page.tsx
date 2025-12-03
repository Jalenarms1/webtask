"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus } from "lucide-react"

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "archived"
  fromOrg: string
  toOrg: string
  triggerEvent: string
  actions: number
  successRate: number
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "Project Approval Flow",
      description: "Automated approval workflow between Acme Corp and partner organizations",
      status: "active",
      fromOrg: "Acme Corp",
      toOrg: "TechFlow Inc",
      triggerEvent: "Project Created",
      actions: 3,
      successRate: 98,
    },
    {
      id: "2",
      name: "Milestone Notification",
      description: "Send notifications when milestones are completed",
      status: "active",
      fromOrg: "TechFlow Inc",
      toOrg: "Design Studios LLC",
      triggerEvent: "Milestone Completed",
      actions: 2,
      successRate: 100,
    },
    {
      id: "3",
      name: "Invoice Generation",
      description: "Auto-generate invoices upon project completion",
      status: "draft",
      fromOrg: "Acme Corp",
      toOrg: "CloudServices Co",
      triggerEvent: "Project Status: Completed",
      actions: 4,
      successRate: 92,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cross-Org Workflows</h1>
          <p className="text-foreground/60 mt-2">Automate processes between partner organizations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Workflow Name</Label>
                <Input placeholder="e.g., Auto-approval on milestone" className="mt-2" />
              </div>
              <div>
                <Label>Description</Label>
                <Input placeholder="What does this workflow do?" className="mt-2 h-20" />
              </div>
              <Button className="w-full">Create Workflow</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {workflows
            .filter((w) => w.status === "active")
            .map((workflow) => (
              <Card key={workflow.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{workflow.name}</h3>
                        <p className="text-sm text-foreground/60 mt-1">{workflow.description}</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{workflow.fromOrg}</Badge>
                      <ArrowRight className="w-4 h-4 text-foreground/40" />
                      <Badge variant="outline">{workflow.toOrg}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-foreground/50 uppercase font-medium">Trigger</p>
                        <p className="text-sm font-medium mt-2">{workflow.triggerEvent}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase font-medium">Actions</p>
                        <p className="text-sm font-medium mt-2">{workflow.actions} steps</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase font-medium">Success Rate</p>
                        <p className="text-sm font-medium mt-2">{workflow.successRate}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {workflows
            .filter((w) => w.status === "draft")
            .map((workflow) => (
              <Card key={workflow.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-sm text-foreground/60 mt-1">{workflow.description}</p>
                    </div>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="pt-6 text-center py-8">
              <p className="text-foreground/60">No archived workflows</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
