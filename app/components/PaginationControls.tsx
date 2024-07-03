import React, { Component } from "react";

interface MyProps {
  todoPerPage: number;
  length: number;
  setCurrentPage: any;
  handlePageChange: (pageNum: number) => void;
}

class Pagination extends Component<MyProps> {
  render() {
    const { todoPerPage, length, setCurrentPage } = this.props;
    const paginationNum = [];

    for (let i = 1; i <= Math.ceil(length / todoPerPage); i++) {
      paginationNum.push(i);
    }

    return (
      <div className="pagination">
        {paginationNum.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => {
              setCurrentPage(pageNum);
              console.log("clicked");
            }}
          >
            {pageNum}
          </button>
        ))}
      </div>
    );
  }
}

export default Pagination;
