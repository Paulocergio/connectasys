"use client";

import { Hero } from "./components/landing/Hero";
import { Navbar } from "./components/landing/Navbar";
import { Features } from "./components/landing/Features";
import { Pricing } from "./components/landing/Pricing";
import { Testimonials } from "./components/landing/Testimonials";
import { CTA } from "./components/landing/Cta";
import { Footer } from "./components/landing/Footer";
import { useState, useEffect } from "react";

// O comentário sobre a interface foi mantido para referência
// Esta interface não deveria estar aqui, mas no componente Footer.tsx
// Você pode remover essa definição daqui após adicioná-la no arquivo correto

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const scrollToSection = (sectionId) => {
    setIsOpen(false); 

    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.offsetTop;
      window.scrollTo({
        top: topOffset - 80, 
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "sobre",
        "recursos",
        "precos",
        "depoimentos",
        "contato"
      ];
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: 'Sobre', sectionId: 'sobre' },
    { label: 'Recursos', sectionId: 'recursos' },
    { label: 'Preços', sectionId: 'precos' },
    { label: 'Depoimentos', sectionId: 'depoimentos' },
    { label: 'Contato', sectionId: 'contato' }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        scrollToSection={scrollToSection} 
        activeSection={activeSection} 
        navItems={navItems} 
      />
      <Hero scrollToSection={scrollToSection} />
      <Features id="recursos" />
      <Pricing id="precos" />

      <Testimonials id="depoimentos" scrollToSection={scrollToSection} />
      <CTA />
      <Footer id="contato" scrollToSection={scrollToSection} />
    </main>
  );
}