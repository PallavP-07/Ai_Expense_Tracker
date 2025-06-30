import { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  BellIcon,
  UserIcon,
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  CogIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const initialMessages = [
  {
    id: 1,
    type: "ai",
    content:
      "Hello! I'm your personal finance AI assistant. I can help you analyze your expenses, provide budgeting advice, and answer questions about your financial data. How can I help you today?",
    timestamp: new Date(),
    suggestions: [
      "Analyze my spending patterns",
      "How can I reduce my expenses?",
      "Show me my biggest expense categories",
      "Give me budgeting tips",
    ],
  },
];

const sampleResponses = {
  spending:
    "Based on your recent transactions, I can see that your largest expense categories are:\n\n• **Food & Dining**: $450 (32% of expenses)\n• **Bills & Utilities**: $600 (43% of expenses)\n• **Shopping**: $350 (25% of expenses)\n\nYour spending has increased by 8% compared to last month. Would you like me to suggest ways to optimize these expenses?",
  reduce:
    "Here are some personalized tips to reduce your expenses:\n\n💡 **Food & Dining** ($450/month)\n• Try meal planning and cooking at home 3-4 times per week\n• Use grocery apps for discounts and coupons\n• Set a weekly dining out budget of $80\n\n💡 **Shopping** ($350/month)\n• Implement the 24-hour rule before non-essential purchases\n• Use price comparison tools\n• Create a monthly shopping budget of $250\n\n💡 **Transportation** ($200/month)\n• Consider carpooling or public transport 2-3 days per week\n• Combine errands into single trips\n\nThese changes could save you approximately $200-300 per month!",
  budget:
    "Here's a personalized budgeting strategy based on your income of $4,300:\n\n📊 **50/30/20 Rule Breakdown:**\n• **Needs (50%)**: $2,150 - rent, utilities, groceries\n• **Wants (30%)**: $1,290 - dining out, entertainment, shopping\n• **Savings (20%)**: $860 - emergency fund, investments\n\n📈 **Your Current Status:**\n• Needs: $1,800 ✅ (Under budget by $350)\n• Wants: $1,000 ✅ (Under budget by $290)\n• Savings: $1,500 🎉 (Exceeding goal!)\n\nYou're doing great! Consider increasing your investment contributions.",
  categories:
    "Here's your expense breakdown for this month:\n\n📊 **Top Expense Categories:**\n\n1. **Bills & Utilities** - $600 (43%)\n   - Rent: $450\n   - Internet: $80\n   - Phone: $70\n\n2. **Food & Dining** - $450 (32%)\n   - Groceries: $280\n   - Restaurants: $170\n\n3. **Shopping** - $350 (25%)\n   - Clothing: $200\n   - Electronics: $150\n\n**Recommendation**: Your food expenses are slightly high. Consider meal prepping to reduce restaurant spending by 30%.",
};

export default function ChatWithAI() {
  const [showProfile, setShowProfile] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
        suggestions: generateSuggestions(message),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("spending") || lowerMessage.includes("expense")) {
      return sampleResponses.spending;
    } else if (
      lowerMessage.includes("reduce") ||
      lowerMessage.includes("save")
    ) {
      return sampleResponses.reduce;
    } else if (lowerMessage.includes("budget")) {
      return sampleResponses.budget;
    } else if (
      lowerMessage.includes("categories") ||
      lowerMessage.includes("breakdown")
    ) {
      return sampleResponses.categories;
    } else if (lowerMessage.includes("income")) {
      return "Your current monthly income is $4,300. This includes:\n\n• **Primary Salary**: $3,500 (81%)\n• **Freelance Work**: $800 (19%)\n\nYour income has been stable over the past 3 months. To increase your income, consider:\n\n1. Negotiating a salary raise\n2. Taking on more freelance projects\n3. Developing new skills for higher-paying opportunities\n4. Creating passive income streams";
    } else if (
      lowerMessage.includes("goal") ||
      lowerMessage.includes("target")
    ) {
      return "Based on your current financial situation, here are some recommended goals:\n\n🎯 **Short-term (3 months)**\n• Build emergency fund of $8,400 (2 months expenses)\n• Reduce dining out by 25%\n\n🎯 **Medium-term (6-12 months)**\n• Save $10,000 for investments\n• Increase income by 15% through skill development\n\n🎯 **Long-term (1-2 years)**\n• Build 6-month emergency fund\n• Start investing 25% of income\n\nWould you like me to create a detailed action plan for any of these goals?";
    } else {
      return "I understand you're asking about your finances. I can help you with:\n\n• Analyzing your spending patterns\n• Creating budgets and savings plans\n• Providing expense reduction tips\n• Setting financial goals\n• Understanding your income sources\n\nWhat specific aspect of your finances would you like to explore?";
    }
  };

  const generateSuggestions = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("spending") || lowerMessage.includes("expense")) {
      return [
        "How can I reduce my food expenses?",
        "Show me monthly trends",
        "Set a budget for shopping",
      ];
    } else if (lowerMessage.includes("reduce")) {
      return [
        "Create a savings plan",
        "Track my progress",
        "Set spending alerts",
      ];
    } else if (lowerMessage.includes("budget")) {
      return [
        "Help me stick to my budget",
        "Adjust my budget categories",
        "Create financial goals",
      ];
    } else {
      return [
        "Analyze my spending patterns",
        "Create a monthly budget",
        "Set savings goals",
        "Track my expenses",
      ];
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  return (
    <div className="w-full bg-gray-200 min-h-screen px-4 md:px-2 lg:px-2 py-8 ">
      <div className="flex rounded-md ">
        {/* Main Chat Content */}
        <main className="flex-1 flex flex-col m-h-[70vh] bg-white rounded-md">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 rounded-md">
            <div className="bg-white px-2 py-2 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Back</span>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      AI Financial Assistant
                    </h2>
                    <p className="text-sm text-gray-500">
                      Get personalized insights about your finances
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.type === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <SparklesIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  {message.type === "ai" && message.suggestions && (
                    <div className="mt-4 ml-11">
                      <p className="text-xs text-gray-500 mb-2">
                        Suggested questions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center space-x-2 mb-3">
              <LightBulbIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-600">Quick actions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleSuggestionClick("Analyze my spending patterns")
                }
                className="flex items-center space-x-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
              >
                <ChartBarIcon className="w-4 h-4" />
                <span>Analyze Spending</span>
              </button>
              <button
                onClick={() =>
                  handleSuggestionClick("How can I reduce my expenses?")
                }
                className="flex items-center space-x-2 text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition-colors"
              >
                <ExclamationTriangleIcon className="w-4 h-4" />
                <span>Reduce Expenses</span>
              </button>
              <button
                onClick={() => handleSuggestionClick("Create a monthly budget")}
                className="flex items-center space-x-2 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg transition-colors"
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                <span>Create Budget</span>
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your expenses, budgeting, or financial goals..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Try asking: "How much did I spend on food this month?" or "Give
              me tips to save money"
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
