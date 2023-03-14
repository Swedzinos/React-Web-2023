import React from 'react';
import "../css/Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className="pagination-menu">
                {pageNumbers.map(number => (
                    <li key={number} className={"pagination-btn " + (number == currentPage ? "active" : "")} onClick={() => paginate(number)}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
