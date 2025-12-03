export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Leading Organizations</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="p-6 rounded-lg border bg-card">
              <p className="text-foreground/70 mb-4">
                "Nexus transformed how we collaborate with our partners. Projects that took months now complete in
                weeks."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">Client Name</p>
                  <p className="text-xs text-foreground/50">Company</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
