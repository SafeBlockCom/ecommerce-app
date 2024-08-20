import React, { useState, useEffect } from "react";

function Pagination(props) {
  const { perPage, total } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  searchParams.set("page", currentPage - 1);

  // Convert searchParams to a plain object if needed
  const query = Object.fromEntries(searchParams.entries());

  // Access a specific query parameter, e.g., 'page'
  const [page, setPage] = useState(searchParams.get("page"));
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setCurrentPage(page ? parseInt(page) : 1);
    setPage(page ? parseInt(page) : 1);
  }, [page]);

  useEffect(() => {
    setLastPage(parseInt(total / perPage) + (total % perPage ? 1 : 0));
  }, [total, perPage]);

  useEffect(() => {
    let tempArray = [];
    let pageCount = Math.floor(total / perPage) + (0 < total % perPage ? 1 : 0);

    for (let i = -1; i < 2 && pageCount >= 3; i++) {
      if (1 < currentPage && currentPage < pageCount)
        tempArray.push(currentPage + i);
      if (1 === currentPage) tempArray.push(currentPage + i + 1);
      if (currentPage === pageCount) tempArray.push(currentPage + i - 1);
    }

    for (let i = 0; i < pageCount && pageCount < 3; i++) {
      tempArray.push(i + 1);
    }

    setPageNumbers(tempArray);
  }, [total, perPage, currentPage]);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage < 2 ? "disabled" : ""}`}>
          <a
            className="page-link page-link-prev"
            href={() =>
              navigate({
                pathname: location.pathname,
                search: searchParams.toString(),
              })
            }
            scroll={false}
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left"></i>
            </span>
            Prev
          </a>
        </li>

        {pageNumbers.length
          ? pageNumbers.map((page, index) => (
              <li
                className={`page-item ${
                  currentPage == page ? "active" : ""
                } page-link`}
                key={index}
                onClick={() =>
                  navigate({
                    pathname: location.pathname,
                    search: searchParams.toString(),
                  })
                }
              >
                {page}
              </li>
            ))
          : ""}
        {lastPage > 3 ? <li className="page-item-total">of {lastPage}</li> : ""}

        <li
          className={`page-item ${
            currentPage == lastPage ? "disabled" : ""
          } page-link page-link-next`}
          onClick={() =>
            navigate({
              pathname: location.pathname,
              search: searchParams.toString(),
            })
          }
        >
          Next
          <span aria-hidden="true">
            <i className="icon-long-arrow-right"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
