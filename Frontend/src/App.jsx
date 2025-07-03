import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import ExpenseTracker from "./pages/DashBoard";
import ChatWithAI from "./pages/AiChatBot";
import AuthPage from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import useAuthStore from "./store/authUserStore";

function App() {
   const getUserData = useAuthStore((s) => s.getUserData);
   const authReady = useAuthStore((s) => s.authReady);

  const location = useLocation();
  useEffect(() => {
    getUserData(); // ✅ auto fetch on mount
  }, []);

  if (!authReady) return null; // ✅ prevent flicker


  // Hide navbar on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ExpenseTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatWithAI />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
