// "use client"

// import { useState, useRef } from "react"
// import { Upload, FileText, ImageIcon, Youtube, Mic, Palette, ArrowRight } from "lucide-react"
// import DrawingCanvas from "./DrawingCanvas.jsx"

// export default function InputPage({ onGenerate }) {
//   const [activeTab, setActiveTab] = useState("text")
//   const [textInput, setTextInput] = useState("")
//   const [youtubeUrl, setYoutubeUrl] = useState("")
//   const [drawingData, setDrawingData] = useState(null)
//   const [isGenerating, setIsGenerating] = useState(false)
//   const fileInputRef = useRef(null)

//   const inputTabs = [
//     { id: "text", label: "Text", icon: FileText },
//     { id: "file", label: "Files", icon: Upload },
//     { id: "image", label: "Image", icon: ImageIcon },
//     { id: "youtube", label: "YouTube", icon: Youtube },
//     { id: "audio", label: "Audio", icon: Mic },
//     { id: "draw", label: "Draw", icon: Palette },
//   ]

//   const handleGenerate = async () => {
//     setIsGenerating(true)
//     // Simulate API call
//     setTimeout(() => {
//       setIsGenerating(false)
//       onGenerate?.()
//     }, 2000)
//   }

//   const handleDrawingSave = (dataURL) => {
//     setDrawingData(dataURL)
//     console.log("Drawing saved:", dataURL)
//     // Here you would typically upload to Supabase Storage
//     // and then send to your FastAPI backend for OCR processing
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Create New Flashcards
//           </h1>
//           <p className="text-gray-600 text-lg">Choose your input method and let AI generate flashcards</p>
//         </div>

//         {/* Main Input Card */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-2xl font-bold text-white">Select Input Method</h2>
//           </div>

