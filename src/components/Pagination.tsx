"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers with ellipsis
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer border border-gray-300"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-2 text-sm">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-2 text-sm rounded-md cursor-pointer border ${
              currentPage === page
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer border border-gray-300"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;