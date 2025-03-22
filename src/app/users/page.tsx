"use client";

import { useState } from "react";
import SidebarWrapper from "@/components/ui/sidebar";

// Define the User type
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import UsersPagination from "./UsersPagination";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";


import {
  getInitials,
  getAvatarGradient,
  getRoleColor,
  getRoleIcon,
} from "../userUtils";



const Page = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ricardo Almeida", email: "ricardo.almeida@empresa.com", role: "Software Architect" },
    { id: 2, name: "Sofia Ribeiro", email: "sofia.ribeiro@empresa.com", role: "Mobile Developer" },
    { id: 3, name: "Marcelo Farias", email: "marcelo.farias@empresa.com", role: "DevOps Engineer" },
    { id: 4, name: "Tatiane Lopes", email: "tatiane.lopes@empresa.com", role: "Product Manager" },
    { id: 5, name: "André Cunha", email: "andre.cunha@empresa.com", role: "Full Stack Developer" },
    { id: 6, name: "Bianca Ferreira", email: "bianca.ferreira@empresa.com", role: "BI Analyst" },
    { id: 7, name: "Gabriel Rocha", email: "gabriel.rocha@empresa.com", role: "Data Scientist" },
    { id: 8, name: "Patrícia Nunes", email: "patricia.nunes@empresa.com", role: "Agile Coach" },
    { id: 9, name: "Fábio Cardoso", email: "fabio.cardoso@empresa.com", role: "Data Engineer" },
    { id: 10, name: "Larissa Teixeira", email: "larissa.teixeira@empresa.com", role: "Security Specialist" },
    { id: 11, name: "Diego Martins", email: "diego.martins@empresa.com", role: "Frontend Developer" },
    { id: 12, name: "Isabela Moraes", email: "isabela.moraes@empresa.com", role: "Tech Recruiter" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const itemsPerPage = 5;

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        [user.name, user.email, user.role].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : users;

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const user: User = {
      ...newUser,
      id: users.length + 1,
    };
    setUsers([...users, user]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <SidebarWrapper>
      <div className="p-4 w-full bg-gray-50">
        <UsersHeader
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onAddUser={() => setIsAddModalOpen(true)}
        />

        <UsersTable
          users={paginatedUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          getInitials={getInitials}
          getAvatarGradient={getAvatarGradient}
          getRoleColor={getRoleColor}
          getRoleIcon={getRoleIcon}
        />

        <UsersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          goToNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          goToPage={(n) => setCurrentPage(n)}
        />

        <AddUserModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
        />

        {isEditModalOpen && editingUser && (
          <EditUserModal
            open={isEditModalOpen}
            user={editingUser}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </SidebarWrapper>
  );
};

export default Page;
