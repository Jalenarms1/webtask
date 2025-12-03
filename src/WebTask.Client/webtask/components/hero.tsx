"use client"

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-block">
          <span className="text-sm font-medium text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-1 backdrop-blur-sm">
            ✨ Beyond Boundaries
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
          Navigate Your
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            Work Universe
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Orbit empowers distributed teams to escape chaos. Streamline workflows, synchronize efforts, and reach peak
          productivity across every dimension.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105">
            Launch Now
          </button>
          <button className="px-8 py-4 rounded-lg border border-emerald-500/30 text-foreground font-semibold hover:bg-emerald-500/10 transition-all duration-300">
            See Demo
          </button>
        </div>

        {/* Hero visualization with floating elements */}
        <div className="relative mt-16 h-96 md:h-[500px] rounded-xl border border-border/20 overflow-hidden backdrop-blur-sm bg-gradient-to-b from-indigo-600/10 via-transparent to-emerald-500/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-indigo-600/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-foreground/30 font-mono text-sm">
              &lt; Command Center &gt;
            </div>
          </div>

          <div className="absolute top-10 left-10 w-32 h-20 bg-card/40 border border-border/30 rounded-lg backdrop-blur-sm p-3 transform -rotate-12 animate-float hover:shadow-lg hover:shadow-indigo-500/20 transition-shadow">
            <div className="text-xs text-foreground/60 mb-2">Total Wins</div>
            <div className="text-2xl font-bold text-emerald-400">42</div>
          </div>

          <div
            className="absolute bottom-20 right-10 w-32 h-20 bg-card/40 border border-border/30 rounded-lg backdrop-blur-sm p-3 transform rotate-12 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-xs text-foreground/60 mb-2">Team Velocity</div>
            <div className="text-2xl font-bold text-indigo-400">9.8x</div>
          </div>

          <div
            className="absolute top-1/2 right-20 w-32 h-20 bg-card/40 border border-border/30 rounded-lg backdrop-blur-sm p-3 transform -rotate-6 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="text-xs text-foreground/60 mb-2">Flow State</div>
            <div className="text-2xl font-bold text-emerald-400">100%</div>
          </div>
        </div>
      </div>
    </section>
  )
}
