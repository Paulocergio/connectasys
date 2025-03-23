import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, CheckCircle, XCircle, ChevronDown, Search, RefreshCw } from 'lucide-react';
import { userService } from "../../lib/services/userService"; 

const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  useEffect(() => {
    fetchUsuarios();
  }, []);
  
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsuarios(data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError(err.message || "Falha ao carregar a lista de usuários");
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dateString || "-";
    }
  };

  const iniciarEdicao = (usuario) => {
    console.log("Iniciar edição de usuário:", usuario);
    // Implementar lógica de edição
  };
  
  const deletarUsuario = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsuarios(usuarios.filter(user => user.id !== id));
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error);
      alert(`Erro ao excluir usuário: ${error.message}`);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsuarios = usuarios.filter(user => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsuarios = [...filteredUsuarios].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  if (loading) {
    return (
      <div className="w-full p-12 text-center bg-white rounded-xl shadow-md">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-center bg-red-50 rounded-xl border border-red-100 shadow-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-600 font-medium text-lg mb-2">Ops! Algo deu errado</p>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.href = '/login'} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Ir para login
          </button>
          <button 
            onClick={() => fetchUsuarios()} 
            className="px-6 py-2 flex items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4" /> Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full border border-gray-100">
      {/* Cabeçalho com título e pesquisa */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-bold text-gray-800">Gerenciamento de Usuários</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 transition-all"
          />
        </div>
      </div>

      {/* Status da pesquisa */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
        <p className="text-sm text-gray-600">
          Exibindo {filteredUsuarios.length} {filteredUsuarios.length === 1 ? 'usuário' : 'usuários'}
          {searchTerm && ` para "${searchTerm}"`}
        </p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th onClick={() => handleSort('firstName')} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  Nome
                  {sortField === 'firstName' && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('email')} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  Email
                  {sortField === 'email' && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CEP</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
              <th onClick={() => handleSort('isActive')} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  Status
                  {sortField === 'isActive' && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('createdAt')} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  Criado em
                  {sortField === 'createdAt' && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedUsuarios.length > 0 ? (
              sortedUsuarios.map((usuario, index) => (
                <tr key={usuario.id || index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{usuario.firstName || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.email || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.phoneNumber || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.gender || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.address || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.city || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.state || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.country || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.zipCode || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.role || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {usuario.isActive ? (
                        <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle className="h-4 w-4 mr-1" /> Ativo
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                          <XCircle className="h-4 w-4 mr-1" /> Inativo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(usuario.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => iniciarEdicao(usuario)}
                        className="p-1.5 bg-blue-100 rounded-lg text-blue-600 hover:text-blue-900 hover:bg-blue-200 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.firstName}?`)) {
                            deletarUsuario(usuario.id);
                          }
                        }}
                        className="p-1.5 bg-red-100 rounded-lg text-red-600 hover:text-red-900 hover:bg-red-200 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-gray-400 text-4xl mb-2">🔍</div>
                    <p className="text-gray-500 font-medium">Nenhum usuário encontrado</p>
                    {searchTerm && (
                      <p className="text-gray-400 text-sm mt-1">
                        Tente usar termos diferentes na busca
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Rodapé com contagem e paginação */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="text-sm text-gray-500">
          Total: {usuarios.length} {usuarios.length === 1 ? 'usuário' : 'usuários'}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
            Anterior
          </button>
          <div className="flex">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">1</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-gray-600 rounded-md">2</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-gray-600 rounded-md">3</button>
          </div>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;