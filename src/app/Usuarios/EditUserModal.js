'use client';
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

import userService from "../../lib/services/userService";

const EditUserModal = ({
  isOpen,
  onClose,
  user,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    passwordHash: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    role: "user",
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    setIsClient(true);

    // Preenche o formulário quando o usuário é passado (modo edição)
    if (user && isOpen) {
      setUserFormData({
        id: user.id || '',
        firstName: user.firstName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        passwordHash: "", // Não preenchemos a senha por segurança
        gender: user.gender || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        zipCode: user.zipCode || "",
        role: user.role || "user",
        isActive: user.isActive !== undefined ? user.isActive : true,
        createdAt: user.createdAt || new Date().toISOString(),
      });
    } else {
      // Reseta para valores padrão (modo criação)
      setUserFormData({
        firstName: "",
        email: "",
        phoneNumber: "",
        passwordHash: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        role: "user",
        isActive: true,
        createdAt: new Date().toISOString(),
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const checked = event.target.checked;

    setUserFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('🚀 Iniciando handleFormSubmit em EditUserModal');
    console.log('📝 Dados do formulário:', userFormData);
    
    try {
      console.log('⏳ Definindo loading como true');
      setIsLoading(true);
  
      const userPayload = {
        ...userFormData,
        // Envia a senha em texto plano (o backend fará o hash)
        PasswordHash: userFormData.passwordHash || user?.PasswordHash
      };
      console.log('📦 UserPayload inicial:', userPayload);
  
      // Remove o campo não hasheado do payload
      if ('passwordHash' in userPayload) {
        console.log('🔄 Removendo campo passwordHash do payload');
        delete userPayload.passwordHash;
      }
      
      console.log('📦 UserPayload final:', userPayload);
      console.log('📡 Chamando userService.CreateOrUpdateUser');
      
      const updatedUser = await userService.CreateOrUpdateUser(userPayload);
      console.log('✅ Resposta do CreateOrUpdateUser:', updatedUser);
  
      console.log('🔄 Criando objeto de dados completo para callback de sucesso');
      const completeUserData = {
        ...user,
        ...updatedUser,
        id: user.id
      };
      console.log('📦 Dados completos do usuário:', completeUserData);
  
      console.log('🎉 Chamando callback de sucesso e fechando modal');
      onSuccess(completeUserData);
      onClose();
    } catch (error) {
      console.log('❌ Erro durante a atualização do usuário');
      console.log('📛 Nome do erro:', error.name);
      console.log('💬 Mensagem de erro:', error.message);
      console.log('🔍 Resposta da API:', error.response?.data);
      console.log('🔢 Status HTTP:', error.response?.status);
      console.log('📝 Objeto de erro completo:', error);
      
      console.error('Erro ao atualizar usuário:', error);
      alert(`Erro ao atualizar usuário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      console.log('🏁 Finalizando processo, definindo loading como false');
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setUserFormData({
      firstName: "",
      email: "",
      phoneNumber: "",
      passwordHash: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      role: "user",
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    setShouldShowPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-auto z-60">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {userFormData.id ? "Editar Usuário" : "Adicionar Usuário"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-2 hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Linha 1: Nome - Email */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userFormData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="Digite o nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o email"
                />
              </div>


              <div>
                <label htmlFor="passwordHash" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha*
                </label>
                <div className="relative">
                  <input
                    type={shouldShowPassword ? "text" : "password"}
                    id="passwordHash"
                    name="passwordHash"
                    value={userFormData.passwordHash}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 pr-12"
                    placeholder="Digite a senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShouldShowPassword(!shouldShowPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    aria-label={shouldShowPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {shouldShowPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userFormData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o telefone"
                />
              </div>


              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gênero
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userFormData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Selecione</option>
                  <option value="masculine">Masculino</option>
                  <option value="feminine">Feminino</option>
                  <option value="other">Outro</option>
                  <option value="prefer_not_to_say">Prefiro não informar</option>
                </select>
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={userFormData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o CEP"
                />
              </div>


              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userFormData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o endereço"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userFormData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite a cidade"
                />
              </div>


              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={userFormData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o estado"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={userFormData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Digite o país"
                />
              </div>


              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Perfil*
                </label>
                <select
                  id="role"
                  name="role"
                  value={userFormData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Selecione</option>
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                  <option value="manager">Gerente</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={userFormData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Usuário ativo
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Salvando...
                  </>
                ) : (
                  "Salvar Usuário"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;