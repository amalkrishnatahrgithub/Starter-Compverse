"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Users, Baby, GraduationCap, Gamepad2, Trophy, Calendar, Clock, MapPin, Star } from "lucide-react"

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
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)

  const categories = [
    {
      name: "Educational",
      icon: GraduationCap,
      color: "from-[#FFD43B] to-[#FFC300]",
      borderColor: "border-[#FFD43B]/30",
      textColor: "text-[#FFD43B]",
      bgColor: "bg-[#FFD43B]/10"
    },
    {
      name: "Games",
      icon: Gamepad2,
      color: "from-[#00BFFF] to-[#18E0FF]",
      borderColor: "border-[#00BFFF]/30",
      textColor: "text-[#00BFFF]",
      bgColor: "bg-[#00BFFF]/10"
    },
    {
      name: "Sports",
      icon: Trophy,
      color: "from-[#FFD43B] via-[#00BFFF] to-[#18E0FF]",
      borderColor: "border-[#00BFFF]/30",
      textColor: "text-[#18E0FF]",
      bgColor: "bg-gradient-to-r from-[#FFD43B]/10 to-[#00BFFF]/10"
    },
  ]

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(
      (event) => event.audience === selectedAudience && selectedCategories.includes(event.category),
    )
  }, [selectedAudience, selectedCategories])

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [selectedAudience, selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const getCategoryCardClass = (category: string) => {
    switch (category) {
      case "Educational":
        return "border-[#FFD43B]/40 hover:border-[#FFD43B]/70 hover:shadow-[#FFD43B]/30";
      case "Games":
        return "border-[#00BFFF]/40 hover:border-[#00BFFF]/70 hover:shadow-[#00BFFF]/30";
      case "Sports":
        return "border-[#18E0FF]/40 hover:border-[#18E0FF]/70 hover:shadow-[#18E0FF]/30";
      default:
        return "border-[#1e3a8a]/30";
    }
  };

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
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="min-h-screen bg-[#0c1838] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#18E0FF]/15 to-[#FFC300]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-[#F4C430]/5 via-[#00BFFF]/5 to-[#F4C430]/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-block relative">
              <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-[#F4C430] via-[#00BFFF] to-[#18E0FF] bg-clip-text text-transparent mb-6 animate-gradient-x tracking-tight">
                Event Calendar
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <p className="text-xl text-[#AEB4BB] max-w-3xl mx-auto leading-relaxed">
              Discover amazing events tailored for different age groups and interests with our interactive calendar experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Audience Toggle with Advanced Animation */}
              <Card className="bg-[#162855]/80 backdrop-blur-xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20 group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-3 group-hover:text-[#F4C430] transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-5 h-5" />
                    </div>
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: "Kids", icon: Baby, label: "Kids Events" },
                      { key: "Adults", icon: Users, label: "Adult Events" }
                    ].map((audience) => {
                      const Icon = audience.icon
                      const isSelected = selectedAudience === audience.key
                      return (
                        <Button
                          key={audience.key}
                          onClick={() => setSelectedAudience(audience.key as "Kids" | "Adults")}
                          className={`relative overflow-hidden h-12 transition-all duration-300 transform hover:scale-105 ${isSelected
                            ? "bg-gradient-to-r from-[#F4C430] to-[#FFC300] text-[#0c1838] font-bold shadow-lg shadow-[#F4C430]/30"
                            : "bg-[#162855] border border-[#1e3a8a] text-[#AEB4BB] hover:bg-gradient-to-r hover:from-[#F4C430]/20 hover:to-[#00BFFF]/20 hover:text-white hover:border-[#00BFFF]/50"
                            }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {audience.label}
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Category Filters */}
              <Card className="bg-[#162855]/80 backdrop-blur-xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20 group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white group-hover:text-[#F4C430] transition-colors duration-300">Event Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isSelected = selectedCategories.includes(category.name)
                      return (
                        <Button
                          key={category.name}
                          onClick={() => toggleCategory(category.name)}
                          className={`w-full h-12 justify-start relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${isSelected
                            ? `bg-gradient-to-r ${category.color} text-[#0c1838] font-bold shadow-lg`
                            : `bg-[#162855] border ${category.borderColor} ${category.textColor} hover:${category.bgColor} hover:border-opacity-70`
                            }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {category.name}
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Stats Card */}
              <Card className="bg-[#162855]/80 backdrop-blur-xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/5 to-[#00BFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white flex items-center gap-2 group-hover:text-[#F4C430] transition-colors duration-300">
                    <Star className="w-5 h-5" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-[#162855]/50 rounded-lg backdrop-blur-sm">
                      <span className="text-[#AEB4BB]">Total Events</span>
                      <span className="text-2xl font-bold text-[#F4C430]">{filteredEvents.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#162855]/50 rounded-lg backdrop-blur-sm">
                      <span className="text-[#AEB4BB]">Available Spots</span>
                      <span className="text-2xl font-bold text-[#00BFFF]">
                        {filteredEvents.reduce((sum, event) => sum + (event.maxSpots - event.spots), 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Calendar Grid */}
            <div className="lg:col-span-3">
              <Card className="bg-[#162855]/80 backdrop-blur-xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/3 to-[#00BFFF]/3"></div>
                <CardHeader className="relative z-10 border-b border-[#1e3a8a]/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-3xl font-bold bg-gradient-to-r from-[#F4C430] to-[#00BFFF] bg-clip-text text-transparent">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => navigateMonth("prev")}
                        className="bg-[#162855] border border-[#1e3a8a] text-[#AEB4BB] hover:bg-gradient-to-r hover:from-[#F4C430]/20 hover:to-[#00BFFF]/20 hover:text-white hover:border-[#00BFFF]/50 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => navigateMonth("next")}
                        className="bg-[#162855] border border-[#1e3a8a] text-[#AEB4BB] hover:bg-gradient-to-r hover:from-[#F4C430]/20 hover:to-[#00BFFF]/20 hover:text-white hover:border-[#00BFFF]/50 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 p-6">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {dayNames.map((day) => (
                      <div key={day} className="p-3 text-center text-sm font-bold text-[#F4C430] bg-[#162855]/30 rounded-lg backdrop-blur-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2" key={animationKey}>
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
                          className={`min-h-[100px] p-2 rounded-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group ${date ? "opacity-100" : "opacity-0"
                            } ${isToday
                              ? "bg-gradient-to-br from-[#F4C430]/20 to-[#00BFFF]/20 border-2 border-[#F4C430] shadow-lg shadow-[#F4C430]/30"
                              : dayEvents.length > 0
                                ? "bg-[#162855]/50 border border-[#1e3a8a]/50 hover:border-[#00BFFF]/50 hover:bg-gradient-to-br hover:from-[#F4C430]/10 hover:to-[#00BFFF]/10"
                                : "bg-[#162855]/30 border border-[#1e3a8a]/30 hover:border-[#AEB4BB]/30 hover:bg-[#162855]/50"
                            }`}
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation: `fadeInUp 0.6s ease-out forwards`
                          }}
                        >
                          {date && (
                            <>
                              <div className={`text-sm font-bold mb-2 ${isToday
                                ? "text-[#F4C430]"
                                : dayEvents.length > 0
                                  ? "text-white group-hover:text-[#00BFFF]"
                                  : "text-[#AEB4BB] group-hover:text-white"
                                } transition-colors duration-300`}>
                                {date.getDate()}
                              </div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event, eventIndex) => {
                                  const categoryInfo = categories.find((c) => c.name === event.category)
                                  return (
                                    <Badge
                                      key={event.id}
                                      className={`text-xs px-2 py-1 h-6 cursor-pointer transition-all duration-300 transform hover:scale-110 bg-gradient-to-r ${categoryInfo?.color} text-[#0c1838] font-semibold shadow-lg`}
                                      title={`${event.title} - ${event.time}`}
                                      style={{
                                        animationDelay: `${(index * 50) + (eventIndex * 100)}ms`,
                                        animation: `slideIn 0.5s ease-out forwards`
                                      }}
                                    >
                                      {event.title.length > 10 ? `${event.title.slice(0, 10)}...` : event.title}
                                    </Badge>
                                  )
                                })}
                                {dayEvents.length > 2 && (
                                  <Badge className="text-xs px-2 py-1 h-6 bg-[#AEB4BB]/20 text-[#AEB4BB] border border-[#AEB4BB]/30 hover:bg-[#00BFFF]/20 hover:text-[#00BFFF] transition-all duration-300">
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

          {/* Enhanced Upcoming Events List */}
          <div className="mt-16">
            <h3 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#F4C430] to-[#00BFFF] bg-clip-text text-transparent">
              Upcoming {selectedAudience} Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" key={`events-${animationKey}`}>
              {filteredEvents.slice(0, 6).map((event, index) => {
                const categoryInfo = categories.find((c) => c.name === event.category)
                const Icon = categoryInfo?.icon || GraduationCap
                const spotsLeft = event.maxSpots - event.spots

                return (
                  <Card
                    key={event.id}
                    className={`bg-[#162855]/90 backdrop-blur-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer overflow-hidden relative 
                    ${getCategoryCardClass(event.category)}`}
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: `fadeInUp 0.8s ease-out forwards`
                    }}
                  >

                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo?.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F4C430]/0 via-[#00BFFF]/0 to-[#F4C430]/0 group-hover:from-[#F4C430]/20 group-hover:via-[#00BFFF]/20 group-hover:to-[#F4C430]/20 blur-sm transition-all duration-500"></div>

                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryInfo?.color} text-[#0c1838] group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge className={`bg-gradient-to-r ${categoryInfo?.color} text-[#0c1838] font-bold px-3 py-1 shadow-lg`}>
                            {event.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-[#AEB4BB] mb-1">
                            <Calendar className="w-3 h-3" />
                            {event.date.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-[#00BFFF]">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-white group-hover:text-[#F4C430] transition-colors duration-300 text-xl font-bold">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-[#AEB4BB] text-sm mb-6 group-hover:text-white transition-colors duration-300 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${spotsLeft > 5 ? 'bg-[#18E0FF]' : spotsLeft > 0 ? 'bg-[#F4C430]' : 'bg-red-500'}`}></div>
                          <span className="text-sm">
                            <span className={`font-bold ${spotsLeft > 5 ? 'text-[#18E0FF]' : spotsLeft > 0 ? 'text-[#F4C430]' : 'text-red-500'}`}>
                              {spotsLeft}
                            </span>
                            <span className="text-[#AEB4BB]"> spots left</span>
                          </span>
                        </div>
                        <Button
                          className={`bg-gradient-to-r from-[#F4C430] to-[#FFC300] text-[#0c1838] font-bold hover:from-[#FFC300] hover:to-[#F4C430] transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-[#F4C430]/30 px-6 ${hoveredEvent === event.id ? 'animate-pulse' : ''
                            }`}
                        >
                          Register Now
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
      `}</style>
    </div>
  )
}