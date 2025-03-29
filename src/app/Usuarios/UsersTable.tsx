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
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { userService } from "../../lib/services/userService";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Usuario, UserResponse } from "../../lib/services/types/userTypes";
import UsersPagination from "./UsersPagination";

const ElegantUsersTable = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Usuario | null>(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<Usuario | null>(null);
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsuarios(data.map((user) => ({ ...user, id: String(user.id) })));
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
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Cálculos de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.firstName?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      usuario.role?.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const sortedUsuarios = [...usuariosFiltrados].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = String(a[sortField] || "");
    const bValue = String(b[sortField] || "");

    return sortDirection === "asc" 
      ? aValue.localeCompare(bValue) 
      : bValue.localeCompare(aValue);
  });

  const currentItems = sortedUsuarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsuarios.length / itemsPerPage);

  // Funções de navegação
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPage = (page: number) => setCurrentPage(page);

  const openDeleteModal = (userId: string) => {
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

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  const handleSort = (field: keyof Usuario) => {
    setSortDirection(sortField === field && sortDirection === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const toggleUserDetails = (userId: Usuario["id"]): void => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleAddUserSuccess = (newUser: UserResponse) => {
    setUsuarios([...usuarios, { ...newUser, id: String(newUser.id) }]);
  };

  const handlePesquisaChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTermoPesquisa(event.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  const iniciarEdicao = (usuario: Usuario) => {
    setSelectedUserForEdit(usuario);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedUser: any): void => {
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
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
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
                <th
                  onClick={() => handleSort("firstName")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    Usuário
                    {sortField === "firstName" && (
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          sortDirection === "desc" ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Email
                    {sortField === "email" && (
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          sortDirection === "desc" ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("role")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Perfil
                    {sortField === "role" && (
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          sortDirection === "desc" ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("isActive")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortField === "isActive" && (
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          sortDirection === "desc" ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((usuario) => (
                  <React.Fragment key={usuario.id}>
                    <tr
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleUserDetails(usuario.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800">
                              {usuario.firstName || "-"}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {usuario.email || "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-500">
                          {usuario.email || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-500">
                          {usuario.role || "-"}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              iniciarEdicao(usuario);
                            }}
                            className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg active:scale-95"
                            title="Editar"
                          >
                            <span className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            <Edit2 className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                          </button>

                          <button
                            className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-rose-100 shadow-md transition-all duration-300 hover:bg-rose-200 hover:shadow-lg active:scale-95"
                            title="Excluir"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(usuario.id);
                            }}
                            disabled={isDeleting === Number(usuario.id)}
                          >
                            <span className="absolute inset-0 bg-rose-300 opacity-0 group-hover:opacity-20 transition-opacity"></span>
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
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Telefone
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.phoneNumber || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Gênero
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.gender || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Endereço
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.address || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Cidade
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.city || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Estado
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.state || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                País
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.country || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                CEP
                              </div>
                              <div className="text-sm text-gray-800">
                                {usuario.zipCode || "-"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Criado em
                              </div>
                              <div className="text-sm text-gray-800">
                                {formatDate(usuario.createdAt)}
                              </div>
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

        {/* Componente de paginação */}
        <UsersPagination
          currentPage={currentPage}
          totalItems={sortedUsuarios.length}
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

export default ElegantUsersTable;