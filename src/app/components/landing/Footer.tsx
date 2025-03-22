"use client";
import { Facebook, Instagram, Linkedin } from "lucide-react";


interface FooterProps {
  id: string;
  scrollToSection: (sectionId: string) => void;
}

export const Footer = ({id , scrollToSection }: FooterProps) => {
  return (
    <footer id="contato" className="bg-black text-gray-400 py-8 sm:py-12 md:py-16 border-t border-gray-800 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <a onClick={() => scrollToSection('hero')} className="text-xl sm:text-2xl font-bold tracking-tight flex items-center text-white mb-3 md:mb-4 cursor-pointer">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ConnectaSys</span>
            </a>
            <p className="text-sm sm:text-base mt-1 sm:mt-2">Solução completa para gestão de oficinas mecânicas.</p>
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 md:mb-4">Produto</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><a onClick={() => scrollToSection('produtos')} className="hover:text-blue-500 transition-all cursor-pointer">Produtos</a></li>
              <li><a onClick={() => scrollToSection('recursos')} className="hover:text-blue-500 transition-all cursor-pointer">Recursos</a></li>
              <li><a onClick={() => scrollToSection('precos')} className="hover:text-blue-500 transition-all cursor-pointer">Preços</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Integrações</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 md:mb-4">Suporte</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><a href="#" className="hover:text-blue-500 transition-all">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Documentação</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Contato</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 md:mb-4">Empresa</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><a href="#" className="hover:text-blue-500 transition-all">Sobre nós</a></li>
              <li><a onClick={() => scrollToSection('depoimentos')} className="hover:text-blue-500 transition-all cursor-pointer">Depoimentos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Carreira</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} ConnectaSys. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};