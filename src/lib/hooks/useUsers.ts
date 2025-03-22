// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setTotalPages(Math.ceil(data.length / usersPerPage));
      setError(null);
    } catch (err) {
      setError('Falha ao buscar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get users for current page
  const getPaginatedUsers = () => {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  };

  // Search users by term
  const searchUsers = (term: string) => {
    if (!term.trim()) {
      return users;
    }
    
    return users.filter(user => 
      user.firstName.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase()) ||
      user.role.toLowerCase().includes(term.toLowerCase())
    );
  };

  return { 
    users, 
    loading, 
    error, 
    page, 
    totalPages,
    setPage,
    getPaginatedUsers,
    searchUsers,
    refetchUsers: fetchUsers 
  };
};