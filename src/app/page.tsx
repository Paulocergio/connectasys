"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Box, Calendar, BarChart, Facebook, Instagram, Linkedin, ArrowRight, Star, Shield, Zap } from "lucide-react";
import Image from "next/image";

const depoimentos = [
  {
    nome: "Lucas Andrade",
    empresa: "Auto Center Andrade",
    comentario: "O ConnectaSys transformou minha oficina! O controle de estoque e o agendamento de serviços são incríveis.",
    avatar: "/avatars/lucas.jpg",
    rating: 5
  },
  {
    nome: "Mariana Silva",
    empresa: "Oficina Silva Car",
    comentario: "Agora consigo gerenciar minha oficina do celular e atender mais clientes com eficiência.",
    avatar: "/avatars/mariana.jpg",
    rating: 5
  },
  {
    nome: "Carlos Mendes",
    empresa: "Mendes Motors",
    comentario: "A automação do ConnectaSys reduziu meu tempo de administração e aumentou meus lucros!",
    avatar: "/avatars/carlos.jpg",
    rating: 4
  }
];

const pricingPlans = [
  {
    title: "Plano Básico",
    price: "R$ 99",
    period: "/mês",
    features: ["Gestão de Estoque", "Agendamentos Online", "Suporte por Email", "1 Usuário"],
    icon: <Box className="text-blue-500" size={28} />,
    popular: false,
    ctaText: "Começar Agora"
  },
  {
    title: "Plano Profissional",
    price: "R$ 199",
    period: "/mês",
    features: ["Tudo do Básico", "Relatórios Inteligentes", "Suporte Prioritário", "5 Usuários"],
    icon: <Calendar className="text-blue-500" size={28} />,
    popular: true,
    ctaText: "Escolher Plano"
  },
  {
    title: "Plano Empresarial",
    price: "R$ 299",
    period: "/mês",
    features: ["Tudo do Profissional", "Integrações Avançadas", "Consultoria Personalizada", "Usuários Ilimitados"],
    icon: <BarChart className="text-blue-500" size={28} />,
    popular: false,
    ctaText: "Contate Vendas"
  },
];

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

const navItems = [
  { label: 'Sobre', sectionId: 'sobre' },
  { label: 'Recursos', sectionId: 'recursos' },
  { label: 'Preços', sectionId: 'precos' },
  { label: 'Depoimentos', sectionId: 'depoimentos' },
  { label: 'Contato', sectionId: 'contato' }
];

