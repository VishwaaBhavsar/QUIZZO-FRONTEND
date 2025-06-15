// import { useState } from 'react';
// import { BookOpen, ChevronDown, PlusCircle, Search } from 'lucide-react';
// import SignIn from './SignInPage.jsx';

// export default function Navbar() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   return (
//     <>
//       <nav className="bg-[#1A1F36] shadow-md py-4 px-6 flex items-center justify-between text-white">
//         {/* Left part (logo and links) */}
//         <div className="flex items-center space-x-10">
//           <div className="flex items-center space-x-2">
//             <div className="bg-[#5D6B94] p-1 rounded text-white">
//               <BookOpen size={20} />
//             </div>
//             <span className="text-xl font-bold text-[#ECF0F9]">Quizzo</span>
//           </div>

//           <div className="flex items-center space-x-6">
//             <button 
//               className={`flex items-center ${activeTab === 'home' ? 'text-[#A3B1D9] font-medium' : 'text-[#8697C2] hover:text-[#A3B1D9]'}`}
//               onClick={() => setActiveTab('home')}
//             >
//               Home
//             </button>
//             <button className="flex items-center text-[#8697C2] hover:text-[#A3B1D9]">Revision <ChevronDown size={16} className="ml-1" /></button>
//             <button className="flex items-center text-[#8697C2] hover:text-[#A3B1D9]">AI Flashcard Generator</button>
//             <button className="flex items-center text-[#8697C2] hover:text-[#A3B1D9]">AI Quiz Generator</button>
//             <button className="flex items-center text-[#8697C2] hover:text-[#A3B1D9]">More <ChevronDown size={16} className="ml-1" /></button>
//           </div>
//         </div>

//         {/* Right part (search + buttons) */}
//         <div className="flex items-center space-x-4">
//           <div className="relative mx-2">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={16} className="text-[#8697C2]" />
//             </div>
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="bg-[#2A325A] text-[#A3B1D9] pl-10 pr-4 py-2 rounded-md border border-[#3D4875] focus:outline-none focus:ring-1 focus:ring-[#5D6B94] w-40" 
//             />
//           </div>

//           <button className="bg-[#5D6B94] hover:bg-[#4D5B84] text-white px-4 py-2 rounded-md flex items-center transition-colors">
//             <PlusCircle size={16} className="mr-2" /> Create
//           </button>

//           {/* Modal trigger buttons */}
//           <button onClick={() => setLoginOpen(true)} className="text-[#A3B1D9] hover:text-white transition-colors">Login</button>
//           <button onClick={() => setLoginOpen(true)} className="bg-[#ECF0F9] text-[#1A1F36] px-4 py-2 rounded-md hover:bg-white transition-colors">
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       {/* Login Modal Component */}
//       <SignIn isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
//     </>
//   );
// }
import { BookOpen, ChevronDown, PlusCircle, Search } from 'lucide-react';
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function Navbar() {
  const { user } = useUser();
  const [isModalOpen,setIsModalOpen]=useState(false);
  return (
    <>
    <nav className="bg-[#1A1F36]/95 shadow-lg py-4 px-6 sticky top-0 z-50 flex backdrop-blur-lg  items-center justify-between text-white">
      {/* Left part (logo and links) */}
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          <div className="bg-[#5D6B94] p-1 rounded text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold text-[#ECF0F9]">Quizzo</span>
        </div>

        <div className="flex items-center space-x-6 sticky">
          <Link to="/" className="text-[#8697C2] hover:text-[#A3B1D9]">Home</Link>
          <Link to="/flashcards" className="text-[#8697C2] hover:text-[#A3B1D9]">AI Flashcard Generator</Link>
          <Link to="/quizzes" className="text-[#8697C2] hover:text-[#A3B1D9]">AI Quiz Generator</Link>
          <Link to="/export" className="text-[#8697C2] hover:text-[#A3B1D9]">More</Link>
        </div>
      </div>

      {/* Right part */}
      <div className="flex items-center space-x-4">
        <div className="relative mx-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#8697C2]" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#2A325A] text-[#A3B1D9] pl-10 pr-4 py-2 rounded-md border border-[#3D4875] focus:outline-none focus:ring-1 focus:ring-[#5D6B94] w-40" 
          />
        </div>

        <button className="bg-[#5D6B94] hover:bg-[#4D5B84] text-white px-4 py-2 rounded-md flex items-center transition-colors">
          <PlusCircle size={16} className="mr-2" /> Create
        </button>

        <SignedOut>
          <Link to="/signin" className="text-[#A3B1D9] hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="bg-[#ECF0F9] text-[#1A1F36] px-4 py-2 rounded-md hover:bg-white transition-colors">
            Sign Up
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
    {isModalOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm'>
        <div className='bg-white p-4 rounded-lg shadow-lg relative'>
        <SignedIn path='/sign-in' routing='virtual'/>
        <button
      onClick={isModalOpen(false)} 
      className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl'
      >
        ×

        </button>

        </div>

      </div>
      
    )}
    </>
  );
}
