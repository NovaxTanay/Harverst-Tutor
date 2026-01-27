'use client'

import { Play, Pause, Volume2, Download, RotateCcw, RotateCw } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
    audioBase64: string
    language: string
    text: string
}

export default function AudioPlayer({ audioBase64, language, text }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const audioSrc = `data:audio/mp3;base64,${audioBase64}`

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const togglePlayPause = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }

    const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value)
        if (audioRef.current) {
            audioRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const skip = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
        }
    }

    const downloadAudio = () => {
        const link = document.createElement('a')
        link.href = audioSrc
        link.download = `harvest-tutor-${language}-advice.mp3`
        link.click()
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-xl p-6 space-y-6">
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
            />

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-3 rounded-full">
                    <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900">Voice Guidance</h3>
                    <p className="text-sm text-gray-600">Listen in {language}</p>
                </div>
            </div>

            {/* Waveform Visualization (Simplified) */}
            <div className="relative">
                <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-600 transition-all duration-100"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    aria-label="Seek audio"
                />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                {/* Rewind 10s */}
                <button
                    onClick={() => skip(-10)}
                    className="p-3 hover:bg-white rounded-full transition-all duration-200"
                    aria-label="Rewind 10 seconds"
                    title="Rewind 10 seconds"
                >
                    <RotateCcw className="w-5 h-5 text-gray-700" />
                </button>

                {/* Play/Pause */}
                <button
                    onClick={togglePlayPause}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8" fill="currentColor" />
                    ) : (
                        <Play className="w-8 h-8" fill="currentColor" />
                    )}
                </button>

                {/* Forward 10s */}
                <button
                    onClick={() => skip(10)}
                    className="p-3 hover:bg-white rounded-full transition-all duration-200"
                    aria-label="Forward 10 seconds"
                    title="Forward 10 seconds"
                >
                    <RotateCw className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #2e7d32 0%, #2e7d32 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`
                    }}
                    aria-label="Volume control"
                />
                <span className="text-sm text-gray-600 w-12">{Math.round(volume * 100)}%</span>
            </div>

            {/* Download Button */}
            <button
                onClick={downloadAudio}
                className="w-full bg-white hover:bg-gray-50 text-primary-700 font-semibold py-3 px-6 rounded-lg border-2 border-primary-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
                <Download className="w-5 h-5" />
                Download Audio
            </button>
        </div>
    )
}
