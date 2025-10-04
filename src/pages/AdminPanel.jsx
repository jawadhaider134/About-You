import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Settings, LogOut, Sun, Moon } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center border-b dark:border-gray-700 text-xl font-bold text-orange-600">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeTab === item.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 text-sm font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold capitalize text-orange-600">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Welcome, Admin
            </span>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-orange-600 transition"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-800" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-orange-600">Dashboard</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-orange-100 dark:bg-orange-900 rounded-xl shadow text-orange-700 dark:text-orange-300">
                  📊 Stats Card
                </div>
                <div className="p-6 bg-orange-100 dark:bg-orange-900 rounded-xl shadow text-orange-700 dark:text-orange-300">
                  👥 Users Count
                </div>
                <div className="p-6 bg-orange-100 dark:bg-orange-900 rounded-xl shadow text-orange-700 dark:text-orange-300">
                  💰 Revenue
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-orange-600">Users</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  User management table goes here...
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-orange-600">Settings</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Admin settings form goes here...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
