import { Box, Calendar, BarChart, Zap, ArrowRight } from "lucide-react";

interface PricingProps {
  id: string;
}
export const Pricing = ({ id }: PricingProps) => {
  const pricingPlans = [
    {
      title: "Plano Básico",
      price: "R$ 99",
      period: "/mês",
      features: ["Gestão de Estoque", "Agendamentos Online", "Suporte por Email", "1 Usuário"],
      icon: <Box className="text-blue-500" size={24} />,
      popular: false,
      ctaText: "Começar Agora"
    },
    {
      title: "Plano Profissional",
      price: "R$ 199",
      period: "/mês",
      features: ["Tudo do Básico", "Relatórios Inteligentes", "Suporte Prioritário", "5 Usuários"],
      icon: <Calendar className="text-blue-500" size={24} />,
      popular: true,
      ctaText: "Escolher Plano"
    },
    {
      title: "Plano Empresarial",
      price: "R$ 299",
      period: "/mês",
      features: ["Tudo do Profissional", "Integrações Avançadas", "Consultoria Personalizada", "Usuários Ilimitados"],
      icon: <BarChart className="text-blue-500" size={24} />,
      popular: false,
      ctaText: "Contate Vendas"
    },
  ];

  return (
    <section id="precos" className="py-12 sm:py-16 md:py-24 w-full bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Planos que cabem no seu bolso
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Escolha o plano ideal para impulsionar sua oficina
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-gray-900 rounded-2xl ${plan.popular ? 'border-blue-500' : 'border-gray-800'} border-2 shadow-xl overflow-hidden relative group`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 transform translate-x-8 translate-y-4 rotate-45">
                  POPULAR
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className={`p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center ${plan.popular ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{plan.title}</h3>
                <div className="mt-3 sm:mt-4 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1 text-sm sm:text-base">{plan.period}</span>
                </div>
                <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300 text-sm sm:text-base">
                      <Zap size={14} className="mr-2 text-blue-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-6 sm:mt-8 w-full py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${plan.popular
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg hover:shadow-blue-500/25'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}>
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Procurando um plano customizado para sua rede de oficinas?
          </p>
          <a href="#" className="text-blue-500 inline-flex items-center mt-2 font-medium hover:text-blue-400 transition-colors text-sm sm:text-base">
            Entre em contato com nossa equipe
            <ArrowRight className="ml-2 sm:w-4 sm:h-4" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}