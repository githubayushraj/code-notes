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

  // Handlers
  function handleEdit(pasteId) {
    dispatch(updateCode(pasteId));
  }
  
  function handleDelete(pasteId) {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(removeCode({ _id: pasteId }));
    }
  }
  

  function handleCopy(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => toast("Content copied"))
      .catch(() => toast("Failed to copy content!"));
  }

  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/?pasteId=${paste._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: shareUrl,
        })
        .then(() => toast("Shared successfully!"))
        .catch((error) => toast(`Error sharing: ${error}`));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => toast("Share URL copied to clipboard"))
        .catch(() => toast("Failed to copy URL"));
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-screen-lg mx-auto">
        {/* Search Input */}
        <div className="mb-4 flex justify-center">
          <input
            className="p-2 rounded w-1/3 text-gray-300 bg-gray-700 focus:outline-none"
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Paste List */}
        <div className="flex flex-col gap-5">
          {filterData.length > 0 &&
            filterData.map((paste) => {
              const formattedDate = new Date(paste.createAt)
                .toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                .toLowerCase();

              return (
                <div
                  key={paste._id}
                  className="relative w-11/12 mx-auto p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 flex flex-col md:flex-row justify-between h-40 md:h-48"
                >
                  {/* Left Column: Title & Content */}
                  <div className="flex-1 md:pr-4 flex flex-col overflow-hidden">
                    <h3 className="font-bold text-gray-300 break-words">
                      {paste.title}
                    </h3>
                    <div className="flex-1 mt-2 overflow-y-auto">
                      <p className="text-gray-300 break-words">
                        {paste.content}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Icons */}
                  <div className="flex flex-row md:flex-col gap-2 items-center justify-start mt-3 md:mt-0">
                    <NavLink
                      to={`/?pasteId=${paste._id}`}
                      className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                    >
                      <FaEdit className="w-3 h-2" />
                    </NavLink>
                    <NavLink
                      to={`/view/${paste._id}`}
                      className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                    >
                      <FaEye className="w-3 h-2" />
                    </NavLink>
                    <button
                      onClick={() => handleCopy(paste.content)}
                      className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                    >
                      <FaCopy className="w-3 h-2" />
                    </button>
                    <button
                      onClick={() => handleShare(paste)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                    >
                      <FaShare className="w-3 h-2" />
                    </button>
                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="text-white p-2 border rounded-md transition hover:bg-gray-600"
                    >
                      <FaTrash className="w-3 h-2" />
                    </button>
                  </div>

                  {/* Date: Mobile view at bottom-right, Desktop view at bottom-left */}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 md:hidden">
                    {formattedDate}
                  </div>
                  <div className="hidden md:block absolute top-2 right-2 mr-15 text-xs text-gray-400">
                    {formattedDate}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
