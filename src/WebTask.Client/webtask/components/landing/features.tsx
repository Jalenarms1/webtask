export default function Features() {
  const features = [
    {
      title: "Cross-Organization Collaboration",
      description: "Invite partners and clients directly into projects with customizable access levels",
      icon: "🔗",
    },
    {
      title: "Real-time Synchronization",
      description: "All teams see updates instantly with conflict-free collaborative editing",
      icon: "⚡",
    },
    {
      title: "Advanced Permissions",
      description: "Granular role-based access control for enterprise security compliance",
      icon: "🔒",
    },
    {
      title: "Integrated Workflows",
      description: "Connect your entire toolkit with powerful API and webhook support",
      icon: "🔄",
    },
    {
      title: "Comprehensive Analytics",
      description: "Track project velocity, team capacity, and delivery metrics across organizations",
      icon: "📊",
    },
    {
      title: "Compliance Ready",
      description: "SOC 2 Type II certified with audit trails and data governance controls",
      icon: "✓",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Everything you need for enterprise-grade project collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
