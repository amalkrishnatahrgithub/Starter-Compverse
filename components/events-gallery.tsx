"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Play, X, ChevronLeft, ChevronRight, Star, Zap, TrendingUp, Award } from "lucide-react"

interface EventMedia {
  id: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  caption?: string
}

interface GalleryEvent {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  category: "Educational" | "Games" | "Sports"
  audience: "Kids" | "Adults"
  attendees: number
  maxAttendees: number
  price: number
  featured: boolean
  media: EventMedia[]
  organizer: string
}

const sampleEvents: GalleryEvent[] = [
  {
    id: "1",
    title: "Annual Science Fair",
    description: "A spectacular showcase of young scientists presenting their innovative projects and experiments.",
    date: new Date(2024, 11, 20),
    time: "10:00 AM - 4:00 PM",
    location: "Community Center Hall",
    category: "Educational",
    audience: "Kids",
    attendees: 45,
    maxAttendees: 60,
    price: 15,
    featured: true,
    organizer: "Science Academy",
    media: [
      {
        id: "1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
        caption: "Young scientists showcasing their projects",
      },
      {
        id: "2",
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        caption: "Interactive science experiments",
      },
    ],
  },
  {
    id: "2",
    title: "Professional Chess Championship",
    description: "Elite chess players compete in this prestigious tournament with substantial prize money.",
    date: new Date(2024, 11, 25),
    time: "2:00 PM - 8:00 PM",
    location: "Grand Hotel Conference Room",
    category: "Games",
    audience: "Adults",
    attendees: 32,
    maxAttendees: 40,
    price: 25,
    featured: true,
    organizer: "Chess Masters Club",
    media: [
      {
        id: "3",
        type: "image",
        url: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&h=400&fit=crop",
        caption: "Intense chess competition",
      },
      {
        id: "4",
        type: "video",
        url: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&h=400&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&h=400&fit=crop",
        caption: "Championship highlights",
      },
    ],
  },
  {
    id: "3",
    title: "Youth Basketball League Finals",
    description: "The most exciting basketball event of the season featuring our top youth teams.",
    date: new Date(2024, 11, 28),
    time: "6:00 PM - 9:00 PM",
    location: "Sports Complex Arena",
    category: "Sports",
    audience: "Kids",
    attendees: 120,
    maxAttendees: 150,
    price: 12,
    featured: false,
    organizer: "Youth Sports League",
    media: [
      {
        id: "5",
        type: "image",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
        caption: "Exciting basketball action",
      },
    ],
  },
  {
    id: "4",
    title: "Tech Innovation Summit",
    description: "Leading tech professionals share insights on the latest innovations and future trends.",
    date: new Date(2024, 11, 30),
    time: "9:00 AM - 5:00 PM",
    location: "Innovation Hub Auditorium",
    category: "Educational",
    audience: "Adults",
    attendees: 85,
    maxAttendees: 100,
    price: 75,
    featured: true,
    organizer: "Tech Innovators Network",
    media: [
      {
        id: "6",
        type: "image",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
        caption: "Tech leaders presenting innovations",
      },
      {
        id: "7",
        type: "image",
        url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        caption: "Engaged audience learning",
      },
    ],
  },
]

