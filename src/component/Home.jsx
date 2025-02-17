import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { createCode, updateCode } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchParam, setSearchParam] = useSearchParams();
  
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.value);
  const pasteId = searchParam.get("pasteId");

  // Update form fields if pasteId is present
  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    const paste = {
      title,
      content,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateCode(paste));
    } else {
      dispatch(createCode(paste));
    }

    setTitle('');
    setContent('');
    setSearchParam({});
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-start justify-center pt-4">
      <div className="w-full max-w-4xl px-5 py-5">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <input
                className="w-full md:w-1/2 p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={createPaste}
                className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {pasteId ? "Update my paste" : "Create my paste"}
              </button>
            </div>
          </div>
          <div>
            <textarea
              className="w-full h-96 p-4 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter content here"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
