import React, { useState } from 'react'

const Home = () => {

    const[title,setTitle] = useState('');

  return (
    <div>
    <input
    className="block mx-auto mt-10 w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    placeholder="Enter title here"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    </div>
  )
}

export default Home
