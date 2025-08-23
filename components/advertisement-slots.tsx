"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Zap, Trophy, Sparkles, Crown, Award } from "lucide-react"

export function AdvertisementSlots() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  const ads = [
    {
      id: "1",
      title: "Premium Event Photography",
      description: "Capture your special moments with professional event photography services that bring memories to life.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
      badge: "Featured",
      cta: "Book Session",
      link: "#",
      icon: Star,
      color: "from-[#FFD43B] to-[#FFC300]",
      badgeColor: "bg-gradient-to-r from-[#FFD43B] to-[#FFC300]",
      glowColor: "shadow-[#FFD43B]/30"
    },
    {
      id: "2",
      title: "Elite Event Planning",
      description: "Let our expert team handle every detail of your next corporate or private event with precision and style.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
      badge: "Premium",
      cta: "Get Quote",
      link: "#",
      icon: Zap,
      color: "from-[#00BFFF] to-[#18E0FF]",
      badgeColor: "bg-gradient-to-r from-[#00BFFF] to-[#18E0FF]",
      glowColor: "shadow-[#00BFFF]/30"
    },
    {
      id: "3",
      title: "Custom Awards & Trophies",
      description: "Celebrate achievements with stunning custom trophies and awards designed to honor excellence.",
      image: "https://images.unsplash.com/photo-1567443586168-8ea1532a2e2d?w=600&h=400&fit=crop",
      badge: "Sponsor",
      cta: "Shop Collection",
      link: "#",
      icon: Trophy,
      color: "from-[#FFD43B] via-[#00BFFF] to-[#18E0FF]",
      badgeColor: "bg-gradient-to-r from-[#FFD43B] via-[#00BFFF] to-[#18E0FF]",
      glowColor: "shadow-gradient-rainbow"
    },
  ]

  return (
    <div className="min-h-screen bg-[#0c1838] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-16 w-64 h-64 bg-gradient-to-r from-[#F4C430]/25 to-[#00BFFF]/25 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-l from-[#00BFFF]/20 to-[#F4C430]/20 rounded-full blur-3xl animate-pulse delay-1200"></div>
        <div className="absolute top-2/3 left-1/4 w-96 h-96 bg-gradient-conic from-[#F4C430]/10 via-[#00BFFF]/10 to-[#F4C430]/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 relative" key={`header-${animationKey}`}>
            <div className="inline-block relative mb-8">
              <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-[#F4C430] via-[#00BFFF] to-[#00BFFF] bg-clip-text text-transparent mb-6 animate-gradient-x tracking-tight">
                Premium Partners
              </h2>
              <div className="absolute -inset-6 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 blur-xl rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#F4C430] to-transparent"></div>
              <div className="p-3 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-xl">
                <Crown className="w-6 h-6 text-[#F4C430]" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent"></div>
            </div>

            <p className="text-xl text-[#AEB4BB] max-w-3xl mx-auto leading-relaxed">
              Discover premium services from our trusted partners to enhance your event experience with excellence
            </p>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" key={`cards-${animationKey}`}>
            {ads.map((ad, index) => {
              const Icon = ad.icon

              return (
                <Card
                  key={ad.id}
                  className="bg-[#162855]/90 backdrop-blur-xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-700 transform hover:scale-105 hover:-translate-y-3 group cursor-pointer overflow-hidden relative shadow-2xl hover:shadow-[#00BFFF]/20"
                  onMouseEnter={() => setHoveredCard(ad.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: `fadeInUp 0.8s ease-out forwards`
                  }}
                >
                  {/* Glowing Border Effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${ad.color} opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700`}></div>

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${ad.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>

                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={ad.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"}
                      alt={ad.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Advanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1838]/90 via-[#0c1838]/30 to-transparent" />

                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-4 left-4 w-1 h-1 bg-[#F4C430] rounded-full animate-ping"></div>
                      <div className="absolute top-8 right-8 w-1 h-1 bg-[#00BFFF] rounded-full animate-ping delay-300"></div>
                      <div className="absolute bottom-12 left-8 w-1 h-1 bg-[#00BFFF] rounded-full animate-ping delay-500"></div>
                    </div>

                    {/* Enhanced Badge */}
                    <div className="absolute top-6 left-6">
                      <Badge className={`${ad.badgeColor} text-[#0c1838] font-bold px-4 py-2 shadow-xl backdrop-blur-sm border-0 animate-pulse`}>
                        <Sparkles className="w-3 h-3 mr-1" />
                        {ad.badge}
                      </Badge>
                    </div>

                    {/* Enhanced Icon */}
                    <div className="absolute top-6 right-6">
                      <div className={`bg-[#162855]/80 backdrop-blur-lg rounded-full p-3 border border-[#1e3a8a]/50 group-hover:border-[#F4C430]/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${ad.glowColor} group-hover:shadow-lg`}>
                        <Icon className="w-5 h-5 text-[#F4C430] group-hover:text-[#FFD43B] transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Premium Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#F4C430] to-[#00BFFF] rounded-full"></div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F4C430] transition-colors duration-300">
                        {ad.title}
                      </h3>
                    </div>

                    <p className="text-[#AEB4BB] text-sm mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {ad.description}
                    </p>

                    <Button
                      className={`w-full h-12 bg-gradient-to-r from-[#1e3a8a] to-[#162855] border border-[#1e3a8a] text-[#AEB4BB] hover:bg-gradient-to-r hover:${ad.color} hover:text-[#0c1838] hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:${ad.glowColor} hover:shadow-lg font-semibold relative overflow-hidden group/button ${hoveredCard === ad.id ? 'animate-pulse' : ''
                        }`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {ad.cta}
                        <ExternalLink className="ml-3 w-4 h-4 group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                    </Button>
                  </CardContent>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl ${ad.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700 transform rotate-45 translate-x-4 translate-y-4`}></div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Enhanced Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-6 p-6 bg-[#162855]/80 backdrop-blur-xl rounded-2xl border border-[#1e3a8a]/30 hover:border-[#00BFFF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFFF]/20">
              <div className="p-4 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-xl">
                <Award className="w-8 h-8 text-[#F4C430]" />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold text-white mb-1">Become a Partner</h4>
                <p className="text-[#AEB4BB]">Join our network of premium service providers</p>
              </div>
              <Button className="bg-gradient-to-r from-[#F4C430] to-[#FFD43B] text-[#0c1838] font-bold hover:from-[#FFD43B] hover:to-[#F4C430] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F4C430]/30 px-8">
                Learn More
              </Button>
            </div>
          </div>
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
      animation: spin-slow 25s linear infinite;
    }
  `}</style>
    </div>

  )
}