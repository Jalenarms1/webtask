"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "member"
  joinDate: string
  status: "active" | "pending"
}

interface OrganizationPartner {
  id: string
  name: string
  contactEmail: string
  status: "connected" | "pending" | "invited"
  joinDate?: string
  projects: number
}

export default function OrganizationPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@acmecorp.com",
      role: "owner",
      joinDate: "2025-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@acmecorp.com",
      role: "admin",
      joinDate: "2025-03-10",
      status: "active",
    },
    {
      id: "3",
      name: "Carol White",
      email: "carol@acmecorp.com",
      role: "member",
      joinDate: "2025-05-20",
      status: "active",
    },
  ])

  const [partners, setPartners] = useState<OrganizationPartner[]>([
    {
      id: "1",
      name: "TechFlow Inc",
      contactEmail: "contact@techflow.com",
      status: "connected",
      joinDate: "2025-04-01",
      projects: 3,
    },
    {
      id: "2",
      name: "Design Studios LLC",
      contactEmail: "hello@designstudios.com",
      status: "connected",
      joinDate: "2025-06-15",
      projects: 2,
    },
    {
      id: "3",
      name: "Cloud Services Co",
      contactEmail: "partnerships@cloudservices.com",
      status: "invited",
      projects: 0,
    },
  ])

  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState("member")

  const handleInviteMember = () => {
    if (newMemberEmail) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newMemberEmail.split("@")[0],
        email: newMemberEmail,
        role: newMemberRole as TeamMember["role"],
        joinDate: new Date().toISOString().split("T")[0],
        status: "pending",
      }
      setMembers([...members, newMember])
      setNewMemberEmail("")
      setNewMemberRole("member")
      setIsInviteOpen(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "default"
      case "admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-foreground/60 mt-2">Manage your organization and cross-org partnerships</p>
      </div>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="partners">Partner Organizations</TabsTrigger>
          <TabsTrigger value="settings">Organization Info</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Team Members</h2>
              <p className="text-foreground/60 mt-1">Manage your team and their access levels</p>
            </div>
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button>+ Invite Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="member@company.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInviteMember} className="w-full">
                    Send Invite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-foreground/60">{member.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getRoleBadgeColor(member.role)}>{member.role}</Badge>
                      <Badge variant={member.status === "active" ? "default" : "outline"}>{member.status}</Badge>
                      <span className="text-sm text-foreground/50">
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Partner Organizations</h2>
              <p className="text-foreground/60 mt-1">Connected organizations for cross-team collaboration</p>
            </div>
            <Button>+ Connect Partner</Button>
          </div>

          <div className="space-y-3">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-accent">{partner.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{partner.name}</p>
                          <p className="text-sm text-foreground/60">{partner.contactEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-foreground/60">Active Projects</p>
                        <p className="font-semibold">{partner.projects}</p>
                      </div>
                      <Badge variant={partner.status === "connected" ? "default" : "secondary"}>{partner.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Update your organization's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Organization Name</Label>
                <Input defaultValue="Acme Corporation" className="mt-2" />
              </div>
              <div>
                <Label>Organization Email</Label>
                <Input type="email" defaultValue="admin@acmecorp.com" className="mt-2" />
              </div>
              <div>
                <Label>Industry</Label>
                <Input defaultValue="Technology" className="mt-2" />
              </div>
              <div>
                <Label>Company Size</Label>
                <Input defaultValue="500-1000 employees" className="mt-2" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/70">
                Permanently delete this organization and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive">Delete Organization</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
