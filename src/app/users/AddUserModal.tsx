import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UsersPagination = ({ paginaAtual, totalPaginas, usuariosFiltrados, registrosPorPagina, handlePaginacao }) => {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-0">
      <div className="text-sm text-gray-600">
        {usuariosFiltrados.length > 0 ? (
          <>Mostrando {((paginaAtual - 1) * registrosPorPagina) + 1} a {Math.min(paginaAtual * registrosPorPagina, usuariosFiltrados.length)} de {usuariosFiltrados.length} registros</>
        ) : (
          <>Nenhum registro encontrado</>
        )}
      </div>
      
      {usuariosFiltrados.length > 0 && (
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePaginacao.irParaPaginaAnterior} 
            disabled={paginaAtual === 1}
            className={`p-2 rounded-lg flex items-center justify-center ${paginaAtual === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Botões de números de páginas */}
          {[...Array(totalPaginas)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePaginacao.irParaPagina(index + 1)}
              className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${
                paginaAtual === index + 1 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={handlePaginacao.irParaProximaPagina} 
            disabled={paginaAtual === totalPaginas}
            className={`p-2 rounded-lg flex items-center justify-center ${paginaAtual === totalPaginas ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersPagination;