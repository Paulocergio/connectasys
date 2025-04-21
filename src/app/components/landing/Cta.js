"use client";
import { ArrowRight, Shield } from "lucide-react";
import React from "react";  
import { Footer } from "../../components/landing/Footer";  
import PropTypes from 'prop-types';

export const CTA = ({ scrollToSection = null }) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 w-full bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Pronto para revolucionar sua oficina?
          </span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-0">
          Junte-se a milhares de oficinas que já otimizaram seus processos com o ConnectaSys
        </p>
        <a 
          href="#" 
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30 text-sm sm:text-base"
          onClick={(e) => {
            e.preventDefault();
            if (scrollToSection) {
              scrollToSection('contato');
            } else {
              // Fallback se scrollToSection não for fornecido
              const contactElement = document.getElementById('contato');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        >
          Experimente Grátis por 14 Dias
          <ArrowRight className="inline ml-2" size={16} />
        </a>
        <p className="mt-4 sm:mt-6 text-gray-500 flex items-center justify-center text-xs sm:text-sm">
          <Shield size={16} className="mr-2" />
          Sem necessidade de cartão de crédito
        </p>
      </div>
    </section>
  );
};

CTA.propTypes = {
  scrollToSection: PropTypes.func
};

CTA.defaultProps = {
  scrollToSection: null
};