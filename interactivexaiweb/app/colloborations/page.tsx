"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import { MessageSquare } from "lucide-react"

const teamMembers = [
  { name: "Sagar Shankar", role: "Project Manager & XAI Developer", initials: "SS" },
  { name: "Surendrasingh Sodha", role: "Scrum Master & Documentation Lead", initials: "SS" },
  { name: "Sinem Taskin", role: "UX Designer", initials: "ST" },
  { name: "Galeesha Babu Shaik", role: "Github Manager", initials: "GS" },
]

export default function CollaborationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <PageHeader
        title="Our Team: ClusterMind"
        description="The minds behind the Interactive XAI Platform."
        breadcrumbs={[
          { label: "Platform", href: "/upload" },
          { label: "Our Team", href: "/colloborations", current: true },
        ]}
        showBackButton={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <PageNavigation
            showWorkflow={false}
            nextStep={{
              href: "/feedback",
              label: "Provide Feedback",
              icon: MessageSquare,
              description: "Share your experience",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://avatar.vercel.sh/${member.name.replace(" ", "")}.png`} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">{member.name}</CardTitle>
                    <CardDescription className="text-slate-400">{member.role}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
