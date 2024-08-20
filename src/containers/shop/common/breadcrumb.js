import React from "react";

import { navigateTo, ROUTE_CONSTANTS } from "../../../utils";
import { useLocation } from "react-router-dom";

const ShopBreadcrumb = ({ title, parent, subTitle }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const type = searchParams.get("type");
  const query = Object.fromEntries(searchParams.entries());

  return (
    <>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              onClick={() => navigateTo(ROUTE_CONSTANTS.BASE)}
            >
              {parent}
            </li>
            {title ? (
              <li
                className={`breadcrumb-item ${subTitle === "" ? "active" : ""}`}
                onClick={() => navigateTo(ROUTE_CONSTANTS.SHOP)}
              >
                {title}
              </li>
            ) : (
              ""
            )}
            {subTitle ? (
              <li className={`breadcrumb-item ${subTitle ? "active" : ""}`}>
                {subTitle}
              </li>
            ) : (
              ""
            )}
            {query?.search ? (
              <li className="breadcrumb-item">
                <span>Search - {query?.searchTerm}</span>
              </li>
            ) : (
              ""
            )}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default ShopBreadcrumb;
