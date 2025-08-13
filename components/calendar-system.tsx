"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Users, Baby, GraduationCap, Gamepad2, Trophy } from "lucide-react"

interface Event {
  id: string
  title: string
  date: Date
  category: "Educational" | "Games" | "Sports"
  audience: "Kids" | "Adults"
  time: string
  description: string
  spots: number
  maxSpots: number
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Science Workshop",
    date: new Date(2024, 11, 15),
    category: "Educational",
    audience: "Kids",
    time: "10:00 AM",
    description: "Interactive science experiments for young minds",
    spots: 8,
    maxSpots: 15,
  },
  {
    id: "2",
    title: "Chess Tournament",
    date: new Date(2024, 11, 16),
    category: "Games",
    audience: "Adults",
    time: "2:00 PM",
    description: "Competitive chess tournament with prizes",
    spots: 12,
    maxSpots: 20,
  },
  {
    id: "3",
    title: "Basketball Training",
    date: new Date(2024, 11, 18),
    category: "Sports",
    audience: "Kids",
    time: "4:00 PM",
    description: "Fun basketball skills training for children",
    spots: 5,
    maxSpots: 12,
  },
  {
    id: "4",
    title: "Coding Bootcamp",
    date: new Date(2024, 11, 20),
    category: "Educational",
    audience: "Adults",
    time: "6:00 PM",
    description: "Learn modern web development techniques",
    spots: 15,
    maxSpots: 25,
  },
  {
    id: "5",
    title: "Art & Craft Session",
    date: new Date(2024, 11, 22),
    category: "Educational",
    audience: "Kids",
    time: "11:00 AM",
    description: "Creative art session with various materials",
    spots: 10,
    maxSpots: 18,
  },
  {
    id: "6",
    title: "Tennis Match",
    date: new Date(2024, 11, 24),
    category: "Sports",
    audience: "Adults",
    time: "9:00 AM",
    description: "Friendly tennis doubles tournament",
    spots: 8,
    maxSpots: 16,
  },
]

export function CalendarSystem() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAudience, setSelectedAudience] = useState<"Kids" | "Adults">("Kids")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Educational", "Games", "Sports"])

  const categories = [
    { name: "Educational", icon: GraduationCap, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { name: "Games", icon: Gamepad2, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { name: "Sports", icon: Trophy, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  ]

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(
      (event) => event.audience === selectedAudience && selectedCategories.includes(event.category),
    )
  }, [selectedAudience, selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    return filteredEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <section id="calendar" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Interactive Calendar</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover events tailored for different age groups and interests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Audience Toggle */}
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant={selectedAudience === "Kids" ? "default" : "outline"}
                    onClick={() => setSelectedAudience("Kids")}
                    className={`flex-1 ${
                      selectedAudience === "Kids"
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "glassmorphism border-primary/30 hover:border-primary text-foreground"
                    }`}
                  >
                    <Baby className="w-4 h-4 mr-2" />
                    Kids
                  </Button>
                  <Button
                    variant={selectedAudience === "Adults" ? "default" : "outline"}
                    onClick={() => setSelectedAudience("Adults")}
                    className={`flex-1 ${
                      selectedAudience === "Adults"
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "glassmorphism border-primary/30 hover:border-primary text-foreground"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Adults
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Filters */}
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isSelected = selectedCategories.includes(category.name)
                    return (
                      <Button
                        key={category.name}
                        variant="outline"
                        onClick={() => toggleCategory(category.name)}
                        className={`w-full justify-start transition-all duration-200 ${
                          isSelected
                            ? `${category.color} border-2`
                            : "glassmorphism border-muted hover:border-primary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.name}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Events</span>
                    <span className="text-foreground font-semibold">{filteredEvents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Spots</span>
                    <span className="text-accent font-semibold">
                      {filteredEvents.reduce((sum, event) => sum + (event.maxSpots - event.spots), 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card className="glassmorphism border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground text-2xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="glassmorphism border-primary/30 hover:border-primary text-foreground"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="glassmorphism border-primary/30 hover:border-primary text-foreground"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((date, index) => {
                    const dayEvents = getEventsForDate(date)
                    const isToday =
                      date &&
                      date.getDate() === new Date().getDate() &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getFullYear() === new Date().getFullYear()

                    return (
                      <div
                        key={index}
                        className={`min-h-[80px] p-1 border border-border/50 rounded-lg transition-all duration-200 hover:border-primary/50 hover:scale-105 ${
                          isToday ? "bg-primary/10 border-primary/50" : "hover:bg-muted/20"
                        } ${!date ? "opacity-0" : ""}`}
                      >
                        {date && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>
                              {date.getDate()}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => {
                                const categoryInfo = categories.find((c) => c.name === event.category)
                                return (
                                  <Badge
                                    key={event.id}
                                    variant="outline"
                                    className={`text-xs px-1 py-0 h-5 ${categoryInfo?.color} cursor-pointer hover:scale-105 transition-transform`}
                                    title={`${event.title} - ${event.time}`}
                                  >
                                    {event.title.length > 8 ? `${event.title.slice(0, 8)}...` : event.title}
                                  </Badge>
                                )
                              })}
                              {dayEvents.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-1 py-0 h-5 bg-muted/50 text-muted-foreground"
                                >
                                  +{dayEvents.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Upcoming {selectedAudience} Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, 6).map((event) => {
              const categoryInfo = categories.find((c) => c.name === event.category)
              const Icon = categoryInfo?.icon || GraduationCap

              return (
                <Card
                  key={event.id}
                  className="glassmorphism border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <Badge variant="outline" className={categoryInfo?.color}>
                          {event.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</div>
                        <div className="text-sm font-medium text-foreground">{event.time}</div>
                      </div>
                    </div>
                    <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-accent font-medium">{event.maxSpots - event.spots}</span>
                        <span className="text-muted-foreground"> spots left</span>
                      </div>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
