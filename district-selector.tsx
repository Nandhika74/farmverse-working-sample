"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Loader2 } from "lucide-react"
import { getDistrictsForState } from "@/lib/gemini"

interface DistrictSelectorProps {
  selectedState: string
  onDistrictSelect: (district: string) => void
  onBack: () => void
}

export function DistrictSelector({ selectedState, onDistrictSelect, onBack }: DistrictSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [districts, setDistricts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedDistricts = await getDistrictsForState(selectedState)
        setDistricts(fetchedDistricts)
      } catch (err) {
        setError("Failed to load districts. Please try again.")
        console.error("Error fetching districts:", err)
        // Fallback to empty array
        setDistricts([])
      } finally {
        setLoading(false)
      }
    }

    fetchDistricts()
  }, [selectedState])

  const filteredDistricts = districts.filter((district) => district.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('/indian-agricultural-landscape-with-districts-map.jpg')`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to State Selection
          </Button>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Select Your District</CardTitle>
              <CardDescription className="text-emerald-100 text-lg">
                Choose your district in {selectedState}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search districts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  disabled={loading}
                />
              </div>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mr-3" />
                  <span className="text-lg text-emerald-700">Loading districts from {selectedState}...</span>
                </div>
              )}

              {error && !loading && (
                <div className="text-center py-8">
                  <div className="text-red-600 mb-4">{error}</div>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredDistricts.map((district) => (
                    <Card
                      key={district}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-emerald-200 hover:border-emerald-400"
                      onClick={() => onDistrictSelect(district)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-emerald-100 flex-shrink-0">
                            <img
                              src={`/abstract-geometric-shapes.png?height=48&width=48&query=${district}+district+landmark`}
                              alt={`${district} landmark`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                              <span className="font-semibold text-gray-800">{district}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{selectedState}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!loading && !error && filteredDistricts.length === 0 && districts.length > 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Search className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No districts found</h3>
                  <p className="text-gray-600">
                    No districts found matching "{searchTerm}" in {selectedState}
                  </p>
                </div>
              )}

              {!loading && !error && districts.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-emerald-700">
                    Showing {filteredDistricts.length} of {districts.length} districts in {selectedState}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
