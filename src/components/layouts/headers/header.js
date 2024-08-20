import React, { useEffect, useState } from "react";
import NavBar from "./common/navbar";
import CartContainer from "../../containers/CartContainer";
import Logo from "./common/logo";
import { Container, Row, Col, Media } from "reactstrap";
import SearchOverlay from "./common/search-overlay";
import SearchNavigation from "./common/search-nav";
import { useDispatch, useSelector } from "react-redux";
import { HELPER, history, IMAGE_SRC, ROUTE_CONSTANTS } from "../../../utils";
import { CUSTOMER_ACTIONS } from "../../../store/actions/customerActions";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const { logoName } = props;

  const { closetRef, customerRef } = useSelector((state) => state.auth);
  console.log(`closetRef ${closetRef} customerRef ${customerRef}`);
  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display: none";
    }, 2000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      if (window.innerWidth < 578) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  return (
    <div>
      <header id="sticky" className="sticky header-2 header-6">
        <Container>
          <Row>
            <Col>
              <div className="main-menu border-section border-top-0">
                <div
                  className="brand-logo app-logo"
                  onClick={() => navigate(ROUTE_CONSTANTS.BASE)}
                >
                  <Logo logo={logoName} />
                </div>
                <div>
                  <SearchNavigation />
                </div>
                <div className="menu-left pull-right">
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src={IMAGE_SRC.SEARCH}
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li>
                        {/*Header Cart Component */}
                        <CartContainer icon={IMAGE_SRC.CART} />
                        <li
                          className="onhover-div create-closet btn btn-solid black-btn"
                          onClick={() => {
                            console.log("Clicked");
                            if (HELPER.isNotEmpty(closetRef)) {
                              navigate(
                                `${ROUTE_CONSTANTS.ACCOUNT_DASHBOARD_WITH_CLOSET_REF}/${closetRef}`
                              );
                            } else if (HELPER.isNotEmpty(customerRef)) {
                              navigate(`${ROUTE_CONSTANTS.CREATE_CLOSET}`);
                            } else {
                              navigate(ROUTE_CONSTANTS.SIGNUP);
                            }
                          }}
                        >
                          {HELPER.isNotEmpty(closetRef)
                            ? "My Closet"
                            : HELPER.isNotEmpty(customerRef)
                            ? "Create Closet"
                            : "Sign Up"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg="12">
              <div className="main-nav-center">
                <NavBar />
              </div>
            </Col>
          </Row>
        </Container>
        <SearchOverlay />
      </header>
    </div>
  );
};

export default Header;
