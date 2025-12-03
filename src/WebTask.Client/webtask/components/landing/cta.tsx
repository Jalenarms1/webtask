"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CTA() {
  const router = useRouter()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Project Management?</h2>
        <p className="text-foreground/70 mb-8 text-lg">
          Join hundreds of enterprises managing their most important projects with Nexus.
        </p>
        <Button onClick={() => router.push("/login")} size="lg" className="px-8">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}
