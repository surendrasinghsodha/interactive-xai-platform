"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Play } from "lucide-react"

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
          <Play className="mr-2 h-5 w-5" />
          Watch Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
            <p className="text-muted-foreground">Watch how InterWeb-XAI makes AI explanations simple and accessible</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
