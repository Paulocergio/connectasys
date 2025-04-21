"use client";

import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, Building, CheckCircle, XCircle } from 'lucide-react';
import SuppliersPagination from './SuppliersPagination';
import PropTypes from 'prop-types';

const SuppliersTable = ({ suppliers, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [expandedSupplier, setExpandedSupplier] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Ordenação
  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginação
  const totalPages = Math.ceil(sortedSuppliers.length / itemsPerPage);
  const paginatedSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleSupplierDetails = (supplierId) => {
    setExpandedSupplier(prev => prev === supplierId ? null : supplierId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCNPJ = (cnpj) => {
    const cleaned = cnpj.replace(/\D/g, '');
    if (cleaned.length !== 14) return cnpj;
    return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  return (
    <div className="bg-white rounded-lg shadow w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th onClick={() => requestSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center gap-1">
                  Fornecedor
                  {sortConfig?.key === 'name' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th onClick={() => requestSort('cnpj')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell">
                <div className="flex items-center gap-1">
                  CNPJ
                  {sortConfig?.key === 'cnpj' && (
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Nome Fantasia
              </th>
              <th onClick={() => requestSort('cadastralSituation')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden lg:table-cell">
                <div className="flex items-center gap-1">
                  Situação
                  {sortConfig?.key === 'cadastralSituation' && (
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
            {paginatedSuppliers.length > 0 ? (
              paginatedSuppliers.map((supplier) => (
                <React.Fragment key={supplier.supplierID}>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleSupplierDetails(supplier.supplierID)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <Building className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-800">
                            {supplier.name}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {formatCNPJ(supplier.cnpj)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-500">
                        {formatCNPJ(supplier.cnpj)}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-500">
                        {supplier.fantasyName || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-500">
                        {supplier.cadastralSituation}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {supplier.isActive ? (
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
                          onClick={(e) => { e.stopPropagation(); onEdit(supplier); }}
                          className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg active:scale-95"
                          title="Editar"
                        >
                          <Edit2 className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDelete(supplier.supplierID); }}
                          className="group relative inline-flex items-center justify-center p-2 overflow-hidden rounded-xl bg-rose-100 shadow-md transition-all duration-300 hover:bg-rose-200 hover:shadow-lg active:scale-95"
                          title="Excluir"
                        >
                          <Trash2 className="h-5 w-5 text-rose-600 group-hover:text-rose-900 transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedSupplier === supplier.supplierID && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">CNAE</div>
                            <div className="text-sm text-gray-800">{supplier.cnaeDescription}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Endereço</div>
                            <div className="text-sm text-gray-800">
                              {supplier.street}, {supplier.addressNumber} {supplier.addressComplement && `- ${supplier.addressComplement}`}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Bairro</div>
                            <div className="text-sm text-gray-800">{supplier.district}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">CEP</div>
                            <div className="text-sm text-gray-800">{supplier.zipCode}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Cidade/UF</div>
                            <div className="text-sm text-gray-800">{supplier.city}/{supplier.state}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Atualizado em</div>
                            <div className="text-sm text-gray-800">{formatDate(supplier.lastUpdated)}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-gray-300 text-4xl mb-2">📋</div>
                    <p className="text-gray-500 font-medium">Nenhum fornecedor encontrado</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <SuppliersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={suppliers.length}
      />
    </div>
  );
};

SuppliersTable.propTypes = {
  suppliers: PropTypes.arrayOf(
    PropTypes.shape({
      supplierID: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cnpj: PropTypes.string.isRequired,
      fantasyName: PropTypes.string,
      cadastralSituation: PropTypes.string,
      isActive: PropTypes.bool.isRequired,
      cnaeDescription: PropTypes.string,
      street: PropTypes.string,
      addressNumber: PropTypes.string,
      addressComplement: PropTypes.string,
      district: PropTypes.string,
      zipCode: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      lastUpdated: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default SuppliersTable;