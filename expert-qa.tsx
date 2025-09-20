"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap, MessageCircle, CheckCircle, Clock, Star, Plus } from "lucide-react"

interface ExpertQAProps {
  onBack?: () => void
}

export default function ExpertQA({ onBack }: ExpertQAProps) {
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState("all")

  const experts = [
    {
      id: "all",
      name: "All Experts",
      count: 45,
    },
    {
      id: "dr-krishnan",
      name: "Dr. Krishnan",
      specialization: "Soil Science",
      experience: "15 years",
      rating: 4.9,
      answered: 234,
      avatar: "/soil-expert.jpg",
    },
    {
      id: "prof-maya",
      name: "Prof. Maya Nair",
      specialization: "Organic Farming",
      experience: "12 years",
      rating: 4.8,
      answered: 189,
      avatar: "/organic-expert.jpg",
    },
    {
      id: "dr-rajesh",
      name: "Dr. Rajesh Kumar",
      specialization: "Plant Pathology",
      experience: "18 years",
      rating: 4.9,
      answered: 312,
      avatar: "/plant-expert.jpg",
    },
  ]

  const questions = [
    {
      id: 1,
      question: "How to identify and treat bacterial wilt in tomatoes?",
      askedBy: "Farmer Suresh",
      timeAgo: "2 hours ago",
      status: "answered",
      expert: "Dr. Rajesh Kumar",
      expertAvatar: "/plant-expert.jpg",
      category: "Plant Disease",
      likes: 12,
      answer:
        "Bacterial wilt in tomatoes is caused by Ralstonia solanacearum. Early symptoms include wilting of upper leaves during hot days. The key is prevention through crop rotation, resistant varieties, and proper drainage. Once infected, remove affected plants immediately and treat soil with beneficial microorganisms.",
      isVerified: true,
    },
    {
      id: 2,
      question: "Best time for applying organic compost in Kerala climate?",
      askedBy: "Priya Menon",
      timeAgo: "5 hours ago",
      status: "answered",
      expert: "Prof. Maya Nair",
      expertAvatar: "/organic-expert.jpg",
      category: "Organic Farming",
      likes: 8,
      answer:
        "In Kerala's tropical climate, the best time to apply compost is during the pre-monsoon period (April-May) and post-monsoon (September-October). This allows proper decomposition and nutrient release. Apply 2-3 inches thick layer and incorporate into top 6 inches of soil.",
      isVerified: true,
    },
    {
      id: 3,
      question: "Soil pH is 4.8 - what amendments are needed for vegetable cultivation?",
      askedBy: "Ravi Kumar",
      timeAgo: "1 day ago",
      status: "pending",
      expert: null,
      category: "Soil Management",
      likes: 5,
      answer: null,
      isVerified: false,
    },
    {
      id: 4,
      question: "Integrated pest management for coconut palm weevil?",
      askedBy: "Mohanan Nair",
      timeAgo: "2 days ago",
      status: "answered",
      expert: "Dr. Rajesh Kumar",
      expertAvatar: "/plant-expert.jpg",
      category: "Pest Control",
      likes: 15,
      answer:
        "For coconut palm weevil (Rhynchophorus ferrugineus), use a combination approach: 1) Pheromone traps around palms, 2) Regular inspection and removal of infected tissue, 3) Prophylactic treatment with entomopathogenic nematodes, 4) Avoid fresh cuts during peak activity periods (March-May).",
      isVerified: true,
    },
  ]

  const filteredQuestions =
    selectedExpert === "all"
      ? questions
      : questions.filter((q) => q.expert === experts.find((e) => e.id === selectedExpert)?.name)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Expert Q&A</h2>
          <p className="text-muted-foreground">Get answers from agricultural experts</p>
        </div>
        <Button onClick={() => setShowAskQuestion(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ask Question
        </Button>
      </div>

      {/* Expert Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex gap-4 overflow-x-auto">
            {experts.map((expert) => (
              <Button
                key={expert.id}
                variant={selectedExpert === expert.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExpert(expert.id)}
                className="whitespace-nowrap"
              >
                {expert.name}
                {expert.id !== "all" && ` (${expert.answered})`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Profiles */}
      {selectedExpert !== "all" && (
        <Card className="glass-card">
          <CardContent className="p-6">
            {(() => {
              const expert = experts.find((e) => e.id === selectedExpert)
              if (!expert || expert.id === "all") return null
              return (
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                    <AvatarFallback>
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{expert.name}</h3>
                      <Badge variant="secondary">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Expert
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {expert.specialization} • {expert.experience} experience
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span>{expert.answered} answers</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((item) => (
          <Card key={item.id} className="glass-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Question */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>Asked by {item.askedBy}</span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>{item.likes} likes</span>
                    </div>
                  </div>
                </div>

                {/* Answer */}
                {item.status === "answered" && item.answer && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.expertAvatar || "/placeholder.svg"} alt={item.expert} />
                        <AvatarFallback>
                          {item.expert
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.expert}</span>
                        {item.isVerified && <CheckCircle className="h-4 w-4 text-accent" />}
                        <Badge variant="secondary" className="text-xs">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Expert
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}

                {item.status === "pending" && (
                  <div className="bg-muted/20 rounded-lg p-4 text-center">
                    <Clock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Waiting for expert response...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showAskQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Ask an Expert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select className="w-full p-2 border rounded-lg bg-background">
                  <option>Soil Management</option>
                  <option>Plant Disease</option>
                  <option>Pest Control</option>
                  <option>Organic Farming</option>
                  <option>Irrigation</option>
                  <option>Crop Planning</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Question</label>
                <Input placeholder="What would you like to ask our experts?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Additional Details</label>
                <Textarea
                  placeholder="Provide more context about your farming situation, location, crop type, etc."
                  rows={4}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAskQuestion(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAskQuestion(false)}>Submit Question</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
