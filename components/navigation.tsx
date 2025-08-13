"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glassmorphism" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gradient">EventHub</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#events" className="text-foreground hover:text-primary transition-colors duration-200">
                Events
              </a>
              <a href="#calendar" className="text-foreground hover:text-primary transition-colors duration-200">
                Calendar
              </a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors duration-200">
                Gallery
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors duration-200">
                About
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse-glow">
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glassmorphism mt-2 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#events" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Events
              </a>
              <a href="#calendar" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Calendar
              </a>
              <a href="#gallery" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Register Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
