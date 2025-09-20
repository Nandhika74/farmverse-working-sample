"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Sprout,
  TrendingUp,
  Trophy,
  CloudRain,
  Thermometer,
  DollarSign,
  Target,
  Users,
} from "lucide-react"

interface FarmerDashboardProps {
  farmerName?: string
  location?: {
    state: string
    district: string
    panchayat: string
  }
  selectedSoil?: string
  selectedCrop?: string
  language?: string
}

export function FarmerDashboard({
  farmerName = "Rajesh Kumar",
  location = { state: "Tamil Nadu", district: "Chennai", panchayat: "Alandur" },
  selectedSoil = "alluvial",
  selectedCrop = "rice",
  language = "en",
}: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock AI recommendations based on user data
  const aiRecommendations = [
    {
      type: "crop",
      title: "Optimal Planting Time",
      description: "Based on weather patterns, plant your rice seeds in the next 2 weeks for best yield.",
      priority: "high",
      action: "Plan Planting",
    },
    {
      type: "soil",
      title: "Soil Enhancement",
      description: "Your alluvial soil would benefit from organic compost. Apply 2-3 tons per acre.",
      priority: "medium",
      action: "Add Compost",
    },
    {
      type: "weather",
      title: "Irrigation Alert",
      description: "Light rainfall expected next week. Reduce irrigation by 30% to prevent waterlogging.",
      priority: "high",
      action: "Adjust Irrigation",
    },
  ]

  const communityLeaderboard = [
    { rank: 1, name: "Priya Sharma", location: "Alandur", xp: 2450, crop: "Rice" },
    { rank: 2, name: "Rajesh Kumar", location: "Alandur", xp: 2200, crop: "Rice", isCurrentUser: true },
    { rank: 3, name: "Suresh Patel", location: "Alandur", xp: 2100, crop: "Wheat" },
    { rank: 4, name: "Meera Singh", location: "Alandur", xp: 1950, crop: "Cotton" },
    { rank: 5, name: "Arjun Reddy", location: "Alandur", xp: 1800, crop: "Rice" },
  ]

  const marketPrices = [
    { crop: "Rice", price: "₹2,850", change: "+5.2%", trend: "up" },
    { crop: "Wheat", price: "₹2,200", change: "-2.1%", trend: "down" },
    { crop: "Cotton", price: "₹6,500", change: "+8.7%", trend: "up" },
    { crop: "Sugarcane", price: "₹350", change: "+1.5%", trend: "up" },
  ]

  const currentQuests = [
    {
      id: 1,
      title: "Rice Master",
      description: "Complete 3 rice farming cycles",
      progress: 66,
      reward: "500 XP",
      type: "farming",
    },
    {
      id: 2,
      title: "Community Helper",
      description: "Help 5 farmers in your panchayat",
      progress: 40,
      reward: "300 XP",
      type: "community",
    },
    {
      id: 3,
      title: "Soil Expert",
      description: "Test soil quality 10 times",
      progress: 80,
      reward: "400 XP",
      type: "knowledge",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {farmerName}!</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {location.panchayat}, {location.district}, {location.state}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">2,200 XP</div>
            <div className="text-sm text-gray-600">Level 12 Farmer</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: Sprout },
          { id: "recommendations", label: "AI Recommendations", icon: Target },
          { id: "community", label: "Community", icon: Users },
          { id: "marketplace", label: "Market", icon: DollarSign },
          { id: "quests", label: "Quests", icon: Trophy },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Current Crop Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sprout className="w-5 h-5 mr-2 text-green-600" />
                Current Crop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Rice (Kharif)</span>
                  <Badge variant="secondary">Growing</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Growth Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">Expected harvest: 45 days</div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="w-5 h-5 mr-2 text-blue-600" />
                Weather Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
                    <span>32°C</span>
                  </div>
                  <div className="text-sm text-gray-600">Partly Cloudy</div>
                </div>
                <div className="text-sm">
                  <div>Humidity: 68%</div>
                  <div>Rainfall: 2mm expected</div>
                </div>
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  Perfect conditions for rice growth!
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                Farm Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Land</span>
                  <span className="font-medium">2.5 acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Crops Grown</span>
                  <span className="font-medium">8 varieties</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Earnings</span>
                  <span className="font-medium">₹1,25,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Recommendations</h2>
          {aiRecommendations.map((rec, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{rec.title}</h3>
                      <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="ml-2">
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                  </div>
                  <Button size="sm" className="ml-4">
                    {rec.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "community" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                {location.panchayat} Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communityLeaderboard.map((farmer) => (
                  <div
                    key={farmer.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      farmer.isCurrentUser ? "bg-green-50 border border-green-200" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          farmer.rank === 1
                            ? "bg-yellow-400"
                            : farmer.rank === 2
                              ? "bg-gray-300"
                              : farmer.rank === 3
                                ? "bg-orange-400"
                                : "bg-gray-200"
                        }`}
                      >
                        <span className="text-sm font-bold">{farmer.rank}</span>
                      </div>
                      <div>
                        <div className="font-medium">{farmer.name}</div>
                        <div className="text-sm text-gray-600">{farmer.crop}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{farmer.xp} XP</div>
                      {farmer.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "marketplace" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Market Prices - {location.district}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.crop}</div>
                      <div className="text-2xl font-bold text-gray-800">{item.price}</div>
                      <div className="text-sm text-gray-600">per quintal</div>
                    </div>
                    <div className={`text-right ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      <div className="font-medium">{item.change}</div>
                      <div className="text-sm">vs last week</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "quests" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Quests</h2>
          {currentQuests.map((quest) => (
            <Card key={quest.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{quest.title}</h3>
                    <p className="text-gray-600">{quest.description}</p>
                  </div>
                  <Badge variant="outline">{quest.reward}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <Progress value={quest.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
