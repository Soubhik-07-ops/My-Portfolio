import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class', // Enable dark mode via .dark class on <html>
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}', // Keep if you might use pages dir
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#60a5fa',    // Tailwind blue-400
                    DEFAULT: '#3b82f6',  // Tailwind blue-500
                    dark: '#1e40af',     // Tailwind blue-900
                },
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
                mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
            },
            spacing: {
                '100': '25rem',  // 25rem = 400px
                '120': '30rem',  // 30rem = 480px
                '150': '37.5rem', // 37.5rem = 600px
            },

        },
    },
    plugins: [],
}

export default config
