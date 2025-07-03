import ExpenseIncomeForm from "./CommonForm";

function Model({ closeModel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg  p-4 relative">
        <button
          onClick={closeModel}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>
        <div className="pt-8"> 
          <ExpenseIncomeForm />
        </div>
      </div>
    </div>
  );
}

export default Model;
