import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile.jsx";
import StudentList from "./pages/studentList.jsx";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/logIn.jsx";
import Register from "./pages/register2.jsx";
import Demo from "./pages/demo.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Demo2 from "./pages/register2.jsx";
import { Link } from "react-router-dom"; // Import Link

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/log-in" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        <Route path="/demo2" element={<Demo2 />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/student-list" element={<StudentList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
