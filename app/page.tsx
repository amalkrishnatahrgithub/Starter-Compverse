import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import { CalendarSystem } from "@/components/calendar-system"
import { EventsGallery } from "@/components/events-gallery"
import { AdvertisementSlots } from "@/components/advertisement-slots"
import Footer from "@/components/Footer";
import AdsAndSocialComponent from "@/components/ad-post"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AdsAndSocialComponent />
      <CalendarSystem />
      <EventsGallery />
      <AdvertisementSlots />
      <Footer />
    </main>
  )
}
