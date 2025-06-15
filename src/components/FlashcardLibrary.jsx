// "use client"

// import { useState } from "react"
// import { Plus, Search, BookOpen, Calendar, Share2, Trash2, Edit, Play, QrCode } from "lucide-react"

// export default function FlashcardLibrary({ onCreateNew, onStudy }) {
//   const [searchTerm, setSearchTerm] = useState("")

//   const sampleDecks = [
//     {
//       id: 1,
//       title: "React Fundamentals",
//       description: "Basic concepts of React.js",
//       cardCount: 15,
//       createdAt: "2024-01-15",
//       lastStudied: "2024-01-20",
//       category: "Programming",
//     },
//     {
//       id: 2,
//       title: "JavaScript ES6+",
//       description: "Modern JavaScript features",
//       cardCount: 23,
//       createdAt: "2024-01-10",
//       lastStudied: "2024-01-18",
//       category: "Programming",
//     },
//     {
//       id: 3,
//       title: "Biology Chapter 5",
//       description: "Cell structure and functions",
//       cardCount: 31,
//       createdAt: "2024-01-08",
//       lastStudied: "2024-01-19",
//       category: "Science",
//     },
//   ]

//   const filteredDecks = sampleDecks.filter(
//     (deck) =>
//       deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       deck.description.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               My Flashcard Library
//             </h1>
//             <p className="text-gray-600 text-lg mt-2">Manage and study your flashcard collections</p>
//           </div>
//           <button
//             onClick={onCreateNew}
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
//           >
//             <Plus className="w-5 h-5" />
//             Create New Deck
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search your flashcard decks..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-base"
//             />
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100">Total Decks</p>
//                 <p className="text-3xl font-bold">{sampleDecks.length}</p>
//               </div>
//               <BookOpen className="w-12 h-12 text-blue-200" />
//             </div>
//           </div>
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100">Total Cards</p>
//                 <p className="text-3xl font-bold">{sampleDecks.reduce((sum, deck) => sum + deck.cardCount, 0)}</p>
//               </div>
//               <Calendar className="w-12 h-12 text-green-200" />
//             </div>
//           </div>
//           <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100">Study Streak</p>
//                 <p className="text-3xl font-bold">7 days</p>
//               </div>
//               <Play className="w-12 h-12 text-purple-200" />
//             </div>
//           </div>
//         </div>

//         {/* Flashcard Decks Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDecks.map((deck) => (
//             <div
//               key={deck.id}
//               className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
//             >
//               <div className="p-6 space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-1">
//                     <h3 className="text-xl font-semibold text-blue-800">{deck.title}</h3>
//                     <p className="text-gray-600 text-sm">{deck.description}</p>
//                   </div>
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
//                     {deck.category}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{deck.cardCount} cards</span>
//                   <span>Created {deck.createdAt}</span>
//                 </div>
//                 <div className="text-sm text-gray-600">Last studied: {deck.lastStudied}</div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 pt-2">
//                   <button
//                     onClick={() => onStudy?.(deck)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     <Play className="w-4 h-4" />
//                     Study
//                   </button>
//                   <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
//                     <QrCode className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
//                     <Share2 className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredDecks.length === 0 && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-12 text-center">
//             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">No flashcard decks found</h3>
//             <p className="text-gray-500 mb-6">
//               {searchTerm ? "Try adjusting your search terms" : "Create your first flashcard deck to get started"}
//             </p>
//             <button
//               onClick={onCreateNew}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold mx-auto"
//             >
//               <Plus className="w-5 h-5" />
//               Create New Deck
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Calendar,
  Share2,
  Trash2,
  Edit,
  Play,
  QrCode,
} from "lucide-react";
import { supabase } from "../supabase.js";

export default function FlashcardLibrary({ onCreateNew, onStudy }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [decks, setDecks] = useState([]);

  // 🚀 Insert test deck + card only once (optional)
  useEffect(() => {
    const runOnce = localStorage.getItem("test-inserted");
    if (!runOnce) {
      const insertTest = async () => {
      const {
  data: {
    user: { id: userId },
  },
} = await supabase.auth.getUser();

const { data: newDeck, error: deckError } = await supabase
  .from("flashcard_decks")
  .insert([
    {
      title: "Test Deck",
      description: "Testing foreign key",
      user_id: userId,
    },
  ])
  .select()
  .single();



        if (deckError) {
          console.error("Error creating deck:", deckError);
        } else {
          const { error: cardError } = await supabase
            .from("flashcards")
            .insert([
              {
                question: "What is JavaScript?",
                answer: "A programming language used for web development.",
                deck_id: newDeck.id,
              },
            ]);

          if (cardError) {
            console.error("Error inserting flashcard:", cardError);
          } else {
            console.log("✅ Flashcard inserted");
            localStorage.setItem("test-inserted", "true");
            fetchDecks(); // refresh list
          }
        }
      };

      insertTest();
    }
  }, []);

  // 📦 Fetch decks from Supabase
  const fetchDecks = async () => {
    const { data, error } = await supabase
      .from("flashcard_decks")
      .select("*");

    if (error) {
      console.error("❌ Error fetching decks:", error.message);
    } else {
      setDecks(data || []);
    }
  };

  // 🔁 Fetch decks on first render
  useEffect(() => {
    fetchDecks();
  }, []);

  const filteredDecks = decks.filter(
    (deck) =>
      deck.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deck.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Flashcard Library
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Manage and study your flashcard collections
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create New Deck
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your flashcard decks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-base"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Decks</p>
                <p className="text-3xl font-bold">{decks.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Cards</p>
                <p className="text-3xl font-bold">—</p>
              </div>
              <Calendar className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Study Streak</p>
                <p className="text-3xl font-bold">7 days</p>
              </div>
              <Play className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* DECKS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-blue-800">
                      {deck.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {deck.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{deck.cardCount || 0} cards</span>
                  <span>Created {deck.created_at?.split("T")[0]}</span>
                </div>

                <div className="text-sm text-gray-600">
                  Last studied: {deck.lastStudied || "—"}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onStudy?.(deck)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Study
                  </button>
                  <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredDecks.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No flashcard decks found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first flashcard deck to get started"}
            </p>
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create New Deck
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
