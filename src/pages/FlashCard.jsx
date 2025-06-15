// import React from 'react'

// const FlashCard = () => {
//   return (
//     <div>
//       Flashcard
//     </div>
//   )
// }

// export default FlashCard
// src/components/UploadInput.jsx
import React, { useState } from 'react';
import { Upload, FileText, Image, Video, Mic, PenTool } from 'lucide-react';

const FlashCard = ({ onGenerate, loading }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab === 'text') {
      await onGenerate({
        type: 'text',
        data: { text: textInput, title, description }
      });
    } else if (activeTab === 'youtube') {
      await onGenerate({
        type: 'youtube',
        data: { url: youtubeUrl, title, description }
      });
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    await onGenerate({
      type: 'file',
      data: { file, title, description }
    });
  };

  const tabs = [
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'file', label: 'Upload', icon: Upload },
    { id: 'image', label: 'Image', icon: Image },
    { id: 'youtube', label: 'YouTube', icon: Video },
    { id: 'audio', label: 'Audio', icon: Mic },
    { id: 'drawing', label: 'Drawing', icon: PenTool }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deck Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter deck title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description"
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'text' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste your text
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste your study material here..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !textInput.trim() || !title.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating Flashcards...' : 'Generate Flashcards'}
            </button>
          </form>
        )}

        {activeTab === 'file' && (
          <FileUpload onUpload={handleFileUpload} loading={loading} />
        )}

        {activeTab === 'image' && (
          <FileUpload 
            onUpload={handleFileUpload} 
            loading={loading} 
            accept="image/*"
            label="Upload Image (OCR)"
          />
        )}

        {activeTab === 'youtube' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !youtubeUrl.trim() || !title.trim()}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing Video...' : 'Generate from YouTube'}
            </button>
          </form>
        )}

        {activeTab === 'audio' && (
          <FileUpload 
            onUpload={handleFileUpload} 
            loading={loading} 
            accept="audio/*"
            label="Upload Audio File"
          />
        )}

        {activeTab === 'drawing' && (
          <DrawingPad onUpload={handleFileUpload} loading={loading} />
        )}
      </div>
    </div>
  );
};

// FileUpload Component
const FileUpload = ({ onUpload, loading, accept = "*/*", label = "Upload File" }) => {
  const [dragActive, setDragActive] = useState(false);

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
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept={accept}
        disabled={loading}
      />
      
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-900 mb-2">{label}</p>
      <p className="text-sm text-gray-500">
        Drag and drop your file here, or click to browse
      </p>
      
      {loading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Processing file...</p>
        </div>
      )}
    </div>
  );
};

export default FlashCard;