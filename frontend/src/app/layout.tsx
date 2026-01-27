import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Harvest Tutor - AI-Powered Crop Disease Advisor',
    description: 'Voice-first agricultural assistant helping farmers identify and treat crop diseases using AI. Multilingual support in English, Hindi, Telugu, and more.',
    keywords: 'agriculture, farming, crop disease, AI, machine learning, voice assistant, multilingual, India',
    authors: [{ name: 'Harvest Tutor Team' }],
    openGraph: {
        title: 'Harvest Tutor - AI-Powered Crop Disease Advisor',
        description: 'Empowering farmers with AI-driven crop disease diagnosis and treatment advice',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌾</text></svg>" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
