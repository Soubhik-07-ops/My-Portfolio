'use client'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PublicationsSection from '@/components/sections/PublicationsSection'
import ContactSection from '@/components/sections/ContactSection'
import BackToTopButton from '@/components/BackToTopButton'
import TechStackSection from '@/components/sections/TechStackSection'

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

      {/* ✉️ Contact Section */}
      <ContactSection />

      <BackToTopButton />
    </main>
  )
}
