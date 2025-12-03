"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-foreground/60 mt-2">Cross-organization project metrics and insights</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-foreground/60 mt-2">Active Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">52%</div>
                <p className="text-sm text-foreground/60 mt-2">Avg Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">18</div>
                <p className="text-sm text-foreground/60 mt-2">Team Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">6</div>
                <p className="text-sm text-foreground/60 mt-2">Partner Orgs</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Platform Migration", progress: 65, status: "on-track" },
                { name: "API Integration", progress: 40, status: "on-track" },
                { name: "Security Audit", progress: 10, status: "at-risk" },
              ].map((project, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{project.name}</span>
                    <Badge variant={project.status === "on-track" ? "default" : "destructive"}>{project.status}</Badge>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Team Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/60">Performance metrics by organization and individual contributors</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Organization Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/60">Track collaboration effectiveness between partner organizations</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
