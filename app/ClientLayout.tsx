'use client'


import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ParticlesBackground from '@/components/Background/ParticlesBackground'
import ContactForm from '@/components/ContactForm'
import { ContactFormProvider } from './context/ContactFormContext'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContactFormProvider>
            <ParticlesBackground />
            <Navbar />
            <ScrollProgress />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ContactForm />
        </ContactFormProvider>
    )
}