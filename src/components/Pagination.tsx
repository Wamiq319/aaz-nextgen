"use client";

import { useState } from "react";

interface PaginationProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage: number;
  className?: string;
  gridClassName?: string;
  paginationControlsClassName?: string;
  activePageButtonClassName?: string;
  pageButtonClassName?: string;
}

export function Pagination<T>({
  items,
  renderItem,
  itemsPerPage = 9,
  className = "",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  paginationControlsClassName = "flex justify-center items-center gap-2 mt-6",
  activePageButtonClassName = "bg-[#6B21A8] text-white",
  pageButtonClassName = "bg-white text-[#6B21A8] border border-[#6B21A8]",
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);

      if (leftBound > 2) {
        pageNumbers.push("...");
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={`${className}`}>
      {/* Items Grid */}
      <div className={gridClassName}>
        {currentItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={paginationControlsClassName}>
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } ${pageButtonClassName}`}
          >
            &lt;
          </button>

          {getPageNumbers().map((number, index) =>
            number === "..." ? (
              <span key={index} className="px-3 py-1">
                {number}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => paginate(number as number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? activePageButtonClassName
                    : pageButtonClassName
                }`}
              >
                {number}
              </button>
            )
          )}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } ${pageButtonClassName}`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
