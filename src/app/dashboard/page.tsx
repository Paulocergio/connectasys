"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ShoppingCart, TrendingUp } from "lucide-react";
import SidebarWrapper from "@/components/ui/sidebar"; // Sem chaves {} e usando o nome correto

export default function Dashboard() {
  const [tema, setTema] = useState("light");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SidebarWrapper>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Visão Geral</h1>
            <div className="flex items-center space-x-2">
              <p className={`${tema === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Hoje, {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <span className={`text-xs px-2 py-1 rounded-md ${tema === "dark" ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-700"}`}>
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
          <Card className={`border-0 ${tema === "dark" ? "bg-gray-800/70" : "bg-white"} shadow-lg rounded-xl`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${tema === "dark" ? "text-gray-400" : "text-gray-500"}`}>Valor em Estoque</p>
                  <p className="text-2xl font-bold tracking-tight">R$ 85.430,00</p>
                  <p className="text-xs mt-1 text-green-500 flex items-center font-medium">
                    <span className="flex items-center justify-center p-0.5 rounded-full bg-green-500/20 mr-1">
                      <ArrowUp className="w-3 h-3" />
                    </span>
                    12% desde o mês passado
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${tema === "dark" ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}>
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-0 ${tema === "dark" ? "bg-gray-800/70" : "bg-white"} shadow-lg rounded-xl`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${tema === "dark" ? "text-gray-400" : "text-gray-500"}`}>Meta Anual</p>
                  <p className="text-2xl font-bold tracking-tight">R$ 1.200.000,00</p>
                  <div className="mt-1 flex flex-col">
                    <p className="text-xs text-green-500 flex items-center font-medium">
                      <span className="flex items-center justify-center p-0.5 rounded-full bg-green-500/20 mr-1">
                        <ArrowUp className="w-3 h-3" />
                      </span>
                      64% completado
                    </p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "64%" }}></div>
                    </div>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${tema === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600"}`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-0 ${tema === "dark" ? "bg-gray-800/70" : "bg-white"} shadow-lg rounded-xl`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${tema === "dark" ? "text-gray-400" : "text-gray-500"}`}>Saída do Dia</p>
                  <p className="text-2xl font-bold tracking-tight">R$ 5.320,00</p>
                  <p className="text-xs mt-1 text-red-500 flex items-center font-medium">
                    <span className="flex items-center justify-center p-0.5 rounded-full bg-red-500/20 mr-1">
                      <ArrowUp className="w-3 h-3" />
                    </span>
                    8% acima do normal
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${tema === "dark" ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"}`}>
                  <ArrowDown className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarWrapper>
  );
}

//por que quando eu clico em Dashboard, ele não me leva para a página de dashboard? e sim para / ?