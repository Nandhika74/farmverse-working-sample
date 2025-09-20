"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sprout, ArrowLeft, CheckCircle, X, RotateCcw, Beaker, Microscope, Target } from "lucide-react"

interface SoilMaster3DProps {
  onBack: () => void
  onComplete: (score: number) => void
}

export default function SoilMaster3D({ onBack, onComplete }: SoilMaster3DProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSample, setSelectedSample] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<any>({})
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const soilSamples = [
    {
      id: "clay",
      name: "Clay Soil",
      color: "bg-orange-800",
      description: "Dense, water-retaining soil with fine particles",
      properties: { ph: 6.8, nitrogen: "High", phosphorus: "Medium", potassium: "Low" },
    },
    {
      id: "sandy",
      name: "Sandy Soil",
      color: "bg-yellow-600",
      description: "Well-draining soil with large particles",
      properties: { ph: 7.2, nitrogen: "Low", phosphorus: "Low", potassium: "Medium" },
    },
    {
      id: "loam",
      name: "Loam Soil",
      color: "bg-amber-700",
      description: "Balanced soil with good drainage and nutrients",
      properties: { ph: 6.5, nitrogen: "High", phosphorus: "High", potassium: "High" },
    },
  ]

  const quizQuestions = [
    {
      question: "Which soil type is best for most crops?",
      options: ["Clay Soil", "Sandy Soil", "Loam Soil", "Rocky Soil"],
      correct: 2,
      explanation: "Loam soil provides the perfect balance of drainage, water retention, and nutrients.",
    },
    {
      question: "What pH level is ideal for most vegetables?",
      options: ["5.0-5.5", "6.0-7.0", "7.5-8.0", "8.5-9.0"],
      correct: 1,
      explanation: "Most vegetables thrive in slightly acidic to neutral soil (pH 6.0-7.0).",
    },
    {
      question: "Which nutrient is most important for leaf growth?",
      options: ["Phosphorus", "Potassium", "Nitrogen", "Calcium"],
      correct: 2,
      explanation: "Nitrogen is essential for chlorophyll production and leaf development.",
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)

  const steps = [
    "Introduction",
    "Soil Sample Selection",
    "Laboratory Testing",
    "Results Analysis",
    "Knowledge Quiz",
    "Completion",
  ]

  const handleSampleSelect = (sampleId: string) => {
    setSelectedSample(sampleId)
    const sample = soilSamples.find((s) => s.id === sampleId)
    if (sample) {
      setTestResults(sample.properties)
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      const finalScore = Math.round((quizScore / quizQuestions.length) * 100)
      setScore(finalScore)
      setShowResults(true)
      setCurrentStep(5)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-3">Welcome to Soil Master 3D</h2>
              <p className="text-muted-foreground mb-6">
                Learn about different soil types, their properties, and how to test them for optimal crop growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-muted/30 rounded-lg">
                <Microscope className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Analyze Samples</h3>
                <p className="text-muted-foreground">Test different soil types</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Beaker className="h-6 w-6 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Lab Testing</h3>
                <p className="text-muted-foreground">Measure pH and nutrients</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Apply Knowledge</h3>
                <p className="text-muted-foreground">Take the final quiz</p>
              </div>
            </div>
            <Button onClick={() => setCurrentStep(1)} className="w-full md:w-auto">
              Start Learning
            </Button>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-bold mb-2">Select a Soil Sample</h2>
              <p className="text-muted-foreground">Choose a soil sample to analyze in our virtual laboratory</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {soilSamples.map((sample) => (
                <Card
                  key={sample.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedSample === sample.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleSampleSelect(sample.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${sample.color} rounded-full mx-auto mb-3 shadow-inner`} />
                    <h3 className="font-semibold mb-2">{sample.name}</h3>
                    <p className="text-sm text-muted-foreground">{sample.description}</p>
                    {selectedSample === sample.id && <CheckCircle className="h-5 w-5 text-primary mx-auto mt-3" />}
                  </CardContent>
                </Card>
              ))}
            </div>
            {selectedSample && (
              <div className="text-center">
                <Button onClick={() => setCurrentStep(2)}>Proceed to Testing</Button>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-bold mb-2">Laboratory Testing</h2>
              <p className="text-muted-foreground">Analyzing your selected soil sample...</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Beaker className="h-16 w-16 text-primary animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-bounce" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span>pH Level Testing</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">In Progress...</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span>Nitrogen Content</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent rounded-full animate-pulse" />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span>Phosphorus & Potassium</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">Processing...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={() => setCurrentStep(3)}>View Results</Button>
            </div>
          </div>
        )

      case 3:
        const selectedSampleData = soilSamples.find((s) => s.id === selectedSample)
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-bold mb-2">Test Results</h2>
              <p className="text-muted-foreground">Analysis complete for {selectedSampleData?.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">pH Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{testResults.ph}</div>
                  <Progress value={(testResults.ph / 14) * 100} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {testResults.ph < 6.5 ? "Acidic" : testResults.ph > 7.5 ? "Alkaline" : "Neutral"}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Nutrients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Nitrogen (N)</span>
                    <Badge
                      variant={
                        testResults.nitrogen === "High"
                          ? "default"
                          : testResults.nitrogen === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {testResults.nitrogen}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phosphorus (P)</span>
                    <Badge
                      variant={
                        testResults.phosphorus === "High"
                          ? "default"
                          : testResults.phosphorus === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {testResults.phosphorus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Potassium (K)</span>
                    <Badge
                      variant={
                        testResults.potassium === "High"
                          ? "default"
                          : testResults.potassium === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {testResults.potassium}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={() => setCurrentStep(4)}>Take Knowledge Quiz</Button>
            </div>
          </div>
        )

      case 4:
        const question = quizQuestions[currentQuestion]
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-bold mb-2">Knowledge Quiz</h2>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
              <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mt-2" />
            </div>

            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        selectedAnswer === index
                          ? "bg-primary/10 border-primary"
                          : "bg-muted/30 border-border hover:bg-muted/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-accent" />
                      ) : (
                        <X className="h-5 w-5 text-destructive" />
                      )}
                      <span className="font-semibold">
                        {selectedAnswer === question.correct ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedAnswer !== null && (
              <div className="text-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
                </Button>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-3">Module Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Congratulations! You've successfully completed the Soil Master 3D module.
              </p>
            </div>

            <Card className="glass-card max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Your Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quiz Score</span>
                    <span className="font-semibold">{score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>XP Earned</span>
                    <span className="font-semibold text-primary">+150 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coins Earned</span>
                    <span className="font-semibold text-accent">+50 Coins</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(0)
                  setSelectedSample(null)
                  setCurrentQuestion(0)
                  setSelectedAnswer(null)
                  setQuizScore(0)
                  setScore(0)
                  setShowResults(false)
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Module
              </Button>
              <Button onClick={() => onComplete(score)}>Continue Learning</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Workshop
          </Button>
          <div className="text-center">
            <h1 className="font-heading font-bold text-xl">Soil Master 3D</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span key={index} className={index <= currentStep ? "text-primary" : ""}>
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="glass-card">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
