import React from "react";

const Paginations = ({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 5
}) => {
  if (totalPages <= 1) return null;

  const halfWindow = Math.floor(windowSize / 2);

  let startPage = Math.max(currentPage - halfWindow, 1);
  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - windowSize + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {/* First */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </button>

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: currentPage === page ? "bold" : "normal",
            background: currentPage === page ? "#ddd" : ""
          }}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      {/* Last */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Paginations;