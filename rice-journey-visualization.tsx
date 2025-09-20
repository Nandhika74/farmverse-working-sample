"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, RotateCcw } from "lucide-react"

const journeyStages = [
  {
    id: "sowing",
    title: "Sowing Seeds",
    description: "Plant rice seeds in prepared soil",
    image: "/hands-planting-rice-seeds-in-muddy-field.jpg",
    duration: 3000,
    tips: ["Prepare seedbed properly", "Use quality seeds", "Maintain proper spacing"],
  },
  {
    id: "daily-care",
    title: "Daily Care",
    description: "Water management and monitoring",
    image: "/farmer-in-green-rice-field-checking-plants.jpg",
    duration: 4000,
    tips: ["Monitor water levels", "Check for pests", "Apply fertilizers as needed"],
  },
  {
    id: "harvest-check",
    title: "Harvest Check",
    description: "Monitor crop maturity",
    image: "/lush-green-rice-plants-ready-for-harvest-check.jpg",
    duration: 3500,
    tips: ["Check grain color", "Test grain hardness", "Monitor weather conditions"],
  },
  {
    id: "harvest-time",
    title: "Harvest Time!",
    subtitle: "Grow your bounty!",
    description: "Reap the golden harvest",
    image: "/golden-rice-harvest-farmers-working-in-field.jpg",
    duration: 4500,
    tips: ["Harvest at right time", "Use proper tools", "Store grain properly"],
  },
]

interface RiceJourneyVisualizationProps {
  onStartFarming?: () => void
}

export function RiceJourneyVisualization({ onStartFarming }: RiceJourneyVisualizationProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      const currentStageDuration = journeyStages[currentStage].duration
      const progressStep = 100 / (currentStageDuration / 50) // Update every 50ms

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next stage
            setCurrentStage((stage) => {
              const nextStage = (stage + 1) % journeyStages.length
              return nextStage
            })
            return 0
          }
          return prev + progressStep
        })
      }, 50)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentStage])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setCurrentStage(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const handlePrevious = () => {
    setCurrentStage((prev) => (prev - 1 + journeyStages.length) % journeyStages.length)
    setProgress(0)
  }

  const currentStageData = journeyStages[currentStage]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-green-100 p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">YOUR RICE JOURNEY</h1>
      </div>

      {/* Main Journey Display */}
      <div className="max-w-6xl mx-auto">
        {/* Journey Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 relative">
          {journeyStages.map((stage, index) => (
            <div
              key={stage.id}
              className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ${
                index === currentStage ? "ring-4 ring-yellow-400 scale-105 z-10" : "hover:scale-102 opacity-80"
              }`}
              style={{ aspectRatio: "16/10" }}
            >
              {/* Stage Image */}
              <img src={stage.image || "/placeholder.svg"} alt={stage.title} className="w-full h-full object-cover" />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Stage Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{stage.title}</h3>
                {stage.subtitle && <p className="text-lg md:text-xl font-semibold text-yellow-300">{stage.subtitle}</p>}
              </div>

              {/* Active Stage Indicator */}
              {index === currentStage && (
                <div className="absolute top-4 right-4">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          ))}

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-2xl pointer-events-auto transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Stage {currentStage + 1} of {journeyStages.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{currentStageData.title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={handlePrevious} className="bg-white/80 hover:bg-white">
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handlePlayPause} className="bg-white/80 hover:bg-white px-6">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={handleRestart} className="bg-white/80 hover:bg-white">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Stage Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentStageData.title}</h3>
          <p className="text-gray-600 mb-4">{currentStageData.description}</p>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Pro Tips:</h4>
            <ul className="space-y-1">
              {currentStageData.tips.map((tip, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Farming Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onStartFarming}
            className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold px-12 py-4 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            START FARMING!
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
        <div className="w-16 h-16 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
      </div>
      <div className="fixed bottom-20 left-10 opacity-20 pointer-events-none">
        <div className="w-12 h-12 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  )
}
