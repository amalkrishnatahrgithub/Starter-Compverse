
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Globe, ChevronDown, Bell, User, Calendar, Settings, ArrowRight, Sparkles, Star, Zap, Rocket, Target, Crown } from "lucide-react"

export default function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [hoveredItem, setHoveredItem] = useState("")
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (e) => {
      const target = e.target
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown("")
      }
    }

    // Generate floating particles
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5
        })
      }
      setParticles(newParticles)
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("click", handleClickOutside)
    generateParticles()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const navItems = [
    {
      name: "Events",
      href: "/events",
      hasDropdown: true,
      dropdownItems: [
        { name: "Upcoming Events", href: "/events/upcoming", icon: Calendar, description: "Don't miss our latest events" },
        { name: "Past Events", href: "/events/past", icon: Star, description: "Explore our event history" },
        { name: "Virtual Events", href: "/events/virtual", icon: Globe, description: "Join from anywhere" }
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" }
  ]

  const customStyles = `
    @keyframes slideInFromTop {
      0% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
      100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
    }
    
    @keyframes fadeInUp {
      0% { transform: translateY(40px) scale(0.9); opacity: 0; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes scaleIn {
      0% { transform: scale(0.8) rotateY(-10deg); opacity: 0; }
      100% { transform: scale(1) rotateY(0deg); opacity: 1; }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(200%) skewX(-15deg); }
    }
    
    @keyframes pulse-border {
      0%, 100% { border-color: rgba(30, 58, 138, 0.3); box-shadow: 0 0 20px rgba(244, 196, 48, 0.1); }
      50% { border-color: rgba(244, 196, 48, 0.8); box-shadow: 0 0 30px rgba(244, 196, 48, 0.3); }
    }
    
    @keyframes floating {
      0%, 100% { transform: translateY(0px) rotateZ(0deg); }
      33% { transform: translateY(-8px) rotateZ(1deg); }
      66% { transform: translateY(-4px) rotateZ(-1deg); }
    }
    
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(244, 196, 48, 0.3); }
      50% { box-shadow: 0 0 40px rgba(244, 196, 48, 0.6), 0 0 60px rgba(244, 196, 48, 0.3); }
    }
    
    @keyframes particle-float {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
      50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
    }
    
    @keyframes rainbow-border {
      0% { border-image: linear-gradient(90deg, #F4C430, #00BFFF, #9333EA) 1; }
      33% { border-image: linear-gradient(90deg, #00BFFF, #9333EA, #F4C430) 1; }
      66% { border-image: linear-gradient(90deg, #9333EA, #F4C430, #00BFFF) 1; }
      100% { border-image: linear-gradient(90deg, #F4C430, #00BFFF, #9333EA) 1; }
    }
    
    @keyframes magnetic-hover {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-2px, -2px) scale(1.02); }
      50% { transform: translate(2px, -1px) scale(1.03); }
      75% { transform: translate(-1px, 1px) scale(1.02); }
      100% { transform: translate(0, 0) scale(1.05); }
    }
    
    .animate-slide-in { animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .animate-shimmer { animation: shimmer 2.5s infinite; }
    .animate-pulse-border { animation: pulse-border 3s infinite; }
    .animate-floating { animation: floating 8s ease-in-out infinite; }
    .animate-glow-pulse { animation: glow-pulse 2s infinite; }
    .animate-particle-float { animation: particle-float 15s linear infinite; }
    .animate-rainbow-border { animation: rainbow-border 4s linear infinite; }
    .animate-magnetic-hover { animation: magnetic-hover 0.6s ease-out; }
    
    .glass-morphism {
      background: rgba(6, 14, 35, 0.9);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .glass-morphism-premium {
      background: linear-gradient(135deg, 
        rgba(6, 14, 35, 0.95) 0%,
        rgba(30, 58, 138, 0.1) 50%,
        rgba(244, 196, 48, 0.05) 100%);
      backdrop-filter: blur(30px);
      border: 1px solid rgba(244, 196, 48, 0.2);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 50px rgba(244, 196, 48, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .gradient-text {
      background: linear-gradient(135deg, #F4C430 0%, #00BFFF 25%, #9333EA 50%, #F4C430 75%, #00BFFF 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s ease-in-out infinite;
    }
    
    .nav-item-hover {
      position: relative;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }
    
    .nav-item-hover::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(244, 196, 48, 0.1), transparent);
      transition: left 0.6s ease;
    }
    
    .nav-item-hover:hover::before {
      left: 100%;
    }
    
    .nav-item-hover::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #F4C430, #00BFFF, #9333EA);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: translateX(-50%);
      border-radius: 2px;
    }
    
    .nav-item-hover:hover::after {
      width: 120%;
    }
    
    .dropdown-menu {
      background: linear-gradient(145deg, 
        rgba(6, 14, 35, 0.98) 0%,
        rgba(30, 58, 138, 0.05) 100%);
      backdrop-filter: blur(30px);
      border: 1px solid rgba(244, 196, 48, 0.3);
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.5),
        0 0 80px rgba(244, 196, 48, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .premium-button {
      background: linear-gradient(135deg, #1e3a8a 0%, #00BFFF 50%, #F4C430 100%);
      background-size: 300% 300%;
      position: relative;
      overflow: hidden;
    }
    
    .premium-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }
    
    .premium-button:hover::before {
      left: 100%;
    }
    
    .premium-button:hover {
      background-position: 100% 0;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(244, 196, 48, 0.4);
    }
    
    .floating-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }
    
    .particle {
      position: absolute;
      background: radial-gradient(circle, rgba(244, 196, 48, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(1px);
    }
  `

  return (
    <>
      <style>{customStyles}</style>

      {/* Floating Particles Background */}
      <div className="floating-particles fixed inset-0 z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle animate-particle-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out animate-slide-in ${isScrolled
        ? 'glass-morphism-premium shadow-2xl shadow-black/30'
        : 'glass-morphism-premium'
        }`}>

        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F4C430] via-[#00BFFF] to-transparent opacity-90 animate-rainbow-border" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">

            {/* Enhanced Logo Section */}
            <div className="flex items-center group animate-fade-in-up animate-floating">
              <div className="relative">
                {/* Multiple glow layers */}
                <div className="absolute -inset-4 bg-gradient-to-r via-[#00BFFF]/30 to-[#9333EA]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-glow-pulse" />
                <div className="absolute -inset-2 bg-gradient-to-r to-[#00BFFF]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 [#F4C430] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br to-[#00BFFF]/20" />
                  <div className="relative w-full h-full bg-gradient-to-br from-[#1e3a8a] to-[#0c1838] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <img src="/CompVerseLogo.png" alt="CompVerse Logo" className="w-full h-full object-contain" />
                  </div>

                  {/* Enhanced shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>

              {/* <div className="ml-5 group-hover:translate-x-2 transition-transform duration-300">
                <p className="text-xs text-slate-400 -mt-1 group-hover:text-[#F4C430] transition-colors duration-300">Premium Events</p>
              </div> */}
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {navItems.map((item, index) => (
                <div key={item.name} className="relative dropdown-container group perspective">
                  {/* Nav Button */}
                  <button
                    className={`relative flex items-center px-6 py-3 text-sm font-bold tracking-wider rounded-2xl transition-transform duration-700 transform-gpu overflow-hidden border-2 border-transparent
          ${hoveredItem === item.name || activeDropdown === item.name
                        ? 'text-white scale-105 shadow-2xl shadow-cyan-400/50 border-yellow-400/50'
                        : 'text-slate-300 hover:text-white hover:scale-102 hover:border-cyan-400/30'
                      }`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem("")}
                    onClick={() => item.hasDropdown && setActiveDropdown(activeDropdown === item.name ? "" : item.name)}
                  >
                    {/* Background gradient animation */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#002868] via-[#001F4D] to-[#002868] rounded-2xl transition-all duration-700 transform
          ${hoveredItem === item.name || activeDropdown === item.name
                        ? 'opacity-100 scale-100 rotate-1'
                        : 'opacity-0 scale-95 rotate-0'
                      }`} />

                    {/* Gold accent overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-2xl transition-opacity duration-500
          ${hoveredItem === item.name || activeDropdown === item.name ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />

                    {/* Particle micro-interactions */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-3 right-6 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                      <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    </div>

                    {/* Shine effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl transform transition-all duration-1000
          ${hoveredItem === item.name ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`} />

                    {/* Button Text */}
                    <span className="relative z-10 font-bold tracking-widest uppercase text-xs">
                      {item.name}
                    </span>

                    {/* Dropdown Icon */}
                    {item.hasDropdown && (
                      <ChevronDown className={`relative z-10 ml-3 w-4 h-4 transition-transform duration-700
            ${activeDropdown === item.name
                          ? 'rotate-180 text-yellow-400 scale-110'
                          : 'rotate-0 group-hover:text-yellow-400 group-hover:scale-110'}`} />
                    )}

                    {/* Glow ring */}
                    <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-400 via-yellow-400 to-cyan-400 rounded-2xl blur-md transition-all duration-500
          ${activeDropdown === item.name ? 'opacity-60 animate-pulse' : 'opacity-0'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-4 w-80 z-50">
                      {/* Arrow Indicator */}
                      <div className="absolute -top-3 left-8 w-6 h-6">
                        <div className="w-full h-full bg-gradient-to-br from-[#002868] to-[#001F4D] border-2 border-yellow-400/30 rotate-45 rounded-sm shadow-lg shadow-cyan-400/25"></div>
                      </div>

                      <div className="bg-gradient-to-br from-[#001F3D]/95 to-[#001F4D]/95 backdrop-blur-xl border-2 border-yellow-400/20 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-400/50 animate-scale-in">
                        {/* Dropdown Header */}
                        <div className="bg-gradient-to-r from-[#001F4D]/50 to-[#002868]/50 p-4 border-b border-yellow-400/20">
                          <h3 className="text-yellow-400 font-bold text-sm tracking-wider uppercase">{item.name} Menu</h3>
                        </div>

                        {/* Dropdown Items */}
                        <div className="p-4 space-y-3">
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="group relative flex items-center p-4 text-sm text-slate-300 rounded-2xl overflow-hidden border border-transparent hover:border-yellow-400/30 hover:bg-gradient-to-r hover:from-[#002868]/30 hover:to-yellow-500/10 transition-all duration-500"
                              style={{ animationDelay: `${idx * 0.08}s`, animation: 'slideInUp 0.6s ease-out forwards' }}
                            >
                              {/* Accent line */}
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-cyan-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full"></div>

                              {/* Icon */}
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#001F4D]/40 to-[#002868]/40 border border-yellow-400/20 rounded-xl mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <dropdownItem.icon className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-transform duration-300 group-hover:scale-110" />
                              </div>

                              {/* Text */}
                              <div className="flex-1">
                                <span className="font-semibold block group-hover:translate-x-2 transition-all duration-500 group-hover:text-yellow-100">{dropdownItem.name}</span>
                                <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">Navigate to {dropdownItem.name.toLowerCase()}</span>
                              </div>

                              {/* Arrow & glow */}
                              <div className="relative">
                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-yellow-400 group-hover:drop-shadow-lg" />
                                <div className="absolute inset-0 w-5 h-5 bg-yellow-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </div>

                              {/* Particle effect */}
                              <div className="absolute top-2 right-8 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                            </a>
                          ))}
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-1 bg-gradient-to-r from-cyan-400 via-yellow-400 to-cyan-400 opacity-60"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Right Section */}
            <div className="hidden lg:flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

              {/* Enhanced Search Bar */}
              <div className={`relative transition-all duration-700 ease-out ${searchOpen ? 'w-96' : 'w-12'}`}>
                <div className={`absolute inset-0 glass-morphism-premium rounded-full transition-all duration-500 ${searchOpen ? 'animate-pulse-border' : ''
                  }`} />

                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search events, solutions, and more..."
                  className={`relative w-full h-12 bg-transparent text-sm text-white rounded-full px-6 pl-14 transition-all duration-700 placeholder-slate-400 ${searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                />

                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#F4C430] transition-all duration-400 hover:scale-125 glass-morphism rounded-full"
                >
                  <Search className={`w-4 h-4 transition-all duration-500 ${searchOpen ? 'rotate-90' : 'hover:rotate-12'}`} />
                </button>

                {/* Enhanced Search suggestions */}
                {searchOpen && searchValue && (
                  <div className="absolute top-full left-0 right-0 mt-3 glass-morphism-premium rounded-2xl p-3 animate-scale-in">
                    {['AI Conference 2024', 'Tech Workshop', 'Digital Summit', 'Innovation Forum'].filter(item =>
                      item.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((suggestion, idx) => (
                      <div key={suggestion} className="flex items-center px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#F4C430]/10 hover:to-[#00BFFF]/10 rounded-xl cursor-pointer transition-all duration-300 group">
                        <Search className="w-4 h-4 mr-3 text-[#F4C430] group-hover:scale-110 transition-transform duration-200" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Notifications */}
              <div className="relative">
                <button className="relative p-3 text-slate-400 hover:text-[#F4C430] transition-all duration-400 hover:scale-125 glass-morphism-premium rounded-full group">
                  <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-glow-pulse">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                </button>
              </div>

              {/* Enhanced Language Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white transition-all duration-400 glass-morphism-premium rounded-full hover:scale-105 group">
                  <Globe className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-sm font-medium">EN</span>
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-400" />
                </button>
              </div>

              {/* Ultimate Enhanced CTA Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F4C430] via-[#00BFFF] via-[#9333EA] to-[#F4C430] rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-rainbow-border blur-sm" />
                <Button
                  className="group relative overflow-hidden
    bg-slate-900/90 backdrop-blur-sm
    hover:bg-slate-800/95
    text-white font-semibold tracking-wider
    px-6 py-3 rounded-xl
    border border-slate-700/50 hover:border-amber-400/80
    shadow-2xl shadow-black/50
    hover:shadow-amber-400/20 hover:shadow-2xl
    transition-all duration-500
    hover:scale-[1.02] active:scale-[0.98]
    backdrop-blur-xl"
                >
                  {/* Animated background patterns */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                  {/* Subtle grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,212,59,0.3) 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Premium inner glow */}
                  <div className="absolute inset-0.5 bg-gradient-to-b from-white/5 to-transparent rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content container */}
                  <div className="relative z-10 flex items-center gap-2">
                    {/* Left accent line */}
                    <div className="w-0 group-hover:w-4 h-0.5 bg-gradient-to-r from-amber-400 to-transparent transition-all duration-700 delay-100" />

                    {/* Icon with sophisticated animation */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-amber-400/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" />
                      <Rocket className="w-4 h-4 text-slate-300 group-hover:text-amber-400 transition-all duration-500 group-hover:scale-110 relative z-10" />
                    </div>

                    {/* Main text with letter spacing animation */}
                    <span className="font-semibold text-sm tracking-wide group-hover:tracking-wider transition-all duration-500">
                      Register Now
                    </span>

                    {/* Right decorative element */}
                    <div className="relative">
                      <Sparkles className="w-3 h-3 text-amber-400/60 group-hover:text-amber-400 transition-all duration-500 group-hover:rotate-180" />

                      {/* Orbiting dots */}
                      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300" />
                    </div>

                    {/* Right accent line */}
                    <div className="w-0 group-hover:w-4 h-0.5 bg-gradient-to-l from-amber-400 to-transparent transition-all duration-700 delay-100" />
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-700 delay-200" />

                  {/* Subtle corner highlights */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/0 group-hover:border-amber-400/30 rounded-tl-xl transition-all duration-500 delay-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/0 group-hover:border-amber-400/30 rounded-br-xl transition-all duration-500 delay-300" />
                </Button>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 text-slate-400 hover:text-[#F4C430] transition-all duration-400 hover:scale-125 glass-morphism-premium rounded-xl group"
              >
                {isMobileMenuOpen ?
                  <X className="w-6 h-6 rotate-180 transition-transform duration-400" /> :
                  <Menu className="w-6 h-6 group-hover:rotate-12 transition-transform duration-400" />
                }
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 z-40 transition-all duration-700 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="absolute inset-0 glass-morphism-premium" />

        {/* Enhanced border accent */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#F4C430] via-[#00BFFF] via-[#9333EA] to-[#F4C430] opacity-90 animate-rainbow-border" />

        <div className="relative p-6 flex flex-col h-full">
          {/* Enhanced Mobile Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430] to-[#00BFFF] rounded-2xl flex items-center justify-center animate-glow-pulse">
                <Crown className="w-5 h-5 text-[#0c1838]" />
              </div>
              <span className="text-[#F4C430] font-bold text-lg gradient-text">Menu</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-125"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Enhanced Mobile Navigation Links */}
          <div className="space-y-3 mb-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <a
                  href={item.href}
                  className="flex items-center justify-between p-5 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#F4C430]/10 hover:to-[#00BFFF]/10 rounded-2xl transition-all duration-400 group"
                >
                  <span className="font-medium text-lg">{item.name}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-400" />
                </a>
                {item.hasDropdown && (
                  <div className="ml-4 space-y-2">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="flex items-center p-4 text-sm text-slate-400 hover:text-[#F4C430] hover:bg-[#F4C430]/5 rounded-xl transition-all duration-300 group"
                      >
                        <dropdownItem.icon className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <div className="font-medium">{dropdownItem.name}</div>
                          <div className="text-xs text-slate-500">{dropdownItem.description}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Mobile Actions */}
          <div className="mt-auto space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button className="w-full premium-button text-white font-bold py-4 rounded-2xl transition-all duration-500 hover:scale-105">
              <span className="flex items-center justify-center space-x-3">
                <Rocket className="w-5 h-5" />
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </span>
            </Button>

            <div className="flex items-center justify-center space-x-4 p-4 glass-morphism rounded-xl">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden animate-fade-in-up"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>


  )

}
