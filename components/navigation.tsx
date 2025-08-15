"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Globe, Zap, Sparkles } from "lucide-react"
import logoImg from '../public/CompVerseLogo.png'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleMouseMove = (e: any) => setMousePos({ x: e.clientX, y: e.clientY })

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navItems = ["Events", "Calendar", "Gallery", "About"]

  return (
    <>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E11] via-[#1A1D21] to-[#0B0E11]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00BFFF] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isScrolled
          ? "bg-[#0B0E11]/20 backdrop-blur-2xl border-b border-[#00BFFF]/20 shadow-2xl shadow-[#00BFFF]/10"
          : "bg-gradient-to-r from-[#0B0E11]/80 via-[#1A1D21]/60 to-[#0B0E11]/80 backdrop-blur-xl"
          }`}
        style={{
          background: isScrolled
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 191, 255, 0.06), transparent 40%)`
            : undefined
        }}
      >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD43B] to-transparent opacity-60 animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Enhanced Logo Section */}
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute -inset-2  rounded-full opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500" />
                <div className="w-16 h-16">
                  <img src='/CompVerseLogo.png' alt="" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#FFD43B] animate-spin" />
              </div>

              <div className="relative overflow-hidden">
                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#1A1D21] to-[#2C3136] border border-[#00BFFF]/30 rounded-full text-[#00BFFF] font-semibold tracking-wide shadow-lg shadow-[#00BFFF]/20">
                  <span className="flex items-center gap-2">
                    <Zap className="w-3 h-3 animate-pulse" />
                    Pro Edition
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </div>

            {/* Revolutionary Desktop Navigation */}
            <div className="hidden md:flex gap-2 bg-[#1A1D21]/40 backdrop-blur-xl rounded-full p-2 border border-[#3C4A57]/30 shadow-2xl">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-6 py-3 text-sm font-medium text-white hover:text-[#FFD43B] transition-all duration-500 rounded-full group"
                  onMouseEnter={() => setActiveItem(item)}
                  onMouseLeave={() => setActiveItem("")}
                >
                  <span className="relative z-10">{item}</span>

                  {/* Hover background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 to-[#FFD43B]/20 rounded-full transition-all duration-500 ${activeItem === item ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`} />

                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-full border-2 border-transparent  bg-clip-border transition-all duration-500 ${activeItem === item ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`} style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "xor" }} />

                  {/* Particle effect on hover */}
                  {activeItem === item && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-[#FFD43B] rounded-full animate-ping"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 0.5}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </a>
              ))}

              {/* Live Event Indicator */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFD43B]/10 to-[#FFA500]/10 rounded-full border border-[#FFD43B]/30">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#FFD43B] animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#FFD43B] animate-ping" />
                </div>
                <span className="text-[#FFD43B] text-sm font-bold tracking-wide">LIVE</span>
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="hidden md:flex items-center gap-6">
              {/* Futuristic Search */}
              <div className={`relative transition-all duration-700 ease-out ${searchOpen ? "w-64" : "w-12"}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-[#1A1D21] to-[#2C3136] rounded-full border transition-all duration-500 ${searchOpen ? "border-[#00BFFF]/50 shadow-lg shadow-[#00BFFF]/20" : "border-[#3C4A57]/30"
                  }`} />

                <input
                  type="text"
                  placeholder="Search events, venues..."
                  className={`relative w-full h-12 bg-transparent text-sm text-white rounded-full px-4 pl-12 transition-all duration-700 placeholder-[#AEB4BB] ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                />

                <div
                  className="absolute right-3 top-3 cursor-pointer text-[#AEB4BB] hover:text-[#00BFFF] transition-all duration-300 hover:scale-110"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <Search size={20} className={searchOpen ? "rotate-90" : "rotate-0"} style={{ transition: "transform 0.3s" }} />
                </div>

                {searchOpen && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00BFFF]/10 to-transparent animate-pulse" />
                )}
              </div>

              {/* Animated Language Selector */}
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-3 cursor-pointer text-[#AEB4BB] hover:text-[#00BFFF] transition-all duration-300 rounded-full border border-transparent hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5">
                  <Globe size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm font-medium">EN</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00BFFF] to-[#FFD43B] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </div>

              {/* Ultimate CTA Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD43B] via-[#00BFFF] to-[#FFD43B] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <Button className="relative bg-gradient-to-r from-[#00BFFF] to-[#18E0FF] hover:from-[#FFD43B] hover:to-[#FFA500] text-black font-bold px-8 py-3 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-[#FFD43B]/30">
                  <span className="flex items-center gap-2">
                    Register Now
                    <Zap className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00BFFF] to-[#FFD43B] rounded-lg opacity-20 blur-sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative text-white hover:text-[#00BFFF] transition-all duration-300 hover:scale-110 bg-[#1A1D21]/50 backdrop-blur-sm border border-[#3C4A57]/30"
                >
                  {isMobileMenuOpen ?
                    <X className="rotate-180 transition-transform duration-300" /> :
                    <Menu className="group-hover:rotate-90 transition-transform duration-300" />
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 transition-all duration-700 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E11]/95 via-[#1A1D21]/90 to-[#0B0E11]/95 backdrop-blur-2xl" />

          {/* Animated border */}
          <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#FFD43B] via-[#00BFFF] to-[#FFD43B] animate-pulse" />

          <div className="relative p-8 flex flex-col gap-8 h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="text-[#FFD43B] font-bold">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#00BFFF]"
              >
                <X />
              </Button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group flex items-center gap-4 text-white hover:text-[#00BFFF] transition-all duration-500 p-4 rounded-xl hover:bg-[#1A1D21]/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#3C4A57] group-hover:bg-[#00BFFF] transition-colors duration-300" />
                  <span className="text-lg font-medium">{item}</span>
                  <div className="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-[#00BFFF]/10 to-transparent group-hover:w-full transition-all duration-500 rounded-xl" />
                </a>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-6 mt-auto">
              <Button className="bg-gradient-to-r from-[#00BFFF] to-[#18E0FF] hover:from-[#FFD43B] hover:to-[#FFA500] text-black font-bold py-4 rounded-xl transition-all duration-500 shadow-lg">
                <span className="flex items-center gap-2">
                  Register Now
                  <Zap className="w-4 h-4" />
                </span>
              </Button>

              <div className="flex items-center justify-center gap-3 p-4 bg-[#1A1D21]/30 rounded-xl border border-[#3C4A57]/30">
                <Globe size={18} className="text-[#AEB4BB]" />
                <span className="text-[#AEB4BB]">English</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}