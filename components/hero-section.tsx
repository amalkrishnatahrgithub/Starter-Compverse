"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedParticles } from "./animated-particles"
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react"
import { RegistrationModal } from "./registration-modal"

export function HeroSection() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const featuredEvent = {
    id: "hero-featured",
    title: "Premium Events Experience",
    date: new Date(2024, 11, 25),
    time: "Various Times",
    location: "Multiple Venues",
    price: 25,
    category: "Mixed",
    audience: "All Ages",
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10 animate-gradient" />

      {/* Animated particles */}
      <AnimatedParticles />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glassmorphism rounded-full px-6 py-2 text-sm animate-float">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-foreground">Premium Events Platform</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-gradient">Connect</span> <span className="text-foreground">Communities</span>
            <br />
            <span className="text-foreground">Through</span> <span className="text-gradient">Experiences</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover amazing events, connect with like-minded people, and create unforgettable memories in our premium
            events ecosystem.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
            <div className="glassmorphism rounded-lg px-6 py-4 text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </div>
            <div className="glassmorphism rounded-lg px-6 py-4 text-center">
              <div className="text-2xl font-bold text-accent">10K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="glassmorphism rounded-lg px-6 py-4 text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Cities Worldwide</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              size="lg"
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse-glow group px-8 py-4 text-lg"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glassmorphism border-primary/30 hover:border-primary text-foreground px-8 py-4 text-lg group bg-transparent"
            >
              <Calendar className="mr-2 w-5 h-5" />
              View Calendar
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="glassmorphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Connect with passionate individuals who share your interests
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Scheduling</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered recommendations for events that match your schedule
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Premium Experience</h3>
              <p className="text-muted-foreground text-sm">
                Curated events with exceptional quality and attention to detail
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        event={featuredEvent}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </section>
  )
}
