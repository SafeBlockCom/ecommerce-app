import React from "react";
import { CommonLayout } from "../../components";
import { Container, Row, Col } from "reactstrap";
import { ROUTE_CONSTANTS } from "../../routes";

const Page404 = () => {
  return (
    <CommonLayout parent="home" title="404">
      <section className="p-0">
        <Container>
          <Row>
            <Col sm="12">
              <div className="error-section">
                <h1>404</h1>
                <h2>page not found</h2>
                <a href={ROUTE_CONSTANTS.BASE} className="btn btn-solid">
                  back to home
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};
export default Page404;
