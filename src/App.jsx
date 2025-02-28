import React from 'react';  
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
// for toast
import { Toaster } from 'react-hot-toast';


import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Paste from './component/Paste';
import View from './component/View';

const router = createBrowserRouter([
  {
    path: "/",  
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/paste",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/paste/:id",
    element: (
      <div>
        <Navbar />
      </div>
    ),
  },

  {
    path: "/view/:id",
    element: (
      <div>
        <Navbar />
        <View />
      </div>
    ),
  },
  
  
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
    </>
  );
}

export default App;
