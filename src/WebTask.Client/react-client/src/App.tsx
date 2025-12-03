import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../lib/auth-context'
import { ThemeProvider } from '../lib/theme-context'
import Header from '../components/landing/header'
import Hero from '../components/landing/hero'
import Features from '../components/landing/features'
import Capabilities from '../components/landing/capabilities'
import Testimonials from '../components/landing/testimonials'
import CTA from '../components/landing/cta'
import Footer from '../components/landing/footer'
import UserLayout from '../components/user-layout'
import DashboardPage from '../components/dashboard/page'
import ProfilePage from '../components/dashboard/profile/page'
import LoginPage from './components/login-page'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <main className="relative overflow-hidden bg-background">
                <Header />
                <Hero />
                <Features />
                <Capabilities />
                <Testimonials />
                <CTA />
                <Footer />
              </main>
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes with UserLayout */}
          <Route path="/" element={<UserLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/profile" element={<ProfilePage />} />
            <Route path="projects" element={<div>Projects Page</div>} />
            <Route path="projects/:id" element={<div>Project Detail Page</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
