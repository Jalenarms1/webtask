"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [successMessage, setSuccessMessage] = useState("")

  // Profile state
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState("Product manager focused on building amazing SaaS products")
  const [title, setTitle] = useState("Product Manager")
  const [company, setCompany] = useState("Orbit Inc.")

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [language, setLanguage] = useState("en")

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("Profile updated successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("Settings saved successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold glow-text">Account Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your profile and preferences</p>
      </div>

      {successMessage && (
        <Alert className="border-emerald-500/50 bg-emerald-500/10">
          <AlertDescription className="text-emerald-400">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your avatar and personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-emerald-500 text-lg font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Upload Photo</Button>
                  <p className="text-sm text-foreground/60">JPG, PNG or GIF. Max 5MB</p>
                </div>
              </div>

              {/* Profile form */}
              <form onSubmit={handleSaveProfile} className="space-y-4 border-t border-border/30 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background/50 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 border-border/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-background/50 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-background/50 border-border/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="bg-background/50 border-border/30"
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 hover:shadow-lg hover:shadow-indigo-500/50">
                  Save Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Theme */}
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["light", "dark", "auto"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTheme(t as "light" | "dark" | "auto")}
                        className={`p-3 rounded-lg border transition-colors text-center capitalize ${
                          theme === t
                            ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-400"
                            : "border-border/30 bg-background/50 text-foreground/70 hover:border-border/60"
                        }`}
                      >
                        {t === "auto" ? "System" : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="bg-background/50 border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications */}
                <div className="border-t border-border/30 pt-6 space-y-4">
                  <h3 className="font-semibold">Notifications</h3>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-foreground/60">Receive updates about your tasks</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-7 rounded-full transition-colors ${
                        emailNotifications ? "bg-emerald-500" : "bg-border/30"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white transition-transform ${
                          emailNotifications ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-foreground/60">Get a summary every Monday</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWeeklyDigest(!weeklyDigest)}
                      className={`w-12 h-7 rounded-full transition-colors ${
                        weeklyDigest ? "bg-emerald-500" : "bg-border/30"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white transition-transform ${
                          weeklyDigest ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 hover:shadow-lg hover:shadow-indigo-500/50">
                  Save Preferences
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Password */}
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-foreground/60">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                {/* Two-factor */}
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-foreground/60">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                {/* Active sessions */}
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <p className="font-medium mb-3">Active Sessions</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-foreground/60">Chrome on macOS</p>
                      </div>
                      <span className="text-xs text-emerald-400">Active</span>
                    </div>
                  </div>
                </div>

                {/* Danger zone */}
                <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                  <h3 className="font-semibold text-red-400">Danger Zone</h3>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
