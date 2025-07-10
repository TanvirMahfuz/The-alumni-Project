import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from "./pages/Homepage";
import Navbar from './components/navbar/Navbar';
import Chatpage from "./pages/Chatpage";
import Profilepage from "./pages/Profilepage";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";

import { useUserStore } from "./store/useUserStore";
import { Link } from 'react-router-dom';
import AlumniList from './components/homepage/alumni/AlumniList';
function App() {

  const { authUser,getAuthUser } = useUserStore();
  useEffect(() => {
    getAuthUser();
  }, []);
  
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={!authUser?<LogIn />:<Link to="/"></Link>} />
          <Route path="/chat" element={<Chatpage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:id" element={<Profilepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
