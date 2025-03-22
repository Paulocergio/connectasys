import React from 'react';
import { Coffee, Edit2, Shield, UserCheck, Trash2 } from 'lucide-react';

const UsersTable = ({ usuarios, iniciarEdicao, deletarUsuario }) => {
  // Função para obter o ícone do cargo
  const getCargoIcon = (cargo) => {
    switch(cargo.toLowerCase()) {
      case 'desenvolvedor frontend':
      case 'desenvolvedora frontend':
      case 'desenvolvedor backend':
      case 'desenvolvedora backend':
      case 'engenheiro de software':
      case 'engenheira de software':
        return <Coffee className="h-4 w-4 mr-1" />;
      case 'ux researcher':
      case 'designer':
        return <Edit2 className="h-4 w-4 mr-1" />;
      case 'product owner':
      case 'tech lead':
      case 'scrum master':
        return <Shield className="h-4 w-4 mr-1" />;
      default:
        return <UserCheck className="h-4 w-4 mr-1" />;
    }
  };

  // Função para obter a cor do badge baseado no cargo
  const getCargoColor = (cargo) => {
    const cargoLower = cargo.toLowerCase();
    if (cargoLower.includes('desenvolvedor') || cargoLower.includes('desenvolvedora') || cargoLower.includes('engenheiro') || cargoLower.includes('engenheira')) {
      return 'bg-indigo-100 text-indigo-800';
    } else if (cargoLower.includes('ux') || cargoLower.includes('designer')) {
      return 'bg-pink-100 text-pink-800';
    } else if (cargoLower.includes('product') || cargoLower.includes('lead') || cargoLower.includes('master')) {
      return 'bg-amber-100 text-amber-800';
    } else if (cargoLower.includes('qa') || cargoLower.includes('test')) {
      return 'bg-purple-100 text-purple-800';
    } else if (cargoLower.includes('dados') || cargoLower.includes('analista')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-emerald-100 text-emerald-800';
    }
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full border border-gray-100">
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-12 w-12 bg-gradient-to-br ${getAvatarGradient(usuario.nome)} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                      {getIniciais(usuario.nome)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{usuario.nome}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-500 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    {usuario.email}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`px-3 py-1.5 inline-flex items-center text-xs font-medium rounded-full ${getCargoColor(usuario.cargo)}`}>
                    {getCargoIcon(usuario.cargo)}
                    {usuario.cargo}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => iniciarEdicao(usuario)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-all"
                      title="Editar usuário"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deletarUsuario(usuario.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-all"
                      title="Excluir usuário"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;