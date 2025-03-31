// FORNECEDORES  

  // src/lib/services/types/supplierTypes.ts

  export interface Supplier {
    supplierID: number;
    cnpj: string;
    name: string;
    fantasyName: string;
    cadastralSituation: string;
    cnaeDescription: string;
    street: string;
    addressNumber: string;
    addressComplement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
    isActive: boolean;
    createdAt: string;
    lastUpdated: string;
  }
  
  // Interface para a resposta da API (array de fornecedores)
  export interface SuppliersResponse {
    data: Supplier[];
    count?: number;
    total?: number;
    page?: number;
    pages?: number;
  }
  
  // Interface para os parâmetros de paginação/filtro (opcional)
  export interface SuppliersQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    state?: string;
  }