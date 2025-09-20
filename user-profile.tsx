"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  MapPin,
  Calendar,
  Trophy,
  Coins,
  Target,
  Star,
  Award,
  BookOpen,
  Users,
  ShoppingCart,
  Settings,
  Edit3,
  Camera,
  Sprout,
  Wheat,
  Droplets,
  Leaf,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Activity,
  Zap,
  PieChart,
} from "lucide-react"

interface UserProfileProps {
  userLevel: number
  userXP: number
  userCoins: number
  dailyStreak: number
  completedModules: string[]
  recentAchievements: any[]
}

export default function UserProfile({
  userLevel,
  userXP,
  userCoins,
  dailyStreak,
  completedModules,
  recentAchievements,
}: UserProfileProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Ravi Krishnan",
    email: "ravi.krishnan@email.com",
    phone: "+91 9876543210",
    location: "Kochi, Kerala",
    farmSize: "2.5 acres",
    primaryCrops: "Rice, Coconut, Spices",
    experience: "8 years",
    bio: "Passionate organic farmer dedicated to sustainable agriculture practices in Kerala. Always eager to learn new techniques and share knowledge with fellow farmers.",
  })

  // Hydrate profile from onboarding data if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("farmverse-user-data")
      if (!saved) return
      const parsed = JSON.parse(saved)
      const location =
        parsed?.panchayat && parsed?.district ? `${parsed.panchayat}, ${parsed.district}` : userInfo.location
      const name = parsed?.name || userInfo.name
      const phone = parsed?.phone ? `+91 ${parsed.phone}` : userInfo.phone
      const primary = parsed?.primaryCrop ? parsed.primaryCrop : userInfo.primaryCrops
      setUserInfo((prev) => ({ ...prev, name, phone, location, primaryCrops: primary }))
    } catch {}
  }, [])

  const profileSections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "farm", label: "Farm Info", icon: Sprout },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const allAchievements = [
    {
      title: "First Steps",
      description: "Completed first learning module",
      icon: Star,
      earned: true,
      date: "2024-01-15",
    },
    {
      title: "Knowledge Seeker",
      description: "Completed 5 learning modules",
      icon: BookOpen,
      earned: true,
      date: "2024-01-20",
    },
    {
      title: "Streak Master",
      description: "Maintained 7-day learning streak",
      icon: Zap,
      earned: true,
      date: "2024-01-22",
    },
    { title: "Community Helper", description: "Helped 10 fellow farmers", icon: Users, earned: false, progress: 60 },
    {
      title: "Soil Expert",
      description: "Mastered soil management techniques",
      icon: Sprout,
      earned: true,
      date: "2024-01-18",
    },
    {
      title: "Water Wise",
      description: "Completed irrigation optimization",
      icon: Droplets,
      earned: false,
      progress: 30,
    },
    {
      title: "Organic Champion",
      description: "Completed organic farming certification",
      icon: Leaf,
      earned: false,
      progress: 80,
    },
    {
      title: "Market Master",
      description: "Made 20 successful purchases",
      icon: ShoppingCart,
      earned: false,
      progress: 45,
    },
  ]

  const learningStats = [
    { label: "Modules Completed", value: completedModules.length, total: 12, icon: BookOpen, color: "text-primary" },
    { label: "Hours Learned", value: 24, total: 50, icon: Clock, color: "text-accent" },
    { label: "Quests Completed", value: 8, total: 15, icon: Target, color: "text-blue-500" },
    { label: "Community Posts", value: 12, total: 25, icon: Users, color: "text-orange-500" },
  ]

  // Chart data for learning progress
  const weeklyProgress = [
    { day: "Mon", hours: 2.5, modules: 1 },
    { day: "Tue", hours: 3.2, modules: 2 },
    { day: "Wed", hours: 1.8, modules: 1 },
    { day: "Thu", hours: 4.1, modules: 3 },
    { day: "Fri", hours: 2.9, modules: 2 },
    { day: "Sat", hours: 3.7, modules: 2 },
    { day: "Sun", hours: 2.3, modules: 1 },
  ]

  const categoryProgress = [
    { category: "Soil Science", completed: 3, total: 4, color: "bg-primary" },
    { category: "Organic Farming", completed: 2, total: 3, color: "bg-accent" },
    { category: "Water Management", completed: 1, total: 2, color: "bg-blue-500" },
    { category: "Crop Planning", completed: 1, total: 3, color: "bg-orange-500" },
  ]

  const skillDistribution = [
    { skill: "Soil Analysis", percentage: 85, color: "bg-primary" },
    { skill: "Organic Methods", percentage: 70, color: "bg-accent" },
    { skill: "Irrigation", percentage: 45, color: "bg-blue-500" },
    { skill: "Pest Control", percentage: 60, color: "bg-orange-500" },
    { skill: "Crop Rotation", percentage: 30, color: "bg-purple-500" },
  ]

  const activityLog = [
    { action: "Completed Soil Master 3D module", time: "2 hours ago", icon: BookOpen, color: "text-primary" },
    { action: "Earned 50 farm coins", time: "4 hours ago", icon: Coins, color: "text-accent" },
    { action: "Helped farmer with pest control question", time: "1 day ago", icon: Users, color: "text-blue-500" },
    { action: "Purchased organic fertilizer", time: "2 days ago", icon: ShoppingCart, color: "text-orange-500" },
    { action: "Reached Level 12", time: "3 days ago", icon: Trophy, color: "text-primary" },
    { action: "Started 7-day learning streak", time: "1 week ago", icon: Zap, color: "text-accent" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-heading font-bold">{userInfo.name}</h2>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  <span>
                    {userInfo.farmSize} • {userInfo.primaryCrops}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{userInfo.experience} farming experience</span>
                </div>
              </div>
              <p className="mt-3 text-sm">{userInfo.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{userLevel}</div>
            <p className="text-xs text-muted-foreground">Current Level</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{userXP}</div>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{userCoins}</div>
            <p className="text-xs text-muted-foreground">Farm Coins</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{dailyStreak}</div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recentAchievements.slice(0, 4).map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${achievement.earned ? "bg-accent/10 border border-accent/20" : "bg-muted/30 border border-border/50"}`}
                >
                  <Icon
                    className={`h-6 w-6 mx-auto mb-2 ${achievement.earned ? "text-accent" : "text-muted-foreground"}`}
                  />
                  <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            All Achievements
            <Badge variant="secondary">
              {allAchievements.filter((a) => a.earned).length}/{allAchievements.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allAchievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className={`glass-card ${achievement.earned ? "border-accent/50 bg-accent/5" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-8 w-8 ${achievement.earned ? "text-accent" : "text-muted-foreground"}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          {achievement.earned && <CheckCircle className="h-4 w-4 text-accent" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        {achievement.earned ? (
                          <p className="text-xs text-accent">Earned on {achievement.date}</p>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Weekly Learning Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Weekly Learning Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>Hours per day</span>
              <span>Modules completed</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyProgress.map((day, index) => {
                const maxHours = Math.max(...weeklyProgress.map((d) => d.hours))
                const height = (day.hours / maxHours) * 100
                return (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-full flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-sm transition-all duration-500 hover:from-accent hover:to-accent/60"
                        style={{ height: `${height}%`, minHeight: "8px" }}
                      ></div>
                      <div className="absolute -top-6 text-xs font-medium text-primary">{day.hours}h</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{day.day}</div>
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span>Learning Hours</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Modules Completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <PieChart className="h-5 w-5 text-accent" />
            Learning Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryProgress.map((category, index) => {
              const percentage = (category.completed / category.total) * 100
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={percentage} className="h-3" />
                    <div className={`absolute inset-0 ${category.color} opacity-20 rounded-full`}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}% complete</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skill Distribution Pie Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Skill Mastery Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {skillDistribution.map((skill, index) => {
                    const startAngle = skillDistribution.slice(0, index).reduce((acc, s) => acc + s.percentage * 3.6, 0)
                    const endAngle = startAngle + skill.percentage * 3.6
                    const largeArcFlag = skill.percentage > 50 ? 1 : 0
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                    return <path key={index} d={pathData} className={skill.color} fill="currentColor" opacity="0.8" />
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{completedModules.length}</div>
                    <div className="text-xs text-muted-foreground">Skills</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {skillDistribution.map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${skill.color} rounded-sm`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.skill}</span>
                      <span className="font-medium">{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats Grid */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Learning Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningStats.map((stat, index) => {
              const Icon = stat.icon
              const percentage = (stat.value / stat.total) * 100
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {stat.value}/{stat.total}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}% complete</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Level Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Level {userLevel}</span>
              <span className="text-sm text-muted-foreground">
                {userXP}/{userLevel * 300} XP
              </span>
            </div>
            <Progress value={(userXP / (userLevel * 300)) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {userLevel * 300 - userXP} XP needed to reach Level {userLevel + 1}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderFarmInfo = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Farm Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Farm Size</label>
                <Input
                  value={userInfo.farmSize}
                  onChange={(e) => setUserInfo({ ...userInfo, farmSize: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Crops</label>
                <Input
                  value={userInfo.primaryCrops}
                  onChange={(e) => setUserInfo({ ...userInfo, primaryCrops: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Experience</label>
                <Input
                  value={userInfo.experience}
                  onChange={(e) => setUserInfo({ ...userInfo, experience: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Farm Size</h4>
                  <p className="text-muted-foreground">{userInfo.farmSize}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Primary Crops</h4>
                  <p className="text-muted-foreground">{userInfo.primaryCrops}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Experience</h4>
                  <p className="text-muted-foreground">{userInfo.experience}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-muted-foreground">{userInfo.location}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Crop Calendar */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Crop Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wheat className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Rice</h4>
              </div>
              <p className="text-sm text-muted-foreground">Planting: June - July</p>
              <p className="text-sm text-muted-foreground">Harvest: November - December</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="h-5 w-5 text-accent" />
                <h4 className="font-medium">Coconut</h4>
              </div>
              <p className="text-sm text-muted-foreground">Year-round cultivation</p>
              <p className="text-sm text-muted-foreground">Harvest: Every 45 days</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Spices</h4>
              </div>
              <p className="text-sm text-muted-foreground">Planting: April - May</p>
              <p className="text-sm text-muted-foreground">Harvest: October - November</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLog.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Icon className={`h-5 w-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Phone</label>
            <Input
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Bio</label>
            <Textarea
              value={userInfo.bio}
              onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "achievements":
        return renderAchievements()
      case "progress":
        return renderProgress()
      case "farm":
        return renderFarmInfo()
      case "activity":
        return renderActivity()
      case "settings":
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Navigation */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex gap-2 overflow-x-auto">
            {profileSections.map((section) => {
              const Icon = section.icon
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      {renderContent()}
    </div>
  )
}
