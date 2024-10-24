"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, ArrowRight, Volume2, RotateCcw, X, Car, User, Eye, EyeOff, ChevronUp, ChevronDown, Info, Phone, Mail, Search, ChevronLeft, ChevronRight, Calendar, Fuel, Gauge, MessageSquare } from "lucide-react"
import { useState, useMemo, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const primaryColor = "#1D3455"

export default function MotorcentralenCard() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showCarImages, setShowCarImages] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" })
  const [isVisible, setIsVisible] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const scrollContainerRef = useRef(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatbotMessages, setChatbotMessages] = useState([
    { role: "assistant", content: "Hej! Jag är säljarens AI-assistent. Hur kan jag hjälpa dig idag?" },
    { role: "user", content: "Hej! Jag undrar över finansieringsmöjligheter för denna bil." },
    { role: "assistant", content: "Självklart! Vi erbjuder flera finansieringsalternativ. Vill du ha information om billån eller leasing?" },
    { role: "user", content: "Jag är intresserad av billån. Vad har ni för räntor?" },
    { role: "assistant", content: "Vi har för närvarande billån med räntor från 3,95% till 5,95%, beroende på lånets längd och din kreditvärdighet. Vill du att jag ska koppla in säljaren för mer detaljerad information?" },
    { role: "user", content: "Ja, tack. Det skulle vara bra att prata med säljaren direkt." },
    { role: "system", content: "Säljaren har nu tagit över chatten." },
    { role: "assistant", content: "Hej! Det är Anna här. Jag förstår att du är intresserad av billån för vår Skoda Octavia. Jag kan erbjuda dig en personlig offert baserad på dina förutsättningar. Vill du boka ett möte för att gå igenom detaljerna?" }
  ])
  const [chatInputValue, setChatInputValue] = useState("")
  const [conversation, setConversation] = useState([
    { role: "assistant", content: "Hej! Välkommen till Motorcentralen. Hur kan jag hjälpa dig idag?" },
    { role: "user", content: "Har ni några röda bilar inne?" },
    { role: "assistant", content: "Ja, vi har faktiskt flera röda bilar i lager just nu. Är det någon speciell modell eller typ av bil du är intresserad av? Jag kan hjälpa dig att filtrera vårt utbud baserat på färg och andra egenskaper." },
    { role: "user", content: "Jag letar efter en röd kombi. Vad har ni för alternativ?" },
    { role: "assistant", content: "Utmärkt! Vi har några röda kombibilar tillgängliga. Här är några alternativ:" },
  ])

  const handleStopGeneration = () => {
    setIsGenerating(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const togglePreview = () => {
    setIsPreviewing(!isPreviewing)
  }

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value })
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactInfo)
    setShowContactForm(false)
    setConversation(prev => [
      ...prev,
      { role: "assistant", content: "Tack för din information! Vi kommer att kontakta dig så snart som möjligt." }
    ])
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    setConversation(prev => [
      ...prev,
      { role: "user", content: inputValue },
      { role: "assistant", content: "Tack för din fråga. Låt mig kolla det för dig." }
    ])
    setInputValue("")
  }

  const handleChatbotSend = () => {
    if (chatInputValue.trim() === "") return

    setChatbotMessages(prev => [
      ...prev,
      { role: "user", content: chatInputValue },
      { role: "assistant", content: "Tack för din fråga. Jag ska hjälpa dig med det." }
    ])
    setChatInputValue("")
  }

  const carData = [
    {
      id: 1,
      name: "Skoda Octavia",
      type: "Kombi",
      price: 329000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Hybrid",
      transmission: "Automat",
      mileage: "0 km (ny)",
      year: 2024,
      brand: "Skoda",
      color: "Röd",
      seller: {
        name: "Anna Andersson",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-123 45 67",
        email: "anna.andersson@motorcentralen.se"
      }
    },
    {
      id: 2,
      name: "Volkswagen Passat",
      type: "Sedan",
      price: 389000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Diesel",
      transmission: "Automat",
      mileage: "5000 km",
      year: 2023,
      brand: "Volkswagen",
      color: "Blå",
      seller: {
        name: "Erik Eriksson",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-234 56 78",
        email: "erik.eriksson@motorcentralen.se"
      }
    },
    {
      id: 3,
      name: "Audi A4",
      type: "Sedan",
      price: 459000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Bensin",
      transmission: "Automat",
      mileage: "1000 km",
      year: 2024,
      brand: "Audi",
      color: "Svart",
      seller: {
        name: "Maria Nilsson",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-345 67 89",
        email: "maria.nilsson@motorcentralen.se"
      }
    },
    {
      id: 4,
      name: "Skoda Superb",
      type: "Kombi",
      price: 419000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Hybrid",
      transmission: "Automat",
      mileage: "500 km",
      year: 2024,
      brand: "Skoda",
      color: "Röd",
      seller: {
        name: "Johan Svensson",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-456 78 90",
        email: "johan.svensson@motorcentralen.se"
      }
    },
    {
      id: 5,
      name: "Volkswagen Golf",
      type: "Halvkombi",
      price: 299000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Bensin",
      transmission: "Manuell",
      mileage: "2000 km",
      year: 2023,
      brand: "Volkswagen",
      color: "Vit",
      seller: {
        name: "Lisa Lindgren",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-567 89 01",
        email: "lisa.lindgren@motorcentralen.se"
      }
    },
    {
      id: 6,
      name: "Audi Q5",
      type: "SUV",
      price: 589000,
      image: "/placeholder.svg?height=150&width=200",
      fuelType: "Diesel",
      transmission: "Automat",
      mileage: "0 km (ny)",
      year: 2024,
      brand: "Audi",
      color: "Grå",
      seller: {
        name: "Peter Bergström",
        image: "/placeholder.svg?height=200&width=200",
        phone: "070-678 90 12",
        email: "peter.bergstrom@motorcentralen.se"
      }
    }
  ]

  const filteredCars = useMemo(() => {
    return carData.filter(car => 
      (searchTerm === "" || 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.price.toString().includes(searchTerm) ||
        car.color.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeFilters.length === 0 ||
        activeFilters.includes(car.fuelType.toUpperCase()) ||
        activeFilters.includes(car.transmission.toUpperCase()) ||
        activeFilters.includes(car.type.toUpperCase()) ||
        activeFilters.includes(car.brand.toUpperCase()) ||
        activeFilters.includes(car.color.toUpperCase()))
    )
  }, [searchTerm, activeFilters])

  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1]
    if (lastMessage.role === "user" && lastMessage.content.toLowerCase().includes("röd kombi")) {
      const redCombis = carData.filter(car => car.color.toLowerCase() === "röd" && car.type.toLowerCase() === "kombi")
      const carList = redCombis.map(car => `${car.brand} ${car.name} (${car.year})`).join(", ")
      setConversation(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: `Här är de röda kombibilar vi har tillgängliga: ${carList}. Vill du ha mer information om någon av dessa?` 
        }
      ])
    }
  }, [conversation])

  return (
    <div className="relative w-full max-w-[62.5rem] mx-auto">
      <div className={`transition-all duration-500 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <Card className="w-full bg-white text-gray-800 shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-[#1D3455]" />
                <CardTitle className="text-xl font-bold tracking-wide text-gray-800">Motorcentralen pre-alpha v0.2</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                  onClick={togglePreview}
                >
                  {isPreviewing ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {isPreviewing ? "Dölj källa" : "Visa källa"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Återställ
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                  onClick={toggleVisibility}
                >
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Dölj
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6 bg-[#1D3455]" style={{ height: "calc(100% * 1.25)"   }}>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
              {conversation.map((message, index) => (
                <div key={index} className={cn(
                  "p-4 rounded-lg",
                  message.role === "assistant" 
                    ? "bg-white text-gray-800 shadow-sm border border-gray-100" 
                    : "bg-[#2A4A7F] text-white shadow-sm border border-[#3A5A8F] ml-auto max-w-[80%]"
                )}>
                  {message.role === "assistant" && (
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-5 h-5 mr-2 text-[#1D3455]" />
                      <span className="font-semibold">Motorcentralen</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              ))}
              <div className="bg-white text-gray-800 p-4 shadow-sm border border-gray-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-5 h-5 mr-2 text-[#1D3455]" />
                  <span className="font-semibold">Motorcentralen</span>
                </div>
                <p className="text-sm leading-relaxed mb-3">
                  Här kan du söka och filtrera bland våra tillgängliga bilar:
                </p>
                <div className="mb-4 relative">
                  <Input
                    type="text"
                    placeholder="Sök efter bilmärke, modell, bränsletyp, färg..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["DIESEL", "BENSIN", "AUTOMAT", "KOMBI", "SUV", "AUDI", "SKODA", "VOLKSWAGEN", "RÖD", "BLÅ", "SVART", "VIT", "GRÅ"].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilters.includes(filter) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter)}
                      className={cn(
                        "transition-colors duration-200",
                        activeFilters.includes(filter) ? "bg-[#1D3455] text-white" : "text-[#1D3455]"
                      )}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                    onClick={scrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 pb-4 px-8 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {filteredCars.map((car) => (
                      <div key={car.id} className="flex-none w-64 border p-4 hover:shadow-md transition-shadow duration-200 bg-white rounded-lg snap-start">
                        <img src={car.image} alt={car.name} className="w-full h-40 object-cover mb-2 rounded" />
                        <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                        <p className="text-[#1D3455] font-bold mb-2">{car.price.toLocaleString()} SEK</p>
                        <p className="text-sm text-gray-600 mb-1">{car.type} • {car.year}</p>
                        <p className="text-sm text-gray-600 mb-1">{car.fuelType} • {car.transmission}</p>
                        <p className="text-sm text-gray-600 mb-1">{car.color}</p>
                        <p className="text-sm text-gray-600 mb-2">{car.mileage}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setSelectedCar(car)}
                        >
                          <Info className="w-4 h-4 mr-2" />
                          Mer information
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                    onClick={scrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                {selectedCar && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg relative overflow-hidden">
                    <div className={`transition-all duration-300 ease-in-out ${showChatbot ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-lg mb-2">{selectedCar.name} - Detaljerad information</h4>
                          <p className="mb-1"><strong>Pris:</strong> {selectedCar.price.toLocaleString()} SEK</p>
                          <p className="mb-1"><strong>Typ:</strong> {selectedCar.type}</p>
                          <p className="mb-1"><strong>Färg:</strong> {selectedCar.color}</p>
                          <p className="mb-1"><strong>Årsmodell:</strong> {selectedCar.year}</p>
                          <p className="mb-1"><strong>Bränsletyp:</strong> {selectedCar.fuelType}</p>
                          <p className="mb-1"><strong>Växellåda:</strong> {selectedCar.transmission}</p>
                          <p className="mb-1"><strong>Miltal:</strong> {selectedCar.mileage}</p>
                        </div>
                        <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                          <img src={selectedCar.seller.image} alt={selectedCar.seller.name} className="w-32 h-32 rounded-full mb-2" />
                          <h5 className="font-semibold mb-1">{selectedCar.seller.name}</h5>
                          <p className="text-sm text-gray-600 mb-1 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {selectedCar.seller.phone}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mb-2">
                            <Mail className="w-4 h-4 mr-1" />
                            {selectedCar.seller.email}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => setShowChatbot(true)}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chatta med säljaren
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Boka provkörning
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Fuel className="w-4 h-4 mr-2" />
                          Beräkna bränslekostnad
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Gauge className="w-4 h-4 mr-2" />
                          Värdera inbyte
                        </Button>
                      </div>
                    </div>
                    <div className={`absolute top-0 left-0 w-full h-full bg-white transition-all duration-300 ease-in-out ${showChatbot ? 'translate-y-0' : 'translate-y-full'}`}>
                      <div className="p-4 flex justify-between items-center bg-[#1D3455] text-white">
                        <h3 className="font-semibold">Chatta med {selectedCar.seller.name}</h3>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-[#2A4A7F]"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-[#2A4A7F]"
                            onClick={() => setShowChatbot(false)}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 h-[300px] overflow-y-auto">
                        {chatbotMessages.map((message, index) => (
                          <div key={index} className={cn(
                            "mb-2 p-2 rounded-lg",
                            message.role === "assistant" 
                              ? "bg-gray-100 text-gray-800" 
                              : message.role === "user"
                              ? "bg-[#2A4A7F] text-white ml-auto"
                              : "bg-yellow-100 text-gray-800 italic"
                          )}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                          <Input
                            className="flex-grow"
                            placeholder="Skriv ett meddelande..."
                            value={chatInputValue}
                            onChange={(e) => setChatInputValue(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleChatbotSend()
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            className="bg-[#1D3455] hover:bg-[#0F1A2A] text-white"
                            onClick={handleChatbotSend}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showContactForm && (
                <div className="bg-white text-gray-800 p-4 shadow-sm border border-gray-100 rounded-lg mt-4">
                  <h3 className="font-semibold text-lg mb-2">Kontaktformulär</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Namn"
                      value={contactInfo.name}
                      onChange={handleContactInfoChange}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-post"
                      value={contactInfo.email}
                      onChange={handleContactInfoChange}
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      value={contactInfo.phone}
                      onChange={handleContactInfoChange}
                    />
                    <Button type="submit" className="w-full">Skicka</Button>
                  </form>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center space-x-2 w-full">
              <div className="relative flex-grow">
                <Input
                  className="w-full bg-gray-50 border-gray-200 text-gray-800 pr-24 focus:ring-[#1D3455] focus:border-[#1D3455] transition-all duration-200"
                  placeholder="Skriv ett meddelande..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button
                    className={cn(
                      "h-8 w-8 p-0 bg-[#1D3455] hover:bg-[#0F1A2A] text-white transition-colors duration-200",
                      "focus:ring-2 focus:ring-[#1D3455] focus:ring-offset-2"
                    )}
                    onClick={handleSendMessage}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span className="sr-only">Skicka meddelande</span>
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                <Volume2 className="h-5 w-5" />
                <span className="sr-only">Ljud</span>
              </Button>
            </div>
          </CardFooter>
          {isPreviewing && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <h3 className="text-sm font-semibold mb-2">Källa:</h3>
              <p className="text-sm bg-gray-100 p-2">{inputValue || "Skriv något för att se källan här."}</p>
            </div>
          )}
        </Card>
      </div>
      {!isVisible && (
        <Button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#1D3455] hover:bg-[#0F1A2A] text-white transition-colors duration-200 focus:ring-2 focus:ring-[#1D3455]"
          onClick={toggleVisibility}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI
        </Button>
      )}
    </div>
  )
}
