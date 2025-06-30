import { useState } from "react";
import {
  ChartBarIcon,
  PlusIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Model from "../components/Model";
import { useNavigate } from "react-router-dom";

// Sample data
const sampleTransactions = [
  {
    id: 1,
    type: "expense",
    category: "Food",
    amount: 45.5,
    date: "2024-01-15",
    description: "Lunch at restaurant",
  },
  {
    id: 2,
    type: "income",
    category: "Salary",
    amount: 3500.0,
    date: "2024-01-01",
    description: "Monthly salary",
  },
  {
    id: 3,
    type: "expense",
    category: "Transport",
    amount: 25.0,
    date: "2024-01-14",
    description: "Uber ride",
  },
  {
    id: 4,
    type: "expense",
    category: "Shopping",
    amount: 120.75,
    date: "2024-01-13",
    description: "Groceries",
  },
  {
    id: 5,
    type: "income",
    category: "Freelance",
    amount: 800.0,
    date: "2024-01-10",
    description: "Web design project",
  },
];

const monthlyData = [
  { month: "Jan", income: 4300, expense: 2800 },
  { month: "Feb", income: 3800, expense: 2200 },
  { month: "Mar", income: 4100, expense: 2600 },
  { month: "Apr", income: 3900, expense: 2400 },
  { month: "May", income: 4200, expense: 2900 },
  { month: "Jun", income: 4500, expense: 3100 },
];

const expenseCategories = [
  { name: "Food", amount: 450, color: "bg-red-500" },
  { name: "Transport", amount: 200, color: "bg-blue-500" },
  { name: "Shopping", amount: 350, color: "bg-green-500" },
  { name: "Entertainment", amount: 180, color: "bg-yellow-500" },
  { name: "Bills", amount: 600, color: "bg-purple-500" },
];

export default function ExpenseTracker() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showModel, setShowModel] = useState(false);
  const currentMonthIncome = 4300;
  const currentMonthExpense = 2800;
  const balance = currentMonthIncome - currentMonthExpense;
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate("/chat");
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2023", "2022", "2021"];

  const openModel = () => {
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
  };
  return (
    <div className="min-h-screen">
      <div className="flex">
        <main className="flex-1 p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Track your income and expenses</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={openModel}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Transaction</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Income
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{currentMonthIncome.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ArrowTrendingDownIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    ₹{currentMonthExpense.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    -5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Balance</p>
                  <p
                    className={`text-2xl font-bold ${
                      balance >= 0 ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    ₹{balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Current month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Trend
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center space-y-2"
                  >
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.income / 5000) * 200}px` }}
                      ></div>
                      <div
                        className="w-full bg-red-500 rounded-b"
                        style={{ height: `${(data.expense / 5000) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Expenses</span>
                </div>
              </div>
            </div>

            {/* Expense Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Expense Categories
              </h3>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded ${category.color}`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{category.amount}
                      </p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${(category.amount / 600) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {sampleTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowTrendingDownIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowTrendingUpIcon className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}₹
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleOpenChat}
            className="flex items-center fixed bottom-6 right-6 justify-end space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Chat with AI</span>
          </button>
        </main>
      </div>
      {showModel && <Model closeModel={closeModel} />}
    </div>
  );
}
