"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const indianStates = [
  { name: "JAMMU & KASHMIR", x: 33, y: 10 },
  { name: "HIMACHAL PRADESH", x: 36, y: 15 },
  { name: "PUNJAB", x: 32, y: 20 },
  { name: "HARYANA", x: 35, y: 24 },
  { name: "UTTARAKHAND", x: 41, y: 18 },
  { name: "UTTAR PRADESH", x: 44, y: 30 },
  { name: "BIHAR", x: 56, y: 33 },
  { name: "DELHI", x: 36, y: 26 },

  // Western states
  { name: "RAJASTHAN", x: 26, y: 34 },
  { name: "GUJARAT", x: 20, y: 44 },
  { name: "MAHARASHTRA", x: 30, y: 54 },
  { name: "GOA", x: 26, y: 64 },

  // Central states
  { name: "MADHYA PRADESH", x: 38, y: 44 },
  { name: "CHHATTISGARH", x: 48, y: 46 },
  { name: "JHARKHAND", x: 56, y: 40 },
  { name: "ODISHA", x: 52, y: 50 },

  // Eastern & Northeastern states
  { name: "WEST BENGAL", x: 60, y: 44 },
  { name: "SIKKIM", x: 60, y: 30 },
  { name: "ASSAM", x: 70, y: 34 },
  { name: "MEGHALAYA", x: 66, y: 36 },
  { name: "ARUNACHAL PRADESH", x: 76, y: 26 },
  { name: "NAGALAND", x: 76, y: 36 },
  { name: "MANIPUR", x: 76, y: 40 },
  { name: "MIZORAM", x: 72, y: 46 },
  { name: "TRIPURA", x: 68, y: 46 },

  // Southern states
  { name: "TELANGANA", x: 40, y: 56 },
  { name: "ANDHRA PRADESH", x: 44, y: 66 },
  { name: "KARNATAKA", x: 34, y: 66 },
  { name: "KERALA", x: 30, y: 76 },
  { name: "TAMIL NADU", x: 40, y: 76 },
]

const locationData: Record<string, Record<string, string[]>> = {
  KERALA: {
    Thiruvananthapuram: ["Neyyattinkara", "Varkala", "Attingal", "Chirayinkeezhu", "Kattakada"],
    Kollam: ["Karunagappally", "Kunnathur", "Kottarakkara", "Punalur", "Anchal"],
    Pathanamthitta: ["Adoor", "Pandalam", "Konni", "Kozhencherry", "Ranni"],
    Alappuzha: ["Cherthala", "Ambalappuzha", "Kuttanad", "Haripad", "Mavelikkara"],
    Kottayam: ["Vaikom", "Meenachil", "Changanassery", "Kanjirappally", "Udumbanchola"],
    Idukki: ["Devikulam", "Udumbanchola", "Thodupuzha", "Idukki", "Peerumade"],
    Ernakulam: ["Aluva", "Kanayannur", "Kochi", "Kothamangalam", "Muvattupuzha"],
    Thrissur: ["Chalakudy", "Kodungallur", "Irinjalakuda", "Ollur", "Thrissur"],
    Palakkad: ["Chittur", "Palakkad", "Pattambi", "Ottappalam", "Mannarkkad"],
    Malappuram: ["Tirur", "Tirurangadi", "Ponnani", "Nilambur", "Eranad"],
    Kozhikode: ["Vatakara", "Koyilandy", "Kozhikode", "Thamarassery", "Quilandy"],
    Wayanad: ["Mananthavady", "Sulthan Bathery", "Vythiri"],
    Kannur: ["Taliparamba", "Kannur", "Thalassery", "Iritty", "Payyanur"],
    Kasaragod: ["Kasaragod", "Hosdurg", "Vellarikundu", "Manjeshwar"],
  },
  "TAMIL NADU": {
    Chennai: ["Thiruvottiyur", "Manali", "Madhavaram", "Ambattur", "Ayanavaram"],
    Coimbatore: ["Coimbatore North", "Coimbatore South", "Pollachi", "Valparai", "Mettupalayam"],
    Madurai: ["Madurai East", "Madurai West", "Melur", "Peraiyur", "Thirumangalam"],
    Tiruchirappalli: ["Srirangam", "Lalgudi", "Musiri", "Thuraiyur", "Manapparai"],
    Salem: ["Salem", "Mettur", "Omalur", "Sankari", "Vazhapadi"],
    Tirunelveli: ["Tirunelveli", "Ambasamudram", "Palayamkottai", "Nanguneri", "Radhapuram"],
    Kanyakumari: ["Nagercoil", "Padmanabhapuram", "Colachel", "Thiruvattar", "Vilavancode"],
    Thanjavur: ["Thanjavur", "Kumbakonam", "Papanasam", "Pattukottai", "Orathanadu"],
  },
  MAHARASHTRA: {
    Mumbai: ["Andheri", "Bandra", "Borivali", "Dadar", "Kurla"],
    Pune: ["Pune City", "Pimpri-Chinchwad", "Maval", "Mulshi", "Bhor"],
    Nagpur: ["Nagpur Rural", "Nagpur Urban", "Kamptee", "Hingna", "Parseoni"],
    Nashik: ["Nashik", "Malegaon", "Sinnar", "Niphad", "Dindori"],
    Aurangabad: ["Aurangabad", "Kannad", "Khultabad", "Gangapur", "Paithan"],
  },
  KARNATAKA: {
    Bangalore: ["Bangalore North", "Bangalore South", "Bangalore East", "Anekal", "Hoskote"],
    Mysore: ["Mysore", "Nanjangud", "Hunsur", "Piriyapatna", "Krishnarajanagara"],
    Mangalore: ["Mangalore", "Bantwal", "Puttur", "Sullia", "Belthangady"],
    Hubli: ["Hubli", "Dharwad", "Kalghatgi", "Kundgol", "Navalgund"],
  },
  "ANDHRA PRADESH": {
    Visakhapatnam: ["Visakhapatnam", "Anakapalle", "Narsipatnam", "Bheemunipatnam", "Paderu"],
    Vijayawada: ["Vijayawada", "Machilipatnam", "Gudivada", "Jaggayyapeta", "Kankipadu"],
    Tirupati: ["Tirupati", "Chittoor", "Madanapalle", "Punganur", "Palamaner"],
  },
}

