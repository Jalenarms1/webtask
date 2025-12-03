export default function Capabilities() {
  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Built for Scale</h2>
            <ul className="space-y-4">
              {[
                "Support for 1000+ team members",
                "Multi-currency invoicing",
                "Custom workflow automation",
                "Advanced reporting & analytics",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-primary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-lg p-8 border">
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded animate-pulse" />
              <div className="h-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
