
// import React, { useState } from 'react';
// import { BookOpen, Brain, CheckCircle, XCircle, RotateCcw, Loader } from 'lucide-react';

// const QuizGenerator = () => {
//   const [topic, setTopic] = useState('');
//   const [difficulty, setDifficulty] = useState('medium');
//   const [questionCount, setQuestionCount] = useState(5);
//   const [questionType, setQuestionType] = useState('multiple-choice');
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);

//   const generateQuiz = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/generate-quiz', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           topic,
//           difficulty,
//           question_count: questionCount,
//           question_type: questionType
//         }),
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setQuiz(data.quiz);
//         setCurrentQuestion(0);
//         setUserAnswers({});
//         setShowResults(false);
//         setScore(0);
//       } else {
//         console.error('Failed to generate quiz');
//       }
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerSelect = (questionIndex, answer) => {
//     setUserAnswers({
//       ...userAnswers,
//       [questionIndex]: answer
//     });
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     quiz.questions.forEach((question, index) => {
//       if (userAnswers[index] === question.correct_answer) {
//         correctAnswers++;
//       }
//     });
//     setScore(correctAnswers);
//     setShowResults(true);
//   };

//   const resetQuiz = () => {
//     setQuiz(null);
//     setCurrentQuestion(0);
//     setUserAnswers({});
//     setShowResults(false);
//     setScore(0);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   if (showResults) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
//               <p className="text-xl text-gray-600">
//                 You scored {score} out of {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
//               </p>
//             </div>

//             <div className="space-y-6 mb-8">
//               {quiz.questions.map((question, index) => {
//                 const userAnswer = userAnswers[index];
//                 const isCorrect = userAnswer === question.correct_answer;
                
//                 return (
//                   <div key={index} className="border rounded-lg p-6">
//                     <div className="flex items-start gap-3 mb-4">
//                       {isCorrect ? (
//                         <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
//                       ) : (
//                         <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
//                       )}
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 mb-2">
//                           Question {index + 1}: {question.question}
//                         </h3>
//                         <div className="space-y-2">
//                           <p className="text-sm">
//                             <span className="font-medium text-green-700">Correct Answer:</span> {question.correct_answer}
//                           </p>
//                           {userAnswer && userAnswer !== question.correct_answer && (
//                             <p className="text-sm">
//                               <span className="font-medium text-red-700">Your Answer:</span> {userAnswer}
//                             </p>
//                           )}
//                           {question.explanation && (
//                             <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
//                               <span className="font-medium">Explanation:</span> {question.explanation}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-center">
//               <button
//                 onClick={resetQuiz}
//                 className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
//               >
//                 <RotateCcw className="w-5 h-5 mr-2" />
//                 Generate New Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (quiz && !showResults) {
//     const question = quiz.questions[currentQuestion];
//     const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">{quiz.topic}</h2>
//                 <span className="text-sm text-gray-500">
//                   Question {currentQuestion + 1} of {quiz.questions.length}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-purple-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                 {question.question}
//               </h3>

//               <div className="space-y-3">
//                 {question.options.map((option, optionIndex) => (
//                   <button
//                     key={optionIndex}
//                     onClick={() => handleAnswerSelect(currentQuestion, option)}
//                     className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
//                       userAnswers[currentQuestion] === option
//                         ? 'border-purple-500 bg-purple-50'
//                         : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
//                     }`}
//                   >
//                     <span className="font-medium text-gray-900">{option}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-between items-center">
//               <button
//                 onClick={prevQuestion}
//                 disabled={currentQuestion === 0}
//                 className="px-6 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>

//               <div className="flex gap-3">
//                 {currentQuestion < quiz.questions.length - 1 ? (
//                   <button
//                     onClick={nextQuestion}
//                     disabled={!userAnswers[currentQuestion]}
//                     className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     onClick={calculateScore}
//                     disabled={Object.keys(userAnswers).length !== quiz.questions.length}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Finish Quiz
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
//             <Brain className="w-8 h-8 text-purple-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Quiz Generator</h1>
//           <p className="text-xl text-gray-600">Create personalized quizzes on any topic</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <div className="grid md:grid-cols-2 gap-6 mb-8">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Topic
//               </label>
//               <input
//                 type="text"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="e.g., World History, JavaScript, Biology"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Difficulty Level
//               </label>
//               <select
//                 value={difficulty}
//                 onChange={(e) => setDifficulty(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Number of Questions
//               </label>
//               <select
//                 value={questionCount}
//                 onChange={(e) => setQuestionCount(parseInt(e.target.value))}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               >
//                 <option value={5}>5 Questions</option>
//                 <option value={10}>10 Questions</option>
//                 <option value={15}>15 Questions</option>
//                 <option value={20}>20 Questions</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Question Type
//               </label>
//               <select
//                 value={questionType}
//                 onChange={(e) => setQuestionType(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               >
//                 <option value="multiple-choice">Multiple Choice</option>
//                 <option value="true-false">True/False</option>
//                 <option value="mixed">Mixed</option>
//               </select>
//             </div>
//           </div>

//           <div className="text-center">
//             <button
//               onClick={generateQuiz}
//               disabled={!topic.trim() || loading}
//               className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="w-5 h-5 mr-2 animate-spin" />
//                   Generating Quiz...
//                 </>
//               ) : (
//                 <>
//                   <BookOpen className="w-5 h-5 mr-2" />
//                   Generate Quiz
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizGenerator;



// import React, { useState, useRef } from 'react';
// import { BookOpen, Brain, CheckCircle, XCircle, RotateCcw, Loader, Upload, FileText, Image, Video, Link, X, Plus } from 'lucide-react';

// const Quizzes = () => {
//   const [topic, setTopic] = useState('');
//   const [difficulty, setDifficulty] = useState('medium');
//   const [questionCount, setQuestionCount] = useState(5);
//   const [questionType, setQuestionType] = useState('multiple-choice');
//   const [inputType, setInputType] = useState('text'); // text, image, document, video
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);
  
//   // Media input states
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [youtubeLinks, setYoutubeLinks] = useState(['']);
//   const [dragActive, setDragActive] = useState(false);
//   const fileInputRef = useRef(null);

//   const generateQuiz = async () => {
//     setLoading(true);
//     try {
//       let endpoint = 'http://localhost:8000/generate-quiz';
//       let requestData = {
//         difficulty,
//         question_count: questionCount,
//         question_type: questionType
//       };

//       if (inputType === 'text') {
//         requestData.topic = topic;
//       } else if (inputType === 'video') {
//         endpoint = 'http://localhost:8000/generate-quiz-from-video';
//         requestData.youtube_urls = youtubeLinks.filter(link => link.trim());
//       } else if (inputType === 'image' || inputType === 'document') {
//         // For file uploads, we need to use FormData
//         const formData = new FormData();
//         formData.append('difficulty', difficulty);
//         formData.append('question_count', questionCount.toString());
//         formData.append('question_type', questionType);
        
//         uploadedFiles.forEach((file, index) => {
//           formData.append('files', file);
//         });

//         endpoint = inputType === 'image' 
//           ? 'http://localhost:8000/api/image/generate-quiz-from-image'
//           : 'http://localhost:8000/generate-quiz-from-documents';

//         const response = await fetch(endpoint, {
//           method: 'POST',
//           body: formData,
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setQuiz(data.quiz);
//           setCurrentQuestion(0);
//           setUserAnswers({});
//           setShowResults(false);
//           setScore(0);
//         } else {
//           console.error('Failed to generate quiz');
//         }
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setQuiz(data.quiz);
//         setCurrentQuestion(0);
//         setUserAnswers({});
//         setShowResults(false);
//         setScore(0);
//       } else {
//         console.error('Failed to generate quiz');
//       }
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerSelect = (questionIndex, answer) => {
//     setUserAnswers({
//       ...userAnswers,
//       [questionIndex]: answer
//     });
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     quiz.questions.forEach((question, index) => {
//       if (userAnswers[index] === question.correct_answer) {
//         correctAnswers++;
//       }
//     });
//     setScore(correctAnswers);
//     setShowResults(true);
//   };

//   const resetQuiz = () => {
//     setQuiz(null);
//     setCurrentQuestion(0);
//     setUserAnswers({});
//     setShowResults(false);
//     setScore(0);
//     setUploadedFiles([]);
//     setYoutubeLinks(['']);
//     setTopic('');
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   // File upload handlers
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleFiles = (files) => {
//     const newFiles = Array.from(files);
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const removeFile = (index) => {
//     setUploadedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const addYoutubeLink = () => {
//     setYoutubeLinks(prev => [...prev, '']);
//   };

//   const updateYoutubeLink = (index, value) => {
//     setYoutubeLinks(prev => prev.map((link, i) => i === index ? value : link));
//   };

//   const removeYoutubeLink = (index) => {
//     if (youtubeLinks.length > 1) {
//       setYoutubeLinks(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const canGenerateQuiz = () => {
//     switch (inputType) {
//       case 'text':
//         return topic.trim();
//       case 'image':
//       case 'document':
//         return uploadedFiles.length > 0;
//       case 'video':
//         return youtubeLinks.some(link => link.trim());
//       default:
//         return false;
//     }
//   };

//   const getAcceptedFileTypes = () => {
//     if (inputType === 'image') {
//       return 'image/*';
//     } else if (inputType === 'document') {
//       return '.pdf,.doc,.docx,.txt,.md';
//     }
//     return '';
//   };

//   if (showResults) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
//               <p className="text-xl text-gray-600">
//                 You scored {score} out of {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
//               </p>
//             </div>

//             <div className="space-y-6 mb-8">
//               {quiz.questions.map((question, index) => {
//                 const userAnswer = userAnswers[index];
//                 const isCorrect = userAnswer === question.correct_answer;
                
//                 return (
//                   <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                     <div className="flex items-start gap-3 mb-4">
//                       {isCorrect ? (
//                         <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
//                       ) : (
//                         <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
//                       )}
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 mb-2">
//                           Question {index + 1}: {question.question}
//                         </h3>
//                         <div className="space-y-2">
//                           <p className="text-sm">
//                             <span className="font-medium text-green-600">Correct Answer:</span> <span className="text-gray-700">{question.correct_answer}</span>
//                           </p>
//                           {userAnswer && userAnswer !== question.correct_answer && (
//                             <p className="text-sm">
//                               <span className="font-medium text-red-600">Your Answer:</span> <span className="text-gray-700">{userAnswer}</span>
//                             </p>
//                           )}
//                           {question.explanation && (
//                             <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded border border-gray-200">
//                               <span className="font-medium">Explanation:</span> {question.explanation}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-center">
//               <button
//                 onClick={resetQuiz}
//                 className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
//               >
//                 <RotateCcw className="w-5 h-5 mr-2" />
//                 Generate New Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (quiz && !showResults) {
//     const question = quiz.questions[currentQuestion];
//     const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">{quiz.topic || 'Quiz'}</h2>
//                 <span className="text-sm text-gray-500">
//                   Question {currentQuestion + 1} of {quiz.questions.length}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                 {question.question}
//               </h3>

//               <div className="space-y-3">
//                 {question.options.map((option, optionIndex) => (
//                   <button
//                     key={optionIndex}
//                     onClick={() => handleAnswerSelect(currentQuestion, option)}
//                     className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
//                       userAnswers[currentQuestion] === option
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
//                     }`}
//                   >
//                     <span className="font-medium text-gray-900">{option}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-between items-center">
//               <button
//                 onClick={prevQuestion}
//                 disabled={currentQuestion === 0}
//                 className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>

//               <div className="flex gap-3">
//                 {currentQuestion < quiz.questions.length - 1 ? (
//                   <button
//                     onClick={nextQuestion}
//                     disabled={!userAnswers[currentQuestion]}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     onClick={calculateScore}
//                     disabled={Object.keys(userAnswers).length !== quiz.questions.length}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Finish Quiz
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//             <Brain className="w-8 h-8 text-blue-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Quiz Generator</h1>
//           <p className="text-xl text-gray-600">Create personalized quizzes from text, images, documents, or videos</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
//           {/* Input Type Selection */}
//           <div className="mb-8">
//             <label className="block text-sm font-medium text-gray-700 mb-4">
//               Choose Input Type
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { value: 'text', label: 'Text Topic', icon: FileText },
//                 { value: 'image', label: 'Images', icon: Image },
//                 { value: 'document', label: 'Documents', icon: FileText },
//                 { value: 'video', label: 'YouTube', icon: Video }
//               ].map(({ value, label, icon: Icon }) => (
//                 <button
//                   key={value}
//                   onClick={() => setInputType(value)}
//                   className={`p-4 border-2 rounded-lg transition-colors ${
//                     inputType === value
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300 bg-white'
//                   }`}
//                 >
//                   <Icon className={`w-6 h-6 mx-auto mb-2 ${
//                     inputType === value ? 'text-blue-600' : 'text-gray-500'
//                   }`} />
//                   <span className={`text-sm font-medium ${
//                     inputType === value ? 'text-blue-900' : 'text-gray-700'
//                   }`}>{label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Dynamic Input Section */}
//           <div className="mb-8">
//             {inputType === 'text' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Topic
//                 </label>
//                 <input
//                   type="text"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                   placeholder="e.g., World History, JavaScript, Biology"
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             )}

//             {(inputType === 'image' || inputType === 'document') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload {inputType === 'image' ? 'Images' : 'Documents'}
//                 </label>
//                 <div
//                   className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                     dragActive
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-300 hover:border-gray-400 bg-gray-50'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//                   <p className="text-lg font-medium text-gray-900 mb-2">
//                     Drop your {inputType === 'image' ? 'images' : 'documents'} here
//                   </p>
//                   <p className="text-gray-500 mb-4">
//                     or click to browse
//                   </p>
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Choose Files
//                   </button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     accept={getAcceptedFileTypes()}
//                     onChange={handleFileInput}
//                     className="hidden"
//                   />
//                 </div>

//                 {uploadedFiles.length > 0 && (
//                   <div className="mt-4 space-y-2">
//                     <h4 className="text-sm font-medium text-gray-700">
//                       {inputType === 'image' ? 'Uploaded Images:' : 'Uploaded Files:'}
//                     </h4>
//                     {inputType === 'image' ? (
//                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {uploadedFiles.map((file, index) => (
//                           <div key={index} className="relative group">
//                             <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
//                               <img
//                                 src={URL.createObjectURL(file)}
//                                 alt={file.name}
//                                 className="w-full h-full object-cover"
//                               />
//                               <button
//                                 onClick={() => removeFile(index)}
//                                 className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             </div>
//                             <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       uploadedFiles.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
//                           <span className="text-sm text-gray-800 truncate">{file.name}</span>
//                           <button
//                             onClick={() => removeFile(index)}
//                             className="text-red-500 hover:text-red-600 ml-2"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {inputType === 'video' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   YouTube Video URLs
//                 </label>
//                 <div className="space-y-3">
//                   {youtubeLinks.map((link, index) => (
//                     <div key={index} className="flex gap-2">
//                       <div className="flex-1 relative">
//                         <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="url"
//                           value={link}
//                           onChange={(e) => updateYoutubeLink(index, e.target.value)}
//                           placeholder="https://www.youtube.com/watch?v=..."
//                           className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
//                         />
//                       </div>
//                       {youtubeLinks.length > 1 && (
//                         <button
//                           onClick={() => removeYoutubeLink(index)}
//                           className="px-3 py-3 text-red-500 hover:text-red-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button
//                     onClick={addYoutubeLink}
//                     className="inline-flex items-center px-4 py-2 text-blue-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Another URL
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Quiz Configuration */}
//           <div className="grid md:grid-cols-3 gap-6 mb-8">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Difficulty Level
//               </label>
//               <select
//                 value={difficulty}
//                 onChange={(e) => setDifficulty(e.target.value)}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Number of Questions
//               </label>
//               <select
//                 value={questionCount}
//                 onChange={(e) => setQuestionCount(parseInt(e.target.value))}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
//               >
//                 <option value={5}>5 Questions</option>
//                 <option value={10}>10 Questions</option>
//                 <option value={15}>15 Questions</option>
//                 <option value={20}>20 Questions</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Question Type
//               </label>
//               <select
//                 value={questionType}
//                 onChange={(e) => setQuestionType(e.target.value)}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
//               >
//                 <option value="multiple-choice">Multiple Choice</option>
//                 <option value="true-false">True/False</option>
//                 <option value="mixed">Mixed</option>
//               </select>
//             </div>
//           </div>

//           <div className="text-center">
//             <button
//               onClick={generateQuiz}
//               disabled={!canGenerateQuiz() || loading}
//               className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg shadow-lg"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="w-5 h-5 mr-2 animate-spin" />
//                   Generating Quiz...
//                 </>
//               ) : (
//                 <>
//                   <BookOpen className="w-5 h-5 mr-2" />
//                   Generate Quiz
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quizzes;






// chalne vala code
import React, { useState, useRef } from 'react';
import { BookOpen, Brain, CheckCircle, XCircle, RotateCcw, Loader, Upload, FileText, Image, Video, Link, X, Plus } from 'lucide-react';

const Quizzes = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [inputType, setInputType] = useState('text'); // text, image, document, video
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  
  // Media input states
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState(['']);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const generateQuiz = async () => {
    setLoading(true);
    setError('');
    
    try {
      let endpoint = 'http://localhost:8000/generate-quiz';
      let requestData = {
        difficulty,
        question_count: questionCount,
        question_type: questionType
      };

      // Handle different input types
      if (inputType === 'text') {
        requestData.topic = topic;
      } else if (inputType === 'video') {
        endpoint = 'http://localhost:8000/generate-quiz-from-video';
        requestData.youtube_urls = youtubeLinks.filter(link => link.trim());
      } else if (inputType === 'image' || inputType === 'document') {
        // For file uploads, we need to use FormData
        const formData = new FormData();
        formData.append('difficulty', difficulty);
        formData.append('question_count', questionCount.toString());
        formData.append('question_type', questionType);
        
        uploadedFiles.forEach((file, index) => {
          formData.append('files', file);
        });

        endpoint = inputType === 'image' 
          ? 'http://localhost:8000/api/image/generate-quiz-from-image'
          : 'http://localhost:8000/generate-quiz-from-documents';

        // Handle file upload
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Received quiz data:', data);
          
          // Validate quiz data structure
          const quizData = data.quiz || data;
          if (quizData && quizData.questions && Array.isArray(quizData.questions) && quizData.questions.length > 0) {
            setQuiz(quizData);
            setCurrentQuestion(0);
            setUserAnswers({});
            setShowResults(false);
            setScore(0);
          } else {
            setError('Invalid quiz data received from server');
          }
        } else {
          const errorData = await response.text();
          console.error('Failed to generate quiz:', errorData);
          setError(`Failed to generate quiz: ${response.status} ${response.statusText}`);
        }
        return; // Important: return here to avoid the second fetch
      }

      // Handle text and video requests
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received quiz data:', data);
        
        // Validate quiz data structure
        const quizData = data.quiz || data;
        if (quizData && quizData.questions && Array.isArray(quizData.questions) && quizData.questions.length > 0) {
          setQuiz(quizData);
          setCurrentQuestion(0);
          setUserAnswers({});
          setShowResults(false);
          setScore(0);
        } else {
          setError('Invalid quiz data received from server');
        }
      } else {
        const errorData = await response.text();
        console.error('Failed to generate quiz:', errorData);
        setError(`Failed to generate quiz: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setError(`Error generating quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  const calculateScore = () => {
    if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) {
      setError('Invalid quiz data');
      return;
    }
    
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setUploadedFiles([]);
    setYoutubeLinks(['']);
    setTopic('');
    setError('');
  };

  const nextQuestion = () => {
    if (quiz && quiz.questions && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // File upload handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addYoutubeLink = () => {
    setYoutubeLinks(prev => [...prev, '']);
  };

  const updateYoutubeLink = (index, value) => {
    setYoutubeLinks(prev => prev.map((link, i) => i === index ? value : link));
  };

  const removeYoutubeLink = (index) => {
    if (youtubeLinks.length > 1) {
      setYoutubeLinks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const canGenerateQuiz = () => {
    switch (inputType) {
      case 'text':
        return topic.trim();
      case 'image':
      case 'document':
        return uploadedFiles.length > 0;
      case 'video':
        return youtubeLinks.some(link => link.trim());
      default:
        return false;
    }
  };

  const getAcceptedFileTypes = () => {
    if (inputType === 'image') {
      return 'image/*';
    } else if (inputType === 'document') {
      return '.pdf,.doc,.docx,.txt,.md';
    }
    return '';
  };

  // Validate quiz and questions before rendering results
  if (showResults && quiz && quiz.questions && Array.isArray(quiz.questions)) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-xl text-gray-600">
                You scored {score} out of {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {quiz.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-green-600">Correct Answer:</span> <span className="text-gray-700">{question.correct_answer}</span>
                          </p>
                          {userAnswer && userAnswer !== question.correct_answer && (
                            <p className="text-sm">
                              <span className="font-medium text-red-600">Your Answer:</span> <span className="text-gray-700">{userAnswer}</span>
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded border border-gray-200">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Generate New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Validate quiz and questions before rendering quiz interface
  if (quiz && quiz.questions && Array.isArray(quiz.questions) && quiz.questions.length > 0 && !showResults) {
    const question = quiz.questions[currentQuestion];
    
    // Additional safety check for current question
    if (!question) {
      setError('Invalid question data');
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">There was an issue with the quiz data.</p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{quiz.topic || 'Quiz'}</h2>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options && Array.isArray(question.options) ? question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      userAnswers[currentQuestion] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option}</span>
                  </button>
                )) : (
                  <div className="text-red-500">No options available for this question</div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-3">
                {currentQuestion < quiz.questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    disabled={!userAnswers[currentQuestion]}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={calculateScore}
                    disabled={Object.keys(userAnswers).length !== quiz.questions.length}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Finish Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Quiz Generator</h1>
          <p className="text-xl text-gray-600">Create personalized quizzes from text, images, documents, or videos</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Input Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Input Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'text', label: 'Text Topic', icon: FileText },
                { value: 'image', label: 'Images', icon: Image },
                { value: 'document', label: 'Documents', icon: FileText },
                { value: 'video', label: 'YouTube', icon: Video }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setInputType(value)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    inputType === value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    inputType === value ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    inputType === value ? 'text-blue-900' : 'text-gray-700'
                  }`}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Input Section */}
          <div className="mb-8">
            {inputType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., World History, JavaScript, Biology"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            )}

            {(inputType === 'image' || inputType === 'document') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload {inputType === 'image' ? 'Images' : 'Documents'}
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your {inputType === 'image' ? 'images' : 'documents'} here
                  </p>
                  <p className="text-gray-500 mb-4">
                    or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Choose Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={getAcceptedFileTypes()}
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      {inputType === 'image' ? 'Uploaded Images:' : 'Uploaded Files:'}
                    </h4>
                    {inputType === 'image' ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-800 truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-600 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {inputType === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Video URLs
                </label>
                <div className="space-y-3">
                  {youtubeLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 relative">
                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => updateYoutubeLink(index, e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
                        />
                      </div>
                      {youtubeLinks.length > 1 && (
                        <button
                          onClick={() => removeYoutubeLink(index)}
                          className="px-3 py-3 text-red-500 hover:text-red-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addYoutubeLink}
                    className="inline-flex items-center px-4 py-2 text-blue-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another URL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quiz Configuration */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={generateQuiz}
              disabled={!canGenerateQuiz() || loading}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg shadow-lg"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Generate Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;



