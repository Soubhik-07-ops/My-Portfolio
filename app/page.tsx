'use client'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PublicationsSection from '@/components/sections/pub&cer/PublicationsSection'
import ContactSection from '@/components/sections/ContactSection'
import BackToTopButton from '@/components/BackToTopButton'
import TechStackSection from '@/components/sections/TechStackSection'
import LeetCodeDashboard from '@/components/sections/LeetCodeStats'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* 🧑‍🚀 Hero Section */}
      <HeroSection />

      {/* 🧠 About Section */}
      <section id="about">
        <AboutSection />
        <TechStackSection />
      </section>

      {/* 🚀 Projects Section */}
      <ProjectsSection />

      {/* 📚 Publications Section */}
      <PublicationsSection />

      <LeetCodeDashboard />

      {/* ✉️ Contact Section
      <ContactSection /> */}


      <BackToTopButton />
    </main>
  )
}
