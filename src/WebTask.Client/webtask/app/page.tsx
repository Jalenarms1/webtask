import Header from "@/components/landing/header"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import Capabilities from "@/components/landing/capabilities"
import Testimonials from "@/components/landing/testimonials"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background">
      <Header />
      <Hero />
      <Features />
      <Capabilities />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