const recentEvents: GalleryEvent[] = [
  {
    id: "r1",
    title: "Halloween Costume Contest",
    description: "A fun-filled Halloween event with amazing costumes and prizes for all age groups.",
    date: new Date(2024, 9, 31),
    time: "7:00 PM - 10:00 PM",
    location: "Community Park",
    category: "Games",
    audience: "Kids",
    attendees: 200,
    maxAttendees: 200,
    price: 5,
    featured: true,
    organizer: "Community Events",
    media: [
      {
        id: "r1",
        type: "image",
        url: "https://images.unsplash.com/photo-1509557965043-6204467bbf05?w=600&h=400&fit=crop",
        caption: "Amazing Halloween costumes",
      },
      {
        id: "r2",
        type: "video",
        url: "https://images.unsplash.com/photo-1509557965043-6204467bbf05?w=600&h=400&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1509557965043-6204467bbf05?w=600&h=400&fit=crop",
        caption: "Contest highlights",
      },
    ],
  },
  {
    id: "r2",
    title: "Marathon Training Workshop",
    description: "Professional marathon training techniques and nutrition guidance for serious runners.",
    date: new Date(2024, 9, 15),
    time: "6:00 AM - 10:00 AM",
    location: "City Park Track",
    category: "Sports",
    audience: "Adults",
    attendees: 50,
    maxAttendees: 50,
    price: 30,
    featured: false,
    organizer: "Running Club Elite",
    media: [
      {
        id: "r3",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        caption: "Intensive training session",
      },
    ],
  },
]

