"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home, Users, BarChart3, Settings, LogOut, ShoppingCart, Activity,
  Database, CreditCard, Calendar, Sun, Moon, Menu, X, ChevronRight, ChevronDown
} from "lucide-react";

export default function SidebarWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();

  // Function to get user initials
  const getUserInitials = (firstName) => {
    if (!firstName) return "?";
    const names = firstName.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return firstName.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
      
      // Set active item based on current path
      const path = window.location.pathname;
      setActiveItem(path);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const sidebarMenuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users className="w-5 h-5" />, label: "Usuarios", path: "/Usuarios" },
    { icon: <Activity className="w-5 h-5" />, label: "Fornecedores", path: "/Fornecedores" },
    { icon: <ShoppingCart className="w-5 h-5" />, label: "Sales", path: "/sales" },
    { icon: <Database className="w-5 h-5" />, label: "Inventory", path: "/inventory" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Finances", path: "/finances" },
    { icon: <Calendar className="w-5 h-5" />, label: "Calendar", path: "/calendar" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Reports", path: "/reports" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={`flex min-h-screen ${currentTheme === 'dark' ? 'bg-[#0f172a] text-gray-100' : 'bg-gray-50 text-gray-900'} transition-all duration-300`}>
      <aside 
        className={`${isSidebarOpen ? "w-72" : "w-20"} fixed h-full z-10 transition-all duration-300 ${
          currentTheme === 'dark' 
            ? 'bg-gradient-to-b from-[#1e1e2d] to-[#151521] text-white shadow-lg shadow-blue-900/10' 
            : 'bg-gradient-to-b from-white to-gray-50 text-gray-800 shadow-xl shadow-indigo-100/30'
        }`}
      >
        <div className="p-5 mb-6">
          {isSidebarOpen ? (
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowUserOptions(!showUserOptions)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                    {getUserInitials(currentUser?.firstName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{currentUser?.firstName || "User"}</span>
                    <span className={`text-xs ${currentTheme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      {currentUser?.role || "No Role"}
                    </span>
                  </div>
                </div>
               
              </div>

              {/* User options dropdown */}
              {showUserOptions && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg transition-all duration-200 ${
                  currentTheme === 'dark' 
                    ? 'bg-[#2d2d40] border border-gray-700/30' 
                    : 'bg-white border border-gray-200/70'
                }`}>
                  <div className="p-2">
                    <div
                      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all ${
                        currentTheme === 'dark' 
                          ? 'hover:bg-[#3d3d50] text-gray-300' 
                          : 'hover:bg-indigo-50 text-gray-700'
                      }`}
                      onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                    >
                      {currentTheme === 'dark' ? 
                        <Sun className="w-5 h-5 text-amber-400" /> : 
                        <Moon className="w-5 h-5 text-indigo-600" />
                      }
                      <span className="ml-3 font-medium">
                        {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </div>
                    
                    <div 
                      onClick={handleLogout}
                      className={`flex items-center px-3 py-2 mt-1 rounded-lg cursor-pointer transition-all ${
                        currentTheme === 'dark' 
                          ? 'hover:bg-red-900/20 text-red-300' 
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="ml-3 font-medium">Logout</span>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                className={`absolute right-0 top-0 p-2 rounded-lg transition-all ${
                  currentTheme === 'dark' 
                    ? 'hover:bg-gray-700/30 text-gray-400 hover:text-white' 
                    : 'hover:bg-indigo-50 text-gray-500 hover:text-indigo-600'
                }`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <X size={18} className="transition-all hover:rotate-90 duration-300" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              >
                {getUserInitials(currentUser?.firstName)}
              </div>
              
              <button
                className={`p-2 rounded-lg transition-all ${
                  currentTheme === 'dark' 
                    ? 'hover:bg-gray-700/30 text-gray-400 hover:text-white' 
                    : 'hover:bg-indigo-50 text-gray-500 hover:text-indigo-600'
                }`}
                onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              >
                {currentTheme === 'dark' ? 
                  <Sun className="w-5 h-5 text-amber-400" /> : 
                  <Moon className="w-5 h-5 text-indigo-600" />
                }
              </button>
              
              <button
                className={`p-2 rounded-lg transition-all ${
                  currentTheme === 'dark' 
                    ? 'hover:bg-red-900/20 text-red-300' 
                    : 'hover:bg-red-50 text-red-600'
                }`}
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="px-5 mb-2">
            <div className={`text-xs uppercase tracking-widest font-semibold ${
              currentTheme === 'dark' ? 'text-indigo-400/70' : 'text-indigo-500/80'
            }`}>
              Menu Principal
            </div>
          </div>
        )}

        <nav className="px-3 space-y-1.5">
          {sidebarMenuItems.map((item, index) => {
            const isActive = activeItem === item.path;
            return (
              <div
                key={index}
                onClick={() => {
                  router.push(item.path);
                  setActiveItem(item.path);
                }}
                className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? currentTheme === 'dark'
                      ? 'bg-gradient-to-r from-indigo-800/70 to-indigo-700/50 text-white shadow-lg shadow-indigo-900/20'
                      : 'bg-gradient-to-r from-indigo-100 to-blue-50 text-indigo-700 border border-indigo-100/50 shadow-sm'
                    : currentTheme === 'dark'
                    ? 'hover:bg-[#2d2d40]/80 text-gray-300 hover:text-white'
                    : 'hover:bg-indigo-50/60 text-gray-600 hover:text-indigo-700'
                }`}
              >
                <span className={`${isActive && currentTheme === 'light' ? 'text-indigo-600' : ''}`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <div className="flex items-center justify-between w-full">
                    <span className="ml-3 font-medium">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="opacity-70" />}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className={`flex-1 p-8 ml-20 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}