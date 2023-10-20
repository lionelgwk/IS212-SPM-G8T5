import React from "react";

const Pagination = ({ jobsPerPage, totalJobs, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="flex join justify-end">
        {pageNumbers.map((number, index) => (
          <button
            className={`join-item btn ${
              number === currentPage ? "active" : ""
            }`}
            onClick={() => paginate(number)}
            key={index}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
