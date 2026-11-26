import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Chatpage from "./pages/Chatpage/Chatpage";
import Profilepage from "./pages/Profilepage/Profilepage";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import SearchPage from "./pages/SearchPage/SearchPage";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";

import { useUserStore } from "./store/useUserStore";

// Waits for the first auth check, then redirects logged-out users to /login
function RequireAuth({ children }) {
  const { authUser, isCheckingAuth } = useUserStore();
  if (isCheckingAuth) return null;
  return authUser ? children : <Navigate to="/login" replace />;
}

// Login/register pages send already-logged-in users home
function GuestOnly({ children }) {
  const { authUser, isCheckingAuth } = useUserStore();
  if (isCheckingAuth) return null;
  return authUser ? <Navigate to="/" replace /> : children;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
        <Route path="/login" element={<GuestOnly><LogIn /></GuestOnly>} />
        <Route path="/chat" element={<RequireAuth><Chatpage /></RequireAuth>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:id" element={<Profilepage />} />
      </Routes>
    </ErrorBoundary>
  );
}

function App() {
  const { getAuthUser } = useUserStore();
  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
