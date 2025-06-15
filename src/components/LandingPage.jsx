"use client"

import {
  Upload,
  FileText,
  ImageIcon,
  Youtube,
  Mic,
  Palette,
  ArrowRight,
  BookOpen,
  Brain,
  Share2,
  Zap,
  CheckCircle,
  Play,
  QrCode,
} from "lucide-react"

export default function LandingPage({ onGetStarted }) {
  const inputMethods = [
    {
      icon: FileText,
      title: "Text & Notes",
      description: "Paste your study materials or lecture notes",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Upload,
      title: "Documents",
      description: "Upload PDF, DOCX, or TXT files",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: ImageIcon,
      title: "Images & OCR",
      description: "Extract text from photos and screenshots",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Youtube,
      title: "YouTube Videos",
      description: "Generate cards from video transcripts",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Mic,
      title: "Audio Files",
      description: "Transcribe recordings into flashcards",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Palette,
      title: "Hand Drawings",
      description: "Draw diagrams and convert to cards",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Choose Your Input",
      description:
        "Select from 6 different ways to input your study material - text, files, images, videos, audio, or drawings.",
      icon: Upload,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "02",
      title: "AI Generates Cards",
      description:
        "Our advanced AI powered by Google Gemini analyzes your content and creates intelligent flashcards in seconds.",
      icon: Brain,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "03",
      title: "Study & Practice",
      description:
        "Review your flashcards with our interactive viewer. Switch between review mode and quiz mode for better learning.",
      icon: BookOpen,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "04",
      title: "Share & Export",
      description:
        "Generate QR codes to share your decks or export them for offline study. Track your progress over time.",
      icon: Share2,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate comprehensive flashcards in seconds, not hours",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Google Gemini AI creates intelligent, contextual questions",
    },
    {
      icon: Upload,
      title: "Multiple Formats",
      description: "Support for text, PDFs, images, videos, audio, and drawings",
    },
    {
      icon: QrCode,
      title: "Easy Sharing",
      description: "Share your flashcard decks with QR codes instantly",
    },
    {
      icon: BookOpen,
      title: "Smart Study Modes",
      description: "Review and quiz modes with progress tracking",
    },
    {
      icon: CheckCircle,
      title: "No Limits",
      description: "Create unlimited flashcard decks and study sessions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Flashcard Generator
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Transform any content into interactive flashcards with AI. Upload text, documents, images, videos,
                audio, or drawings - and let our smart AI create perfect study cards in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                Start Creating Flashcards
              </button>
              <p className="text-gray-500 text-sm">No account required • Free to use</p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Input Methods Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-blue-800">6 Ways to Create Flashcards</h2>
          <p className="text-xl text-gray-600">Choose the input method that works best for your study material</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inputMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-blue-100 p-8 text-center space-y-4 hover:shadow-2xl transition-all hover:scale-105"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold text-blue-800">How It Works</h2>
            <p className="text-xl text-gray-600">From content to flashcards in 4 simple steps</p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-blue-800">{step.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Arrow (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block">
                      <ArrowRight className="w-8 h-8 text-blue-400" />
                    </div>
                  )}

                  {/* Image */}
                  <div className="flex-1">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-100 overflow-hidden">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-blue-800">Why Choose Our AI Flashcard Generator?</h2>
          <p className="text-xl text-gray-600">Powerful features designed for effective learning</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8 space-y-4 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Transform Your Study Experience?</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Join thousands of students who are already using AI to create better flashcards and improve their learning
            outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Get Started Now
            </button>
            <p className="text-blue-200 text-sm">✨ Completely free • No registration required</p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="bg-white/80 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">6</p>
              <p className="text-gray-600">Input Methods</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">∞</p>
              <p className="text-gray-600">Unlimited Cards</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">AI</p>
              <p className="text-gray-600">Powered by Gemini</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">Free</p>
              <p className="text-gray-600">Always Free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
