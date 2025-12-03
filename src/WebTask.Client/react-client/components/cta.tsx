"use client"

export default function CTA() {
  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative p-12 md:p-16 rounded-2xl border border-border/30 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-emerald-500/5 to-indigo-600/10" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-l from-indigo-600/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold glow-text mb-6">Ready to escape the ordinary?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join visionary teams that have transformed chaos into clarity. Your productivity breakthrough awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-lg border border-emerald-500/50 text-foreground font-semibold hover:bg-emerald-500/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>

            <p className="text-sm text-foreground/50 mt-6">No credit card required. Full access for 14 days.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
