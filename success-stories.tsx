"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, BookOpen, TrendingUp, MapPin, Calendar, Award } from "lucide-react"

interface SuccessStoriesProps {
  onBack?: () => void
}

export default function SuccessStories({ onBack }: SuccessStoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Stories" },
    { id: "organic", name: "Organic Transition" },
    { id: "technology", name: "Tech Adoption" },
    { id: "yield", name: "Yield Improvement" },
    { id: "sustainability", name: "Sustainable Practices" },
  ]

  const stories = [
    {
      id: 1,
      title: "From Chemical to Organic: My 3-Year Journey",
      author: "Rajesh Menon",
      avatar: "/success-farmer.jpg",
      location: "Wayanad, Kerala",
      category: "Organic Transition",
      readTime: "8 min read",
      likes: 45,
      shares: 12,
      publishedDate: "2 weeks ago",
      featured: true,
      image: "/organic-farm.jpg",
      excerpt:
        "How I successfully transitioned my 5-acre farm from chemical-intensive to fully organic, increasing both yield and profit margins.",
      achievements: ["50% cost reduction", "30% yield increase", "Organic certification"],
      story:
        "Three years ago, I was spending ₹80,000 per season on chemical fertilizers and pesticides for my 5-acre mixed crop farm. Today, I'm completely organic, spending only ₹35,000 per season while achieving 30% higher yields. The journey wasn't easy, but the results speak for themselves...",
    },
    {
      id: 2,
      title: "Drip Irrigation Doubled My Coconut Yield",
      author: "Priya Nair",
      avatar: "/female-farmer-success.jpg",
      location: "Thrissur, Kerala",
      category: "Tech Adoption",
      readTime: "5 min read",
      likes: 32,
      shares: 8,
      publishedDate: "1 month ago",
      featured: false,
      image: "/drip-irrigation.jpg",
      excerpt:
        "Installing drip irrigation transformed my coconut plantation, saving water while dramatically increasing productivity.",
      achievements: ["100% yield increase", "60% water savings", "₹2L additional income"],
      story:
        "Water scarcity was killing my coconut trees. After installing drip irrigation with government subsidy, not only did I save 60% water, but my coconut yield doubled from 8,000 to 16,000 nuts per year...",
    },
    {
      id: 3,
      title: "Integrated Farming: Fish, Rice, and Ducks Together",
      author: "Suresh Kumar",
      avatar: "/integrated-farmer.jpg",
      location: "Alappuzha, Kerala",
      category: "Sustainable Practices",
      readTime: "10 min read",
      likes: 67,
      shares: 23,
      publishedDate: "3 weeks ago",
      featured: true,
      image: "/integrated-farming.jpg",
      excerpt:
        "My integrated farming system combining rice, fish, and ducks has created a sustainable ecosystem that's both profitable and environmentally friendly.",
      achievements: ["3 income streams", "Zero external inputs", "Award winner 2023"],
      story:
        "Traditional paddy farming was barely profitable. By integrating fish farming and duck rearing in the same field, I created a self-sustaining system where each component supports the others...",
    },
    {
      id: 4,
      title: "Smart Sensors Saved My Pepper Crop",
      author: "Anitha Raj",
      avatar: "/tech-farmer.jpg",
      location: "Idukki, Kerala",
      category: "Tech Adoption",
      readTime: "6 min read",
      likes: 28,
      shares: 15,
      publishedDate: "2 months ago",
      featured: false,
      image: "/smart-farming.jpg",
      excerpt:
        "IoT sensors and mobile alerts helped me prevent crop loss and optimize irrigation for my black pepper plantation.",
      achievements: ["90% crop survival", "40% water savings", "Early disease detection"],
      story:
        "Last year, I lost 60% of my pepper crop to sudden weather changes. This year, with soil moisture sensors and weather monitoring, I haven't lost a single plant...",
    },
  ]

  const filteredStories =
    selectedCategory === "all"
      ? stories
      : stories.filter((story) => story.category.toLowerCase().includes(selectedCategory))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Success Stories</h2>
        <p className="text-muted-foreground">Learn from fellow farmers' achievements and innovations</p>
      </div>

      {/* Category Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Stories */}
      <div className="space-y-6">
        {filteredStories.map((story) => (
          <Card
            key={story.id}
            className={`glass-card hover:shadow-lg transition-shadow ${story.featured ? "ring-2 ring-accent/20" : ""}`}
          >
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {story.featured && (
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">{story.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{story.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                    {story.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{story.excerpt}</p>

                  {/* Achievements */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.author} />
                        <AvatarFallback>
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{story.author}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{story.location}</span>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <span>{story.publishedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{story.shares}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <h3 className="font-heading font-semibold text-lg mb-2">Share Your Success Story</h3>
          <p className="text-muted-foreground mb-4">
            Inspire other farmers by sharing your achievements and innovations
          </p>
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            Submit Your Story
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
