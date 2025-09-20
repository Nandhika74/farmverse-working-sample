"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    script: "Aa",
    flag: "🇬🇧",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    script: "अआ",
    flag: "🇮🇳",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "அஆ",
    flag: "🇮🇳",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    script: "అఆ",
    flag: "🇮🇳",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    script: "ಅಆ",
    flag: "🇮🇳",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    script: "അആ",
    flag: "🇮🇳",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    script: "અઆ",
    flag: "🇮🇳",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    script: "अआ",
    flag: "🇮🇳",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    script: "অআ",
    flag: "🇮🇳",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    script: "ਅਆ",
    flag: "🇮🇳",
  },
]

interface LanguageSelectorProps {
  onLanguageSelect?: (languageCode: string) => void
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    onLanguageSelect?.(languageCode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center mb-4">
          <Globe className="w-12 h-12 text-indigo-600 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">Choose Your Language</h1>
        </div>
        <p className="text-indigo-700 text-lg">Select your preferred language to continue</p>
      </div>

      {/* Language Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`group cursor-pointer transition-all duration-300 ${
                selectedLanguage === language.code ? "scale-105 shadow-2xl" : "hover:scale-102 hover:shadow-xl"
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors text-center">
                {/* Flag */}
                <div className="text-4xl mb-3">{language.flag}</div>

                {/* Native Script */}
                <div className="text-2xl font-bold text-indigo-900 mb-2">{language.script}</div>

                {/* Language Names */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-indigo-800">{language.nativeName}</h3>
                  <p className="text-sm text-indigo-600">{language.name}</p>
                </div>

                {/* Selection Indicator */}
                {selectedLanguage === language.code && (
                  <div className="mt-4 p-2 bg-indigo-100 rounded-lg border border-indigo-300">
                    <p className="text-indigo-800 text-sm font-medium">✓ Selected</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {selectedLanguage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg"
            onClick={() => {
              const selected = languages.find((l) => l.code === selectedLanguage)
              console.log("Selected language:", selected?.name)
            }}
          >
            Continue in {languages.find((l) => l.code === selectedLanguage)?.name}
          </Button>
        </div>
      )}
    </div>
  )
}
