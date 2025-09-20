"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, ArrowLeft } from "lucide-react"

// Sample location data - in a real app, this would come from an API
const locationData = {
  "Tamil Nadu": {
    districts: {
      Chennai: ["Alandur", "Ambattur", "Anna Nagar", "Egmore", "Guindy"],
      Coimbatore: ["Annur", "Coimbatore North", "Coimbatore South", "Kinathukadavu", "Madukkarai"],
      Madurai: ["Kalligudi", "Madurai East", "Madurai West", "Melur", "Peraiyur"],
      Salem: ["Attur", "Gangavalli", "Omalur", "Salem", "Vazhapadi"],
      Tiruchirappalli: ["Lalgudi", "Manachanallur", "Manapparai", "Srirangam", "Tiruchirappalli"],
    },
  },
  Karnataka: {
    districts: {
      "Bengaluru Urban": ["Anekal", "Bengaluru East", "Bengaluru North", "Bengaluru South", "Devanahalli"],
      Mysuru: ["Hunsur", "Krishnarajanagara", "Mysuru", "Nanjangud", "Periyapatna"],
      Mangaluru: ["Bantwal", "Belthangady", "Mangaluru", "Moodabidri", "Puttur"],
      "Hubli-Dharwad": ["Dharwad", "Hubli", "Kalghatgi", "Kundgol", "Navalgund"],
    },
  },
  Maharashtra: {
    districts: {
      Mumbai: ["Andheri", "Bandra", "Borivali", "Dadar", "Thane"],
      Pune: ["Baramati", "Bhor", "Haveli", "Maval", "Pune City"],
      Nagpur: ["Hingna", "Kamptee", "Nagpur Rural", "Nagpur Urban", "Parseoni"],
      Nashik: ["Baglan", "Kalwan", "Nashik", "Niphad", "Sinnar"],
    },
  },
  "Uttar Pradesh": {
    districts: {
      Lucknow: ["Bakshi Ka Talab", "Chinhat", "Lucknow", "Malihabad", "Mohanlalganj"],
      Kanpur: ["Bilhaur", "Chaubepur", "Kanpur Dehat", "Kanpur Nagar", "Rasulabad"],
      Agra: ["Agra", "Bah", "Fatehabad", "Kheragarh", "Pinahat"],
      Varanasi: ["Chiraigaon", "Pindra", "Rohaniya", "Sevapuri", "Varanasi"],
    },
  },
  "West Bengal": {
    districts: {
      Kolkata: ["Behala", "Jadavpur", "New Town", "Salt Lake", "Tollygunge"],
      Howrah: ["Bally", "Howrah", "Jagatballavpur", "Panchla", "Udaynarayanpur"],
      Darjeeling: ["Darjeeling", "Kalimpong", "Kurseong", "Mirik", "Siliguri"],
      "North 24 Parganas": ["Barasat", "Basirhat", "Deganga", "Habra", "Rajarhat"],
    },
  },
}

interface LocationSelectorProps {
  selectedState?: string
  onBack?: () => void
  onLocationSelect?: (state: string, district: string, panchayat: string) => void
}

export function LocationSelector({ selectedState = "Tamil Nadu", onBack, onLocationSelect }: LocationSelectorProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedPanchayat, setSelectedPanchayat] = useState<string>("")

  const districts = Object.keys(locationData[selectedState as keyof typeof locationData]?.districts || {})
  const panchayats = selectedDistrict
    ? locationData[selectedState as keyof typeof locationData]?.districts[selectedDistrict] || []
    : []

  const handleContinue = () => {
    if (selectedDistrict && selectedPanchayat) {
      onLocationSelect?.(selectedState, selectedDistrict, selectedPanchayat)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-4">
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
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-12 h-12 text-green-600 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">Select Your Location</h1>
        </div>
        <p className="text-green-700 text-lg">Choose your district and panchayat for personalized recommendations</p>
      </div>

      {/* Location Selection Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-200">
          {/* Selected State */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-green-800 mb-2">Selected State</label>
            <div className="p-3 bg-green-100 rounded-lg border border-green-300">
              <p className="text-green-900 font-medium">{selectedState}</p>
            </div>
          </div>

          {/* District Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-green-800 mb-2">Select District *</label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full p-3 border-2 border-green-300 focus:border-green-500">
                <SelectValue placeholder="Choose your district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Panchayat Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-green-800 mb-2">Select Panchayat/Area *</label>
            <Select value={selectedPanchayat} onValueChange={setSelectedPanchayat} disabled={!selectedDistrict}>
              <SelectTrigger className="w-full p-3 border-2 border-green-300 focus:border-green-500 disabled:opacity-50">
                <SelectValue placeholder={selectedDistrict ? "Choose your panchayat" : "Select district first"} />
              </SelectTrigger>
              <SelectContent>
                {panchayats.map((panchayat) => (
                  <SelectItem key={panchayat} value={panchayat}>
                    {panchayat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Summary */}
          {selectedDistrict && selectedPanchayat && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Your Selected Location:</h3>
              <p className="text-green-700">
                <span className="font-medium">{selectedPanchayat}</span>, {selectedDistrict}, {selectedState}
              </p>
            </div>
          )}

          {/* Continue Button */}
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDistrict || !selectedPanchayat}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue with Selected Location
          </Button>
        </div>

        {/* Benefits Info */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-green-900 mb-3">Why we need your location:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
              <span className="text-green-800">Personalized crop recommendations</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
              <span className="text-green-800">Local weather and soil data</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
              <span className="text-green-800">Community leaderboards</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
              <span className="text-green-800">Regional market prices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
