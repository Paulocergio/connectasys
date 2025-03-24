import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, UserPlus } from 'lucide-react';
import { userService } from "../../lib/services/userService";
import bcrypt from 'bcryptjs';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
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
    createdAt: "",
  });

  useEffect(() => {
    setIsClient(true);
    setFormData((prev) => ({
      ...prev,
      createdAt: new Date().toISOString(),
    }));
  }, []);

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}

  const handleChange = (e: HandleChangeEvent): void => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      alert("Por favor, preencha o campo Nome.");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Por favor, preencha o campo Email com um email válido.");
      return;
    }
    if (!formData.passwordHash.trim()) {
      alert("Por favor, preencha o campo Senha.");
      return;
    }
    if (formData.passwordHash.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (!formData.role) {
      alert("Por favor, selecione o Perfil.");
      return;
    }

    try {
      setLoading(true);
      const hashedPassword: string = await bcrypt.hash(formData.passwordHash, 10);
      const userData: UserPayload = {
        ...formData,
        passwordHash: hashedPassword,
      };
      const newUser: UserResponse = await userService.createUser(userData);
      onSuccess(newUser);
      resetForm();
      onClose();
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : "Erro desconhecido";
      alert(`Erro ao adicionar usuário: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  interface UserPayload {
    firstName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  }

  interface UserResponse {
    id?: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
  }

  const resetForm = () => {
    setFormData({
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
    setShowPassword(false);
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-auto z-60">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <UserPlus className="text-blue-600" size={28} strokeWidth={2} />
              <h2 className="text-2xl font-semibold text-gray-800">
                Adicionar Novo Usuário
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

          {/* Rest of the form remains the same as in the previous implementation */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Form content (unchanged from previous version) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                    placeholder="Digite o nome"
                  />
                </div>

              {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o email"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="passwordHash" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Senha*
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="passwordHash"
                      name="passwordHash"
                      value={formData.passwordHash}
                      onChange={handleChange}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 pr-12"
                      placeholder="Digite a senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                    </button>
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o telefone"
                  />
                </div>

                {/* Gender Select */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gênero
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Selecione</option>
                    <option value="masculine">Masculino</option>
                    <option value="feminine">Feminino</option>
                    <option value="other">Outro</option>
                    <option value="prefer_not_to_say">Prefiro não informar</option>
                  </select>
                </div>

                {/* Role Select */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Perfil*
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Selecione</option>
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                  </select>
                </div>

                {/* Active User Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Usuário ativo
                  </label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Address Input */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o endereço"
                  />
                </div>

                {/* City Input */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite a cidade"
                  />
                </div>

                {/* State Input */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o estado"
                  />
                </div>

                {/* Country Input */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o país"
                  />
                </div>

                {/* Zip Code Input */}
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/30 border border-gray-300/70 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Digite o CEP"
                  />
                </div>
              </div>
       
            </div>

            {/* Action Buttons */}
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
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
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

export default AddUserModal;