'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ContactForm from '@/components/ContactForm'
import { ContactFormProvider } from './context/ContactFormContext'
import ParticleBackground from '@/components/Background/PartcilesBg'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContactFormProvider>
            <ParticleBackground />

            <Navbar />
            <ScrollProgress />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ContactForm />
        </ContactFormProvider>
    )
}