import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ExpenseTracker from "./pages/DashBoard";
import ChatWithAI from "./pages/AiChatBot";
import AuthPage from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ExpenseTracker />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/chat" element={<ChatWithAI />} />
      </Routes>
    </div>
  );
}

export default App;
