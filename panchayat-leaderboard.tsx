"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Coins, Target, TrendingUp, Users, MapPin } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  avatar?: string
  greenPoints: number
  level: number
  streak: number
  completedModules: number
  rank: number
  district: string
  panchayat: string
}

interface PanchayatLeaderboardProps {
  userPanchayat: string
  userDistrict: string
  currentUserId?: string
}

export default function PanchayatLeaderboard({
  userPanchayat,
  userDistrict,
  currentUserId,
}: PanchayatLeaderboardProps) {
  // Mock leaderboard data - in real app, this would come from API with panchayat filter
  const leaderboardData: LeaderboardUser[] = [
    {
      id: "1",
      name: "Ravi Kumar",
      avatar: "/farmer-avatar.jpg",
      greenPoints: 2850,
      level: 15,
      streak: 12,
      completedModules: 8,
      rank: 1,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "2",
      name: "Priya Nair",
      avatar: "/female-farmer-avatar.jpg",
      greenPoints: 2640,
      level: 14,
      streak: 8,
      completedModules: 7,
      rank: 2,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "3",
      name: "Suresh Menon",
      avatar: "/elderly-farmer-avatar.jpg",
      greenPoints: 2420,
      level: 13,
      streak: 15,
      completedModules: 6,
      rank: 3,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "4",
      name: "Lakshmi Devi",
      greenPoints: 2180,
      level: 12,
      streak: 5,
      completedModules: 6,
      rank: 4,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "5",
      name: "Krishnan Pillai",
      greenPoints: 1950,
      level: 11,
      streak: 9,
      completedModules: 5,
      rank: 5,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "6",
      name: "Radha Kumari",
      greenPoints: 1820,
      level: 10,
      streak: 3,
      completedModules: 5,
      rank: 6,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "7",
      name: "Mohanan Nair",
      greenPoints: 1650,
      level: 9,
      streak: 7,
      completedModules: 4,
      rank: 7,
      district: userDistrict,
      panchayat: userPanchayat,
    },
    {
      id: "8",
      name: "Geetha Amma",
      greenPoints: 1480,
      level: 8,
      streak: 4,
      completedModules: 4,
      rank: 8,
      district: userDistrict,
      panchayat: userPanchayat,
    },
  ]

  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaderboard = leaderboardData.slice(3)

  const getPodiumIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />
      default:
        return null
    }
  }

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-32"
      case 2:
        return "h-24"
      case 3:
        return "h-20"
      default:
        return "h-16"
    }
  }

  return (
    <div className="space-y-6">
      {/* Panchayat Header */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl font-heading font-bold">Community Hub: {userPanchayat}</h2>
                <p className="text-muted-foreground">{userDistrict} District</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Users className="h-3 w-3" />
              {leaderboardData.length} Active Farmers
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{leaderboardData.length}</div>
              <p className="text-xs text-muted-foreground">Local Farmers</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">
                {Math.round(leaderboardData.reduce((acc, user) => acc + user.greenPoints, 0) / leaderboardData.length)}
              </div>
              <p className="text-xs text-muted-foreground">Avg Green Points</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {leaderboardData.reduce((acc, user) => acc + user.completedModules, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total Modules</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Performers in {userPanchayat}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <div className="mb-3">
                <Avatar className="h-16 w-16 border-4 border-gray-400">
                  <AvatarImage src={topThree[1]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    {topThree[1]?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`${getPodiumHeight(2)} w-24 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex flex-col items-center justify-start pt-3`}
              >
                <Medal className="h-6 w-6 text-white mb-1" />
                <span className="text-white font-bold text-sm">2nd</span>
              </div>
              <div className="text-center mt-3">
                <p className="font-semibold text-sm">{topThree[1]?.name}</p>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Coins className="h-3 w-3 text-accent" />
                  <span className="text-xs font-medium">{topThree[1]?.greenPoints}</span>
                </div>
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center">
              <div className="mb-3">
                <Avatar className="h-20 w-20 border-4 border-yellow-500">
                  <AvatarImage src={topThree[0]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-600 font-semibold text-lg">
                    {topThree[0]?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`${getPodiumHeight(1)} w-28 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex flex-col items-center justify-start pt-3`}
              >
                <Trophy className="h-8 w-8 text-white mb-1" />
                <span className="text-white font-bold">1st</span>
              </div>
              <div className="text-center mt-3">
                <p className="font-semibold">{topThree[0]?.name}</p>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Coins className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">{topThree[0]?.greenPoints}</span>
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <div className="mb-3">
                <Avatar className="h-16 w-16 border-4 border-amber-600">
                  <AvatarImage src={topThree[2]?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-600 font-semibold">
                    {topThree[2]?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`${getPodiumHeight(3)} w-24 bg-gradient-to-t from-amber-500 to-amber-600 rounded-t-lg flex flex-col items-center justify-start pt-3`}
              >
                <Award className="h-6 w-6 text-white mb-1" />
                <span className="text-white font-bold text-sm">3rd</span>
              </div>
              <div className="text-center mt-3">
                <p className="font-semibold text-sm">{topThree[2]?.name}</p>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Coins className="h-3 w-3 text-accent" />
                  <span className="text-xs font-medium">{topThree[2]?.greenPoints}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {userPanchayat} Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                user.id === currentUserId
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted/30 border-border/50 hover:bg-muted/50"
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                {user.rank}
              </div>

              {/* Avatar */}
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{user.name}</h4>
                  {user.id === currentUserId && (
                    <Badge variant="default" className="text-xs">
                      You
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Level {user.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {user.streak}d streak
                  </span>
                  <span>{user.completedModules} modules</span>
                </div>
              </div>

              {/* Green Points */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-accent mb-1">
                  <Coins className="h-4 w-4" />
                  <span className="font-bold">{user.greenPoints.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Green Points</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Panchayat Stats */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {userPanchayat} Community Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-xl font-bold text-primary mb-1">
                {Math.max(...leaderboardData.map((u) => u.streak))}
              </div>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-xl font-bold text-accent mb-1">
                {Math.max(...leaderboardData.map((u) => u.level))}
              </div>
              <p className="text-xs text-muted-foreground">Highest Level</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-xl font-bold text-primary mb-1">
                {leaderboardData.reduce((acc, u) => acc + u.completedModules, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total Completions</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-xl font-bold text-accent mb-1">
                {leaderboardData.reduce((acc, u) => acc + u.greenPoints, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total Green Points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
