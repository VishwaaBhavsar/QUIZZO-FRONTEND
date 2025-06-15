"use client"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Share2,
  Download,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function FlashcardViewer({ flashcards, onBack }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyMode, setStudyMode] = useState("review") // review, quiz
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const sampleFlashcards = flashcards || [
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript that looks similar to XML or HTML" },
    {
      id: 3,
      question: "What is a component in React?",
      answer: "A reusable piece of UI that can accept props and return JSX",
    },
  ]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % sampleFlashcards.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + sampleFlashcards.length) % sampleFlashcards.length)
    setShowAnswer(false)
  }

  const markCorrect = () => {
    setCorrectAnswers((prev) => prev + 1)
    nextCard()
  }

  const markWrong = () => {
    setWrongAnswers((prev) => prev + 1)
    nextCard()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Input
            </button>
            <div>
              <h1 className="text-3xl font-bold text-blue-800">Study Session</h1>
              <p className="text-gray-600">
                Card {currentCard + 1} of {sampleFlashcards.length}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStudyMode(studyMode === "review" ? "quiz" : "review")}
              className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {studyMode === "review" ? "Quiz Mode" : "Review Mode"}
            </button>
            <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full p-1 shadow-lg">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentCard + 1) / sampleFlashcards.length) * 100}%` }}
          ></div>
        </div>

        {/* Stats (Quiz Mode) */}
        {studyMode === "quiz" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl shadow-lg border border-green-200 p-4 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-800">{correctAnswers}</p>
                <p className="text-green-600 text-sm">Correct</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl shadow-lg border border-red-200 p-4 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-800">{wrongAnswers}</p>
                <p className="text-red-600 text-sm">Wrong</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Flashcard */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100 p-8">
          <div
            className={`bg-gradient-to-br ${
              showAnswer ? "from-green-500 to-emerald-600" : "from-blue-500 to-indigo-600"
            } rounded-2xl p-12 text-white min-h-80 flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-102 shadow-2xl`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="text-center space-y-6 max-w-2xl">
              <div className="flex justify-center mb-6">
                {showAnswer ? <EyeOff className="w-12 h-12 opacity-70" /> : <Eye className="w-12 h-12 opacity-70" />}
              </div>
              <h3 className="text-2xl font-semibold opacity-90">{showAnswer ? "Answer" : "Question"}</h3>
              <p className="text-2xl font-bold leading-relaxed">
                {showAnswer ? sampleFlashcards[currentCard].answer : sampleFlashcards[currentCard].question}
              </p>
              <p className="text-lg opacity-70 mt-8">
                {showAnswer ? "Click to show question" : "Click to reveal answer"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevCard}
            disabled={currentCard === 0}
            className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Quiz Mode Actions */}
          {studyMode === "quiz" && showAnswer && (
            <div className="flex gap-4">
              <button
                onClick={markWrong}
                className="flex items-center gap-2 px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Wrong
              </button>
              <button
                onClick={markCorrect}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Correct
              </button>
            </div>
          )}

          {/* Card Indicators */}
          <div className="flex gap-2">
            {sampleFlashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCard(index)
                  setShowAnswer(false)
                }}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentCard ? "bg-blue-600 scale-125" : index < currentCard ? "bg-green-400" : "bg-blue-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            disabled={currentCard === sampleFlashcards.length - 1}
            className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setCurrentCard(0)
              setShowAnswer(false)
              setCorrectAnswers(0)
              setWrongAnswers(0)
            }}
            className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Session
          </button>
        </div>
      </div>
    </div>
  )
}
