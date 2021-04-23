import React from "react";
// import { Link } from 'react-router-dom';
import { Styles } from "./styles/pagination.js";

const Pagination = ({ instructorPerPage, totalInstructors, paginate }) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalInstructors.length / instructorPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const execPaginate = (i, num) => {
    const list = document.querySelectorAll(".list-inline-item");
    list.forEach((listItem, index) => {
      if (index + 1 === i) {
        listItem.classList.add("active");
      } else {
        listItem.classList.remove("active");
      }
    });
    paginate(num);
  };
  return (
    <Styles>
      {/* Pagination */}
      <ul className="pagination-box list-unstyled list-inline">
        {pageNumbers.map((number, index) => {
          return (
            <li
              className={
                index + 1 === 1 ? "list-inline-item active" : "list-inline-item"
              }
              key={number}
              onClick={() => execPaginate(index + 1, number)}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </Styles>
  );
};

export default Pagination;
