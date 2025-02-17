import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCode, updateCode } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { FaCopy, FaTrash, FaEdit, FaEye, FaShare } from 'react-icons/fa';

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data = useSelector((state) => state.paste.value);
  const dispatch = useDispatch();

  const filterData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Edit
  function handleEdit(pasteId) {
    dispatch(updateCode(pasteId));
  }

  // Delete
  function handleDelete(pasteId) {
    dispatch(removeCode({ _id: pasteId }));
  }

  // Copy
  function handleCopy(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => toast("Content copied"))
      .catch(() => toast("Failed to copy content!"));
  }

  // Share
  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/?pasteId=${paste._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: shareUrl,
      })
        .then(() => toast("Shared successfully!"))
        .catch((error) => toast(`Error sharing: ${error}`));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => toast("Share URL copied to clipboard"))
        .catch(() => toast("Failed to copy URL"));
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-4 flex justify-center">
          <input 
            className="p-2 rounded w-1/3 text-gray-300 bg-gray-700"
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          {filterData.length > 0 &&
            filterData.map((paste) => (
              <div
                key={paste._id}
                className="w-11/12 mx-auto h-48 p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 flex flex-row justify-between"
              >
                {/* Left column: title, content, date */}
                <div className="flex flex-col justify-between flex-1 pr-4">
                  <div>
                    <h3 className="font-bold truncate text-gray-300">{paste.title}</h3>
                    {/* Content container with max height and vertical scroll */}
                    <div className="mt-2 max-h-20 overflow-y-auto">
                      <p className="text-gray-300 break-words">
                        {paste.content}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mt-2">
                    {new Date(paste.createAt)
                      .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                      .toLowerCase()}
                  </div>
                </div>
                {/* Right column: vertical icons */}
                <div className="flex flex-col gap-2 items-center justify-start">
                  {/* Edit */}
                  <NavLink 
                    to={`/?pasteId=${paste._id}`}
                    className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                  >
                    <FaEdit className="w-2 h-2" />
                  </NavLink>

                  {/* View */}
                  <NavLink 
                    to={`/view/${paste._id}`}
                    className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                  >
                    <FaEye className="w-2 h-2" />
                  </NavLink>

                  {/* Copy */}
                  <button 
                    onClick={() => handleCopy(paste.content)}
                    className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                  >
                    <FaCopy className="w-2 h-2" />
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                  >
                    <FaShare className="w-2 h-2" />
                  </button>

                  {/* Delete */}
                  <button 
                    onClick={() => handleDelete(paste._id)}
                    className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                  >
                    <FaTrash className="w-2 h-2" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Paste;