//           <div className="p-8 space-y-8">
//             {/* Tab Navigation */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {inputTabs.map((tab) => {
//                 const Icon = tab.icon
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex flex-col items-center gap-3 p-6 rounded-xl text-sm font-medium transition-all ${
//                       activeTab === tab.id
//                         ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
//                         : "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-102 border border-blue-200"
//                     }`}
//                   >
//                     <Icon className="w-8 h-8" />
//                     {tab.label}
//                   </button>
//                 )
//               })}
//             </div>

//             {/* Tab Content */}
//             <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
//               {activeTab === "text" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">Paste Your Text</h3>
//                   <textarea
//                     placeholder="Paste your study material, notes, or any text content here..."
//                     value={textInput}
//                     onChange={(e) => setTextInput(e.target.value)}
//                     className="w-full min-h-48 p-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-base resize-none"
//                   />
//                   <p className="text-blue-600 text-sm">
//                     💡 Tip: Longer texts work better for generating comprehensive flashcards
//                   </p>
//                 </div>
//               )}

//               {activeTab === "file" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">Upload Documents</h3>
//                   <div
//                     className="border-3 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-white"
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <Upload className="w-16 h-16 text-blue-500 mx-auto mb-6" />
//                     <p className="text-blue-700 font-semibold text-lg mb-2">Drop files here or click to browse</p>
//                     <p className="text-blue-500">PDF, DOCX, TXT files supported</p>
//                     <p className="text-gray-500 text-sm mt-2">Max file size: 10MB</p>
//                     <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.txt" multiple />
//                   </div>
//                 </div>
//               )}

//               {activeTab === "image" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">Upload Image for OCR</h3>
//                   <div className="border-3 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-white">
//                     <ImageIcon className="w-16 h-16 text-blue-500 mx-auto mb-6" />
//                     <p className="text-blue-700 font-semibold text-lg mb-2">Upload image with text</p>
//                     <p className="text-blue-500">JPG, PNG, WEBP supported</p>
//                     <p className="text-gray-500 text-sm mt-2">We'll extract text using OCR technology</p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "youtube" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">YouTube Video</h3>
//                   <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
//                     <input
//                       type="url"
//                       placeholder="https://youtube.com/watch?v=..."
//                       value={youtubeUrl}
//                       onChange={(e) => setYoutubeUrl(e.target.value)}
//                       className="w-full p-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-base"
//                     />
//                     <p className="text-blue-600 text-sm mt-3">
//                       📺 We'll extract the transcript and create flashcards from the video content
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "audio" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">Upload Audio File</h3>
//                   <div className="border-3 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-white">
//                     <Mic className="w-16 h-16 text-blue-500 mx-auto mb-6" />
//                     <p className="text-blue-700 font-semibold text-lg mb-2">Upload audio recording</p>
//                     <p className="text-blue-500">MP3, WAV, M4A supported</p>
//                     <p className="text-gray-500 text-sm mt-2">We'll transcribe and generate flashcards</p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "draw" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-blue-800">Drawing Pad</h3>
//                   <DrawingCanvas onSave={handleDrawingSave} />
//                   {drawingData && (
//                     <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
//                       <p className="text-green-800 font-semibold">✅ Drawing saved successfully!</p>
//                       <p className="text-green-600 text-sm">Your drawing will be processed for text extraction.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Generate Button */}
//             <div className="pt-4">
//               <button
//                 onClick={handleGenerate}
//                 disabled={isGenerating}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
//               >
//                 {isGenerating ? (
//                   <>
//                     <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Generating Flashcards with AI...
//                   </>
//                 ) : (
//                   <>
//                     Generate Flashcards
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useRef } from "react"
import { Upload, FileText, ImageIcon, Youtube, Mic, Palette, ArrowRight } from "lucide-react"
import DrawingCanvas from "./DrawingCanvas.jsx"
import FlashcardViewer from "./FlashcardViewer.jsx";
export default function InputPage() {
  const [activeTab, setActiveTab] = useState("text")
  const [textInput, setTextInput] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [drawingData, setDrawingData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [showViewer, setShowViewer] = useState(false);
  const fileInputRef = useRef(null)

  const inputTabs = [
    { id: "text", label: "Text", icon: FileText },
    { id: "file", label: "Files", icon: Upload },
    { id: "image", label: "Image", icon: ImageIcon },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "audio", label: "Audio", icon: Mic },
    { id: "draw", label: "Draw", icon: Palette },
  ]

 const handleGenerate = async () => {
  if (!textInput.trim()) return;

  setIsGenerating(true);
  try {
    const response = await fetch("http://localhost:8000/generate-flashcard/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: textInput,
        source_type: activeTab
      })
    });

    if (!response.ok) throw new Error("Failed to generate flashcards");

    const data = await response.json();
    setFlashcards(data.data || []);
    setShowViewer(true);
  } catch (error) {
    console.error("Error generating flashcards:", error);
  } finally {
    setIsGenerating(false);
  }
};

  const handleDrawingSave = (dataURL) => {
    setDrawingData(dataURL)
    console.log("Drawing saved:", dataURL)
  }
  if (showViewer) {
  return <FlashcardViewer flashcards={flashcards} onBack={() => setShowViewer(false)} />
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create New Flashcards
          </h1>
          <p className="text-gray-600 text-lg">Choose your input method and let AI generate flashcards</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Select Input Method</h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {inputTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-102 border border-blue-200"
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              {activeTab === "text" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-800">Paste Your Text</h3>
                  <textarea
                    placeholder="Paste your study material, notes, or any text content here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full min-h-48 p-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-base resize-none"
                  />
                  <p className="text-blue-600 text-sm">
                    💡 Tip: Longer texts work better for generating comprehensive flashcards
                  </p>
                </div>
              )}
              {/* Add other tab content similarly */}
            </div>

            <div className="pt-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !textInput.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Flashcards with AI...
                  </>
                ) : (
                  <>
                    Generate Flashcards
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            

            {flashcards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.map((card, idx) => (
                  <div key={idx} className="bg-white border border-blue-200 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-blue-800 text-lg mb-2">Q: {card.question}</h4>
                    <p className="text-gray-700">A: {card.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  )
}
