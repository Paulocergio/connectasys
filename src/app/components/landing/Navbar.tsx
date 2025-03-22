import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  sectionId: string;
}

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  navItems: NavItem[];
}
export const Navbar = ({ isOpen, setIsOpen, scrollToSection, activeSection, navItems }: NavbarProps) => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-white border-b border-gray-800">
      <a
        onClick={() => scrollToSection('hero')}
        className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-blue-500 transition-all flex items-center cursor-pointer"
      >
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ConnectaSys</span>
      </a>

      {/* Menu Desktop */}
      <div className="hidden md:flex space-x-4 lg:space-x-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            onClick={() => scrollToSection(item.sectionId)}
            className={`cursor-pointer hover:text-blue-500 transition-all text-sm lg:text-base ${activeSection === item.sectionId ? 'text-blue-500 font-medium' : 'text-gray-300'
              }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Botão Login Desktop */}
      <div className="hidden md:flex items-center">
        <Link
          href="/login"
          className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white text-sm lg:text-base font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30"
        >
          Login
        </Link>
      </div>

      {/* Botão Mobile Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Mobile (Visível quando isOpen=true) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 py-4 px-6 flex flex-col space-y-4 animate-fadeIn">
          {navItems.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                scrollToSection(item.sectionId);
                setIsOpen(false);
              }}
              className={`cursor-pointer hover:text-blue-500 transition-all ${activeSection === item.sectionId ? 'text-blue-500 font-medium' : 'text-gray-300'
                }`}
            >
              {item.label}
            </a>
          ))}

          <Link
            href="/login"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-full shadow-lg text-center mt-2"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};