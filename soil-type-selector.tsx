"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft } from "lucide-react"

const soilTypes = [
  {
    id: "alluvial",
    name: "Alluvial Soil",
    description: "Fertile, good for cereals",
    image: "/dark-rich-fertile-soil-with-small-green-plant-spro.jpg",
    characteristics: ["High fertility", "Good water retention", "Suitable for rice, wheat, sugarcane"],
    regions: ["Gangetic Plains", "River deltas", "Coastal areas"],
  },
  {
    id: "red-yellow",
    name: "Red & Yellow Soil",
    description: "Iron-rich, suitable for plantation",
    image: "/reddish-orange-iron-rich-soil-texture-with-small-g.jpg",
    characteristics: ["Iron oxide content", "Good drainage", "Suitable for cotton, tobacco, fruits"],
    regions: ["Deccan Plateau", "Eastern Ghats", "Chhota Nagpur"],
  },
  {
    id: "laterite",
    name: "Laterite",
    description: "Brick-like, for rubber & cashew",
    image: "/brick-like-reddish-laterite-soil-with-cashew-nut.jpg",
    characteristics: ["High aluminum content", "Good for tree crops", "Poor in nitrogen"],
    regions: ["Western Ghats", "Eastern Ghats", "Assam hills"],
  },
  {
    id: "black",
    name: "Black",
    description: "Clayey, retains moisture (Cotton)",
    image: "/cracked-black-clayey-soil-with-white-cotton-bolls.jpg",
    characteristics: ["High clay content", "Excellent moisture retention", "Rich in lime and potash"],
    regions: ["Maharashtra", "Gujarat", "Madhya Pradesh"],
  },
  {
    id: "arid",
    name: "Arid",
    description: "Sandy, desert crops",
    image: "/sandy-beige-desert-soil-with-small-cactus-plant.jpg",
    characteristics: ["Low organic matter", "High salt content", "Suitable for drought-resistant crops"],
    regions: ["Rajasthan", "Gujarat", "Haryana"],
  },
  {
    id: "forest-mountain",
    name: "Forest & Mountain Soil",
    description: "Rich humus, for spices & fruits",
    image: "/dark-humus-rich-forest-soil-with-moss-and-small-fe.jpg",
    characteristics: ["High organic content", "Good for horticulture", "Rich in humus"],
    regions: ["Himalayan region", "Western Ghats", "Northeastern states"],
  },
]

interface SoilTypeSelectorProps {
  onBack?: () => void
  onSoilSelect?: (soilType: string) => void
}

export function SoilTypeSelector({ onBack, onSoilSelect }: SoilTypeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSoil, setSelectedSoil] = useState<string | null>(null)

  const filteredSoils = soilTypes.filter(
    (soil) =>
      soil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      soil.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSoilSelect = (soilId: string) => {
    setSelectedSoil(soilId)
    onSoilSelect?.(soilId)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/soil-testing-farmer.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/90 via-green-50/90 to-lime-100/90"></div>
      </div>

      <div className="relative z-10 p-4">
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2 drop-shadow-lg">CHOOSE YOUR SOIL TYPE</h1>
          <p className="text-green-700 text-lg font-medium">Select the soil type that matches your farming area</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search soil types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 text-lg rounded-full border-2 border-green-300 focus:border-green-500 bg-white/90 backdrop-blur-sm"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1 bottom-1 px-4 bg-green-500 hover:bg-green-600 rounded-full"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Soil Type Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoils.map((soil) => (
              <div
                key={soil.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedSoil === soil.id ? "scale-105 shadow-2xl" : "hover:scale-102 hover:shadow-xl"
                }`}
                onClick={() => handleSoilSelect(soil.id)}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 hover:border-green-400 transition-colors">
                  {/* Soil Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={soil.image || "/placeholder.svg"}
                      alt={soil.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-2">{soil.name}</h3>
                    <p className="text-green-700 text-sm mb-4 font-medium">{soil.description}</p>

                    {/* Characteristics */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-800">Key Features:</h4>
                      <ul className="text-xs text-green-600 space-y-1">
                        {soil.characteristics.slice(0, 2).map((char, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Selection Indicator */}
                    {selectedSoil === soil.id && (
                      <div className="mt-4 p-2 bg-green-100 rounded-lg border border-green-300">
                        <p className="text-green-800 text-sm font-medium text-center">✓ Selected</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        {selectedSoil && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg"
              onClick={() => {
                const selected = soilTypes.find((s) => s.id === selectedSoil)
                console.log("Selected soil:", selected?.name)
              }}
            >
              Continue with {soilTypes.find((s) => s.id === selectedSoil)?.name}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredSoils.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-600 text-lg">No soil types found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
