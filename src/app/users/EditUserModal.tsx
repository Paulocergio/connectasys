import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditUserModal = ({ setModalEditar, usuarioEmEdicao, salvarEdicao }) => {
  const [usuario, setUsuario] = useState({ ...usuarioEmEdicao });

  useEffect(() => {
    setUsuario({ ...usuarioEmEdicao });
  }, [usuarioEmEdicao]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleSubmit = () => {
    salvarEdicao(usuario);
  };

  // Função para gerar um gradiente de cor para o avatar baseado no nome do usuário
  const getAvatarGradient = (nome) => {
    const hash = nome.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-purple-500 to-indigo-600',
      'from-blue-500 to-teal-500',
      'from-green-500 to-emerald-600',
      'from-yellow-500 to-orange-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-red-500 to-pink-600',
      'from-teal-500 to-cyan-600',
      'from-orange-500 to-amber-600',
      'from-cyan-500 to-blue-600',
    ];
    return gradients[hash % gradients.length];
  };

  // Função para obter as iniciais do nome do usuário
  const getIniciais = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarGradient(usuario.nome)} rounded-full flex items-center justify-center text-white font-bold`}>
              {getIniciais(usuario.nome)}
            </div>
            <h2 className="text-xl font-bold text-gray-800">Editar Usuário</h2>
          </div>
          <button 
            onClick={() => setModalEditar(false)}
            className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={handleEditChange}
              placeholder="Digite o nome completo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleEditChange}
              placeholder="Digite o email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input
              type="text"
              name="cargo"
              value={usuario.cargo}
              onChange={handleEditChange}
              placeholder="Digite o cargo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setModalEditar(false)}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;