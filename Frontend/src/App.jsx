import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authUserStore";

// ✅ Lazy-loaded pages
const AuthPage = lazy(() => import("./pages/SignIn"));
const ExpenseTracker = lazy(() => import("./pages/DashBoard"));
const ChatWithAI = lazy(() => import("./pages/AiChatBot"));

function App() {
  const getUserData = useAuthStore((s) => s.getUserData);
  const authReady = useAuthStore((s) => s.authReady);
  const location = useLocation();

  useEffect(() => {
    getUserData();
  }, []);

  if (!authReady) return null;

  const hideNavbar = location.pathname === "/login";

  return (
    <div>
      {!hideNavbar && <Navbar />}

      {/* Suspense fallback loader */}
      <Suspense fallback={<div>Loading...</div>}>
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

          {/* Fallback route */}
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
