"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type UsersPaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
};

const UsersPagination = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  goToPage,
}: UsersPaginationProps) => {
  if (totalPages === 0) return null;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg flex items-center justify-center ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg flex items-center justify-center ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default UsersPagination;
