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
      accentColor: '#FFD43B'
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
      accentColor: '#FFD43B'
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
    target.style.boxShadow = '0 20px 60px rgba(255, 212, 59, 0.6)'
    target.style.transform = 'translateY(-4px) scale(1.1) rotate(1deg)'
  }

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement
    target.style.boxShadow = '0 10px 40px rgba(255, 212, 59, 0.4)'
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0B0E11' }}
    >
      {/* Advanced Background Animation System */}
      <div className="absolute inset-0">
        {/* Dynamic gradient orbs with mouse interaction */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[700px] h-[700px] opacity-25 rounded-full blur-3xl animate-float-slow transition-all duration-1000"
            style={{
              background: 'radial-gradient(circle, #FFD43B20 0%, #FFD43B10 50%, transparent 70%)',
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
              background: 'radial-gradient(circle, #FFD43B15 0%, transparent 60%)',
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
                  backgroundColor: particle.color === 'gold' ? '#FFD43B' : '#00BFFF',
                  boxShadow: `0 0 ${particle.size * 6}px ${particle.color === 'gold' ? '#FFD43B60' : '#00BFFF60'}, 
                              0 0 ${particle.size * 12}px ${particle.color === 'gold' ? '#FFD43B20' : '#00BFFF20'}`
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
                    borderColor: element.color === 'gold' ? '#FFD43B40' : '#00BFFF40'
                  }}
                />
              )}
              {element.shape === 'square' && (
                <div
                  className="w-full h-full border-2 animate-bounce-gentle"
                  style={{
                    borderColor: element.color === 'gold' ? '#FFD43B40' : '#00BFFF40',
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
                    borderBottom: `${element.size}px solid ${element.color === 'gold' ? '#FFD43B40' : '#00BFFF40'}`
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
                  fill="#FFD43B"
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
      // style={{
      //   transform: `translateY(${scrollY * 0.2}px)`
      // }}
      >

        {/* Animated Premium Badge */}
        {/* <div
          className={`inline-flex items-center gap-3 px-8 py-3 mb-12 rounded-full border transition-all duration-1000 hover:scale-110 hover:rotate-1 animate-bounce-in ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-3'
            }`}
          style={{
            backgroundColor: '#1A1D21',
            borderColor: '#3C4A57',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(255, 212, 59, 0.1)',
            animation: 'float-gentle 6s ease-in-out infinite'
          }}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-spin-gentle" style={{ color: '#FFD43B' }} />
            <div
              className="absolute inset-0 rounded-full animate-ping-slow"
              style={{ backgroundColor: '#FFD43B40' }}
            />
            <div
              className="absolute inset-[-8px] rounded-full animate-pulse-slow opacity-20"
              style={{ backgroundColor: '#FFD43B' }}
            />
          </div>
          <span className="font-semibold text-lg animate-text-glow">
            <span style={{ color: '#FFD43B' }}>World's #1</span> Events Platform
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-current animate-star-twinkle"
                style={{
                  color: '#FFD43B',
                  animationDelay: `${i * 0.2}s`,
                  transform: `scale(${1 + Math.sin(Date.now() * 0.005 + i) * 0.2})`
                }}
              />
            ))}
          </div>
        </div> */}

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
                    backgroundImage: `linear-gradient(45deg, #FFD43B, #00BFFF, #FFD43B, #00BFFF)`,
                    backgroundSize: '400% 400%',
                    textShadow: `0 0 50px ${currentWord % 2 === 0 ? '#FFD43B50' : '#00BFFF50'}`
                  }}
                >
                  {dynamicWords[currentWord]}
                </span>
                <div
                  className="absolute -inset-6 blur-3xl -z-10 animate-glow-pulse rounded-xl"
                  style={{
                    background: `linear-gradient(45deg, #FFD43B40, #00BFFF40, #FFD43B40)`,
                    backgroundSize: '400% 400%'
                  }}
                />
                {/* Animated underline */}
                <div
                  className="absolute -bottom-4 left-0 h-1 animate-expand-contract"
                  style={{
                    width: '100%',
                    background: `linear-gradient(90deg, #FFD43B, #00BFFF)`,
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
          style={{ color: '#AEB4BB' }}>
          Join <span className="font-bold animate-number-count" style={{ color: '#FFD43B' }}>2.5M+ event enthusiasts</span> in discovering
          <span className="font-bold animate-text-wave" style={{ color: '#00BFFF' }}> extraordinary experiences</span> and building
          <span className="font-bold animate-text-pulse" style={{ color: '#FFFFFF' }}> meaningful connections</span> worldwide.
        </p>

        {/* Achievement Stats with Staggered Animations */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto transition-all duration-1500 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
          }`}>
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-6 text-center cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-2 border animate-card-float"
                style={{
                  backgroundColor: '#1A1D21',
                  borderColor: '#3C4A57',
                  animationDelay: `${index * 0.2}s`,
                  transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 2}deg)`
                }}
              >
                {/* Multiple hover glow layers */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 animate-glow-rotate"
                  style={{
                    // background: `conic-gradient(from ${index * 90}deg, #FFD43B, #00BFFF, #FFD43B)`
                  }}
                />
                <div
                  className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-700 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, #FFD43B, #00BFFF)`
                  }}
                />

                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl p-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg animate-icon-bounce"
                  style={{
                    background: `linear-gradient(135deg, #FFD43B, #00BFFF)`,
                    animation: `icon-bounce 2s ease-in-out infinite ${index * 0.5}s`
                  }}
                >
                  <Icon
                    className="w-full h-full transition-all duration-500 group-hover:animate-spin"
                    style={{ color: '#0B0E11' }}
                  />
                </div>

                <div
                  className="text-3xl font-black mb-2 group-hover:scale-125 transition-all duration-500 animate-counter"
                  style={{ color: '#FFD43B' }}
                >
                  {achievement.number}
                </div>
                <div
                  className="font-semibold group-hover:text-white transition-all duration-500 animate-text-slide"
                  style={{ color: '#AEB4BB' }}
                >
                  {achievement.label}
                </div>

                {/* Animated status indicators */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full animate-ping-slow"
                  style={{ backgroundColor: '#00BFFF' }}
                />
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse-fast"
                  style={{ backgroundColor: '#FFD43B' }}
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
              background: `linear-gradient(135deg, #FFD43B, #FFC300)`,
              color: '#0B0E11',
              boxShadow: '0 10px 40px rgba(255, 212, 59, 0.4)'
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
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1500 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
          }`}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-1000 hover:scale-105 hover:-translate-y-6 hover:rotate-1 border animate-card-hover"
                style={{
                  backgroundColor: '#1A1D21',
                  borderColor: '#3C4A57',
                  animationDelay: `${index * 0.3}s`,
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02 - 1}deg) rotateX(${mousePosition.y * 0.02 - 1}deg)`
                }}
              >
                {/* Multiple glow layers */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-1000"
                  style={{ backgroundColor: feature.accentColor }}
                />
                <div
                  className="absolute inset-[-3px] rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-1000 blur-lg animate-glow-rotate"
                  style={{
                    background: `conic-gradient(from ${index * 120}deg, ${feature.accentColor}, transparent, ${feature.accentColor})`
                  }}
                />

                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-xl p-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg animate-icon-float"
                  style={{
                    backgroundColor: feature.accentColor + '20',
                    border: `2px solid ${feature.accentColor}40`,
                    animation: `icon-float 4s ease-in-out infinite ${index * 1}s`
                  }}
                >
                  <Icon
                    className="w-full h-full transition-all duration-700 group-hover:animate-bounce"
                    style={{ color: feature.accentColor }}
                  />
                </div>

                <h3
                  className="text-xl font-bold mb-4 group-hover:scale-110 transition-all duration-500 animate-text-glow"
                  style={{ color: '#FFFFFF' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed group-hover:text-white transition-all duration-700 animate-text-fade"
                  style={{ color: '#AEB4BB' }}
                >
                  {feature.description}
                </p>

                {/* Animated corner elements */}
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

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center group cursor-pointer animate-bounce-gentle">
          <div
            className="text-sm mb-3 font-medium group-hover:text-white transition-colors animate-pulse-gentle"
            style={{ color: '#AEB4BB' }}
          >
            Discover More ✨
          </div>
          <div
            className="relative w-6 h-10 border-2 rounded-full flex justify-center group-hover:border-opacity-100 transition-all duration-500 animate-scroll-indicator"
            style={{ borderColor: '#00BFFF80' }}
          >
            <div
              className="w-1 h-3 rounded-full mt-2 animate-bounce group-hover:animate-pulse"
              style={{ backgroundColor: '#00BFFF' }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Registration Modal */}
      {isRegistrationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl animate-fade-in"
          style={{ backgroundColor: 'rgba(11, 14, 17, 0.9)' }}
        >
          <div
            className="relative rounded-3xl p-10 max-w-md w-full text-center animate-modal-in border"
            style={{
              backgroundColor: '#1A1D21',
              borderColor: '#3C4A57'
            }}
          >
            <div className="text-5xl mb-6 animate-bounce">🎉</div>
            <h2
              className="text-2xl font-bold mb-4 animate-text-glow"
              style={{ color: '#FFFFFF' }}
            >
              Welcome to <span style={{ color: '#FFD43B' }}>EventsHub</span>
            </h2>
            <p
              className="mb-8 leading-relaxed animate-text-fade"
              style={{ color: '#AEB4BB' }}
            >
              Join millions of event enthusiasts and discover amazing experiences near you.
            </p>
            <div className="space-y-4">
              <button
                className="w-full px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-button-pulse"
                style={{
                  background: `linear-gradient(135deg, #FFD43B, #FFC300)`,
                  color: '#0B0E11'
                }}
              >
                Get Started Now 🚀
              </button>
              <button
                onClick={() => setIsRegistrationOpen(false)}
                className="w-full px-8 py-3 rounded-full font-semibold border transition-all duration-300 hover:scale-105 hover:border-opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#3C4A57',
                  color: '#AEB4BB'
                }}
              >
                Maybe Later
              </button>
            </div>

            {/* Modal Glow Effect */}
            <div
              className="absolute -inset-1 rounded-3xl blur opacity-20 -z-10 animate-glow-pulse"
              style={{
                background: `linear-gradient(135deg, #FFD43B, #00BFFF)`
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes rainbow-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-2deg); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes spin-very-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
        }
        
        @keyframes spin-gentle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) translateY(50px); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes text-shimmer {
          0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4); }
          100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes word-morph {
          0%, 100% { transform: scale(1) rotateY(0deg); }
          50% { transform: scale(1.05) rotateY(5deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes expand-contract {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.1); }
        }
        
        @keyframes type-in {
          0% { width: 0; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        
        @keyframes number-count {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes text-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes text-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        
        @keyframes card-float {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-5px) rotateX(2deg); }
        }
        
        @keyframes glow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }
        
        @keyframes counter {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes text-slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes button-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(0.5deg); }
        }
        
        @keyframes button-float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(2px) rotate(-0.5deg); }
        }
        
        @keyframes button-content {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes button-content-reverse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.98); }
        }
        
        @keyframes card-hover {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-2px) rotateY(1deg); }
        }
        
        @keyframes icon-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-2px) rotate(2deg); }
          66% { transform: translateY(2px) rotate(-2deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: none; }
          50% { text-shadow: 0 0 10px rgba(255, 212, 59, 0.5); }
        }
        
        @keyframes text-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes scroll-indicator {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes button-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(10px, 10px); }
        }
        
        .animate-rainbow-text { 
          animation: rainbow-text 3s ease-in-out infinite; 
        }
        .animate-float-slow { 
          animation: float-slow 6s ease-in-out infinite; 
        }
        .animate-float-reverse { 
          animation: float-reverse 7s ease-in-out infinite; 
        }
        .animate-float-gentle { 
          animation: float-gentle 4s ease-in-out infinite; 
        }
        .animate-bounce-gentle { 
          animation: bounce-gentle 3s ease-in-out infinite; 
        }
        .animate-spin-very-slow { 
          animation: spin-very-slow 20s linear infinite; 
        }
        .animate-wiggle { 
          animation: wiggle 2s ease-in-out infinite; 
        }
        .animate-pulse-fast { 
          animation: pulse-fast 1s ease-in-out infinite; 
        }
        .animate-pulse-gentle { 
          animation: pulse-gentle 3s ease-in-out infinite; 
        }
        .animate-ping-slow { 
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; 
        }
        .animate-sparkle { 
          animation: sparkle 2s ease-in-out infinite; 
        }
        .animate-spin-gentle { 
          animation: spin-gentle 8s linear infinite; 
        }
        .animate-bounce-in { 
          animation: bounce-in 0.8s ease-out; 
        }
        .animate-slide-up { 
          animation: slide-up 0.8s ease-out; 
        }
        .animate-text-shimmer { 
          animation: text-shimmer 2s ease-in-out infinite; 
        }
        .animate-word-morph { 
          animation: word-morph 0.5s ease-in-out; 
        }
        .animate-glow-pulse { 
          animation: glow-pulse 2s ease-in-out infinite; 
        }
        .animate-expand-contract { 
          animation: expand-contract 2s ease-in-out infinite; 
        }
        .animate-type-in { 
          animation: type-in 1s ease-out; 
        }
        .animate-number-count { 
          animation: number-count 2s ease-in-out infinite; 
        }
        .animate-text-wave { 
          animation: text-wave 2s ease-in-out infinite; 
        }
        .animate-text-pulse { 
          animation: text-pulse 2s ease-in-out infinite; 
        }
        .animate-card-float { 
          animation: card-float 4s ease-in-out infinite; 
        }
        .animate-glow-rotate { 
          animation: glow-rotate 8s linear infinite; 
        }
        .animate-icon-bounce { 
          animation: icon-bounce 2s ease-in-out infinite; 
        }
        .animate-counter { 
          animation: counter 3s ease-in-out infinite; 
        }
        .animate-text-slide { 
          animation: text-slide 3s ease-in-out infinite; 
        }
        .animate-button-float { 
          animation: button-float 3s ease-in-out infinite; 
        }
        .animate-button-float-reverse { 
          animation: button-float-reverse 4s ease-in-out infinite; 
        }
        .animate-button-content { 
          animation: button-content 2s ease-in-out infinite; 
        }
        .animate-button-content-reverse { 
          animation: button-content-reverse 2.5s ease-in-out infinite; 
        }
        .animate-card-hover { 
          animation: card-hover 5s ease-in-out infinite; 
        }
        .animate-icon-float { 
          animation: icon-float 3s ease-in-out infinite; 
        }
        .animate-text-glow { 
          animation: text-glow 3s ease-in-out infinite; 
        }
        .animate-text-fade { 
          animation: text-fade 4s ease-in-out infinite; 
        }
        .animate-star-twinkle { 
          animation: star-twinkle 2s ease-in-out infinite; 
        }
        .animate-scroll-indicator { 
          animation: scroll-indicator 2s ease-in-out infinite; 
        }
        .animate-fade-in { 
          animation: fade-in 0.3s ease-out; 
        }
        .animate-modal-in { 
          animation: modal-in 0.4s ease-out; 
        }
        .animate-button-pulse { 
          animation: button-pulse 2s ease-in-out infinite; 
        }
        .animate-grid-move { 
          animation: grid-move 20s linear infinite; 
        }
      `}</style>
    </section>
  )
}

export default HeroSection