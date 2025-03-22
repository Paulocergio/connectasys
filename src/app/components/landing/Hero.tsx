"use client"
import { ArrowRight, Shield } from "lucide-react";

type HeroProps = {
  scrollToSection: (sectionId: string) => void;
};

export const Hero = ({ scrollToSection }: HeroProps) => {
  return (
    <>
      {/* Elemento âncora com id "sobre" */}
      <div id="sobre" className="absolute top-0"></div>
      
      <section id="hero" className="w-full flex flex-col items-center justify-center text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center -z-10">
          <div className="w-full h-full max-w-6xl mx-auto">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/3 right-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob animation-delay-4000" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold max-w-4xl leading-tight px-2 sm:px-4">
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-600 bg-clip-text text-transparent">
            Transforme sua oficina com automação inteligente
          </span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mt-3 sm:mt-4 md:mt-6 max-w-xl px-2 sm:px-4 leading-relaxed">
          Aumente sua produtividade, automatize processos e tenha relatórios completos em tempo real.
        </p>
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 w-full max-w-xs sm:max-w-md md:max-w-lg px-4 sm:px-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contato');
            }}
            className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30 flex items-center justify-center w-full sm:w-auto text-xs sm:text-sm md:text-base"
          >
            Experimente Grátis
            <ArrowRight className="ml-2" size={16} />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('recursos');
            }}
            className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-all border border-gray-800 hover:border-gray-700 shadow-lg flex items-center justify-center w-full sm:w-auto group text-xs sm:text-sm md:text-base"
          >
            Ver Demonstração
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
        <div className="mt-4 sm:mt-6 md:mt-8 text-gray-500 flex items-center space-x-2 text-xs">
          <Shield size={12} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Teste gratuito por 14 dias • Sem necessidade de cartão</span>
        </div>

        {/* Stats */}
        <div className="w-full max-w-4xl lg:max-w-5xl mt-8 sm:mt-12 md:mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 md:px-6">
          {[
            { label: "Oficinas Atendidas", value: "2.500+" },
            { label: "Satisfação dos Clientes", value: "98%" },
            { label: "Economia de Tempo", value: "35%" },
            { label: "Aumento na Produtividade", value: "47%" }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{stat.value}</h3>
              <p className="text-gray-400 text-xxs sm:text-xs md:text-sm lg:text-base mt-1 sm:mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};