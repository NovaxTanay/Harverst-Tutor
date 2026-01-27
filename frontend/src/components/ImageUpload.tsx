'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
    onImageSelect: (file: File) => void
    selectedImage: File | null
    onClear: () => void
}

export default function ImageUpload({ onImageSelect, selectedImage, onClear }: ImageUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }, [])

    const handleFile = (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file')
            return
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB')
            return
        }

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        onImageSelect(file)
    }

    const handleClear = () => {
        setPreview(null)
        onClear()
    }

    return (
        <div className="w-full">
            {!preview ? (
                <div
                    className={`
            relative border-4 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer
            ${dragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-400 bg-white'
                        }
          `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        aria-label="Upload crop image"
                    />

                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center gap-4 cursor-pointer"
                    >
                        <div className="bg-primary-100 p-6 rounded-full">
                            <Upload className="w-12 h-12 text-primary-700" />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-semibold text-gray-900 mb-2">
                                Upload Crop Image
                            </p>
                            <p className="text-gray-600">
                                Drag & drop or <span className="text-primary-700 font-medium">browse</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Supports: JPG, PNG (Max 10MB)
                            </p>
                        </div>
                    </label>
                </div>
            ) : (
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                        onClick={handleClear}
                        className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                        aria-label="Remove image"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative">
                        <img
                            src={preview}
                            alt="Uploaded crop"
                            className="w-full h-auto max-h-96 object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex items-center gap-2 text-white">
                                <ImageIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {selectedImage?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
