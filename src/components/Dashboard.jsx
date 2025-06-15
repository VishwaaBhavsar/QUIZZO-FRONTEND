import { useState } from 'react';
import { PenTool, Users, Zap, Award, BarChart2 ,BookOpen} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EducationDashboard() {
  return (
    <div className="min-h-screen bg-[#ECF0F9] flex flex-col">
      
      <div className="bg-gradient-to-r from-[#1A1F36] via-[#2A325A] to-[#3D4875] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Experience a new way of learning<br />with the power of AI
        </h1>
        <p className="text-[#A3B1D9] text-lg mb-8">
          For students, teachers and professionals
        </p>
        <div className="flex justify-center space-x-4">
          <Link to='/flashcards' className="bg-[#ECF0F9] text-[#1A1F36] px-6 py-3 rounded-full font-medium hover:bg-white transition-colors">
            AI Flashcards
          </Link>
          <button className="bg-[#5D6B94] text-white px-6 py-3 rounded-full font-medium hover:bg-[#4D5B84] transition-colors border border-[#A3B1D9]">
            AI Quizzes
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#5D6B94] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ECF0F9] text-[#3D4875] rounded-lg mb-6">
              <PenTool size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F36] mb-2">Create Resources</h3>
            <p className="text-[#5D6B94]">
              Enhance your study or professional development with AI-generated educational content.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#3D4875] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ECF0F9] text-[#2A325A] rounded-lg mb-6">
              <Award size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F36] mb-2">Practice & Master</h3>
            <p className="text-[#5D6B94]">
              Strengthen your understanding with in-depth learning tools and personalized feedback.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#2A325A] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ECF0F9] text-[#1A1F36] rounded-lg mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F36] mb-2">Study & Collaborate</h3>
            <p className="text-[#5D6B94]">
              Easily share your generated content with peers and collaborate on learning projects.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-[#1A1F36] text-center mb-4">
          Three powerful tools, unlimited possibilities
        </h2>
        <p className="text-[#5D6B94] text-center mb-12">
          Discover how our AI tools simplify content creation, making learning more efficient and tailored to your goals.
        </p>

        {/* AI Flashcard Generator */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md mb-12 overflow-hidden border border-[#A3B1D9]">
          <div className="p-8 md:w-1/2">
            <h3 className="text-2xl font-bold text-[#1A1F36] mb-4">AI Flashcard Generator</h3>
            <p className="text-[#5D6B94] mb-6">
              Save hours by instantly generating flashcards with AI-powered tools that help you efficiently test and strengthen your knowledge.
            </p>
            <button className="bg-[#3D4875] text-white px-6 py-3 rounded-md hover:bg-[#2A325A] transition-colors">
              Get Started
            </button>
          </div>
          <div className="bg-[#A3B1D9] p-8 md:w-1/2 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md transform rotate-2 w-full max-w-sm border border-[#ECF0F9]">
              <div className="text-center">
                <div className="mb-4">
                  {/* Flashcard content */}
                  <div className="bg-[#ECF0F9] h-32 flex items-center justify-center rounded">
                    <Zap size={48} className="text-[#3D4875]" />
                  </div>
                </div>
                <p className="font-medium text-[#1A1F36]">What is the name of this compound?</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Quiz Generator */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-lg shadow-md overflow-hidden border border-[#A3B1D9]">
          <div className="p-8 md:w-1/2">
            <h3 className="text-2xl font-bold text-[#1A1F36] mb-4">AI Quiz Generator</h3>
            <p className="text-[#5D6B94] mb-6">
              Create comprehensive quizzes in seconds that adapt to your learning needs and help identify knowledge gaps.
            </p>
            <button className="bg-[#3D4875] text-white px-6 py-3 rounded-md hover:bg-[#2A325A] transition-colors">
              Create Quiz
            </button>
          </div>
          <div className="bg-[#8697C2] p-8 md:w-1/2 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-[#ECF0F9]">
              <div className="mb-4">
                <span className="text-sm font-medium text-[#3D4875]">Question 1 of 10</span>
                <div className="h-1 w-full bg-[#ECF0F9] rounded-full mt-2">
                  <div className="h-1 bg-[#5D6B94] rounded-full w-1/12"></div>
                </div>
              </div>
              <p className="font-medium mb-4 text-[#1A1F36]">Which of the following is a characteristic of machine learning?</p>
              <div className="space-y-2">
                <div className="border border-[#ECF0F9] p-3 rounded-md hover:bg-[#ECF0F9] cursor-pointer transition-colors">
                  A. Static programming without adaptation
                </div>
                <div className="border border-[#ECF0F9] p-3 rounded-md hover:bg-[#ECF0F9] cursor-pointer transition-colors">
                  B. Learning from experience and improving over time
                </div>
                <div className="border border-[#ECF0F9] p-3 rounded-md hover:bg-[#ECF0F9] cursor-pointer transition-colors">
                  C. Requiring constant manual updates
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics Tool - Added new section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md mt-12 overflow-hidden border border-[#A3B1D9]">
          <div className="p-8 md:w-1/2">
            <h3 className="text-2xl font-bold text-[#1A1F36] mb-4">Learning Analytics</h3>
            <p className="text-[#5D6B94] mb-6">
              Track your progress with detailed analytics that show your strengths and areas for improvement across subjects.
            </p>
            <button className="bg-[#3D4875] text-white px-6 py-3 rounded-md hover:bg-[#2A325A] transition-colors">
              View Analytics
            </button>
          </div>
          <div className="bg-[#5D6B94] p-8 md:w-1/2 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-[#ECF0F9]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-[#1A1F36]">Subject Performance</h4>
                <BarChart2 size={20} className="text-[#3D4875]" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5D6B94]">Mathematics</span>
                    <span className="text-[#1A1F36] font-medium">87%</span>
                  </div>
                  <div className="h-2 w-full bg-[#ECF0F9] rounded-full mt-1">
                    <div className="h-2 bg-[#1A1F36] rounded-full w-10/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5D6B94]">Computer Science</span>
                    <span className="text-[#1A1F36] font-medium">92%</span>
                  </div>
                  <div className="h-2 w-full bg-[#ECF0F9] rounded-full mt-1">
                    <div className="h-2 bg-[#2A325A] rounded-full w-11/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5D6B94]">Chemistry</span>
                    <span className="text-[#1A1F36] font-medium">75%</span>
                  </div>
                  <div className="h-2 w-full bg-[#ECF0F9] rounded-full mt-1">
                    <div className="h-2 bg-[#3D4875] rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#1A1F36] text-[#A3B1D9] py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#5D6B94] p-1 rounded text-white">
                <BookOpen size={16} />
              </div>
              <span className="text-lg font-bold text-white">Quizzo</span>
            </div>
            <p className="text-sm">Revolutionizing education with AI-powered learning tools.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-white mb-3">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">AI Flashcards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Quiz Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}