"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, ShoppingCart, TrendingUp } from "lucide-react";
import SidebarWrapper from "@/components/ui/sidebar";
import { MetricCard } from "./MetricCard"; // We'll create this component

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

  // Define card data
  const metricCards = [
    {
      title: "Valor em Estoque",
      value: "R$ 85.430,00",
      change: "+12% desde o mês passado",
      isPositive: true,
      icon: <ShoppingCart className="w-6 h-6" />,
      iconColor: tema === "dark" ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Meta Anual",
      value: "R$ 1.200.000,00",
      change: "64% completado",
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6" />,
      iconColor: tema === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600",
      progressBar: {
        percentage: 64,
        color: "bg-emerald-500"
      }
    },
    {
      title: "Saída do Dia",
      value: "R$ 5.320,00",
      change: "8% acima do normal",
      isPositive: false,
      icon: <ArrowDown className="w-6 h-6" />,
      iconColor: tema === "dark" ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"
    }
  ];

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
          {metricCards.map((card, index) => (
            <MetricCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              isPositive={card.isPositive}
              icon={card.icon}
              iconColor={card.iconColor}
              progressBar={card.progressBar}
              tema={tema}
            />
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
}