"use client";

import { Search, UserPlus } from "lucide-react";

type UsersHeaderProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddUser: () => void;
};

const UsersHeader = ({ searchTerm, onChange, onAddUser }: UsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={onChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={onAddUser}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
        >
          <UserPlus size={18} />
          <span>New User</span>
        </button>
      </div>
    </div>
  );
};

export default UsersHeader;
