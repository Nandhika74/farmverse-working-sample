"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Loader2, Sparkles, TrendingUp } from "lucide-react"
import { getCropsForSoilType } from "@/lib/gemini"

interface CropSelectionSystemProps {
  selectedSoil?: string
  selectedState?: string
  selectedDistrict?: string
  onBack?: () => void
  onCropSelect?: (cropId: string) => void
}

export function CropSelectionSystem({
  selectedSoil = "alluvial",
  selectedState = "Karnataka",
  selectedDistrict = "Bangalore",
  onBack,
  onCropSelect,
}: CropSelectionSystemProps) {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [aiCrops, setAiCrops] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCropRecommendations = async () => {
      try {
        setLoading(true)
        setError(null)
        const cropData = await getCropsForSoilType(selectedSoil, selectedState, selectedDistrict)
        setAiCrops(cropData.crops)
      } catch (err) {
        setError("Failed to load crop recommendations. Please try again.")
        console.error("Error fetching crop recommendations:", err)
        setAiCrops([])
      } finally {
        setLoading(false)
      }
    }

    fetchCropRecommendations()
  }, [selectedSoil, selectedState, selectedDistrict])

  const getSoilDisplayName = (soilId: string) => {
    const soilNames: Record<string, string> = {
      alluvial: "Alluvial Soil - Fertile & Moist",
      "red-yellow": "Red & Yellow Soil - Iron-rich",
      laterite: "Laterite Soil - Brick-like",
      black: "Black Soil - Clayey",
      arid: "Arid Soil - Sandy",
      "forest-mountain": "Forest & Mountain Soil - Rich Humus",
    }
    return soilNames[soilId] || "Unknown Soil Type"
  }

  const renderStars = (suitability: "High" | "Medium" | "Low") => {
    const rating = suitability === "High" ? 5 : suitability === "Medium" ? 3 : 2
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getSuitabilityColor = (suitability: "High" | "Medium" | "Low") => {
    switch (suitability) {
      case "High":
        return "bg-green-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 via-green-50 to-yellow-100 p-4">
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('/placeholder.svg?key=crop1')`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-700 hover:text-green-800 hover:bg-green-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex-1" />
        </div>

        {/* Title and Soil Selection */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-green-900">AI CROP RECOMMENDATIONS</h1>
            <Sparkles className="w-8 h-8 text-green-600 ml-3" />
          </div>
          <div className="bg-green-200/80 backdrop-blur-sm rounded-lg px-6 py-3 inline-block shadow-lg">
            <p className="text-green-800 font-medium">
              Selected: <span className="font-bold">{getSoilDisplayName(selectedSoil)}</span>
            </p>
            <p className="text-green-700 text-sm mt-1">
              Location: {selectedDistrict}, {selectedState}
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-green-800">Analyzing Your Soil</h3>
                  <p className="text-green-600">Getting personalized crop recommendations...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
              <div className="text-red-600 mb-4 text-lg">{error}</div>
              <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700 text-white">
                Retry Loading
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && aiCrops.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-green-900">Personalized Recommendations</h2>
              </div>
              <p className="text-green-700 text-lg">
                Based on your {getSoilDisplayName(selectedSoil).toLowerCase()} in {selectedDistrict}, {selectedState}
              </p>
            </div>

            {/* Crops Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {aiCrops.map((crop, index) => {
                const isSelected = selectedCrop === crop.name

                return (
                  <div
                    key={`${crop.name}-${index}`}
                    className={`group cursor-pointer transition-all duration-300 ${
                      isSelected ? "scale-105 shadow-2xl" : "hover:scale-102 hover:shadow-xl"
                    }`}
                    onClick={() => {
                      setSelectedCrop(crop.name)
                      onCropSelect?.(crop.name)
                    }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 hover:border-green-400 transition-colors relative">
                      {/* Suitability Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <div
                          className={`text-xs font-bold px-3 py-1 rounded-full ${getSuitabilityColor(crop.suitability)}`}
                        >
                          {crop.suitability} Match
                        </div>
                      </div>

                      {/* Season Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {crop.season}
                        </div>
                      </div>

                      {/* Crop Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            crop.imageUrl ||
                            `/placeholder.svg?key=crop${index}&height=192&width=300&query=${crop.name}+crop+farming`
                          }
                          alt={crop.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-green-900">{crop.name}</h3>
                          <div className="flex items-center gap-1">{renderStars(crop.suitability)}</div>
                        </div>

                        <p className="text-green-700 text-sm mb-4 line-clamp-2">{crop.description}</p>

                        {/* Season and Suitability Info */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Season:</span>
                            <span className="font-medium text-green-800">{crop.season}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Suitability:</span>
                            <span
                              className={`font-medium ${
                                crop.suitability === "High"
                                  ? "text-green-600"
                                  : crop.suitability === "Medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {crop.suitability}
                            </span>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                            <p className="text-green-800 text-sm font-medium text-center">✓ Selected</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedCrop && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-2xl text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                console.log("Selected crop:", selectedCrop)
              }}
            >
              Continue with {selectedCrop}
            </Button>
          </div>
        )}

        {!loading && !error && aiCrops.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-green-900">AI-Powered Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-1">Soil Analysis</h4>
                <p className="text-gray-600">Recommendations based on your specific soil type and local conditions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-1">Suitability Rating</h4>
                <p className="text-gray-600">High, Medium, or Low match based on soil compatibility</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-1">Season Guidance</h4>
                <p className="text-gray-600">Optimal planting seasons for maximum yield</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
