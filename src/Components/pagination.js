import React from "react";
import _ from "lodash";
import BackArrow from "../images/back-arrow.svg";
import ForwardArrow from "../images/forward-arrow.svg";

function Pagination(props) {
  const { totalPages, currentPage, onPageChange } = props;

  return (
    <>
      <div className="pagination">
        <span
          onClick={() => {
            let previous = Math.max(currentPage - 1, 1);
            onPageChange(previous);
          }}
        >
          <img src={BackArrow} alt="backarrow" />
        </span>
        <form className="form-inline">
          <input
            className="form-control"
            value={currentPage}
            aria-label="Search"
          />
        </form>
        <span
          onClick={() => {
            let next = Math.min(currentPage + 1, totalPages);
            onPageChange(next);
          }}
        >
          <img src={ForwardArrow} alt="backarrow" />
        </span>
        <small>of {totalPages}</small>
      </div>
    </>
  );
}

export default Pagination;
