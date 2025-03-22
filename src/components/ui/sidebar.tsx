"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home, Users, BarChart3, Settings, LogOut, ShoppingCart, Activity,
  Database, CreditCard, Calendar, Sun, Moon, Menu, X
} from "lucide-react";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(true);
  const [tema, setTema] = useState("light");
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users className="w-5 h-5" />, label: "Usuários", path: "/users" },
    { icon: <Activity className="w-5 h-5" />, label: "Analytics", path: "/analytics" },
    { icon: <ShoppingCart className="w-5 h-5" />, label: "Vendas", path: "/vendas" },
    { icon: <Database className="w-5 h-5" />, label: "Inventário", path: "/inventario" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Finanças", path: "/financas" },
    { icon: <Calendar className="w-5 h-5" />, label: "Calendário", path: "/calendario" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Relatórios", path: "/relatorios" },
    { icon: <Settings className="w-5 h-5" />, label: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className={`flex min-h-screen ${tema === 'dark' ? 'bg-[#0f172a] text-gray-100' : 'bg-gray-50 text-gray-900'} transition-all duration-300`}>
      <aside className={`${menuAberto ? "w-72" : "w-20"} ${tema === 'dark' ? 'bg-[#1e293b]' : 'bg-white'} shadow-xl fixed h-full z-10 border-r transition-all duration-300 ${tema === 'dark' ? 'border-gray-700/30' : 'border-gray-200/70'}`}>
        <div className="flex items-center justify-between p-5 border-b border-opacity-20 border-gray-300">
          {menuAberto && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">AP</div>
              <div className="flex flex-col">
                <span className="font-medium">Ana Paula</span>
                <span className="text-xs text-gray-500">Administradora</span>
              </div>
            </div>
          )}
          <button
            className={`p-2 rounded-lg ${tema === 'dark' ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-5 space-y-1.5">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center ${menuAberto ? 'px-3' : 'justify-center'} py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                tema === 'dark'
                  ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              {menuAberto && <span className="ml-3 font-medium">{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-5 border-t border-gray-200/10">
          <div
            onClick={() => setTema(tema === 'dark' ? 'light' : 'dark')}
            className={`flex items-center ${menuAberto ? 'px-3 justify-between' : 'justify-center'} py-3 rounded-xl cursor-pointer transition-all ${
              tema === 'dark' ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
          >
            {tema === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {menuAberto && <span className="font-medium">{tema === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </div>
          {menuAberto && (
            <div className={`flex items-center px-3 py-3 mt-1 rounded-xl cursor-pointer transition-all ${
              tema === 'dark' ? 'hover:bg-gray-800/80 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}>
              <LogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Sair</span>
            </div>
          )}
        </div>
      </aside>

      <main className={`flex-1 p-8 ml-20 ${menuAberto ? 'md:ml-72' : 'md:ml-20'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}
