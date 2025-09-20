"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, MapPin, Loader2 } from "lucide-react"
import { getPanchayatsForDistrict } from "@/lib/gemini"

export function PanchayatSelector({
  selectedState,
  selectedDistrict,
  onPanchayatSelect,
  onBack,
}: {
  selectedState: string
  selectedDistrict: string
  onPanchayatSelect: (panchayat: string) => void
  onBack: () => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPanchayat, setSelectedPanchayat] = useState<string | null>(null)
  const [panchayats, setPanchayats] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPanchayats = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedPanchayats = await getPanchayatsForDistrict(selectedState, selectedDistrict)
        setPanchayats(fetchedPanchayats)
      } catch (err) {
        setError("Failed to load panchayats. Please try again.")
        console.error("Error fetching panchayats:", err)
        setPanchayats([])
      } finally {
        setLoading(false)
      }
    }

    fetchPanchayats()
  }, [selectedState, selectedDistrict])

  const filteredPanchayats = panchayats.filter((panchayat) =>
    panchayat.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/indian-village-panchayat-rural-landscape.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-cyan-200/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4 text-teal-700 hover:text-teal-800 hover:bg-teal-100">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">SELECT YOUR PANCHAYAT</h1>
            <div className="text-teal-600 text-lg space-y-1">
              <p>
                State: <span className="font-semibold">{selectedState}</span>
              </p>
              <p>
                District: <span className="font-semibold">{selectedDistrict}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search panchayats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg border-2 border-teal-200 focus:border-teal-400 rounded-lg"
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="w-12 h-12 animate-spin text-teal-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-teal-800">Loading Panchayats</h3>
                  <p className="text-teal-600">
                    Fetching panchayats from {selectedDistrict}, {selectedState}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
              <div className="text-red-600 mb-4 text-lg">{error}</div>
              <Button onClick={() => window.location.reload()} className="bg-teal-600 hover:bg-teal-700 text-white">
                Retry Loading
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {filteredPanchayats.map((panchayat) => (
              <div
                key={panchayat}
                onClick={() => setSelectedPanchayat(panchayat)}
                className={`cursor-pointer p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedPanchayat === panchayat
                    ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-600 shadow-2xl scale-105"
                    : "bg-white/90 backdrop-blur-sm hover:bg-teal-50 border-teal-200 hover:border-teal-300 text-teal-800 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-teal-100 flex-shrink-0">
                    <img
                      src={`/abstract-geometric-shapes.png?key=abc12&height=48&width=48&query=${panchayat}+panchayat+village+rural`}
                      alt={`${panchayat} village`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-2 opacity-75" />
                      <div className="font-semibold text-lg">{panchayat}</div>
                    </div>
                    <div className="text-sm opacity-75">
                      {selectedPanchayat === panchayat ? "✓ Selected" : "Click to select"}
                    </div>
                  </div>
                </div>

                <div className="text-xs opacity-60 mt-2">
                  {selectedDistrict}, {selectedState}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredPanchayats.length === 0 && panchayats.length > 0 && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                <Search className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">No panchayats found</h3>
              <p className="text-teal-600">
                No panchayats found matching "{searchTerm}" in {selectedDistrict}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && panchayats.length > 0 && (
          <div className="text-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 inline-block shadow-lg">
              <p className="text-sm text-teal-700">
                Showing {filteredPanchayats.length} of {panchayats.length} panchayats in {selectedDistrict}
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedPanchayat && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white rounded-full shadow-2xl border-4 border-teal-200 p-2">
              <Button
                onClick={() => onPanchayatSelect(selectedPanchayat)}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue with {selectedPanchayat}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
