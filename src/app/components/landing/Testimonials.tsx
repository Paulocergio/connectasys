import { useState, useEffect } from "react";
import { Star } from "lucide-react";


interface TestimonialsProps {
  id: string;
  scrollToSection?: (sectionId: string) => void; 
}

export const Testimonials = ({ id, scrollToSection }: TestimonialsProps) => {
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [depoimentos.length]);

  interface TouchEventHandler {
    (e: React.TouchEvent<HTMLDivElement>): void;
  }

  const handleTouchStart: TouchEventHandler = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setActiveIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setActiveIndex((prevIndex) => (prevIndex === 0 ? depoimentos.length - 1 : prevIndex - 1));
    }
  };

  return (
    <section id="depoimentos" className="py-12 md:py-16 lg:py-24 w-full bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              O que nossos clientes dizem
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Veja como o ConnectaSys está transformando oficinas por todo o Brasil
          </p>
        </div>

        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {depoimentos.map((depoimento, index) => (
              <div key={index} className="min-w-full px-4">
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 sm:p-6 md:p-8 mx-auto max-w-2xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-blue-500">
                      {depoimento.nome.charAt(0)}
                    </div>
                    <div className="ml-3 md:ml-4">
                      <h4 className="text-lg sm:text-xl font-semibold text-white">{depoimento.nome}</h4>
                      <p className="text-sm sm:text-base text-gray-400">{depoimento.empresa}</p>
                    </div>
                  </div>
                  <div className="flex mb-4 md:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        fill={i < depoimento.rating ? "#3B82F6" : "none"} 
                        color={i < depoimento.rating ? "#3B82F6" : "#6B7280"} 
                        size={16} 
                        className="mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg italic">{depoimento.comentario}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {depoimentos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-700'}`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};