export default function Home() {


  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };


  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  // Referências para as seções
  const heroRef = useRef<HTMLElement | null>(null);
  const sobreRef = useRef<HTMLElement | null>(null);
  const recursosRef = useRef<HTMLElement | null>(null);
  const depoimentosRef = useRef<HTMLElement | null>(null);
  const precosRef = useRef<HTMLElement | null>(null);
  const contatoRef = useRef<HTMLElement | null>(null);




  // Função de scroll suave para as seções
  const scrollToSection = (sectionId: string) => {

    setIsOpen(false); // Fecha o menu mobile se estiver aberto

    let targetRef;
    switch (sectionId) {
      case 'sobre':
        targetRef = sobreRef;
        break;
      case 'recursos':
        targetRef = recursosRef;
        break;
      case 'depoimentos':
        targetRef = depoimentosRef;
        break;
      case 'precos':
        targetRef = precosRef;
        break;
      case 'contato':
        targetRef = contatoRef;
        break;
      default:
        targetRef = heroRef;
    }

    const topOffset = targetRef.current?.offsetTop ?? 0;
    window.scrollTo({
      top: topOffset - 80,
      behavior: "smooth",
    });

  };

  // Detector de scroll para destacar a seção ativa no menu
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Ajuste para melhor detecção

      const sections = [
        { id: "hero", ref: heroRef },
        { id: "sobre", ref: sobreRef },
        { id: "recursos", ref: recursosRef },
        { id: "depoimentos", ref: depoimentosRef },
        { id: "precos", ref: precosRef },
        { id: "contato", ref: contatoRef }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carousel de depoimentos automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-xl px-6 py-4 flex items-center justify-between text-white border-b border-gray-800">
        <a onClick={() => scrollToSection('hero')} className="text-3xl font-extrabold tracking-tight hover:text-blue-500 transition-all flex items-center cursor-pointer">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ConnectaSys</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              onClick={() => scrollToSection(item.sectionId)}
              className={`cursor-pointer hover:text-blue-500 transition-all ${activeSection === item.sectionId ? 'text-blue-500 font-medium' : 'text-gray-300'}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">

          <Link
            href="/login"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30"
          >
            Login
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-40 pt-20 px-6 flex flex-col items-center md:hidden">
          {navItems.map((item, index) => (
            <a
              key={index}
              onClick={() => scrollToSection(item.sectionId)}
              className={`py-4 text-xl font-medium cursor-pointer ${activeSection === item.sectionId ? 'text-blue-500' : 'text-gray-300 hover:text-blue-500'} transition-all`}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col space-y-4 w-full">       
            <Link
              href="/login"
              className="py-3 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-full shadow-lg">
              Login
            </Link>


          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="w-full flex flex-col items-center justify-center text-center pt-40 pb-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center -z-10">
          <div className="w-full h-full max-w-6xl mx-auto">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/3 right-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob animation-delay-4000" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight">
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-600 bg-clip-text text-transparent">
            Transforme sua oficina com automação inteligente
          </span>
        </h1>
        <p className="text-gray-300 text-xl mt-6 max-w-xl leading-relaxed">
          Aumente sua produtividade, automatize processos e tenha relatórios completos em tempo real.
        </p>
        <div className="mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <a href="#" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30 flex items-center justify-center w-full md:w-auto">
            Experimente Grátis
            <ArrowRight className="ml-2" size={18} />
          </a>
          <a href="#" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-all border border-gray-800 hover:border-gray-700 shadow-lg flex items-center justify-center w-full md:w-auto group">
            Ver Demonstração
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
        <div className="mt-12 text-gray-500 flex items-center space-x-2">
          <Shield size={16} />
          <span>Teste gratuito por 14 dias • Sem necessidade de cartão</span>
        </div>

        {/* Stats */}
        <div className="w-full max-w-5xl mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { label: "Oficinas Atendidas", value: "2.500+" },
            { label: "Satisfação dos Clientes", value: "98%" },
            { label: "Economia de Tempo", value: "35%" },
            { label: "Aumento na Produtividade", value: "47%" }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{stat.value}</h3>
              <p className="text-gray-400 text-sm md:text-base mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos Section */}
      <section ref={sobreRef} id="sobre" className="py-24 w-full bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Sobre Nós
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No <span className="text-blue-500 font-semibold">ConnectaSys</span>, acreditamos no poder da tecnologia para transformar a gestão de oficinas mecânicas. Nosso objetivo é oferecer soluções inovadoras que otimizam processos e impulsionam o crescimento dos nossos clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inovação e Tecnologia",
                desc: "Utilizamos tecnologia de ponta para criar ferramentas intuitivas e eficientes para o dia a dia da sua oficina.",
                icon: <Zap className="text-blue-500" size={28} />
              },
              {
                title: "Compromisso com o Cliente",
                desc: "Nosso foco é entender as necessidades da sua empresa e oferecer soluções personalizadas para o seu sucesso.",
                icon: <Shield className="text-blue-500" size={28} />
              },
              {
                title: "Resultados Comprovados",
                desc: "Empresas que utilizam o ConnectaSys reduzem custos operacionais e aumentam sua produtividade.",
                icon: <Star className="text-blue-500" size={28} />
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl hover:shadow-blue-500/10 hover:border-gray-700 transition-all flex flex-col group">
                <div className="bg-gray-800 p-4 rounded-xl bg-opacity-60 mb-6 w-14 h-14 flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400 mt-3">{item.desc}</p>
                <a href="#" className="mt-4 text-blue-500 inline-flex items-center group/link">
                  Saiba mais
                  <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Recursos Section */}
      <section ref={recursosRef} id="recursos" className="py-24 w-full bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Recursos Poderosos
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Soluções completas para transformar o gerenciamento da sua oficina mecânica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl hover:shadow-blue-500/10 hover:border-gray-700 transition-all flex flex-col group">
                <div className="bg-gray-800 p-4 rounded-xl bg-opacity-60 mb-6 w-14 h-14 flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-400 mt-3">{feature.desc}</p>
                <a href="#" className="mt-4 text-blue-500 inline-flex items-center group/link">
                  Saiba mais
                  <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section ref={depoimentosRef} id="depoimentos" className="py-24 w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                O que nossos clientes dizem
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Veja como o ConnectaSys está transformando oficinas por todo o Brasil
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {depoimentos.map((depoimento, index) => (
                <div key={index} className="min-w-full">
                  <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 mx-auto max-w-2xl">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-500">
                        {depoimento.nome.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-semibold text-white">{depoimento.nome}</h4>
                        <p className="text-gray-400">{depoimento.empresa}</p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < depoimento.rating ? "#3B82F6" : "none"} color={i < depoimento.rating ? "#3B82F6" : "#6B7280"} size={20} />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg italic">{depoimento.comentario}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {depoimentos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-700'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preços Section */}
      <section ref={precosRef} id="precos" className="py-24 w-full bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Planos que cabem no seu bolso
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Escolha o plano ideal para impulsionar sua oficina
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-gray-900 rounded-2xl ${plan.popular ? 'border-blue-500' : 'border-gray-800'} border-2 shadow-xl overflow-hidden relative group`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 transform translate-x-8 translate-y-4 rotate-45">
                    POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className={`p-4 rounded-xl mb-6 w-14 h-14 flex items-center justify-center ${plan.popular ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Zap size={16} className="mr-2 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-8 w-full py-3 rounded-lg font-medium transition-all ${plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}>
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Procurando um plano customizado para sua rede de oficinas?
            </p>
            <a href="#" className="text-blue-500 inline-flex items-center mt-2 font-medium hover:text-blue-400 transition-colors">
              Entre em contato com nossa equipe
              <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 w-full bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Pronto para revolucionar sua oficina?
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
            Junte-se a milhares de oficinas que já otimizaram seus processos com o ConnectaSys
          </p>
          <a href="#" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30">
            Experimente Grátis por 14 Dias
          </a>
          <p className="mt-6 text-gray-500 flex items-center justify-center">
            <Shield size={16} className="mr-2" />
            Sem necessidade de cartão de crédito
          </p>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer ref={contatoRef} id="contato" className="bg-black text-gray-400 py-16 border-t border-gray-800 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <a onClick={() => scrollToSection('hero')} className="text-2xl font-bold tracking-tight flex items-center text-white mb-4 cursor-pointer">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ConnectaSys</span>
              </a>
              <p className="mt-2">Solução completa para gestão de oficinas mecânicas.</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-3">
                <li><a onClick={() => scrollToSection('produtos')} className="hover:text-blue-500 transition-all cursor-pointer">Produtos</a></li>
                <li><a onClick={() => scrollToSection('recursos')} className="hover:text-blue-500 transition-all cursor-pointer">Recursos</a></li>
                <li><a onClick={() => scrollToSection('precos')} className="hover:text-blue-500 transition-all cursor-pointer">Preços</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Suporte</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-500 transition-all">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Documentação</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Contato</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-500 transition-all">Sobre nós</a></li>
                <li><a onClick={() => scrollToSection('depoimentos')} className="hover:text-blue-500 transition-all cursor-pointer">Depoimentos</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Carreira</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-all">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ConnectaSys. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}

