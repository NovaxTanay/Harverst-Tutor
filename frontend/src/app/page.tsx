'use client'

import Link from 'next/link'
import { Sprout, Mic, Globe, Brain, ArrowRight, CheckCircle, Leaf, Volume2 } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
            {/* Header */}
            <header className="relative z-10 px-4 py-6">
                <nav className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white">
                        <Sprout className="w-8 h-8" />
                        <span className="text-2xl font-bold">Harvest Tutor</span>
                    </div>
                    <Link
                        href="/diagnose"
                        className="bg-white text-primary-800 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Start Diagnosis
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative px-4 py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="text-white space-y-6 animate-slide-up">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Your Personal
                                <span className="block text-accent-500">AI Agronomist</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
                                Identify crop diseases instantly. Get expert advice in your language.
                                Protect your harvest with AI-powered guidance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    href="/diagnose"
                                    className="group bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-accent-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm border-2 border-white border-opacity-30 flex items-center justify-center gap-2"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Visual */}
                        <div className="relative">
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl float">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="bg-accent-500 p-3 rounded-full">
                                            <Leaf className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Instant Disease Detection</p>
                                            <p className="text-sm text-green-200">Upload photo & get results</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="bg-accent-500 p-3 rounded-full">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">AI-Powered Explanations</p>
                                            <p className="text-sm text-green-200">Understand why it happened</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="bg-accent-500 p-3 rounded-full">
                                            <Volume2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Voice Guidance</p>
                                            <p className="text-sm text-green-200">Listen in your language</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="px-4 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Farmers Trust Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built specifically for Indian farmers with accessibility and simplicity at its core
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card group hover:border-primary-500 border-2 border-transparent">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Mic className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Voice-First Design</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No reading required. Listen to advice in your local language with clear, simple explanations that anyone can understand.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card group hover:border-primary-500 border-2 border-transparent">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Globe className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Multilingual Support</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Works in English, Hindi, Telugu, Tamil, Bengali, Marathi, and more. Speak your language, we'll understand.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card group hover:border-primary-500 border-2 border-transparent">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Brain className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Educational AI</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Don't just get a diagnosis. Learn why it happened, how to prevent it, and become a better farmer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-4 py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Simple. Fast. Effective.
                        </h2>
                        <p className="text-xl text-gray-600">
                            Get expert advice in 3 easy steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center space-y-4">
                            <div className="bg-gradient-agriculture w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-xl">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Upload Photo</h3>
                            <p className="text-gray-600">
                                Take a clear picture of the affected leaf or plant using your phone camera
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center space-y-4">
                            <div className="bg-gradient-agriculture w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-xl">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">AI Analysis</h3>
                            <p className="text-gray-600">
                                Our AI identifies the disease and understands the cause in seconds
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center space-y-4">
                            <div className="bg-gradient-agriculture w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-xl">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Get Guidance</h3>
                            <p className="text-gray-600">
                                Listen to personalized treatment advice and prevention tips in your language
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                            Try It Now - It's Free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Supported Crops */}
            <section className="px-4 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Supported Crops
                        </h2>
                        <p className="text-xl text-gray-600">
                            Currently supporting major Indian crops
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-6xl mb-4">🍅</div>
                            <h3 className="text-2xl font-bold text-gray-900">Tomato</h3>
                            <p className="text-gray-600 mt-2">10+ disease types</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-6xl mb-4">🥔</div>
                            <h3 className="text-2xl font-bold text-gray-900">Potato</h3>
                            <p className="text-gray-600 mt-2">8+ disease types</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-6xl mb-4">🍎</div>
                            <h3 className="text-2xl font-bold text-gray-900">Apple</h3>
                            <p className="text-gray-600 mt-2">6+ disease types</p>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 mt-8 text-lg">
                        More crops coming soon! 🌾
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20 bg-gradient-agriculture text-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Ready to Protect Your Crops?
                    </h2>
                    <p className="text-xl md:text-2xl text-green-100">
                        Join thousands of farmers using AI to improve their harvest
                    </p>
                    <Link
                        href="/diagnose"
                        className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 shadow-2xl hover:shadow-accent-500/50 transform hover:scale-105"
                    >
                        Start Your Free Diagnosis
                        <ArrowRight className="w-8 h-8" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary-900 text-white px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Sprout className="w-6 h-6" />
                                <span className="text-xl font-bold">Harvest Tutor</span>
                            </div>
                            <p className="text-green-200">
                                Empowering farmers with AI-driven agricultural knowledge and voice-first accessibility.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Features</h3>
                            <ul className="space-y-2 text-green-200">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Disease Detection
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Voice Guidance
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Multilingual Support
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Supported Languages</h3>
                            <p className="text-green-200">
                                English, Hindi, Telugu, Tamil, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-green-700 pt-8 text-center text-green-200">
                        <p>© 2026 Harvest Tutor. Built with ❤️ for Indian farmers.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
