"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  { name: "Sagar Shankar", role: "Project Manager & XAI Developer", initials: "SS" },
  { name: "Surendrasingh Sodha", role: "Scrum Master & Documentation Lead", initials: "SS" },
  { name: "Sinem Taskin", role: "UX Designer", initials: "ST" },
  { name: "Galeesha Babu Shaik", role: "Github Manager", initials: "GS" },
]

export default function CollaborationsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Team: ClusterMind</h1>
          <p className="text-xl text-muted-foreground">The minds behind the Interactive XAI Platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://avatar.vercel.sh/${member.name.replace(" ", "")}.png`} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
