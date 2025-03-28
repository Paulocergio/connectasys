"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home, Users, BarChart3, Settings, LogOut, ShoppingCart, Activity,
  Database, CreditCard, Calendar, Sun, Moon, Menu, X
} from "lucide-react";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [currentTime, setCurrentTime] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    role?: string;
    firstName?: string;
    email?: string;
  }>({});
  const router = useRouter();

  // Function to get user initials
  const getUserInitials = (firstName?: string) => {
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
    }

    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    updateCurrentTime();
    const timeUpdateInterval = setInterval(updateCurrentTime, 60000);
    
    return () => clearInterval(timeUpdateInterval);
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
    { icon: <Users className="w-5 h-5" />, label: "Users", path: "/users" },
    { icon: <Activity className="w-5 h-5" />, label: "Analytics", path: "/analytics" },
    { icon: <ShoppingCart className="w-5 h-5" />, label: "Sales", path: "/sales" },
    { icon: <Database className="w-5 h-5" />, label: "Inventory", path: "/inventory" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Finances", path: "/finances" },
    { icon: <Calendar className="w-5 h-5" />, label: "Calendar", path: "/calendar" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Reports", path: "/reports" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={`flex min-h-screen ${currentTheme === 'dark' ? 'bg-[#0f172a] text-gray-100' : 'bg-gray-50 text-gray-900'} transition-all duration-300`}>
      <aside className={`${isSidebarOpen ? "w-72" : "w-20"} ${currentTheme === 'dark' ? 'bg-[#1e293b]' : 'bg-white'} shadow-xl fixed h-full z-10 border-r transition-all duration-300 ${currentTheme === 'dark' ? 'border-gray-700/30' : 'border-gray-200/70'}`}>
        <div className="flex items-center justify-between p-5 border-b border-opacity-20 border-gray-300">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                {getUserInitials(currentUser?.firstName)}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{currentUser?.firstName || "User"}</span>
                <span className="text-xs text-gray-500">{currentUser?.role || "No Role"}</span>
                <span className="text-xs text-gray-400">{currentUser?.email}</span>
              </div>
            </div>
          )}

          <button
            className={`p-2 rounded-lg ${currentTheme === 'dark' ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-5 space-y-1.5">
          {sidebarMenuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center ${isSidebarOpen ? 'px-3' : 'justify-center'} py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                currentTheme === 'dark'
                  ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-5 border-t border-gray-200/10">
          <div
            onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className={`flex items-center ${isSidebarOpen ? 'px-3 justify-between' : 'justify-center'} py-3 rounded-xl cursor-pointer transition-all ${
              currentTheme === 'dark' ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
          >
            {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isSidebarOpen && <span className="font-medium">{currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </div>
          {isSidebarOpen && (
            <div 
              onClick={handleLogout}
              className={`flex items-center px-3 py-3 mt-1 rounded-xl cursor-pointer transition-all ${
                currentTheme === 'dark' ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </div>
          )}
        </div>
      </aside>

      <main className={`flex-1 p-8 ml-20 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}