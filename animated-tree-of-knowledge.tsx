"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TreePine, Sprout, Leaf, Droplets, Bug, Wheat, Trophy, Target, Coins, Zap, Star, Sparkles } from "lucide-react"

interface TreeBranch {
  id: string
  name: string
  icon: any
  color: string
  unlocked: boolean
  completed: boolean
  position: { x: number; y: number }
  moduleId: string
}

interface AnimatedTreeProps {
  userLevel: number
  userXP: number
  userCoins: number
  dailyStreak: number
  completedModules: string[]
  onModuleClick: (moduleId: string) => void
  growthPercentOverride?: number
}

export default function AnimatedTreeOfKnowledge({
  userLevel,
  userXP,
  userCoins,
  dailyStreak,
  completedModules,
  onModuleClick,
  growthPercentOverride,
}: AnimatedTreeProps) {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null)

  // Tree branches representing learning modules
  const treeBranches: TreeBranch[] = [
    {
      id: "soil-master",
      name: "Soil Mastery",
      icon: Sprout,
      color: "text-primary",
      unlocked: true,
      completed: completedModules.includes("soil-master-3d"),
      position: { x: 45, y: 70 },
      moduleId: "soil-master-3d",
    },
    {
      id: "organic-farming",
      name: "Organic Arts",
      icon: Leaf,
      color: "text-accent",
      unlocked: true,
      completed: completedModules.includes("organic-mixer-3d"),
      position: { x: 65, y: 60 },
      moduleId: "organic-mixer-3d",
    },
    {
      id: "water-management",
      name: "Water Wisdom",
      icon: Droplets,
      color: "text-blue-500",
      unlocked: completedModules.includes("soil-master-3d"),
      completed: completedModules.includes("irrigation-design-3d"),
      position: { x: 35, y: 45 },
      moduleId: "irrigation-design-3d",
    },
    {
      id: "pest-control",
      name: "Pest Guardian",
      icon: Bug,
      color: "text-orange-500",
      unlocked: completedModules.includes("organic-mixer-3d"),
      completed: false,
      position: { x: 70, y: 40 },
      moduleId: "pest-control-3d",
    },
    {
      id: "crop-planning",
      name: "Harvest Prophet",
      icon: Wheat,
      color: "text-yellow-600",
      unlocked: completedModules.includes("irrigation-design-3d") && completedModules.includes("organic-mixer-3d"),
      completed: completedModules.includes("crop-planning-simulator"),
      position: { x: 50, y: 25 },
      moduleId: "crop-planning-simulator",
    },
  ]

  // Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Calculate progress percentage
  const totalBranches = treeBranches.length
  const completedBranches = treeBranches.filter((branch) => branch.completed).length
  const calculatedProgress = (completedBranches / totalBranches) * 100
  const progressPercentage = typeof growthPercentOverride === "number" ? growthPercentOverride : calculatedProgress
  const growthFactor = Math.max(0, Math.min(1, progressPercentage / 100))

  // Debug logging
  console.log("Tree Debug:", {
    growthPercentOverride,
    calculatedProgress,
    progressPercentage,
    growthFactor,
    completedBranches,
    totalBranches,
  })

  // XP progress to next level
  const xpForNextLevel = userLevel * 300
  const currentLevelXP = userXP % 300
  const xpProgress = (currentLevelXP / 300) * 100

  return (
    <div className="space-y-6">
      {/* Gamified HUD */}
      <div className="glass-card rounded-xl p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-4 right-4 w-16 h-16 bg-primary/5 rounded-full transition-all duration-2000 ${animationPhase === 0 ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}
          ></div>
          <div
            className={`absolute bottom-4 left-4 w-12 h-12 bg-accent/5 rounded-full transition-all duration-2000 ${animationPhase === 1 ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/3 rounded-full transition-all duration-2000 ${animationPhase === 2 ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}
          ></div>
        </div>

        <div className="relative z-10">
          {/* HUD Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TreePine
                  className={`h-12 w-12 text-primary transition-all duration-500 ${animationPhase === 0 ? "scale-110" : "scale-100"}`}
                />
                {animationPhase === 0 && (
                  <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">Tree of Knowledge</h2>
                <p className="text-muted-foreground">Your agricultural mastery grows</p>
              </div>
            </div>

            {/* Streak indicator with animation */}
            <div className="text-right">
              <div
                className={`flex items-center justify-center gap-1 text-accent mb-1 transition-all duration-300 ${animationPhase === 1 ? "scale-110" : "scale-100"}`}
              >
                <Zap className="h-5 w-5" />
                <span className="font-bold text-lg">{dailyStreak}</span>
                <span className="text-sm">day streak</span>
              </div>
              <p className="text-xs text-muted-foreground">Keep the momentum!</p>
            </div>
          </div>

          {/* Animated HUD Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div
              className={`text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20 transition-all duration-500 ${animationPhase === 0 ? "scale-105 shadow-lg" : "scale-100"}`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-6 w-6 text-accent" />
                <span className="font-bold text-xl">Level {userLevel}</span>
              </div>
              <p className="text-xs text-muted-foreground">Current Mastery</p>
              <div className="mt-2">
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {currentLevelXP}/{300} XP
                </p>
              </div>
            </div>

            <div
              className={`text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 transition-all duration-500 ${animationPhase === 1 ? "scale-105 shadow-lg" : "scale-100"}`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">{userXP.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Experience Points</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="h-3 w-3 text-primary" />
                <span className="text-xs">+{Math.floor(userXP / 100)} this week</span>
              </div>
            </div>

            <div
              className={`text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20 transition-all duration-500 ${animationPhase === 2 ? "scale-105 shadow-lg" : "scale-100"}`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="h-6 w-6 text-accent" />
                <span className="font-bold text-xl">{userCoins.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Farm Coins</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Sparkles className="h-3 w-3 text-accent" />
                <span className="text-xs">Ready to spend</span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tree Growth Progress</span>
              <Badge variant="outline" className="gap-1">
                <TreePine className="h-3 w-3" />
                {completedBranches}/{totalBranches} branches
              </Badge>
            </div>
            <div className="relative">
              <Progress value={progressPercentage} className="h-3" />
              <div
                className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full transition-all duration-1000 ${progressPercentage > 50 ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {progressPercentage < 100
                ? `${Math.round(progressPercentage)}% of your agricultural knowledge tree has grown`
                : "🌳 Your Tree of Knowledge is fully grown! You are a master farmer!"}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Animated Tree */}
      <Card className="glass-card">
        <CardContent className="p-8">
          <div className="relative w-full h-96 bg-gradient-to-b from-sky-100/20 via-green-50/20 to-amber-50/20 rounded-xl overflow-hidden">
            {/* Tree trunk */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg origin-bottom"
              style={{
                height: `${64 + 160 * growthFactor}px`,
                transition: "height 600ms ease",
                minHeight: "64px",
              }}
            ></div>

            {/* Tree roots */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-4 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full opacity-60"></div>
              <div className="w-24 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-full opacity-40 mt-1"></div>
            </div>

            {/* Animated tree branches and modules */}
            {treeBranches.map((branch, index) => {
              const Icon = branch.icon
              const isHovered = hoveredBranch === branch.id
              const delay = index * 200

              return (
                <div key={branch.id} className="absolute">
                  {/* Branch line */}
                  <svg
                    className="absolute"
                    style={{
                      left: "50%",
                      bottom: "32%",
                      transform: `translate(-50%, 50%)`,
                      width: "200px",
                      height: "200px",
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      d={`M 100 100 Q ${branch.position.x + 50} ${150 - (20 + (branch.position.y - 20) * growthFactor)} ${branch.position.x + 100} ${150 - (20 + (branch.position.y - 20) * growthFactor)}`}
                      stroke={branch.unlocked ? (branch.completed ? "#10b981" : "#6b7280") : "#d1d5db"}
                      strokeWidth="3"
                      fill="none"
                      className={`transition-all duration-1000 ${branch.unlocked ? "opacity-100" : "opacity-30"}`}
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  </svg>

                  {/* Module node */}
                  <div
                    className={`absolute cursor-pointer transition-all duration-500 ${
                      branch.unlocked ? "hover:scale-110" : "cursor-not-allowed"
                    } ${isHovered ? "z-20" : "z-10"}`}
                    style={{
                      left: `${branch.position.x}%`,
                      bottom: `${20 + (branch.position.y - 20) * growthFactor}%`,
                      transform: "translate(-50%, 50%)",
                      animationDelay: `${delay + 500}ms`,
                      opacity: growthFactor < 0.1 ? 0.3 : 1,
                    }}
                    onClick={() => branch.unlocked && onModuleClick(branch.moduleId)}
                    onMouseEnter={() => setHoveredBranch(branch.id)}
                    onMouseLeave={() => setHoveredBranch(null)}
                  >
                    {/* Node background */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        branch.completed
                          ? "bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/25"
                          : branch.unlocked
                            ? "bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
                            : "bg-gradient-to-br from-muted to-muted/80"
                      } ${isHovered ? "scale-110 shadow-xl" : "scale-100"}`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          branch.completed ? "text-white" : branch.unlocked ? "text-white" : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Completion indicator */}
                    {branch.completed && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-pulse">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    )}

                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200">
                        <p className="font-medium text-sm">{branch.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {branch.completed ? "Completed" : branch.unlocked ? "Available" : "Locked"}
                        </p>
                      </div>
                    )}

                    {/* Animated particles for completed modules */}
                    {branch.completed && animationPhase === index % 4 && (
                      <div className="absolute inset-0 pointer-events-none">
                        <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-accent animate-ping" />
                        <Sparkles
                          className="absolute -bottom-2 -right-2 h-3 w-3 text-primary animate-ping"
                          style={{ animationDelay: "0.5s" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Floating leaves animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <Leaf
                  key={i}
                  className={`absolute h-4 w-4 text-primary/30 animate-bounce`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Growth indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50">
              <TreePine className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{Math.round(progressPercentage)}% Grown</span>
            </div>

            {/* Debug info */}
            <div className="absolute top-4 left-4 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 text-xs">
              <div>Growth Factor: {growthFactor.toFixed(2)}</div>
              <div>Progress: {progressPercentage}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
