'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sprout, Loader2, AlertCircle, CheckCircle2, Home, Volume2, Play } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import AudioPlayer from '@/components/AudioPlayer'
import { predictDisease, getExplanation, generateVoice } from '@/lib/api'

const CROPS = [
    { name: 'Tomato', icon: '🍅', color: 'from-red-500 to-red-600' },
    { name: 'Potato', icon: '🥔', color: 'from-yellow-600 to-yellow-700' },
    { name: 'Apple', icon: '🍎', color: 'from-green-500 to-green-600' },
]

const LANGUAGES = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
    { name: 'Telugu', code: 'te', flag: '🇮🇳' },
    { name: 'Tamil', code: 'ta', flag: '🇮🇳' },
    { name: 'Bengali', code: 'bn', flag: '🇮🇳' },
    { name: 'Marathi', code: 'mr', flag: '🇮🇳' },
]

type AnalysisState = 'idle' | 'predicting' | 'explaining' | 'generating-voice' | 'complete' | 'error'

export default function DiagnosePage() {
    const [selectedCrop, setSelectedCrop] = useState<string>('Tomato')
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [analysisState, setAnalysisState] = useState<AnalysisState>('idle')
    const [disease, setDisease] = useState<string>('')
    const [confidence, setConfidence] = useState<number>(0)
    const [explanation, setExplanation] = useState<string>('')
    const [audioBase64, setAudioBase64] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleImageSelect = (file: File) => {
        setSelectedImage(file)
        // Reset previous results
        setAnalysisState('idle')
        setDisease('')
        setExplanation('')
        setAudioBase64('')
        setError('')
    }

    const handleClearImage = () => {
        setSelectedImage(null)
        setAnalysisState('idle')
        setDisease('')
        setExplanation('')
        setAudioBase64('')
        setError('')
    }

    const handleAnalyze = async () => {
        if (!selectedImage) {
            setError('Please upload an image first')
            return
        }

        try {
            // Step 1: Predict disease
            setAnalysisState('predicting')
            setError('')

            const predictionResult = await predictDisease(selectedImage, selectedCrop)

            if (!predictionResult.success || !predictionResult.disease) {
                throw new Error(predictionResult.error || 'Failed to predict disease')
            }

            setDisease(predictionResult.disease)
            setConfidence(predictionResult.confidence || 0)

            // Step 2: Get explanation
            setAnalysisState('explaining')

            const explanationResult = await getExplanation(
                selectedCrop,
                predictionResult.disease,
                selectedLanguage
            )

            if (!explanationResult.success || !explanationResult.explanation) {
                throw new Error(explanationResult.error || 'Failed to get explanation')
            }

            setExplanation(explanationResult.explanation)

            // Step 3: Generate voice
            setAnalysisState('generating-voice')

            const voiceResult = await generateVoice(
                explanationResult.explanation,
                selectedLanguage
            )

            if (!voiceResult.success) {
                // Voice generation failed, but we can still show results
                console.warn('Voice generation failed:', voiceResult.error)
                setAudioBase64('') // No audio available
            } else if (voiceResult.audioBase64) {
                setAudioBase64(voiceResult.audioBase64)
            } else {
                // No base64 audio, will use Web Speech API
                setAudioBase64('')
            }

            setAnalysisState('complete')

        } catch (err) {
            console.error('Analysis error:', err)
            setError(err instanceof Error ? err.message : 'An error occurred during analysis')
            setAnalysisState('error')
        }
    }

    const getLoadingMessage = () => {
        switch (analysisState) {
            case 'predicting':
                return 'Analyzing crop image...'
            case 'explaining':
                return 'Getting expert explanation...'
            case 'generating-voice':
                return 'Generating voice guidance...'
            default:
                return 'Processing...'
        }
    }

    const getConfidenceColor = (conf: number) => {
        if (conf >= 0.8) return 'text-green-600 bg-green-100'
        if (conf >= 0.6) return 'text-yellow-600 bg-yellow-100'
        return 'text-red-600 bg-red-100'
    }

    const isLoading = ['predicting', 'explaining', 'generating-voice'].includes(analysisState)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-gradient-agriculture shadow-lg">
                <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                        <Home className="w-6 h-6" />
                        <span className="text-xl font-bold hidden sm:inline">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <Sprout className="w-8 h-8" />
                        <span className="text-2xl font-bold">Harvest Tutor</span>
                    </div>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Crop Disease Diagnosis
                    </h1>
                    <p className="text-xl text-gray-600">
                        Upload a photo and get instant AI-powered analysis
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Input Section */}
                    <div className="space-y-6">
                        {/* Crop Selection */}
                        <div className="card animate-slide-up">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Select Crop
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {CROPS.map((crop) => (
                                    <button
                                        key={crop.name}
                                        onClick={() => setSelectedCrop(crop.name)}
                                        className={`
                      p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                      ${selectedCrop === crop.name
                                                ? 'border-primary-600 bg-primary-50 shadow-lg'
                                                : 'border-gray-200 bg-white hover:border-primary-300'
                                            }
                    `}
                                    >
                                        <div className="text-4xl mb-2">{crop.icon}</div>
                                        <div className="font-semibold text-gray-900">{crop.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Selection */}
                        <div className="card animate-slide-up">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Choose Language
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.name}
                                        onClick={() => setSelectedLanguage(lang.name)}
                                        className={`
                      p-3 rounded-lg border-2 transition-all duration-300
                      ${selectedLanguage === lang.name
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-gray-200 bg-white hover:border-primary-300'
                                            }
                    `}
                                    >
                                        <div className="text-2xl mb-1">{lang.flag}</div>
                                        <div className="text-sm font-medium text-gray-900">{lang.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="card animate-slide-up">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                Upload Image
                            </h2>
                            <ImageUpload
                                onImageSelect={handleImageSelect}
                                selectedImage={selectedImage}
                                onClear={handleClearImage}
                            />
                        </div>

                        {/* Analyze Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={!selectedImage || isLoading}
                            className={`
                w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3
                ${!selectedImage || isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-agriculture text-white hover:shadow-2xl transform hover:scale-105'
                                }
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    {getLoadingMessage()}
                                </>
                            ) : (
                                <>
                                    <Sprout className="w-6 h-6" />
                                    Analyze Crop
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Column - Results Section */}
                    <div className="space-y-6">
                        {error && (
                            <div className="card bg-red-50 border-2 border-red-200 animate-slide-up">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-red-900 mb-1">Error</h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {disease && (
                            <div className="card animate-slide-up">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Disease Detected</h2>
                                </div>

                                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-4">
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{disease}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Confidence:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getConfidenceColor(confidence)}`}>
                                            {(confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><strong>Crop:</strong> {selectedCrop}</p>
                                    <p><strong>Language:</strong> {selectedLanguage}</p>
                                </div>
                            </div>
                        )}

                        {explanation && (
                            <div className="card animate-slide-up">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Expert Explanation</h2>
                                <div className="prose prose-lg max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {explanation}
                                    </div>
                                </div>
                            </div>
                        )}

                        {audioBase64 && (
                            <div className="animate-slide-up">
                                <AudioPlayer
                                    audioBase64={audioBase64}
                                    language={selectedLanguage}
                                    text={explanation}
                                />
                            </div>
                        )}

                        {/* Web Speech API Fallback when no base64 audio */}
                        {explanation && !audioBase64 && analysisState === 'complete' && (
                            <div className="card animate-slide-up">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-primary-600 p-3 rounded-full">
                                        <Volume2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Voice Guidance</h3>
                                        <p className="text-sm text-gray-600">Click to listen in {selectedLanguage}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const utterance = new SpeechSynthesisUtterance(explanation);
                                        const langCodes: Record<string, string> = {
                                            'English': 'en-US',
                                            'Hindi': 'hi-IN',
                                            'Telugu': 'te-IN',
                                            'Tamil': 'ta-IN',
                                            'Bengali': 'bn-IN',
                                            'Marathi': 'mr-IN',
                                        };
                                        utterance.lang = langCodes[selectedLanguage] || 'en-US';
                                        utterance.rate = 0.9;
                                        speechSynthesis.speak(utterance);
                                    }}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                >
                                    <Play className="w-6 h-6" />
                                    Listen to Explanation
                                </button>
                                <button
                                    onClick={() => speechSynthesis.cancel()}
                                    className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                                >
                                    Stop Audio
                                </button>
                            </div>
                        )}

                        {analysisState === 'idle' && !error && (
                            <div className="card text-center py-12">
                                <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Results will appear here after analysis
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-primary-900 text-white px-4 py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-green-200">
                        © 2026 Harvest Tutor • AI-Powered Agricultural Assistant
                    </p>
                </div>
            </footer>
        </div>
    )
}
