import "./App.css";
import ExpenseIncomeForm from "./components/CommonForm";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ExpenseTracker from "./pages/DashBoard";
import ChatWithAI from "./pages/AiChatBot";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ExpenseTracker />} />
        <Route
          path="/chat"
          element={
            <>
              <ChatWithAI />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
