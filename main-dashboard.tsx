"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  BookOpen,
  MessageCircle,
  GraduationCap,
  Trophy,
  ShoppingCart,
  Gamepad2,
  Beaker,
  Sprout,
  TrendingUp,
  Award,
  Coins,
  Target,
  Bell,
  Settings,
  User,
  TreePine,
} from "lucide-react"

// Import all the components
import SuccessStories from "./success-stories"
import DiscussionForum from "./discussion-forum"
import ExpertQA from "./expert-qa"
import PanchayatLeaderboard from "./panchayat-leaderboard"
import SoilMaster3D from "./soil-master-3d"
import UserProfile from "./user-profile"
import AnimatedTreeOfKnowledge from "./animated-tree-of-knowledge"

interface MainDashboardProps {
  userInfo: {
    name: string
    state: string
    district: string
    panchayat: string
    soilType: string
    cropType: string
    language: string
  }
}

export default function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [showModule, setShowModule] = useState<string | null>(null)

  const userStats = {
    level: 12,
    greenPoints: 2450,
    streak: 7,
    completedModules: ["soil-master-3d", "organic-mixer-3d"],
    rank: 4,
    xp: 2450,
    coins: 850,
  }

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tree", label: "Knowledge Tree", icon: TreePine },
    { id: "profile", label: "Profile", icon: User },
    { id: "stories", label: "Success Stories", icon: BookOpen },
    { id: "forum", label: "Discussion", icon: MessageCircle },
    { id: "experts", label: "Expert Q&A", icon: GraduationCap },
    { id: "leaderboard", label: "Community", icon: Trophy },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "games", label: "Learning Games", icon: Gamepad2 },
  ]

  const mobileNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tree", label: "Tree", icon: TreePine },
    { id: "profile", label: "Profile", icon: User },
    { id: "forum", label: "Forum", icon: MessageCircle },
    { id: "leaderboard", label: "Community", icon: Trophy },
  ]

  const learningModules = [
    {
      id: "soil-master",
      title: "Soil Master 3D",
      description: "Interactive soil analysis and testing",
      icon: Beaker,
      difficulty: "Beginner",
      duration: "15 min",
      points: 150,
      completed: userStats.completedModules.includes("soil-master-3d"),
    },
    {
      id: "organic-farming",
      title: "Organic Farm Simulator",
      description: "Learn organic farming techniques",
      icon: Sprout,
      difficulty: "Intermediate",
      duration: "25 min",
      points: 250,
      completed: userStats.completedModules.includes("organic-mixer-3d"),
    },
    {
      id: "crop-planning",
      title: "Crop Planning Workshop",
      description: "Plan your seasonal crops effectively",
      icon: Target,
      difficulty: "Advanced",
      duration: "30 min",
      points: 300,
      completed: false,
    },
  ]

  const quickStats = [
    { label: "Green Points", value: userStats.greenPoints, icon: Coins, color: "text-accent" },
    { label: "Current Level", value: userStats.level, icon: Target, color: "text-primary" },
    { label: "Day Streak", value: userStats.streak, icon: TrendingUp, color: "text-accent" },
    { label: "Community Rank", value: `#${userStats.rank}`, icon: Trophy, color: "text-primary" },
  ]

  const mockAchievements = [
    {
      title: "First Steps",
      description: "Completed first learning module",
      icon: Award,
      earned: true,
      date: "2024-01-15",
    },
    {
      title: "Soil Expert",
      description: "Mastered soil management techniques",
      icon: Sprout,
      earned: true,
      date: "2024-01-18",
    },
    {
      title: "Knowledge Seeker",
      description: "Completed 5 learning modules",
      icon: BookOpen,
      earned: false,
      progress: 40,
    },
    {
      title: "Community Helper",
      description: "Helped 10 fellow farmers",
      icon: Trophy,
      earned: false,
      progress: 60,
    },
  ]

  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/farmer-avatar.jpg" alt={userInfo.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {userInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold mb-1">Welcome back, {userInfo.name}!</h1>
              <p className="text-muted-foreground">
                {userInfo.panchayat}, {userInfo.district}, {userInfo.state}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{userInfo.soilType}</Badge>
                <Badge variant="outline">{userInfo.cropType}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setActiveSection("profile")}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access to Knowledge Tree */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TreePine className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-heading font-bold">Knowledge Tree</h2>
                <p className="text-sm text-muted-foreground">Track your learning progress</p>
              </div>
            </div>
            <Button onClick={() => setActiveSection("tree")}>View Tree</Button>
          </div>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Progress: {Math.round((userStats.completedModules.length / 5) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {userStats.completedModules.length} of 5 modules completed
                </p>
              </div>
              <div className="text-2xl">🌳</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold">Learning Modules</h2>
            <Badge variant="secondary">{learningModules.filter((m) => !m.completed).length} Available</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <module.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{module.difficulty}</span>
                    <span>{module.duration}</span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      <span>{module.points}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    variant={module.completed ? "outline" : "default"}
                    onClick={() => {
                      if (module.id === "soil-master") {
                        setShowModule("soil-master")
                      }
                    }}
                  >
                    {module.completed ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Start Module"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Moved up to rank #4 in {userInfo.panchayat}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New reply to your discussion about organic pesticides</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Coins className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned 150 Green Points from Organic Farm Simulator</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    if (showModule === "soil-master") {
      return (
        <SoilMaster3D
          onBack={() => setShowModule(null)}
          onComplete={(score) => {
            console.log("[v0] Module completed with score:", score)
            setShowModule(null)
            // Update user stats here
          }}
        />
      )
    }

    switch (activeSection) {
      case "home":
        return renderHomeContent()
      case "tree":
        return (
          <AnimatedTreeOfKnowledge
            userLevel={userStats.level}
            userXP={userStats.xp}
            userCoins={userStats.coins}
            dailyStreak={userStats.streak}
            completedModules={userStats.completedModules}
            onModuleClick={(moduleId) => {
              console.log("[v0] Module clicked:", moduleId)
              if (moduleId === "soil-master-3d") {
                setShowModule("soil-master")
              }
            }}
          />
        )
      case "profile":
        return (
          <UserProfile
            userLevel={userStats.level}
            userXP={userStats.xp}
            userCoins={userStats.coins}
            dailyStreak={userStats.streak}
            completedModules={userStats.completedModules}
            recentAchievements={mockAchievements}
          />
        )
      case "stories":
        return <SuccessStories />
      case "forum":
        return <DiscussionForum />
      case "experts":
        return <ExpertQA />
      case "leaderboard":
        return (
          <PanchayatLeaderboard
            userPanchayat={userInfo.panchayat}
            userDistrict={userInfo.district}
            currentUserId="current-user"
          />
        )
      case "marketplace":
        return (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Marketplace</h2>
            <p className="text-muted-foreground">Buy and sell farming products with your community</p>
            <Button className="mt-4">Coming Soon</Button>
          </div>
        )
      case "games":
        return (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Learning Games</h2>
            <p className="text-muted-foreground">Interactive games to learn farming techniques</p>
            <Button className="mt-4">Coming Soon</Button>
          </div>
        )
      default:
        return renderHomeContent()
    }
  }

  // If showing a module, render it full screen
  if (showModule) {
    return renderContent()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/20">
      {/* Top Navigation */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="font-heading font-bold text-xl">FarmWise</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setActiveSection("profile")}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Side Navigation - Hidden on mobile */}
        <div className="hidden lg:block w-64 min-h-screen border-r bg-background/50 backdrop-blur-sm p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Progress Card */}
          <Card className="glass-card mt-6">
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-primary">{userStats.level}</div>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Green Points</span>
                  <span className="font-medium">{userStats.greenPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Streak</span>
                  <span className="font-medium">{userStats.streak} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank</span>
                  <span className="font-medium">#{userStats.rank}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">{renderContent()}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-50">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeSection === item.id ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