export function EventsGallery() {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<"upcoming" | "recent">("upcoming")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)

  const currentEvents = currentSection === "upcoming" ? sampleEvents : recentEvents
  const featuredEvents = currentEvents.filter((event) => event.featured)
  const regularEvents = currentEvents.filter((event) => !event.featured)

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [currentSection])

  const openLightbox = (event: GalleryEvent, mediaIndex = 0) => {
    setSelectedEvent(event)
    setSelectedMediaIndex(mediaIndex)
  }

  const closeLightbox = () => {
    setSelectedEvent(null)
    setSelectedMediaIndex(0)
  }

  const navigateMedia = (direction: "prev" | "next") => {
    if (!selectedEvent) return
    const mediaCount = selectedEvent.media.length
    if (direction === "prev") {
      setSelectedMediaIndex((prev) => (prev - 1 + mediaCount) % mediaCount)
    } else {
      setSelectedMediaIndex((prev) => (prev + 1) % mediaCount)
    }
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "Educational":
        return {
          color: "from-[#FFD43B] to-[#FFC300]",
          bgColor: "bg-[#FFD43B]/10",
          borderColor: "border-[#FFD43B]/30",
          textColor: "text-[#FFD43B]"
        }
      case "Games":
        return {
          color: "from-[#00BFFF] to-[#18E0FF]",
          bgColor: "bg-[#00BFFF]/10",
          borderColor: "border-[#00BFFF]/30",
          textColor: "text-[#00BFFF]"
        }
      case "Sports":
        return {
          color: "from-[#FFD43B] via-[#00BFFF] to-[#18E0FF]",
          bgColor: "bg-gradient-to-r from-[#FFD43B]/10 to-[#00BFFF]/10",
          borderColor: "border-[#00BFFF]/30",
          textColor: "text-[#18E0FF]"
        }
      default:
        return {
          color: "from-[#AEB4BB] to-[#1e3a8a]",
          bgColor: "bg-[#AEB4BB]/10",
          borderColor: "border-[#AEB4BB]/30",
          textColor: "text-[#AEB4BB]"
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#0c1838] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-[#00BFFF]/20 to-[#F4C430]/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-l from-[#F4C430]/15 to-[#00BFFF]/15 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-conic from-[#00BFFF]/8 via-[#F4C430]/8 to-[#00BFFF]/8 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-block relative mb-8">
              <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-[#F4C430] via-[#00BFFF] to-[#00BFFF] bg-clip-text text-transparent mb-6 animate-gradient-x tracking-tight">
                Events Gallery
              </h2>
              <div className="absolute -inset-6 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <p className="text-xl text-[#AEB4BB] max-w-3xl mx-auto leading-relaxed mb-12">
              Explore our amazing events through stunning visuals and immersive experiences
            </p>

            {/* Enhanced Section Toggle */}
            <div className="flex justify-center">
              <div className="bg-[#162855]/80 backdrop-blur-xl border border-[#1e3a8a]/30 rounded-2xl p-2 inline-flex gap-2 shadow-2xl shadow-[#00BFFF]/10">
                <Button
                  onClick={() => setCurrentSection("upcoming")}
                  className={`px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${currentSection === "upcoming"
                    ? "bg-gradient-to-r from-[#F4C430] to-[#FFD43B] text-[#0c1838] font-bold shadow-lg shadow-[#F4C430]/30"
                    : "bg-[#162855] text-[#AEB4BB] hover:bg-gradient-to-r hover:from-[#F4C430]/20 hover:to-[#00BFFF]/20 hover:text-white"
                    }`}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upcoming Events
                  {currentSection === "upcoming" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  )}
                </Button>
                <Button
                  onClick={() => setCurrentSection("recent")}
                  className={`px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${currentSection === "recent"
                    ? "bg-gradient-to-r from-[#00BFFF] to-[#18E0FF] text-[#0c1838] font-bold shadow-lg shadow-[#00BFFF]/30"
                    : "bg-[#162855] text-[#AEB4BB] hover:bg-gradient-to-r hover:from-[#F4C430]/20 hover:to-[#00BFFF]/20 hover:text-white"
                    }`}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Recent & Highlights
                  {currentSection === "recent" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* Enhanced Featured Events */}
          {featuredEvents.length > 0 && (
            <div className="mb-20" key={`featured-${animationKey}`}>
              {/* Header */}
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-xl">
                  <Star className="w-6 h-6 text-[#F4C430]" />
                </div>
                <h3 className="text-4xl font-bold text-white">Featured Events</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#F4C430]/50 to-transparent"></div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredEvents.map((event, index) => {
                  const categoryInfo = getCategoryInfo(event.category)
                  const spotsLeft = event.maxAttendees - event.attendees

                  return (
                    <Card
                      key={event.id}
                      className="bg-[#162855]/90 backdrop-blur-xl border border-[#1e3a8a]/40 hover:border-[#00BFFF]/50 transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 group cursor-pointer overflow-hidden relative shadow-2xl hover:shadow-[#00BFFF]/20"
                      onClick={() => openLightbox(event)}
                      onMouseEnter={() => setHoveredCard(event.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        animationDelay: `${index * 200}ms`,
                        animation: `fadeInUp 0.8s ease-out forwards`
                      }}
                    >
                      {/* Glow */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F4C430]/0 via-[#00BFFF]/0 to-[#F4C430]/0 group-hover:from-[#F4C430]/20 group-hover:via-[#00BFFF]/20 group-hover:to-[#F4C430]/20 blur-sm transition-all duration-700"></div>

                      {/* Category background hint */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden rounded-t-lg">
                        <img
                          src={event.media[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1838]/90 via-[#0c1838]/30 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6">
                          <Badge className={`bg-gradient-to-r ${categoryInfo.color} text-[#0c1838] font-bold px-4 py-2 shadow-lg backdrop-blur-sm`}>
                            {event.category}
                          </Badge>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-6 right-6">
                          <Badge className="bg-gradient-to-r from-[#F4C430] to-[#FFD43B] text-[#0c1838] font-bold px-4 py-2 shadow-lg backdrop-blur-sm animate-pulse">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>

                        {/* Play button if video */}
                        {event.media.some((m) => m.type === "video") && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="bg-[#F4C430]/20 backdrop-blur-lg rounded-full p-6 transform group-hover:scale-110 transition-transform duration-300 border border-[#F4C430]/30">
                              <Play className="w-10 h-10 text-[#F4C430]" />
                            </div>
                          </div>
                        )}

                        {/* Price */}
                        <div className="absolute bottom-6 left-6">
                          <div className="bg-[#162855]/90 backdrop-blur-lg rounded-xl px-4 py-2 border border-[#1e3a8a]/50">
                            <span className="text-2xl font-bold text-[#F4C430]">${event.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-white group-hover:text-[#F4C430] transition-colors duration-300">
                            {event.title}
                          </h4>
                          <Badge className="bg-[#162855]/70 text-[#AEB4BB] px-3 py-1">
                            {event.audience}
                          </Badge>
                        </div>

                        <p className="text-[#AEB4BB] mb-4 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {event.description}
                        </p>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center gap-3 text-[#AEB4BB] group-hover:text-white transition-colors duration-300">
                            <div className="p-2 bg-[#162855]/70 rounded-lg">
                              <Calendar className="w-4 h-4 text-[#00BFFF]" />
                            </div>
                            <span>{event.date.toLocaleDateString()}</span>
                            <div className="p-2 bg-[#162855]/70 rounded-lg ml-4">
                              <Clock className="w-4 h-4 text-[#00BFFF]" />
                            </div>
                            <span>{event.time}</span>
                          </div>

                          <div className="flex items-center gap-3 text-[#AEB4BB] group-hover:text-white transition-colors duration-300">
                            <div className="p-2 bg-[#162855]/70 rounded-lg">
                              <MapPin className="w-4 h-4 text-[#00BFFF]" />
                            </div>
                            <span>{event.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[#AEB4BB] group-hover:text-white transition-colors duration-300">
                              <div className="p-2 bg-[#162855]/70 rounded-lg">
                                <Users className="w-4 h-4 text-[#00BFFF]" />
                              </div>
                              <span>{event.attendees}/{event.maxAttendees} attendees</span>
                            </div>
                            <div className="text-xs text-[#AEB4BB]">by {event.organizer}</div>
                          </div>
                        </div>

                        {currentSection === "upcoming" && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle registration
                            }}
                            className={`w-full h-10 bg-gradient-to-r from-[#F4C430] to-[#FFD43B] text-[#0c1838] font-bold hover:from-[#FFD43B] hover:to-[#F4C430] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F4C430]/30 relative overflow-hidden ${hoveredCard === event.id ? 'animate-pulse' : ''
                              }`}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Register Now - ${event.price}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}


          {/* Enhanced Regular Events Grid */}
          <div key={`regular-${animationKey}`}>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-gradient-to-r from-[#00BFFF]/20 to-[#FFD43B]/20 rounded-xl">
                <Calendar className="w-6 h-6 text-[#00BFFF]" />
              </div>
              <h3 className="text-4xl font-bold text-white">All Events</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#00BFFF]/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEvents.map((event, index) => {
                const categoryInfo = getCategoryInfo(event.category)
                const spotsLeft = event.maxAttendees - event.attendees

                return (
                  <Card
                    key={event.id}
                    className="bg-[#162855]/90 backdrop-blur-xl border border-[#1e3a8a]/40 hover:border-[#00BFFF]/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer overflow-hidden relative shadow-xl hover:shadow-[#00BFFF]/30"
                    onClick={() => openLightbox(event)}
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: `fadeInUp 0.6s ease-out forwards`,
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Media */}
                    <div className="relative h-60 overflow-hidden rounded-t-lg">
                      <img
                        src={
                          event.media[0]?.url ||
                          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1838]/80 via-transparent to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`bg-gradient-to-r ${categoryInfo.color} text-[#0c1838] font-semibold px-3 py-1 shadow-lg`}
                        >
                          {event.category}
                        </Badge>
                      </div>

                      {/* Video play overlay */}
                      {event.media.some((m) => m.type === "video") && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-[#FFD43B]/20 backdrop-blur-lg rounded-full p-4 border border-[#FFD43B]/30">
                            <Play className="w-6 h-6 text-[#FFD43B]" />
                          </div>
                        </div>
                      )}

                      {/* Price badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-[#0c1838]/80 backdrop-blur-lg rounded-lg px-3 py-1 border border-[#1e3a8a]/50">
                          <span className="text-lg font-bold text-[#F4C430]">
                            ${event.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold text-white group-hover:text-[#F4C430] transition-colors duration-300 line-clamp-1">
                          {event.title}
                        </h4>
                        <Badge className="bg-[#162855]/50 text-[#AEB4BB] text-xs px-2 py-1">
                          {event.audience}
                        </Badge>
                      </div>

                      <p className="text-[#AEB4BB] text-sm mb-4 line-clamp-2 group-hover:text-white transition-colors duration-300">
                        {event.description}
                      </p>

                      {/* Event details */}
                      <div className="space-y-2 text-xs text-[#AEB4BB] mb-4 group-hover:text-white transition-colors duration-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-[#00BFFF]" />
                          <span>{event.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-[#00BFFF]" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3 text-[#00BFFF]" />
                            <span>
                              {event.attendees}/{event.maxAttendees}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-xs ${spotsLeft > 5
                              ? "text-[#00BFFF]"
                              : spotsLeft > 0
                                ? "text-[#F4C430]"
                                : "text-red-500"
                              }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${spotsLeft > 5
                                ? "bg-[#00BFFF]"
                                : spotsLeft > 0
                                  ? "bg-[#F4C430]"
                                  : "bg-red-500"
                                }`}
                            />
                            <span>{spotsLeft} left</span>
                          </div>
                        </div>
                      </div>

                      {/* Register button */}
                      {currentSection === "upcoming" && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle registration
                          }}
                          className={`w-full h-10 bg-gradient-to-r from-[#F4C430] to-[#FFD43B] text-[#0c1838] font-semibold hover:from-[#FFD43B] hover:to-[#F4C430] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FFD43B]/30 text-sm relative overflow-hidden ${hoveredCard === event.id ? "animate-pulse" : ""
                            }`}
                        >
                          Register - ${event.price}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

            </div>
          </div>

          {/* Enhanced Lightbox Modal */}
          <Dialog open={!!selectedEvent} onOpenChange={closeLightbox}>
            <DialogContent className="max-w-6xl bg-[#2C3136]/95 backdrop-blur-xl border border-[#1e3a8a]/30 shadow-2xl shadow-[#00BFFF]/20">
              {selectedEvent && (
                <>
                  <DialogHeader className="border-b border-[#1e3a8a]/30 pb-6">
                    <DialogTitle className="text-3xl text-white font-bold bg-gradient-to-r from-[#FFD43B] to-[#00BFFF] bg-clip-text text-transparent">
                      {selectedEvent.title}
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeLightbox}
                      className="absolute right-6 top-6 text-[#AEB4BB] hover:text-white hover:bg-[#2C3136] rounded-full p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </DialogHeader>

                  <div className="space-y-8 pt-6">
                    {/* Enhanced Media Display */}
                    <div className="relative">
                      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        {selectedEvent.media[selectedMediaIndex]?.type === "video" ? (
                          <div className="w-full h-full bg-gradient-to-br from-[#2C3136] to-[#2C3136] flex items-center justify-center rounded-2xl border border-[#1e3a8a]/50">
                            <div className="text-center">
                              <div className="bg-gradient-to-r from-[#FFD43B] to-[#00BFFF] p-6 rounded-full mb-4 mx-auto w-fit">
                                <Play className="w-16 h-16 text-[#0c1838]" />
                              </div>
                              <span className="text-white text-xl font-semibold">Video Content</span>
                              <p className="text-[#AEB4BB] mt-2">Click to play video</p>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={selectedEvent.media[selectedMediaIndex]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"}
                            alt={selectedEvent.media[selectedMediaIndex]?.caption}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1838]/20 via-transparent to-transparent rounded-2xl"></div>
                      </div>

                      {/* Enhanced Media Navigation */}
                      {selectedEvent.media.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigateMedia("prev")}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#2C3136]/90 backdrop-blur-xl border border-[#1e3a8a]/50 hover:border-[#00BFFF]/50 text-white hover:bg-[#2C3136] rounded-full p-3 shadow-xl"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigateMedia("next")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#2C3136]/90 backdrop-blur-xl border border-[#1e3a8a]/50 hover:border-[#00BFFF]/50 text-white hover:bg-[#2C3136] rounded-full p-3 shadow-xl"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-[#2C3136]/80 backdrop-blur-xl rounded-full p-2 border border-[#1e3a8a]/50">
                            {selectedEvent.media.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedMediaIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedMediaIndex
                                  ? "bg-[#FFD43B] shadow-lg shadow-[#FFD43B]/50"
                                  : "bg-[#AEB4BB]/50 hover:bg-[#AEB4BB]"
                                  }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Enhanced Event Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#FFD43B] to-[#00BFFF] rounded-full"></div>
                            Event Details
                          </h4>
                          <p className="text-[#AEB4BB] leading-relaxed text-lg">{selectedEvent.description}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <div className="p-3 bg-gradient-to-r from-[#FFD43B]/20 to-[#00BFFF]/20 rounded-xl">
                              <Calendar className="w-5 h-5 text-[#FFD43B]" />
                            </div>
                            <div>
                              <span className="text-white font-semibold">{selectedEvent.date.toLocaleDateString()}</span>
                              <p className="text-[#AEB4BB] text-sm">Event Date</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <div className="p-3 bg-gradient-to-r from-[#00BFFF]/20 to-[#18E0FF]/20 rounded-xl">
                              <Clock className="w-5 h-5 text-[#00BFFF]" />
                            </div>
                            <div>
                              <span className="text-white font-semibold">{selectedEvent.time}</span>
                              <p className="text-[#AEB4BB] text-sm">Duration</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <div className="p-3 bg-gradient-to-r from-[#FFD43B]/20 to-[#FFC300]/20 rounded-xl">
                              <MapPin className="w-5 h-5 text-[#FFD43B]" />
                            </div>
                            <div>
                              <span className="text-white font-semibold">{selectedEvent.location}</span>
                              <p className="text-[#AEB4BB] text-sm">Venue</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                          {(() => {
                            const categoryInfo = getCategoryInfo(selectedEvent.category)
                            return (
                              <Badge className={`bg-gradient-to-r ${categoryInfo.color} text-[#0c1838] font-bold px-4 py-2 text-lg`}>
                                {selectedEvent.category}
                              </Badge>
                            )
                          })()}
                          <Badge className="bg-[#2C3136]/50 text-[#AEB4BB] px-4 py-2 text-lg border border-[#1e3a8a]/50">
                            {selectedEvent.audience}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <span className="text-[#AEB4BB]">Price:</span>
                            <span className="text-3xl font-bold text-[#FFD43B]">${selectedEvent.price}</span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <span className="text-[#AEB4BB]">Attendees:</span>
                            <span className="text-xl font-semibold text-white">
                              {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-[#2C3136]/50 rounded-xl backdrop-blur-sm border border-[#1e3a8a]/30">
                            <span className="text-[#AEB4BB]">Organizer:</span>
                            <span className="text-white font-semibold">{selectedEvent.organizer}</span>
                          </div>
                        </div>

                        {currentSection === "upcoming" && (
                          <Button
                            onClick={() => {
                              // Handle registration
                              closeLightbox()
                            }}
                            className="w-full h-16 bg-gradient-to-r from-[#FFD43B] to-[#FFC300] text-[#0c1838] font-bold hover:from-[#FFC300] hover:to-[#FFD43B] transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#FFD43B]/40 text-xl rounded-xl relative overflow-hidden"
                          >
                            <Zap className="w-6 h-6 mr-3" />
                            Register for Event - ${selectedEvent.price}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Media Caption */}
                    {selectedEvent.media[selectedMediaIndex]?.caption && (
                      <div className="text-center bg-[#2C3136]/30 rounded-xl p-6 border border-[#1e3a8a]/30">
                        <p className="text-[#AEB4BB] italic text-lg">
                          {selectedEvent.media[selectedMediaIndex].caption}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  )
}