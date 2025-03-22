import React from 'react';
import { UserPlus, Search } from 'lucide-react';

interface UsersHeaderProps {
  termoPesquisa: string;
  handlePesquisaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setModalAdicionar: (value: boolean) => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ termoPesquisa, handlePesquisaChange, setModalAdicionar }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar usuários..." 
            value={termoPesquisa}
            onChange={handlePesquisaChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          onClick={() => setModalAdicionar(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
        >
          <UserPlus size={18} />
          <span>Novo Usuário</span>
        </button>
      </div>
    </div>
  );
};

export default UsersHeader;