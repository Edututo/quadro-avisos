"use client"

import { useEffect, useState } from "react"

// Mock data - in a real app, this would come from your database
const tvData = {
  "tv-001": {
    name: "Tela do Lobby",
    template: "Slideshow Padrão",
    slides: [
      { id: "1", src: "/placeholder.svg?height=1080&width=1920", type: "image", duration: 5000 },
      { id: "2", src: "/placeholder.svg?height=1080&width=1920", type: "image", duration: 8000 },
      { id: "3", src: "/placeholder.svg?height=1080&width=1920", type: "image", duration: 6000 },
    ],
    settings: {
      transitionType: "fade",
      backgroundColor: "#000000",
      showClock: true,
      autoPlay: true,
    },
  },
  "1": {
    name: "Template Slideshow Padrão",
    template: "Slideshow Padrão",
    slides: [
      { id: "1", src: "/placeholder.svg?height=1080&width=1920", type: "image", duration: 5000 },
      { id: "2", src: "/placeholder.svg?height=1080&width=1920", type: "image", duration: 5000 },
    ],
    settings: {
      transitionType: "fade",
      backgroundColor: "#000000",
      showClock: false,
      autoPlay: true,
    },
  },
}

export default function TVDisplayPage({ params }: { params: { tvId: string } }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(true)

  const tv = tvData[params.tvId as keyof typeof tvData]

  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(clockInterval)
  }, [])

  useEffect(() => {
    if (!tv || !isPlaying || tv.slides.length === 0) return

    const currentSlide = tv.slides[currentSlideIndex]
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % tv.slides.length)
    }, currentSlide.duration)

    return () => clearTimeout(timer)
  }, [currentSlideIndex, tv, isPlaying])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ":
          setIsPlaying(!isPlaying)
          break
        case "ArrowRight":
          setCurrentSlideIndex((prev) => (prev + 1) % tv.slides.length)
          break
        case "ArrowLeft":
          setCurrentSlideIndex((prev) => (prev - 1 + tv.slides.length) % tv.slides.length)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlaying, tv])

  if (!tv) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">TV Não Encontrada</h1>
          <p className="text-xl">ID da TV: {params.tvId}</p>
          <p className="text-gray-400 mt-4">Por favor, verifique a configuração da TV</p>
        </div>
      </div>
    )
  }

  const currentSlide = tv.slides[currentSlideIndex]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: tv.settings.backgroundColor }}>
      {/* Slideshow Container */}
      <div className="absolute inset-0">
        {tv.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlideIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "image" ? (
              <img
                src={slide.src || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video src={slide.src} className="w-full h-full object-cover" autoPlay muted loop />
            )}
          </div>
        ))}
      </div>

      {/* Clock Overlay */}
      {tv.settings.showClock && (
        <div className="absolute top-6 right-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="text-2xl font-mono">
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-sm text-center">{currentTime.toLocaleDateString()}</div>
        </div>
      )}

      {/* TV Info Overlay (only visible in development) */}
      <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
        <div>
          <strong>TV:</strong> {tv.name}
        </div>
        <div>
          <strong>Template:</strong> {tv.template}
        </div>
        <div>
          <strong>Slide:</strong> {currentSlideIndex + 1} de {tv.slides.length}
        </div>
        <div>
          <strong>Status:</strong> {isPlaying ? "Reproduzindo" : "Pausado"}
        </div>
      </div>

      {/* Control Instructions */}
      <div className="absolute bottom-6 right-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-xs">
        <div>Espaço: Reproduzir/Pausar</div>
        <div>← →: Navegar slides</div>
      </div>

      {/* Loading indicator for slide transitions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {tv.slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlideIndex ? "bg-white" : "bg-white bg-opacity-30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
