import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(168, 85, 247, 0.15) 100px,
              rgba(168, 85, 247, 0.15) 200px
            )`,
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-balance mb-8 leading-none">
          Cross-Org
          <br />
          <span className="gradient-heading animate-neon-glow inline-block mt-4">Project Mastery</span>
        </h1>

        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto text-balance mb-12 font-medium">
          Bring your organizations together. Synchronize workflows, accelerate delivery, and scale collaboration
          effortlessly.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="px-8 text-base font-bold uppercase tracking-wide group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 dark:text-white">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            size="lg"
            className="px-8 text-base font-bold uppercase tracking-wide dark:hover:text-white hover:text-white border-2 border-primary"
          >
            Explore Platform
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 pt-16 border-t border-primary/10">
          <div>
            <p className="text-4xl font-black mb-2">500+</p>
            <p className="text-sm text-foreground/60 font-medium uppercase tracking-wide">Active Organizations</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-2">10K+</p>
            <p className="text-sm text-foreground/60 font-medium uppercase tracking-wide">Daily Collaborations</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-2">99.9%</p>
            <p className="text-sm text-foreground/60 font-medium uppercase tracking-wide">Uptime SLA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
