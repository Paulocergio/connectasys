import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, CheckCircle, XCircle, ChevronDown, RefreshCw, User } from 'lucide-react';
import { userService } from "../../lib/services/userService"; 

const ElegantUsersTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedUser, setExpandedUser] = useState(null);
  
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

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const sortedUsuarios = [...usuarios].sort((a, b) => {
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
      <div className="w-full p-8 text-center bg-white rounded-lg shadow">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 text-center bg-white rounded-lg shadow">
        <div className="text-gray-400 text-4xl mb-2">⚠️</div>
        <p className="text-gray-600 font-medium mb-2">Algo deu errado</p>
        <p className="text-gray-500 mb-4 text-sm">{error}</p>
        <button 
          onClick={() => fetchUsuarios()} 
          className="px-4 py-2 flex items-center gap-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors mx-auto"
        >
          <RefreshCw className="h-4 w-4" /> Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow w-full">
      <div className="px-6 py-4 border-b border-gray-100">
        
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th onClick={() => handleSort('firstName')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center gap-1">
                  Usuário
                  {sortField === 'firstName' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell">
                <div className="flex items-center gap-1">
                  Email
                  {sortField === 'email' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('role')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell">
                <div className="flex items-center gap-1">
                  Perfil
                  {sortField === 'role' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('isActive')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center gap-1">
                  Status
                  {sortField === 'isActive' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sortedUsuarios.length > 0 ? (
              sortedUsuarios.map((usuario) => (
                <React.Fragment key={usuario.id}>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleUserDetails(usuario.id)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-800">{usuario.firstName || "-"}</div>
                          <div className="text-sm text-gray-500 md:hidden">{usuario.email || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-500">{usuario.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-500">{usuario.role || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      {usuario.isActive ? (
                        <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" /> Ativo
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-rose-100 text-rose-800">
                          <XCircle className="h-3 w-3 mr-1 text-rose-500" /> Inativo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            iniciarEdicao(usuario);
                          }}
                          className="p-1 bg-gray-100 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.firstName}?`)) {
                              deletarUsuario(usuario.id);
                            }
                          }}
                          className="p-1 bg-rose-100 rounded-md text-rose-600 hover:text-rose-900 hover:bg-rose-200 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedUser === usuario.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Telefone</div>
                            <div className="text-sm text-gray-800">{usuario.phoneNumber || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Gênero</div>
                            <div className="text-sm text-gray-800">{usuario.gender || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Endereço</div>
                            <div className="text-sm text-gray-800">{usuario.address || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Cidade</div>
                            <div className="text-sm text-gray-800">{usuario.city || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Estado</div>
                            <div className="text-sm text-gray-800">{usuario.state || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">País</div>
                            <div className="text-sm text-gray-800">{usuario.country || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">CEP</div>
                            <div className="text-sm text-gray-800">{usuario.zipCode || "-"}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Criado em</div>
                            <div className="text-sm text-gray-800">{formatDate(usuario.createdAt)}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-gray-300 text-4xl mb-2">📋</div>
                    <p className="text-gray-500 font-medium">Nenhum usuário encontrado</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElegantUsersTable;