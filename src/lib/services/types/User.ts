export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}



// src/types/User.ts
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