"use client"

import { useState } from "react"
import LandingPage from "../components/LandingPage.jsx"
import InputPage from "../components/InputPage.jsx"
import FlashcardViewer from "../components/FlashcardViewer.jsx"
import FlashcardLibrary from "../components/FlashcardLibrary.jsx"

export default function FlashcardApp() {
  const [currentPage, setCurrentPage] = useState("landing") // landing, library, input, viewer
  const [currentDeck, setCurrentDeck] = useState(null)

  const handleGetStarted = () => {
    setCurrentPage("library")
  }

  const handleCreateNew = () => {
    setCurrentPage("input")
  }

  const handleGenerate = () => {
    setCurrentPage("viewer")
  }

  const handleStudy = (deck) => {
    setCurrentDeck(deck)
    setCurrentPage("viewer")
  }

  const handleBackToLibrary = () => {
    setCurrentPage("library")
    setCurrentDeck(null)
  }

  const handleBackToInput = () => {
    setCurrentPage("input")
  }

  return (
    <div>
      {currentPage === "landing" && <LandingPage onGetStarted={handleGetStarted} />}

      {currentPage === "library" && <FlashcardLibrary onCreateNew={handleCreateNew} onStudy={handleStudy} />}

      {currentPage === "input" && <InputPage onGenerate={handleGenerate} />}

      {currentPage === "viewer" && (
        <FlashcardViewer
          flashcards={currentDeck?.flashcards}
          onBack={currentDeck ? handleBackToLibrary : handleBackToInput}
        />
      )}
    </div>
  )
}
