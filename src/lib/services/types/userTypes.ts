export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user: {
        email: string;
        firstName: string;
        role: string;
        isActive: boolean;
    };
    token: string;
}

export interface GetAllUser {
    id: number;
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
}

 export interface UserPayload {
    firstName: string;
    email: string;
    phoneNumber: string;
    PasswordHash: string; // Ajustado para corresponder ao backend
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


////////////////

 export interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserResponse) => void;
}

export interface UserFormData {
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

export interface UserResponse {
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


// Em user.types.ts
export interface UserPayload {
    firstName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string; // Alterado para camelCase
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



 export interface Usuario {
    id: string;
    firstName?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
    phoneNumber?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    createdAt?: string;
  }


  

  
  