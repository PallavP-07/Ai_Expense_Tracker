import {useState } from "react";
import LOGO from "../assets/logo.png";
import {
  ChevronDownIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import useAuthStore from "../store/authUserStore";
import useThemeChanger from "../store/useThemeChanger";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user,logout } = useAuthStore();
   const { theme, toggleTheme } = useThemeChanger()
return (
  <header className="bg-white dark:bg-gray-900 shadow-lg">
    <div className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12">
          <img src={LOGO} alt="logo" className="w-full h-full" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-600 dark:text-white">Expense Master</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Manage your finance with AI
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <BellIcon className="w-8 h-8" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <img
                src="https://testingbot.com/free-online-tools/random-avatar/400"
                alt="User Profile"
                className="w-full h-full object-cover rounded-full border border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-md font-medium text-gray-900 dark:text-white">
                {user?.fullname}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-200" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-5 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Premium Member</p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Billing
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Help & Support
                </a>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => logout()}
                  className="block px-4 mx-2 my-2 rounded-md py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-500/10"
                >
                  Sign Out
                </button>

                <button
                  onClick={toggleTheme}
                  className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);

};

export default Navbar;
