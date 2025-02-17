import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams();
  const allpaste = useSelector((state) => state.paste.value);
  
  // Find the paste that matches the ID from the URL
  const paste = allpaste.find((p) => p._id === id);

  // If no paste is found, render a fallback message
  if (!paste) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        Paste not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-start pt-4 px-4">
      <h1 className="text-white text-3xl font-bold text-left mb-4 w-full max-w-3xl">
        {paste.title}
      </h1>
      <textarea
        className="w-full max-w-3xl h-120 p-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter content here"
        rows="10"
        value={paste.content}
        readOnly
      ></textarea>
    </div>
  );
}

export default View;
