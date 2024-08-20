import React from "react";

import { Container, Row, Col } from "reactstrap";
import { navigateTo, ROUTE_CONSTANTS } from "../../utils";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ title, parent, subTitle }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the 'id' parameter from the query string
  const type = searchParams.get("type");
  const query = searchParams.get("query");

  return (
    <>
      <div className="breadcrumb-section">
        <Container>
          <Row>
            <Col sm="6">
              <div className="page-title">
                <h2>{title}</h2>
              </div>
            </Col>
            <Col sm="6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li
                    className="breadcrumb-item"
                    onClick={() => navigateTo(ROUTE_CONSTANTS.BASE)}
                  >
                    {parent}
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {title}
                  </li>
                  {subTitle === undefined ? (
                    ""
                  ) : (
                    <li className="breadcrumb-item active" aria-current="page">
                      {subTitle}
                    </li>
                  )}
                </ol>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Breadcrumbs;
