import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Media } from "reactstrap";
import { ROUTE_CONSTANTS } from "../../../routes";

const CopyRight = ({ layout, fluid }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={`sub-footer ${layout}`}>
        <Container fluid={fluid}>
          <Row>
            <Col xl="8" md="8" sm="12">
              <div className="footer-end">
                <p>
                  <i className="fa fa-copyright" aria-hidden="true"></i>{" "}
                  {process.env.REACT_APP_COPYRIGHTS}{" "}
                  <span>{process.env.REACT_APP_COPYRIGHTS_COMPANY_NAME}</span>
                </p>
              </div>
            </Col>
            <Col xl="4" md="4" sm="12">
              <div className="payment-card-bottom">
                <ul>
                  <li onClick={() => navigate(ROUTE_CONSTANTS.BASE)}>Main</li>
                  <li onClick={() => navigate(ROUTE_CONSTANTS.TERMS)}>Terms</li>
                  <li onClick={() => navigate(ROUTE_CONSTANTS.CONTACT)}>
                    Contact Us
                  </li>
                  <li onClick={() => navigate(ROUTE_CONSTANTS.ABOUTUS)}>
                    About Us
                  </li>
                  <li onClick={() => navigate(ROUTE_CONSTANTS.FAQ)}>FAQs</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default CopyRight;
