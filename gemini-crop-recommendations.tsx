"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CropRecommendation {
  name: string
  suitability: string
  season: string
  expectedYield: string
  tips: string[]
}

interface GeminiCropRecommendationsProps {
  state: string
  district: string
  panchayat: string
  soilType?: string
}

export function GeminiCropRecommendations({
  state,
  district,
  panchayat,
  soilType = "alluvial",
}: GeminiCropRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCropRecommendations = async () => {
    setLoading(true)
    setError(null)

    try {
      const prompt = `As an agricultural expert, provide crop recommendations for:
      Location: ${panchayat}, ${district}, ${state}, India
      Soil Type: ${soilType}
      
      Please provide 5 suitable crops with the following details for each:
      1. Crop name
      2. Suitability rating (High/Medium/Low)
      3. Best growing season
      4. Expected yield per acre
      5. 3 key farming tips
      
      Format the response as JSON array with objects containing: name, suitability, season, expectedYield, tips (array of strings)`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBdeSYE7f96htn3bSmEtBqOGEjDe-BxMeU`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()
      const generatedText = data.candidates[0]?.content?.parts[0]?.text

      if (generatedText) {
        // Extract JSON from the response
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const cropData = JSON.parse(jsonMatch[0])
          setRecommendations(cropData)
        } else {
          // Fallback with mock data if JSON parsing fails
          setRecommendations([
            {
              name: "Rice",
              suitability: "High",
              season: "Kharif (June-October)",
              expectedYield: "25-30 quintals/acre",
              tips: ["Maintain water level 2-3 inches", "Use organic fertilizers", "Monitor for pests regularly"],
            },
            {
              name: "Coconut",
              suitability: "High",
              season: "Year-round",
              expectedYield: "80-100 nuts/tree/year",
              tips: ["Plant during monsoon", "Ensure proper drainage", "Regular watering needed"],
            },
          ])
        }
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setError("Failed to fetch crop recommendations")
      // Fallback recommendations
      setRecommendations([
        {
          name: "Rice",
          suitability: "High",
          season: "Kharif (June-October)",
          expectedYield: "25-30 quintals/acre",
          tips: ["Maintain water level 2-3 inches", "Use organic fertilizers", "Monitor for pests regularly"],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (state && district && panchayat) {
      fetchCropRecommendations()
    }
  }, [state, district, panchayat, soilType])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">Getting AI Crop Recommendations...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-red-600 mb-4">Error Loading Recommendations</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchCropRecommendations} className="bg-green-600 hover:bg-green-700">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-green-800 mb-4">🌾 AI Crop Recommendations for {panchayat}</h3>
      <p className="text-gray-600 mb-6">
        Based on {soilType} soil in {district}, {state}
      </p>

      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <div key={index} className="border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-green-700">{crop.name}</h4>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  crop.suitability === "High"
                    ? "bg-green-100 text-green-800"
                    : crop.suitability === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {crop.suitability} Suitability
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <span className="font-medium text-gray-700">Season: </span>
                <span className="text-gray-600">{crop.season}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Expected Yield: </span>
                <span className="text-gray-600">{crop.expectedYield}</span>
              </div>
            </div>

            <div>
              <span className="font-medium text-gray-700">Key Tips:</span>
              <ul className="list-disc list-inside mt-1 text-gray-600 text-sm">
                {crop.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={fetchCropRecommendations} className="mt-4 bg-green-600 hover:bg-green-700 w-full">
        🔄 Refresh Recommendations
      </Button>
    </div>
  )
}
