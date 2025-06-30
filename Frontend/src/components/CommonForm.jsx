import { useState } from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentArrowUpIcon,
  CloudArrowUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function ExpenseIncomeForm() {
  const [type, setType] = useState("expense");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});

  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Rent & Housing",
    "Utilities",
    "Healthcare",
    "Entertainment",
    "Shopping",
    "Education",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Rental Income",
    "Bonus",
    "Gift",
    "Other",
  ];

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 10MB",
        }));
        return;
      }
      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("title")) {
      newErrors.title = "Title is required";
    }

    if (!formData.get("amount")) {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.get("amount"));
      if (amount <= 0) {
        newErrors.amount = "Amount must be greater than 0";
      }
    }

    if (!selectedCategory) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    const data = {
      title: formData.get("title"),
      amount: formData.get("amount"),
      type,
      category: selectedCategory,
      message: formData.get("message"),
      file: selectedFile,
    };

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    alert(`${type === "expense" ? "Expense" : "Income"} added successfully!`);

    setIsSubmitting(false);
    event.currentTarget.reset();
    setSelectedFile(null);
    setSelectedCategory("");
    setType("expense");
    setErrors({});
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setSelectedCategory("");
  };

  return (
    <div className="min-w-full p-2 flex items-center justify-center">
      <div className=" w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter transaction title"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                  errors.title ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
                Amount *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <span className="text-gray-500 text-lg">₹</span>
                </div>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.amount ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
          </div>

          {/* Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Transaction Type *</label>
            <div className="flex space-x-4">
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`flex-1 p-2 rounded-xl border-2 ${
                    type === t
                      ? t === "expense"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        type === t ? (t === "expense" ? "bg-red-500" : "bg-green-500") : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="font-medium capitalize">{t}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {type === "expense" ? "Expense Category" : "Income Category"} *
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                  errors.category ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              >
                <option value="">Select {type} category</option>
                {(type === "expense" ? expenseCategories : incomeCategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Message/Description */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                Description
              </div>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Add any additional notes or description..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <DocumentArrowUpIcon className="w-5 h-5" />
                Supporting Document
              </div>
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center ${
                selectedFile ? "border-green-300 bg-green-50" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-4" />
                  {selectedFile ? (
                    <>
                      <p className="text-green-600 font-semibold text-lg">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">File selected successfully</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400 mt-1">PDF, JPG, PNG, DOC (max 10MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-white font-semibold rounded-xl transition-all transform ${
              type === "expense"
                ? "bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/25"
                : "bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25"
            } hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `Add ${type === "expense" ? "Expense" : "Income"}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
