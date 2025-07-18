"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import { MessageSquare, Github, Linkedin, Mail, Users } from "lucide-react"
import SpaceBackground from "@/components/space-background"

const teamMembers = [
  {
    name: "Sagar Shankar",
    role: "Project Manager & XAI Developer",
    initials: "SS",
    description:
      "Leads the project vision and implements core XAI algorithms. Specializes in SHAP and LIME integration.",
    skills: ["Project Management", "Python", "Machine Learning", "XAI"],
  },
  {
    name: "Surendrasingh Sodha",
    role: "Scrum Master & Documentation Lead",
    initials: "SS",
    description:
      "Manages sprint planning and maintains comprehensive project documentation. Ensures team collaboration.",
    skills: ["Scrum", "Documentation", "Team Leadership", "Process Management"],
  },
  {
    name: "Sinem Taskin",
    role: "UX Designer",
    initials: "ST",
    description: "Designs intuitive user interfaces and ensures optimal user experience across the platform.",
    skills: ["UI/UX Design", "User Research", "Prototyping", "Accessibility"],
  },
  {
    name: "Galeesha Babu Shaik",
    role: "Github Manager",
    initials: "GS",
    description: "Oversees version control, code reviews, and maintains CI/CD pipelines for seamless development.",
    skills: ["Git", "DevOps", "Code Review", "CI/CD"],
  },
]

export default function CollaborationsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-20">
          <PageHeader
            title="Our Team: ClusterMind"
            description="The minds behind the Interactive XAI Platform."
            breadcrumbs={[
              { label: "Platform", href: "/upload" },
              { label: "Our Team", href: "/colloborations", current: true },
            ]}
            showBackButton={true}
          />

          <div className="max-w-6xl mx-auto px-4 py-12">
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

              {/* Team Introduction */}
              <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-white text-shadow-lg text-2xl">
                    <Users className="h-8 w-8 text-blue-400 animate-pulse-glow" />
                    Meet ClusterMind
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-shadow-sm text-lg max-w-3xl mx-auto">
                    We are a passionate team of developers, designers, and researchers dedicated to making AI more
                    transparent and accessible. Our diverse expertise comes together to create innovative XAI solutions.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <Card
                    key={member.name}
                    className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 stellar-drift"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20 ring-2 ring-white/20 ring-offset-2 ring-offset-black">
                          <AvatarImage src={`https://avatar.vercel.sh/${member.name.replace(" ", "")}.png`} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg animate-pulse-glow">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-white text-shadow-lg text-xl">{member.name}</CardTitle>
                          <CardDescription className="text-blue-300 text-shadow-sm font-medium">
                            {member.role}
                          </CardDescription>
                          <p className="text-slate-300 text-sm mt-2 leading-relaxed text-shadow-sm">
                            {member.description}
                          </p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm text-shadow-sm">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300 text-shadow-sm backdrop-blur-sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact Icons */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                          <Mail className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center hover:bg-purple-600/40 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                          <Linkedin className="h-4 w-4 text-purple-400" />
                        </div>
                        <div className="w-8 h-8 bg-gray-600/20 rounded-full flex items-center justify-center hover:bg-gray-600/40 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                          <Github className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Project Info */}
              <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                <CardHeader>
                  <CardTitle className="text-white text-shadow-lg text-center">
                    🎓 COMP47250: Team Software Project
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-shadow-sm text-center">
                    University College Dublin - Interactive XAI Web Platform
                  </CardDescription>
                </CardHeader>
                <div className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-slate-300 text-sm leading-relaxed text-center">
                      This platform is the result of our collaborative effort to enhance the reliability of AI
                      explanations through interactive web technologies. We've combined our diverse skills to create a
                      comprehensive solution that makes explainable AI accessible to everyone.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
