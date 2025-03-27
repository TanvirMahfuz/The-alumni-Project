import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile.jsx";
import StudentList from "./pages/studentList.jsx";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/logIn.jsx";
import Register from "./pages/register2.jsx";
import Demo from "./pages/demo.jsx";
import Demo2 from "./pages/register2.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import Chat from "./pages/Chat.jsx";
import NavBar from "./components/NavBar.jsx";
import { useAuthStore } from "./store/useUserStore.js";

function App() {
  const { authUser,checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <NavBar user={authUser} />
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/log-in" element={<LogIn />}></Route>
        <Route path="/register" element={!authUser?<Register />:<Home/>}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        <Route path="/demo2" element={<Demo2 />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/student-list" element={<StudentList />}></Route>
        <Route path="/search" element={<SearchResult />}></Route>
      </Routes>
    </>
  );
}

export default App;
