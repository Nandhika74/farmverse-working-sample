"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function WelcomeScreen({ onContinue }: { onContinue: (name: string, language: string) => void }) {
  const [showContent, setShowContent] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [userName, setUserName] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", native: "മലയാളം" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleStartJourney = () => {
    if (userName.trim()) {
      const userData = {
        name: userName.trim(),
        language: selectedLanguage,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem("farmverse-user-data", JSON.stringify(userData))
      onContinue(userName.trim(), selectedLanguage)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/welcome-hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-700/70 to-amber-600/80"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-amber-300/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-green-300/30 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-400/30 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div
          className={`text-center transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-8">
            <div className="w-36 h-36 mx-auto bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="text-7xl relative z-10">🌾</div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="text-sm">🤖</div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-serif tracking-wider drop-shadow-2xl">
            FARMWISE
          </h1>
          <div className="mb-2">
            <span className="inline-block bg-gradient-to-r from-amber-300 to-amber-500 text-green-900 px-6 py-2 rounded-full font-bold text-lg shadow-lg">
              AI-Powered Agriculture
            </span>
          </div>
          <p className="text-xl md:text-2xl text-amber-100 mb-2 font-medium drop-shadow-lg">
            Welcome to the Future of Farming
          </p>
          <p className="text-lg text-amber-200 mb-12 max-w-md mx-auto drop-shadow-md">
            Embark on your agricultural journey with AI-powered insights and gamified farming
          </p>

          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-green-900 font-bold text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-amber-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">START YOUR JOURNEY</span>
            </Button>
          ) : (
            <Card className="glass-card max-w-md mx-auto backdrop-blur-lg bg-white/10 border-white/20">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">What should we call you?</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-colors"
                    onKeyPress={(e) => e.key === "Enter" && handleStartJourney()}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Preferred Language</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white text-left flex items-center justify-between hover:bg-white/20 transition-colors"
                    >
                      <span>
                        {languages.find((lang) => lang.name === selectedLanguage)?.native || selectedLanguage}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showLanguageDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLanguage(lang.name)
                              setShowLanguageDropdown(false)
                            }}
                            className={`w-full p-3 text-left hover:bg-amber-100 transition-colors ${
                              selectedLanguage === lang.name
                                ? "bg-amber-200 text-green-900 font-semibold"
                                : "text-green-900"
                            }`}
                          >
                            <div className="font-medium">{lang.native}</div>
                            <div className="text-sm opacity-70">{lang.name}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleStartJourney}
                  disabled={!userName.trim()}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-green-900 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🗺️</div>
              <h3 className="text-white font-semibold mb-2 text-lg">Region Selection</h3>
              <p className="text-amber-200 text-sm">Choose your farming region with precision</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🌱</div>
              <h3 className="text-white font-semibold mb-2 text-lg">Smart Crops</h3>
              <p className="text-amber-200 text-sm">AI-powered crop recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎮</div>
              <h3 className="text-white font-semibold mb-2 text-lg">Gamified Experience</h3>
              <p className="text-amber-200 text-sm">Level up your farming skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
