"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title: string
  description?: string
}

export function VideoModal({ isOpen, onClose, videoSrc, title, description }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-black/95 border-orange-200 text-white">
        <DialogHeader className="border-b border-orange-200/20 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {description && <p className="text-gray-300 text-sm mt-2">{description}</p>}
        </DialogHeader>

        <div className="relative group">
          {/* Video Player */}
          <video
            id="demo-video"
            className="w-full h-auto rounded-lg shadow-2xl"
            poster="/placeholder.svg?height=400&width=800&text=Demo+Video+Thumbnail"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-12 w-12 text-white ml-1" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Demo Video Coming Soon!</h3>
              <p className="text-gray-600">
                We are creating amazing demo videos to showcase this feature. Stay tuned for interactive demonstrations!
              </p>
            </div>
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  const video = document.getElementById("demo-video") as HTMLVideoElement
                  if (video.requestFullscreen) {
                    video.requestFullscreen()
                  }
                }}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 transition-all duration-300 hover:scale-110"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Demo Features List */}
        <div className="grid md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-orange-200/20">
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">What you will see:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Step-by-step feature walkthrough</li>
              <li>• Real-time interactions</li>
              <li>• User interface highlights</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-pink-400 mb-2">Duration:</h4>
            <p className="text-sm text-gray-300">~2 minutes</p>
            <h4 className="font-semibold text-purple-400 mb-2 mt-3">Best for:</h4>
            <p className="text-sm text-gray-300">Understanding feature capabilities</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
