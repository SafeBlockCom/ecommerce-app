import React from "react";
import { useSelector } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import ItemContent from "./item-content";

import { HELPER, ROUTE_CONSTANTS } from "../../utils";
import { useNavigate } from "react-router-dom";

const RecommendItems = () => {
  const naviagte = useNavigate();

  const { recommended } = useSelector((state) => state.home);

  return HELPER.isEmpty(recommended) ? (
    ""
  ) : (
    <Container className="home-services">
      <section className={"border-section noTopPadding"}>
        <Row className="d-flex services">
          <div
            className={`service-block first col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12`}
          >
            <div className={`media `}>
              <div className="media-body">
                <h4 onClick={() => naviagte(ROUTE_CONSTANTS.BASE)}>
                  Recommend
                </h4>
                <p>Some Products that we picked for you</p>
              </div>
            </div>
          </div>
          {recommended.map((item, index) => {
            return (
              <div
                className={`service-block mid-section col-xl-2 col-lg-2 col-md-2 col-sm-4 col-xs-4`}
                key={`service-block-${index}`}
              >
                <ItemContent item={item} />
              </div>
            );
          })}
          <div
            className={`service-block last bg-dark text-white col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12`}
          >
            <div className={`media`}>
              <div className="media-body">
                <h4 onClick={() => naviagte(ROUTE_CONSTANTS.SHOP)}>View all</h4>
                <div className="price">{"1000+ Products"}</div>
              </div>
            </div>
          </div>
        </Row>
      </section>
    </Container>
  );
};

export default RecommendItems;
