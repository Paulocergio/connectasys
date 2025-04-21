"use client";
import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  ChevronDown,
  RefreshCw,
  User,
  UserPlus,
  Search
} from "lucide-react";
import userService from "../../lib/services/userService";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UsersPagination from "./UsersPagination";

const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      const transformedData = data.map((user) => ({ ...user, id: String(user.id) }));
      setUsuarios(transformedData);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Falha ao carregar a lista de usuários"
      );
    } finally {
      setLoading(false);
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Ordenação
  const sortedUsuarios = [...usuarios].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtragem
  const filteredUsers = sortedUsuarios.filter(
    (usuario) =>
      usuario.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleUserDetails = (userId) => {
    setExpandedUser(prev => prev === userId ? null : userId);
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setIsDeleting(Number(userToDelete));
    try {
      await userService.deleteUser(Number(userToDelete));
      setUsuarios(usuarios.filter((user) => user.id !== userToDelete));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    } finally {
      setIsDeleting(null);
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (e) {
      return dateString;
    }
  };

  const handleAddUserSuccess = (newUser) => {
    setUsuarios([...usuarios, { ...newUser, id: String(newUser.id) }]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const iniciarEdicao = (usuario) => {
    setSelectedUserForEdit(usuario);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedUser) => {
    setUsuarios(prevUsuarios =>
      prevUsuarios.map(user =>
        user.id === updatedUser.id
          ? {
            ...user,
            ...updatedUser,
            firstName: updatedUser.firstName || user.firstName,
            email: updatedUser.email || user.email,
            role: updatedUser.role || user.role,
            isActive: updatedUser.isActive !== undefined ? updatedUser.isActive : user.isActive,
          }
          : user
      )
    );
  };

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
          onClick={fetchUsuarios}
          className="px-4 py-2 flex items-center gap-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors mx-auto"
        >
          <RefreshCw className="h-4 w-4" /> Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
     <div className="flex justify-between items-center">
  <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
  <div className="flex items-center gap-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar usuários..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
    </div>
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-blue-700"
    >
      <UserPlus size={18} />
      <span>Novo Usuário</span>
    </button>
  </div>
</div>

      <div className="bg-white rounded-lg shadow w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th onClick={() => requestSort('firstName')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center gap-1">
                    Usuário
                    {sortConfig?.key === 'firstName' && (
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th onClick={() => requestSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    Email
                    {sortConfig?.key === 'email' && (
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th onClick={() => requestSort('role')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    Perfil
                    {sortConfig?.key === 'role' && (
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th onClick={() => requestSort('isActive')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center gap-1">
                    Status
                    {sortConfig?.key === 'isActive' && (
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((usuario) => (
                  <React.Fragment key={usuario.id}>
                    <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleUserDetails(usuario.id)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800">
                              {usuario.firstName || '-'}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {usuario.email || '-'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-500">
                          {usuario.email || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-500">
                          {usuario.role || '-'}
                        </div>
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
                        <div className="flex items-center justify-end space-x-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); iniciarEdicao(usuario); }}
                            className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg active:scale-95"
                            title="Editar"
                          >
                            <Edit2 className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openDeleteModal(usuario.id); }}
                            className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-rose-100 shadow-md transition-all duration-300 hover:bg-rose-200 hover:shadow-lg active:scale-95"
                            title="Excluir"
                            disabled={isDeleting === Number(usuario.id)}
                          >
                            {isDeleting === Number(usuario.id) ? (
                              <RefreshCw className="h-5 w-5 text-rose-600 animate-spin" />
                            ) : (
                              <Trash2 className="h-5 w-5 text-rose-600 group-hover:text-rose-900 transition-colors" />
                            )}
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
                              <div className="text-sm text-gray-800">{usuario.phoneNumber || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Gênero</div>
                              <div className="text-sm text-gray-800">{usuario.gender || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Endereço</div>
                              <div className="text-sm text-gray-800">{usuario.address || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Cidade</div>
                              <div className="text-sm text-gray-800">{usuario.city || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Estado</div>
                              <div className="text-sm text-gray-800">{usuario.state || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">País</div>
                              <div className="text-sm text-gray-800">{usuario.country || '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">CEP</div>
                              <div className="text-sm text-gray-800">{usuario.zipCode || '-'}</div>
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
                    <p className="text-gray-500 font-medium mb-4">Nenhum usuário encontrado</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-blue-700"
                    >
                      <UserPlus size={18} />
                      <span>Adicionar Usuário</span>
                    </button>
                  </div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <UsersPagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddUserSuccess}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUserForEdit}
        onSuccess={handleEditSuccess}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        loading={isDeleting !== null}
        title="Excluir usuário"
        message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default UsersTable;