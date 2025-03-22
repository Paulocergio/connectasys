"use client";

import { Edit2, Trash2 } from "lucide-react";
import { User } from "@/lib/types/User";

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  getInitials: (name: string) => string;
  getAvatarGradient: (name: string) => string;
  getRoleColor: (role: string) => string;
  getRoleIcon: (role: string) => JSX.Element;
};

const UsersTable = ({
  users,
  onEdit,
  onDelete,
  getInitials,
  getAvatarGradient,
  getRoleColor,
  getRoleIcon,
}: UsersTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full border border-gray-100 mb-6">
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${getAvatarGradient(user.name)}`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-500 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 inline-flex items-center text-xs font-medium rounded-full ${getRoleColor(user.role)}`}
                  >
                    {getRoleIcon(user.role)}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-all"
                      title="Edit user"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-all"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
