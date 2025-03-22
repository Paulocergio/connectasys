import React from "react";
import { Box, Calendar, BarChart } from "lucide-react";


interface FeaturesProps {
  id: string;
}
export const Features = ({ id }: FeaturesProps) => {
  const features = [
    {
      title: "Gestão de Estoque Inteligente",
      desc: "Monitore produtos, receba alertas de estoque baixo e reduza desperdícios com nosso sistema intuitivo.",
      icon: <Box className="text-blue-500" size={28} />
    },
    {
      title: "Agendamentos Online",
      desc: "Permita que seus clientes marquem serviços diretamente pelo sistema, reduzindo ligações e otimizando sua agenda.",
      icon: <Calendar className="text-blue-500" size={28} />
    },
    {
      title: "Relatórios Avançados",
      desc: "Visualize métricas de desempenho em tempo real e tome decisões baseadas em dados concretos.",
      icon: <BarChart className="text-blue-500" size={28} />
    },
  ];

  return (
    <section id="recursos" className="py-12 sm:py-16 md:py-20 lg:py-24 w-full bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Recursos Poderosos
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto px-4">
            Soluções completas para transformar o gerenciamento da sua oficina mecânica
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-xl hover:shadow-blue-500/10 hover:border-gray-700 transition-all flex flex-col group">
              <div className="bg-gray-800 p-3 md:p-4 rounded-xl bg-opacity-60 mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-400 mt-2 md:mt-3">{feature.desc}</p>
              <a href="#" className="mt-3 md:mt-4 text-blue-500 inline-flex items-center text-sm md:text-base group/link">
                Saiba mais
                <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};