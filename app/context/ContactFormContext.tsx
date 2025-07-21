'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ContactFormContextType = {
    isOpen: boolean
    open: () => void
    close: () => void
}

const ContactFormContext = createContext<ContactFormContextType | null>(null)

export function ContactFormProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const value = {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }

    return (
        <ContactFormContext.Provider value={value}>
            {children}
        </ContactFormContext.Provider>
    )
}

export function useContactForm() {
    const context = useContext(ContactFormContext)
    if (!context) {
        throw new Error('useContactForm must be used within ContactFormProvider')
    }
    return context
}