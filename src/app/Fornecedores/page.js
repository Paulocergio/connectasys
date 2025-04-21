"use client";

import React, { useEffect, useState } from 'react';
import { Building, Plus, Search } from 'lucide-react';
import SuppliersTable from './SuppliersTable';
import AddSupplierModal from './AddSupplierModal';
import EditSupplierModal from './EditSupplierModal';
import DeleteSupplierModal from './DeleteSupplierModal';
import SuppliersPagination from './SuppliersPagination';
import  supplierService  from '../../lib/services/supplierService';
import SidebarWrapper from "@/components/ui/sidebar";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Carregar fornecedores da API no carregamento inicial
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const data = await supplierService.getAllSuppliers();
        console.log('Suppliers data:', data); // Debug log
        setSuppliers(data);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setError('Falha ao carregar fornecedores. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Filtrar fornecedores baseado no termo de busca
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.cnpj.includes(searchTerm)
  );

  // Configuração da paginação
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers para as operações de fornecedores
  const handleAddSupplier = async (newSupplier) => {
    try {
      setLoading(true);
      const addedSupplier = await supplierService.createSupplier(newSupplier);
      setSuppliers([...suppliers, addedSupplier]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error adding supplier:', err);
      setError('Falha ao adicionar fornecedor.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSupplier = async (updatedSupplier) => {
    try {
      setLoading(true);
      const result = await supplierService.updateSupplier(updatedSupplier.id, updatedSupplier);
      setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? result : s));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating supplier:', err);
      setError('Falha ao atualizar fornecedor.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      setLoading(true);
      await supplierService.deleteSupplier(id);
      setSuppliers(suppliers.filter(s => s.id !== id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting supplier:', err);
      setError('Falha ao excluir fornecedor.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && suppliers.length === 0) return <div className="p-6">Carregando fornecedores...</div>;

  return (
    <SidebarWrapper>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building className="h-6 w-6" /> Fornecedores
          </h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar fornecedor..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> Novo Fornecedor
            </button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <SuppliersTable
          suppliers={paginatedSuppliers}
          onEdit={(supplier) => {
            setCurrentSupplier(supplier);
            setIsEditModalOpen(true);
          }}
          onDelete={(id) => {
            setCurrentSupplier(suppliers.find(s => s.id === id) || null);
            setIsDeleteModalOpen(true);
          }}
        />

        <SuppliersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <AddSupplierModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSupplier}
        />

        <EditSupplierModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          supplier={currentSupplier}
          onSuccess={handleEditSupplier}
        />

        <DeleteSupplierModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => currentSupplier && handleDeleteSupplier(currentSupplier.id)}
        />
      </div>
    </SidebarWrapper>
  );
};

export default SuppliersPage;