'use client'

import { useState, useEffect } from 'react'
import { isValidEmail } from '@/lib/validation'
import { useContactForm } from '@/app/context/ContactFormContext'

export default function ContactForm() {
    const { isOpen, close } = useContactForm()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        website: ''
    })

    const [errors, setErrors] = useState({ email: '', form: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getFormStyles = () => {
        if (windowSize.width < 640) {
            return {
                container: 'w-full mx-4 max-h-[85vh]',
                padding: 'px-4 py-4',
                textareaRows: 4,
                contentHeight: 'max-h-[calc(85vh-8rem)]'
            }
        } else if (windowSize.width < 1024) {
            return {
                container: 'w-[90%] max-w-2xl max-h-[80vh]',
                padding: 'px-6 py-6',
                textareaRows: 5,
                contentHeight: 'max-h-[calc(80vh-9rem)]'
            }
        } else {
            return {
                container: 'w-[80%] max-w-2xl max-h-[75vh]',
                padding: 'px-8 py-8',
                textareaRows: 6,
                contentHeight: 'max-h-[calc(75vh-10rem)]'
            }
        }
    }

    const { container, padding, textareaRows, contentHeight } = getFormStyles()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({ email: '', form: '' })

        if (formData.website) {
            setIsSubmitting(false)
            return
        }

        if (!isValidEmail(formData.email)) {
            setErrors({
                ...errors,
                email: 'Please enter a valid professional email address (e.g., name@company.com)'
            })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error(await response.text())

            setIsSuccess(true)
            setTimeout(() => close(), 3000)
        } catch (err) {
            setErrors({ ...errors, form: 'Failed to submit. Please try again later.' })
            console.error('Submission error:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
            <div className={`relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl border border-gray-700 shadow-[0_0_60px_rgba(59,130,246,0.3)] ${container} ${padding} flex flex-col transition-all duration-300`}>
                <button
                    onClick={close}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 z-20"
                    aria-label="Close contact form"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className={`overflow-y-auto ${contentHeight} px-1 hide-scrollbar animate-slideUp`}>
                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="currentColor" className="text-green-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-300 mb-6">Thank you for reaching out! I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Let's Work Together</h2>
                            <p className="text-gray-400 mb-6 md:mb-8">Fill out the form below and I'll get back to you soon.</p>

                            {errors.form && (
                                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                                    {errors.form}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pb-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                        Company (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                                        placeholder="Acme Inc."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject*
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Message*
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={textareaRows}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-70' : 'hover:from-blue-500 hover:to-purple-500'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="22" y1="2" x2="11" y2="13" />
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                </svg>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
