"use client";

import React, { useState, useEffect, useRef } from "react"
import { ArrowRight, Calendar, Users, Sparkles, Play, Star, Zap, Globe, Heart, Trophy, Rocket, PartyPopper } from "lucide-react"

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: 'gold' | 'cyan';
  rotation: number;
  rotationSpeed: number;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
  color: 'gold' | 'cyan';
}

interface Achievement {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  number: string;
  label: string;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  accentColor: string;
}

const HeroSection: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [currentWord, setCurrentWord] = useState<number>(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [scrollY, setScrollY] = useState<number>(0)
  const heroRef = useRef<HTMLElement>(null)

  const dynamicWords: string[] = ["Experiences", "Memories", "Connections", "Adventures", "Moments", "Stories", "Dreams"]

  const achievements: Achievement[] = [
    { icon: Trophy, number: "500K+", label: "Happy Attendees" },
    { icon: Rocket, number: "2.5M+", label: "Events Hosted" },
    { icon: Globe, number: "150+", label: "Global Cities" },
    { icon: PartyPopper, number: "98%", label: "Satisfaction Rate" }
  ]

  const features: Feature[] = [
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with millions of event enthusiasts worldwide",
      accentColor: '#F4C430'
    },
    {
      icon: Sparkles,
      title: "Smart Discovery",
      description: "AI-powered recommendations tailored to your interests",
      accentColor: '#00BFFF'
    },
    {
      icon: Heart,
      title: "Premium Access",
      description: "Exclusive VIP events and premium experiences",
      accentColor: '#F4C430'
    }
  ]

  // Initialize multiple animation systems
  useEffect(() => {
    // Enhanced particles system
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.5 ? 'gold' : 'cyan',
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 + 0.5
    }))
    setParticles(newParticles)

    // Floating geometric elements
    const newFloatingElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      speed: Math.random() * 1 + 0.3,
      opacity: Math.random() * 0.1 + 0.05,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      color: Math.random() > 0.5 ? 'gold' : 'cyan'
    }))
    setFloatingElements(newFloatingElements)
  }, [])

  useEffect(() => {
    setIsVisible(true)

    // Advanced mouse tracking with smooth interpolation
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition(prev => ({
          x: prev.x + (((e.clientX - rect.left) / rect.width) * 100 - prev.x) * 0.1,
          y: prev.y + (((e.clientY - rect.top) / rect.height) * 100 - prev.y) * 0.1
        }))
      }
    }

    // Scroll tracking for parallax effects
    const handleScroll = (): void => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    // Faster word rotation with typewriter effect
    const wordInterval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % dynamicWords.length)
    }, 2500)

    // Enhanced particle animation with rotation and pulsing
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.1) % 110,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.02,
        rotation: (particle.rotation + particle.rotationSpeed) % 360,
        opacity: particle.opacity + Math.sin(Date.now() * 0.002 + particle.id) * 0.1
      })))
    }, 40)

    // Floating elements animation
    const floatingInterval = setInterval(() => {
      setFloatingElements(prev => prev.map(element => ({
        ...element,
        y: (element.y + element.speed * 0.05) % 105,
        x: element.x + Math.cos(Date.now() * 0.0008 + element.id) * 0.015
      })))
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(wordInterval)
      clearInterval(particleInterval)
      clearInterval(floatingInterval)
    }
  }, [dynamicWords.length])

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement
    target.style.boxShadow = '0 20px 60px rgba(244, 196, 48, 0.6)'
    target.style.transform = 'translateY(-4px) scale(1.1) rotate(1deg)'
  }

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement
    target.style.boxShadow = '0 10px 40px rgba(244, 196, 48, 0.4)'
    target.style.transform = 'translateY(0) scale(1) rotate(0deg)'
  }

  const handleSecondaryButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = '#00BFFF15'
    target.style.borderColor = '#18E0FF'
    target.style.color = '#18E0FF'
    target.style.boxShadow = '0 15px 50px rgba(0, 191, 255, 0.4)'
    target.style.transform = 'translateY(-4px) scale(1.1) rotate(1deg)'
  }

  const handleSecondaryButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = 'transparent'
    target.style.borderColor = '#00BFFF'
    target.style.color = '#00BFFF'
    target.style.boxShadow = 'none'
    target.style.transform = 'translateY(0) scale(1) rotate(0deg)'
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-4"
      style={{ backgroundColor: '#0c1838' }}
    >
      {/* Advanced Background Animation System */}
      <div className="absolute inset-0">
        {/* Dynamic gradient orbs with mouse interaction */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[700px] h-[700px] opacity-25 rounded-full blur-3xl animate-float-slow transition-all duration-1000"
            style={{
              background: 'radial-gradient(circle, #F4C43020 0%, #F4C43010 50%, transparent 70%)',
              left: `${25 + mousePosition.x * 0.03 + Math.sin(Date.now() * 0.001) * 5}%`,
              top: `${15 + mousePosition.y * 0.02 + Math.cos(Date.now() * 0.0012) * 3}%`,
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.0008) * 0.1})`
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] opacity-20 rounded-full blur-3xl animate-float-reverse transition-all duration-1000"
            style={{
              background: 'radial-gradient(circle, #00BFFF18 0%, #00BFFF08 50%, transparent 70%)',
              right: `${20 + mousePosition.x * -0.02 + Math.cos(Date.now() * 0.0015) * 4}%`,
              bottom: `${20 + mousePosition.y * 0.015 + Math.sin(Date.now() * 0.001) * 3}%`,
              transform: `scale(${1 + Math.cos(Date.now() * 0.001) * 0.08})`
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] opacity-15 rounded-full blur-3xl animate-pulse-gentle"
            style={{
              background: 'radial-gradient(circle, #F4C43015 0%, transparent 60%)',
              left: `${60 + mousePosition.x * 0.01}%`,
              top: `${70 + mousePosition.y * 0.01}%`,
              transform: `translate(-50%, -50%) rotate(${Date.now() * 0.01}deg)`
            }}
          />
        </div>

        {/* Enhanced floating particles with rotation and trails */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute transition-all duration-75 animate-sparkle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: Math.max(0.1, Math.min(0.8, particle.opacity)),
                transform: `rotate(${particle.rotation}deg) scale(${1 + Math.sin(Date.now() * 0.003 + particle.id) * 0.3})`,
                borderRadius: particle.size > 2.5 ? '20%' : '50%'
              }}
            >
              <div
                className="w-full h-full rounded-full animate-pulse-fast"
                style={{
                  backgroundColor: particle.color === 'gold' ? '#F4C430' : '#00BFFF',
                  boxShadow: `0 0 ${particle.size * 6}px ${particle.color === 'gold' ? '#F4C43060' : '#00BFFF60'}, 
                              0 0 ${particle.size * 12}px ${particle.color === 'gold' ? '#F4C43020' : '#00BFFF20'}`
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {floatingElements.map(element => (
            <div
              key={element.id}
              className="absolute animate-float-gentle transition-all duration-1000"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                opacity: element.opacity,
                transform: `rotate(${Date.now() * 0.0005 + element.id * 10}deg) scale(${1 + Math.sin(Date.now() * 0.002 + element.id) * 0.2})`
              }}
            >
              {element.shape === 'circle' && (
                <div
                  className="w-full h-full rounded-full border-2 animate-spin-very-slow"
                  style={{
                    borderColor: element.color === 'gold' ? '#F4C43040' : '#00BFFF40'
                  }}
                />
              )}
              {element.shape === 'square' && (
                <div
                  className="w-full h-full border-2 animate-bounce-gentle"
                  style={{
                    borderColor: element.color === 'gold' ? '#F4C43040' : '#00BFFF40',
                    borderRadius: '20%'
                  }}
                />
              )}
              {element.shape === 'triangle' && (
                <div
                  className="w-0 h-0 animate-wiggle"
                  style={{
                    borderLeft: `${element.size / 2}px solid transparent`,
                    borderRight: `${element.size / 2}px solid transparent`,
                    borderBottom: `${element.size}px solid ${element.color === 'gold' ? '#F4C43040' : '#00BFFF40'}`
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg width="100%" height="100%" className="absolute inset-0 animate-grid-move">
            <defs>
              <pattern id="animatedGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                  className="animate-pulse-slow"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="2"
                  fill="#F4C430"
                  opacity="0.3"
                  className="animate-ping-slow"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#animatedGrid)" />
          </svg>
        </div>
      </div>

      {/* Main Hero Content with Enhanced Animations */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 sm:px-8 lg:px-12 text-center"
      >

        {/* Enhanced Main Headline with Complex Animations */}
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
            <div className={`transition-all duration-1500 delay-200 animate-slide-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
              }`}>
              <span
                className="block animate-text-shimmer"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
                }}
              >
                Create Epic
              </span>
            </div>
            <div className={`transition-all duration-1500 delay-400 relative animate-word-morph ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-30 scale-95'
              }`}>
              <span className="relative inline-block">
                <span
                  className="font-black bg-clip-text text-transparent animate-rainbow-text"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #F4C430, #00BFFF, #F4C430, #00BFFF)`,
                    backgroundSize: '400% 400%',
                    textShadow: `0 0 50px ${currentWord % 2 === 0 ? '#F4C43050' : '#00BFFF50'}`
                  }}
                >
                  {dynamicWords[currentWord]}
                </span>
                <div
                  className="absolute -inset-6 blur-3xl -z-10 animate-glow-pulse rounded-xl"
                  style={{
                    background: `linear-gradient(45deg, #F4C43040, #00BFFF40, #F4C43040)`,
                    backgroundSize: '400% 400%'
                  }}
                />
                {/* Animated underline */}
                <div
                  className="absolute -bottom-4 left-0 h-1 animate-expand-contract"
                  style={{
                    width: '100%',
                    background: `linear-gradient(90deg, #F4C430, #00BFFF)`,
                    borderRadius: '2px'
                  }}
                />
              </span>
            </div>
          </h1>
        </div>

        {/* Animated Subtitle with Typing Effect */}
        <p className={`text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mb-16 transition-all duration-1500 delay-600 animate-type-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
          }`}
          style={{ color: '#cbd5e1' }}>
          Join <span className="font-bold animate-number-count" style={{ color: '#F4C430' }}>2.5M+ event enthusiasts</span> in discovering
          <span className="font-bold animate-text-wave" style={{ color: '#00BFFF' }}> extraordinary experiences</span> and building
          <span className="font-bold animate-text-pulse" style={{ color: '#FFFFFF' }}> meaningful connections</span> worldwide.
        </p>

        {/* Achievement Stats with Staggered Animations */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto transition-all duration-1500 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
            }`}
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-6 text-center cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-2 border animate-card-float"
                style={{
                  backgroundColor: '#162855', // Card background
                  borderColor: '#1e3a8a', // Border color
                  animationDelay: `${index * 0.2}s`,
                  transform: `perspective(1000px) rotateX(${Math.sin(
                    Date.now() * 0.001 + index
                  ) * 2}deg)`,
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 animate-glow-rotate" />
                <div
                  className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-700 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, #F4C430, #00BFFF)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl p-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg animate-icon-bounce"
                  style={{
                    background: `linear-gradient(135deg, #F4C430, #00BFFF)`,
                    animation: `icon-bounce 2s ease-in-out infinite ${index * 0.5}s`,
                  }}
                >
                  <Icon
                    className="w-full h-full transition-all duration-500 group-hover:animate-spin"
                    style={{ color: '#0c1838' }} // darkest blue inside icons
                  />
                </div>

                {/* Number */}
                <div
                  className="text-3xl font-black mb-2 group-hover:scale-125 transition-all duration-500 animate-counter"
                  style={{ color: '#F4C430' }}
                >
                  {achievement.number}
                </div>

                {/* Label */}
                <div
                  className="font-semibold group-hover:text-white transition-all duration-500 animate-text-slide"
                  style={{ color: '#AEB4BB' }}
                >
                  {achievement.label}
                </div>

                {/* Status indicators */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full animate-ping-slow"
                  style={{ backgroundColor: '#00BFFF' }}
                />
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse-fast"
                  style={{ backgroundColor: '#F4C430' }}
                />
              </div>
            )
          })}
        </div>


        {/* Enhanced CTA Buttons with Complex Animations */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 transition-all duration-1500 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
          }`}>

          {/* Primary CTA with Multiple Animation Layers */}
          <button
            onClick={() => setIsRegistrationOpen(true)}
            className="group relative px-12 py-4 font-bold text-lg rounded-full transition-all duration-700 hover:scale-110 hover:-translate-y-2 overflow-hidden animate-button-float"
            style={{
              background: `linear-gradient(135deg, #F4C430, #E6B800)`,
              color: '#1e293b',
              boxShadow: '0 10px 40px rgba(244, 196, 48, 0.4)'
            }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {/* Multiple shine effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 transform translate-x-[-200%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[200%] skew-x-12 group-hover:translate-x-[-200%] transition-transform duration-1200" />

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />

            <span className="relative flex items-center animate-button-content">
              <Play className="mr-3 w-5 h-5 group-hover:rotate-180 group-hover:scale-125 transition-all duration-700" />
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-700" />
            </span>

            {/* Pulsing glow */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700" />
          </button>

          {/* Secondary CTA with Enhanced Hover */}
          <button
            className="group relative px-12 py-4 font-semibold text-lg rounded-full border-2 transition-all duration-700 hover:scale-110 hover:-translate-y-2 hover:rotate-1 overflow-hidden animate-button-float-reverse"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#00BFFF',
              color: '#00BFFF'
            }}
            onMouseEnter={handleSecondaryButtonMouseEnter}
            onMouseLeave={handleSecondaryButtonMouseLeave}
          >
            {/* Border glow animation */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 group-hover:animate-ping transition-all duration-700" />

            {/* Background wave effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 rounded-full" />

            <span className="relative flex items-center animate-button-content-reverse">
              <Calendar className="mr-3 w-5 h-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700" />
              Explore Events
              <Zap className="ml-3 w-5 h-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700" />
            </span>
          </button>
        </div>

        {/* Enhanced Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1500 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-30"
            }`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-1000 hover:scale-105 hover:-translate-y-6 hover:rotate-1 border animate-card-hover shadow-lg"
                style={{
                  backgroundColor: "#162855", // card background
                  borderColor: "#1e3a8a", // theme border
                  animationDelay: `${index * 0.3}s`,
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02 - 1
                    }deg) rotateX(${mousePosition.y * 0.02 - 1}deg)`,
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-1000"
                  style={{ backgroundColor: feature.accentColor }}
                />

                {/* Icon container */}
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-xl p-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg animate-icon-float"
                  style={{
                    backgroundColor: feature.accentColor + "20",
                    border: `2px solid ${feature.accentColor}40`,
                    animation: `icon-float 4s ease-in-out infinite ${index * 1}s`,
                  }}
                >
                  <Icon
                    className="w-full h-full transition-all duration-700 group-hover:animate-bounce"
                    style={{ color: feature.accentColor }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-4 group-hover:scale-110 transition-all duration-500 animate-text-glow"
                  style={{ color: "#FFFFFF" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-relaxed group-hover:text-white transition-all duration-700 animate-text-fade"
                  style={{ color: "#AEB4BB" }}
                >
                  {feature.description}
                </p>

                {/* Decorative animated accents */}
                <div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping-slow"
                  style={{ backgroundColor: feature.accentColor }}
                />
                <div
                  className="absolute bottom-4 left-4 w-1 h-8 rounded-full animate-pulse-slow opacity-30"
                  style={{ backgroundColor: feature.accentColor }}
                />
              </div>
            )
          })}
        </div>

      </div>

      {/* Enhanced Registration Modal */}
      {isRegistrationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl animate-fade-in"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
        >
          <div
            className="relative rounded-3xl p-10 max-w-md w-full text-center animate-modal-in border"
            style={{
              backgroundColor: '#1e293b',
              borderColor: '#475569'
            }}
          >
            <div className="text-5xl mb-6 animate-bounce">🎉</div>
            <h2
              className="text-2xl font-bold mb-4 animate-text-glow"
              style={{ color: '#FFFFFF' }}
            >
              Welcome to <span style={{ color: '#F4C430' }}>EventsHub</span>
            </h2>
            <p
              className="mb-8 leading-relaxed animate-text-fade"
              style={{ color: '#cbd5e1' }}
            >
              Join millions of event enthusiasts and discover amazing experiences near you.
            </p>
            <div className="space-y-4">
              <button
                className="w-full px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-button-pulse"
                style={{
                  background: `linear-gradient(135deg, #F4C430, #E6B800)`,
                  color: '#1e293b'
                }}
              >
                Get Started Now 🚀
              </button>
              <button
                onClick={() => setIsRegistrationOpen(false)}
                className="w-full px-8 py-3 rounded-full font-semibold border transition-all duration-300 hover:scale-105 hover:border-opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#475569',
                  color: '#cbd5e1'
                }}
              >
                Maybe Later
              </button>
            </div>

            {/* Modal Glow Effect */}
            <div
              className="absolute -inset-1 rounded-3xl blur opacity-20 -z-10 animate-glow-pulse"
              style={{
                background: `linear-gradient(135deg, #F4C430, #00BFFF)`
              }}
            />
          </div>
        </div>
      )}

    </section>
  )
}

export default HeroSection