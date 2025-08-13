"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Zap, Trophy } from "lucide-react"

export function AdvertisementSlots() {
  const ads = [
    {
      id: "1",
      title: "Premium Event Photography",
      description: "Capture your special moments with professional event photography services.",
      image: "/placeholder-5op1u.png",
      badge: "Featured",
      cta: "Book Now",
      link: "#",
      icon: Star,
    },
    {
      id: "2",
      title: "Event Planning Services",
      description: "Let our experts handle every detail of your next corporate or private event.",
      image: "/placeholder-ov3q8.png",
      badge: "Premium",
      cta: "Get Quote",
      link: "#",
      icon: Zap,
    },
    {
      id: "3",
      title: "Awards & Recognition",
      description: "Custom trophies and awards for your competitions and achievements.",
      image: "/custom-trophies-awards.png",
      badge: "Sponsor",
      cta: "Shop Now",
      link: "#",
      icon: Trophy,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover premium services from our trusted partners to enhance your event experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => {
            const Icon = ad.icon
            return (
              <Card
                key={ad.id}
                className="glassmorphism border-primary/20 hover:border-accent/50 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ad.image || "/placeholder.svg"}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                      {ad.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="glassmorphism rounded-full p-2">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{ad.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full glassmorphism border-primary/30 hover:border-accent text-foreground hover:text-accent-foreground hover:bg-accent/10 group bg-transparent"
                  >
                    {ad.cta}
                    <ExternalLink className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
