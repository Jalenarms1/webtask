"use client"

interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: "🚀",
      title: "Velocity Protocol",
      description: "Accelerate delivery with AI-powered task optimization and smart prioritization.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: "🌐",
      title: "Unified Command",
      description: "Single pane of glass for your entire operation—no more scattered conversations.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: "⚡",
      title: "Real-time Sync",
      description: "Instant updates across all team members. Perfect alignment, every moment.",
      color: "from-indigo-500 to-emerald-500",
    },
    {
      icon: "🔗",
      title: "Ecosystem Ready",
      description: "Connect your favorite tools seamlessly. Your stack, supercharged.",
      color: "from-emerald-500 to-indigo-500",
    },
    {
      icon: "🛡️",
      title: "Zero Compromise Security",
      description: "Military-grade encryption protecting your team's intellectual capital.",
      color: "from-indigo-600 to-indigo-700",
    },
    {
      icon: "⏱️",
      title: "Instant Onboarding",
      description: "Teams productive in minutes, not months. Intuition meets power.",
      color: "from-emerald-600 to-emerald-700",
    },
  ]

  return (
    <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold glow-text mb-4">Built for the Future</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Features designed to eliminate friction and maximize your team's potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-xl border border-border/20 bg-card/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.65 0.28 150 / 0.1) 0%, transparent 80%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
