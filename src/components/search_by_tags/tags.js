import React from "react";
import { Row, Col } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes";

const tagTypes = [
  {
    link: `${ROUTE_CONSTANTS.SHOP}?slug=new-products`,
    tagName: "New Products",
  },
  {
    link: `${ROUTE_CONSTANTS.SHOP}?slug=feature-products`,
    tagName: "Feature Product",
  },
  {
    link: `${ROUTE_CONSTANTS.SHOP}?slug=best-sellers`,
    tagName: "Best Sellers",
  },
  {
    link: `${ROUTE_CONSTANTS.SHOP}?slug=sale`,
    tagName: "Sale",
  },
  {
    link: `${ROUTE_CONSTANTS.SHOP}?slug=best`,
    tagName: "Best",
  },
];

const SearchByTags = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="title4 mt-3">
        <h2 className="title-inner4">Search by Tags</h2>
        <div className="line">
          <span></span>
        </div>
      </div>
      <div className="container category-button">
        <section className="section-b-space border-bottom-0 noTopPadding">
          <Row className="partition1">
            {tagTypes.map((tag, i) => (
              <Col key={i}>
                <span
                  onClick={() => navigate(tag?.link)}
                  className="btn btn-outline d-block w-100"
                >
                  {tag?.tagName}
                </span>
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </>
  );
};

export default SearchByTags;
