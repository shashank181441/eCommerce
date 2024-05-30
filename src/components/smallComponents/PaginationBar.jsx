import React from "react";
import { Link } from "react-router-dom";

function PaginationBar({ totalProducts, limit, page, totalPages }) {
  const renderPaginationNumbers = () => {
    // Define the number of adjacent pages to show on either side of the current page
    const adjacentPages = 2;
    const startPage = Math.max(1, page - adjacentPages);
    const endPage = Math.min(totalPages, page + adjacentPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Render first page if not included in the visible pages
    if (startPage > 1) {
      pageNumbers.unshift(1);
      if (startPage > 2) pageNumbers.unshift("ellipsis");
    }

    // Render last page if not included in the visible pages
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("ellipsis");
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "ellipsis") {
        return renderEllipsis(index);
      }
      return renderPageNumber(pageNumber, index);
    });
  };

  const renderPageNumber = (pageNumber, index) => {
    return (
      <div key={index}>
        <Link to={`/${pageNumber}`}>
          <button
            className={`mx-0 px-3 py-1 rounded-full focus:outline-none ${
              page === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}>
            {pageNumber}
          </button>
        </Link>
      </div>
    );
  };

  const renderEllipsis = (key) => {
    return (
      <span key={key} className="mx-1">
        ...
      </span>
    );
  };

  return (
    <div className="flex justify-center my-4 gap-2">
      <Link to={`/${page - 1}`}>
        <button
          disabled={page === 1}
          className={`px-3 py-1 rounded-full focus:outline-none ${
            page === 1 ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"
          }`}>
          Prev
        </button>
      </Link>
      {renderPaginationNumbers()}
      <Link to={`/${page + 1}`}>
        <button
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-full focus:outline-none ${
            page === totalPages
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white"
          }`}>
          Next
        </button>
      </Link>
    </div>
  );
}

export default PaginationBar;
