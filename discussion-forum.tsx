"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, ThumbsUp, Clock, Search, Plus, Pin, TrendingUp } from "lucide-react"

interface DiscussionForumProps {
  onBack?: () => void
}

export default function DiscussionForum({ onBack }: DiscussionForumProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)

  const categories = [
    { id: "all", name: "All Topics", count: 156 },
    { id: "crops", name: "Crop Management", count: 45 },
    { id: "soil", name: "Soil Health", count: 32 },
    { id: "pests", name: "Pest Control", count: 28 },
    { id: "irrigation", name: "Irrigation", count: 21 },
    { id: "organic", name: "Organic Farming", count: 30 },
  ]

  const discussions = [
    {
      id: 1,
      title: "Best organic pesticides for tomato plants?",
      author: "Ravi Kumar",
      avatar: "/diverse-farmers-harvest.png",
      location: "Kochi, Kerala",
      category: "Pest Control",
      replies: 12,
      likes: 8,
      timeAgo: "2 hours ago",
      isPinned: false,
      isTrending: true,
      preview: "I've been struggling with aphids on my tomato plants. Looking for effective organic solutions...",
    },
    {
      id: 2,
      title: "Monsoon preparation checklist for paddy fields",
      author: "Priya Nair",
      avatar: "/female-farmer.jpg",
      location: "Alappuzha, Kerala",
      category: "Crop Management",
      replies: 24,
      likes: 15,
      timeAgo: "4 hours ago",
      isPinned: true,
      isTrending: false,
      preview: "With monsoon approaching, here's my comprehensive checklist for paddy field preparation...",
    },
    {
      id: 3,
      title: "Soil pH testing results - need advice",
      author: "Suresh Menon",
      avatar: "/elderly-farmer.jpg",
      location: "Thrissur, Kerala",
      category: "Soil Health",
      replies: 7,
      likes: 5,
      timeAgo: "6 hours ago",
      isPinned: false,
      isTrending: false,
      preview: "Just got my soil test results back. pH is 5.2. What amendments should I consider?",
    },
    {
      id: 4,
      title: "Drip irrigation setup for small farms",
      author: "Anitha Raj",
      avatar: "/young-farmer.jpg",
      location: "Wayanad, Kerala",
      category: "Irrigation",
      replies: 18,
      likes: 22,
      timeAgo: "1 day ago",
      isPinned: false,
      isTrending: true,
      preview: "Sharing my experience setting up drip irrigation on a 2-acre plot. Cost breakdown included...",
    },
    {
      id: 5,
      title: "Companion planting success stories",
      author: "Mohanan Pillai",
      avatar: "/experienced-farmer.jpg",
      location: "Palakkad, Kerala",
      category: "Organic Farming",
      replies: 31,
      likes: 28,
      timeAgo: "2 days ago",
      isPinned: false,
      isTrending: false,
      preview: "After 3 seasons of companion planting, here are my observations and recommendations...",
    },
  ]

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory = selectedCategory === "all" || discussion.category.toLowerCase().includes(selectedCategory)
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Discussion Forum</h2>
          <p className="text-muted-foreground">Connect and learn from fellow farmers</p>
        </div>
        <Button onClick={() => setShowNewPost(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <Card key={discussion.id} className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                  <AvatarFallback>
                    {discussion.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                      {discussion.isTrending && <TrendingUp className="h-4 w-4 text-accent" />}
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">{discussion.title}</h3>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {discussion.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{discussion.preview}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{discussion.timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select className="w-full p-2 border rounded-lg bg-background">
                  <option>Crop Management</option>
                  <option>Soil Health</option>
                  <option>Pest Control</option>
                  <option>Irrigation</option>
                  <option>Organic Farming</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input placeholder="What would you like to discuss?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea placeholder="Provide details about your question or topic..." rows={4} />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNewPost(false)}>Post Discussion</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
