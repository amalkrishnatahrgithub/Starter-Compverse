"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import { RegistrationModal } from "./registration-modal"

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
        url: "/children-science-fair.png",
        caption: "Young scientists showcasing their projects",
      },
      {
        id: "2",
        type: "image",
        url: "/kids-science-lab.png",
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
        url: "/professional-chess-tournament.png",
        caption: "Intense chess competition",
      },
      {
        id: "4",
        type: "video",
        url: "/chess-video-tournament.png",
        thumbnail: "/placeholder-vmov5.png",
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
        url: "/youth-basketball-game.png",
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
        url: "/tech-conference-innovation-summit.png",
        caption: "Tech leaders presenting innovations",
      },
      {
        id: "7",
        type: "image",
        url: "/technology-presentation-audience.png",
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
        url: "/kids-halloween-contest.png",
        caption: "Amazing Halloween costumes",
      },
      {
        id: "r2",
        type: "video",
        url: "/halloween-party-video.png",
        thumbnail: "/placeholder.svg?height=400&width=600",
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
        url: "/placeholder.svg?height=400&width=600",
        caption: "Intensive training session",
      },
    ],
  },
]

export function EventsGallery() {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<"upcoming" | "recent">("upcoming")
  const [registrationEvent, setRegistrationEvent] = useState<GalleryEvent | null>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const currentEvents = currentSection === "upcoming" ? sampleEvents : recentEvents
  const featuredEvents = currentEvents.filter((event) => event.featured)
  const regularEvents = currentEvents.filter((event) => !event.featured)

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Educational":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Games":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Sports":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleRegister = (event: GalleryEvent) => {
    setRegistrationEvent(event)
    setIsRegistrationOpen(true)
    setSelectedEvent(null) // Close lightbox if open
  }

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Events Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our amazing events through stunning visuals and immersive experiences
          </p>

          {/* Section Toggle */}
          <div className="flex justify-center">
            <div className="glassmorphism rounded-lg p-1 inline-flex">
              <Button
                variant={currentSection === "upcoming" ? "default" : "ghost"}
                onClick={() => setCurrentSection("upcoming")}
                className={
                  currentSection === "upcoming"
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                Upcoming Events
              </Button>
              <Button
                variant={currentSection === "recent" ? "default" : "ghost"}
                onClick={() => setCurrentSection("recent")}
                className={
                  currentSection === "recent"
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                Recent & Highlights
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8">Featured Events</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="glassmorphism border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(event)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.media[0]?.url || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                        Featured
                      </Badge>
                    </div>
                    {event.media.some((m) => m.type === "video") && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <div className="text-right text-sm">
                        <div className="text-accent font-semibold">${event.price}</div>
                        <div className="text-muted-foreground">{event.audience}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date.toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">by {event.organizer}</div>
                      </div>
                    </div>
                    {currentSection === "upcoming" && (
                      <div className="mt-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegister(event)
                          }}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse-glow"
                        >
                          Register Now - ${event.price}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Events Grid */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8">All Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event) => (
              <Card
                key={event.id}
                className="glassmorphism border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden"
                onClick={() => openLightbox(event)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.media[0]?.url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                  {event.media.some((m) => m.type === "video") && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-3">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {event.title}
                    </h4>
                    <div className="text-accent font-semibold text-sm">${event.price}</div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {event.attendees}/{event.maxAttendees}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.audience}
                      </Badge>
                    </div>
                  </div>
                  {currentSection === "upcoming" && (
                    <div className="mt-3">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRegister(event)
                        }}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs"
                      >
                        Register - ${event.price}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl glassmorphism border-primary/30">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-foreground">{selectedEvent.title}</DialogTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeLightbox}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Media Display */}
                  <div className="relative">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                      {selectedEvent.media[selectedMediaIndex]?.type === "video" ? (
                        <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                          <Play className="w-16 h-16 text-primary" />
                          <span className="ml-4 text-foreground">Video Content</span>
                        </div>
                      ) : (
                        <img
                          src={selectedEvent.media[selectedMediaIndex]?.url || "/placeholder.svg"}
                          alt={selectedEvent.media[selectedMediaIndex]?.caption}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Media Navigation */}
                    {selectedEvent.media.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMedia("prev")}
                          className="absolute left-2 top-1/2 -translate-y-1/2 glassmorphism hover:bg-primary/20"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMedia("next")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 glassmorphism hover:bg-primary/20"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedEvent.media.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedMediaIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === selectedMediaIndex ? "bg-primary" : "bg-muted-foreground/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">Event Details</h4>
                        <p className="text-muted-foreground">{selectedEvent.description}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{selectedEvent.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getCategoryColor(selectedEvent.category)}>
                          {selectedEvent.category}
                        </Badge>
                        <Badge variant="outline" className="bg-muted/20 text-muted-foreground">
                          {selectedEvent.audience}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="text-accent font-semibold">${selectedEvent.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendees:</span>
                          <span className="text-foreground">
                            {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Organizer:</span>
                          <span className="text-foreground">{selectedEvent.organizer}</span>
                        </div>
                      </div>
                      {currentSection === "upcoming" && (
                        <Button
                          onClick={() => handleRegister(selectedEvent)}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4 animate-pulse-glow"
                        >
                          Register for Event - ${selectedEvent.price}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Media Caption */}
                  {selectedEvent.media[selectedMediaIndex]?.caption && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground italic">
                        {selectedEvent.media[selectedMediaIndex].caption}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Registration Modal */}
        <RegistrationModal
          event={registrationEvent}
          isOpen={isRegistrationOpen}
          onClose={() => {
            setIsRegistrationOpen(false)
            setRegistrationEvent(null)
          }}
        />
      </div>
    </section>
  )
}
