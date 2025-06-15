
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";


// import Home from "./components/Home.jsx";
// import Upload from "./pages/Upload.jsx";
// import Quizzes from "./pages/Quizzes.jsx";
// import Flashcards from "./pages/FlashCard.jsx";
// import Export from "./pages/Export.jsx";
// import SignUp from "./components/SignUp.jsx";
// import SignIn from "./components/SignInPage.jsx";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div style={{ display: "flex", minHeight: "100vh" }}>
        
//         <main style={{ flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/upload" element={<Upload />} />
//             <Route path="/quizzes" element={<Quizzes />} />
//             <Route path="/flashcards" element={<Flashcards />} />
//             <Route path="/export" element={<Export />} />
//             <Route path="/signin" element={<SignIn/>}/>
//             <Route path="/signup" element={<SignUp/>}/>
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Upload from "./pages/Upload.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import FlashcardApp from "./pages/FlashcardApp.jsx";
import Export from "./pages/Export.jsx";

export default function App() {
  
  return (
    <>
   
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <main style={{ flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/quizzes" element={<Quizzes />} />
            
            <Route path="/flashcards" element={<FlashcardApp />} />
            <Route path="/export" element={<Export />} />

            {/* Clerk Routes */}
            <Route path="/signin/*" element={<SignIn routing="path" path="/signin" />} />
            <Route path="/signup/*" element={<SignUp routing="path" path="/signup" />} />

            {/* Protect Routes Example */}
            <Route
              path="/protected"
              element={
                <>
                  <SignedIn>
                    <div>Welcome to protected route</div>
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}