interface IndiaMapSelectorProps {
  onStateSelect: (state: string) => void
}

export function IndiaMapSelector({ onStateSelect }: IndiaMapSelectorProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedPanchayat, setSelectedPanchayat] = useState<string | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<"state" | "district" | "panchayat">("state")

  const handleStateSelect = (stateName: string) => {
    console.log("[v0] State selected:", stateName)
    setSelectedState(stateName)
    setSelectedDistrict(null)
    setSelectedPanchayat(null)
    setCurrentStep("district")
  }

  const handleDistrictSelect = (districtName: string) => {
    console.log("[v0] District selected:", districtName)
    setSelectedDistrict(districtName)
    setSelectedPanchayat(null)
    setCurrentStep("panchayat")
  }

  const handlePanchayatSelect = (panchayatName: string) => {
    console.log("[v0] Panchayat selected:", panchayatName)
    setSelectedPanchayat(panchayatName)
  }

  const handleContinue = () => {
    console.log("[v0] Continue button clicked, calling onStateSelect with:", selectedState)
    if (selectedState && onStateSelect) {
      onStateSelect(selectedState)
    }
  }

  const handleBack = () => {
    if (currentStep === "panchayat") {
      setCurrentStep("district")
      setSelectedPanchayat(null)
    } else if (currentStep === "district") {
      setCurrentStep("state")
      setSelectedDistrict(null)
      setSelectedState(null)
    }
  }

  if (currentStep === "district" && selectedState) {
    const districts = Object.keys(locationData[selectedState] || {})

    return (
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-lime-100">
        {/* Header */}
        <div className="relative z-10 flex justify-center pt-6 px-4">
          <div className="bg-gradient-to-b from-green-200 to-green-400 px-8 py-4 rounded-lg shadow-2xl border-4 border-green-600">
            <h1 className="text-2xl md:text-3xl font-bold text-green-900 text-center tracking-wider font-serif">
              SELECT DISTRICT IN {selectedState}
            </h1>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            onClick={handleBack}
            className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold px-4 py-2 rounded-lg shadow-lg"
          >
            ← Back to States
          </Button>
        </div>

        {/* Districts Grid */}
        <div className="absolute inset-0 flex justify-center items-center pt-32 pb-8 px-6">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {districts.map((district) => (
                <button
                  key={district}
                  className="bg-gradient-to-b from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 text-green-900 font-bold py-4 px-6 rounded-xl shadow-lg border-2 border-green-500 hover:border-green-600 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleDistrictSelect(district)}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "panchayat" && selectedState && selectedDistrict) {
    const panchayats = locationData[selectedState]?.[selectedDistrict] || []

    return (
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100">
        {/* Header */}
        <div className="relative z-10 flex justify-center pt-6 px-4">
          <div className="bg-gradient-to-b from-teal-200 to-teal-400 px-8 py-4 rounded-lg shadow-2xl border-4 border-teal-600">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-900 text-center tracking-wider font-serif">
              SELECT PANCHAYAT IN {selectedDistrict}
            </h1>
            <p className="text-teal-800 text-center mt-2 font-medium">
              {selectedState} → {selectedDistrict}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            onClick={handleBack}
            className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold px-4 py-2 rounded-lg shadow-lg"
          >
            ← Back to Districts
          </Button>
        </div>

        {/* Panchayats Grid */}
        <div className="absolute inset-0 flex justify-center items-center pt-40 pb-20 px-6">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {panchayats.map((panchayat) => (
                <button
                  key={panchayat}
                  className={`bg-gradient-to-b from-teal-200 to-teal-300 hover:from-teal-300 hover:to-teal-400 text-teal-900 font-bold py-3 px-4 rounded-lg shadow-lg border-2 transition-all duration-300 transform hover:scale-105 text-sm cursor-pointer active:scale-95 ${
                    selectedPanchayat === panchayat
                      ? "border-yellow-500 bg-gradient-to-b from-yellow-200 to-yellow-300 ring-2 ring-yellow-400 scale-105"
                      : panchayat === "Ambalappuzha" || panchayat === "Alappuzha"
                        ? "border-orange-500 bg-gradient-to-b from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400"
                        : "border-teal-500 hover:border-teal-600"
                  }`}
                  onClick={() => {
                    console.log("[v0] Panchayat button clicked:", panchayat)
                    handlePanchayatSelect(panchayat)
                  }}
                >
                  {panchayat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedPanchayat && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl border-2 border-green-700 transform hover:scale-105 transition-all duration-300"
            >
              Continue with {selectedPanchayat} →
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Default state selection view
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/india-political-map-clean.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-blue-50/90 to-teal-50/90"></div>
      </div>

      {/* Header Banner */}
      <div className="relative z-10 flex justify-center pt-4 px-4">
        <div className="bg-gradient-to-b from-green-200 to-green-400 px-6 py-3 rounded-lg shadow-xl border-3 border-green-600">
          <h1 className="text-xl md:text-2xl font-bold text-green-900 text-center tracking-wider font-serif">
            SELECT YOUR STATE IN INDIA
          </h1>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 flex justify-center items-center pt-20 pb-4 px-4">
        <div className="relative w-full h-full max-w-5xl">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-green-600">
            <img
              src="/images/india-political-map-clean.png"
              alt="India Political Map"
              className="w-full h-full object-contain bg-white"
            />

            {indianStates.map((state) => (
              <div
                key={state.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${state.x}%`,
                  top: `${state.y}%`,
                }}
              >
                <button
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-300 shadow-lg border-2 ${
                    selectedState === state.name
                      ? "bg-red-500 border-red-700 scale-150 shadow-xl z-30"
                      : hoveredState === state.name
                        ? "bg-orange-400 border-orange-600 scale-125 shadow-lg z-20"
                        : "bg-green-500 border-green-700 hover:bg-orange-400 hover:border-orange-600 hover:scale-125 z-10"
                  }`}
                  onClick={() => handleStateSelect(state.name)}
                  onMouseEnter={() => setHoveredState(state.name)}
                  onMouseLeave={() => setHoveredState(null)}
                  title={state.name}
                />
                {/* Show state name on hover */}
                {hoveredState === state.name && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-40">
                    {state.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
