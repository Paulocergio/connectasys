"use client";

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle, Building, Truck, Phone, Mail, MapPin } from 'lucide-react';
import { supplierService } from '@/lib/services/SupplierService';

const AddSupplierModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Brasil',
    zipCode: '',
    category: 'geral',
    isActive: true,
    secondaryEmail: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchedCnpj, setLastSearchedCnpj] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const cnpjInputRef = useRef(null);

  // Fecha o toast após 5 segundos
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const formatCNPJ = (cnpj) => {
    return cnpj
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatCEP = (cep) => {
    return cep
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };

  const validateForm = () => {
    // Validação mínima - apenas verificar se o CNPJ tem o formato correto se for fornecido
    if (formData.cnpj && formData.cnpj.replace(/\D/g, '').length !== 14) {
      setToast({ show: true, message: 'CNPJ deve ter 14 dígitos', type: 'error' });
      cnpjInputRef.current?.focus();
      return false;
    }

    return true;
  };

  const fetchSupplierData = async () => {
    const cleanCnpj = formData.cnpj.replace(/\D/g, '');

    if (cleanCnpj.length === 14 && cleanCnpj !== lastSearchedCnpj) {
      setIsLoading(true);
      try {
        const supplier = await supplierService.getSupplierByCNPJ(cleanCnpj);
        setLastSearchedCnpj(cleanCnpj);

        // Observe que estamos preenchendo os campos, mas permitindo a edição manual posterior
        setFormData(prev => ({
          ...prev,
          name: supplier.razaoSocial || supplier.nomeFantasia || prev.name,
          cnpj: cleanCnpj,
          address: `${supplier.endereco?.logradouro || ''} ${supplier.endereco?.numero || ''}`.trim() || prev.address,
          city: supplier.endereco?.municipio || prev.city,
          state: supplier.endereco?.uf || prev.state,
          zipCode: formatCEP(supplier.endereco?.cep || '') || prev.zipCode,
          isActive: supplier.situacaoCadastral === 'ATIVA',
          email: prev.email,
          phone: prev.phone,
          country: prev.country,
          category: prev.category
        }));
      } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        setToast({ show: true, message: 'Fornecedor não encontrado na base de dados', type: 'warning' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCnpjBlur = async () => {
    await fetchSupplierData();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSupplierData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.cnpj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
  
    try {
      const cleanCnpj = formData.cnpj.replace(/\D/g, '');
      const cleanZipCode = formData.zipCode.replace(/\D/g, '');
  
      // Structure data directly as the API expects it
      const supplierToCreate = {
        name: formData.name,
        cnpj: cleanCnpj,
        fantasyName: "", // Add missing fields 
        cadastralSituation: formData.isActive ? "ATIVA" : "INATIVA",
        cnaeDescription: "",
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address.split(',')[0]?.trim() || '',
          number: formData.address.split(',')[1]?.trim() || '',
          district: "", // Add missing fields
          complement: "",
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: cleanZipCode
        },
        category: formData.category
        
      };
  
      const createdSupplier = await supplierService.createSupplier(supplierToCreate);
      
      setToast({ show: true, message: 'Fornecedor cadastrado com sucesso!', type: 'success' });
      onSuccess(createdSupplier);
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar fornecedor';
      setToast({ show: true, message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-md ${
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        } text-white shadow-lg z-50`}>
          {toast.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Building className="text-blue-600" size={28} strokeWidth={2} />
            <h2 className="text-2xl font-semibold text-gray-800">Adicionar Novo Fornecedor</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-2 hover:bg-gray-100"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CNPJ Field */}
            <div className="relative">
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ
              </label>
              <input
                ref={cnpjInputRef}
                type="text"
                id="cnpj"
                name="cnpj"
                value={formatCNPJ(formData.cnpj)}
                onChange={handleInputChange}
                onBlur={handleCnpjBlur}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="00.000.000/0000-00"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-3 top-9">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome/Razão Social
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Nome do fornecedor"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="email@fornecedor.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="geral">Geral</option>
                <option value="materia-prima">Matéria-prima</option>
                <option value="servicos">Serviços</option>
                <option value="equipamentos">Equipamentos</option>
              </select>
            </div>

            {/* ZIP Code Field */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="00000-000"
              />
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Rua, número, complemento"
              />
            </div>

            {/* City Field */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Cidade"
              />
            </div>

            {/* State Field */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="UF"
              />
            </div>

            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="País"
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center">
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

          {/* Form Actions */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center gap-2"
              disabled={isLoading}
            >
              <CheckCircle size={18} />
              {isLoading ? 'Carregando...' : 'Salvar Fornecedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddSupplierModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AddSupplierModal;