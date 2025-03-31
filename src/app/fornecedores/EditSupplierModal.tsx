"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Building, Truck, Phone, Mail, MapPin } from 'lucide-react';

interface SupplierFormData {
  id?: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
}

interface EditSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: SupplierFormData | null;
  onSuccess: (updatedSupplier: SupplierFormData) => void;
}

const EditSupplierModal: React.FC<EditSupplierModalProps> = ({ 
  isOpen, 
  onClose, 
  supplier, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Brasil",
    zipCode: "",
    category: "geral",
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        ...supplier,
        createdAt: supplier.createdAt || new Date().toISOString()
      });
    }
  }, [supplier]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
    onClose();
  };

  if (!isOpen || !supplier) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4">


            
            <Building className="text-blue-600" size={28} strokeWidth={2} />
            <h2 className="text-2xl font-semibold text-gray-800">
              Editar Fornecedor
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-2 hover:bg-gray-100"
            aria-label="Fechar modal"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>
  
        {/* Corpo do Modal */}
        <div className="bg-white p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Nome/Razão Social */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome/Razão Social*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nome do fornecedor"
                />
              </div>
  
              {/* Campo CNPJ */}
              <div className="space-y-2">
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                  CNPJ*
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="00.000.000/0000-00"
                />
              </div>
  
              {/* Campo Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="email@fornecedor.com"
                />
              </div>
  
              {/* Campo Telefone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>
  
              {/* Campo Categoria */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="geral">Geral</option>
                  <option value="materia-prima">Matéria-prima</option>
                  <option value="servicos">Serviços</option>
                  <option value="equipamentos">Equipamentos</option>
                </select>
              </div>
  
              {/* Campo CEP */}
              <div className="space-y-2">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="00000-000"
                />
              </div>
  
              {/* Campo Endereço */}
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Rua, número, complemento"
                />
              </div>
  
              {/* Campo Cidade */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Cidade"
                />
              </div>
  
              {/* Campo Estado */}
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="UF"
                />
              </div>
  
              {/* Campo País */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="País"
                />
              </div>
  
              {/* Checkbox Ativo */}
              <div className="flex items-center space-y-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Fornecedor ativo
                </label>
              </div>
            </div>
  
            {/* Rodapé do Modal */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center gap-2"
              >
                <CheckCircle size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );


};

export default EditSupplierModal;