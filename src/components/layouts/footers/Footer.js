import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Input, Button, Collapse } from "reactstrap";
import Logo from "../../layouts/headers/common/logo";
import CopyRight from "./copyright";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../utils";

const Footer = ({
  containerFluid,
  logoName,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
  newLatter,
}) => {
  const navigate = useNavigate();

  const { subscription } = useSelector((state) => state.metadata);

  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth < 750;
  // useEffect(() => {
  //   const changeCollapse = () => {
  //     if (window.innerWidth < 750) {
  //       setCollapse(0);
  //       setIsOpen(false);
  //     } else setIsOpen(true);
  //   };

  //   window.addEventListener("resize", changeCollapse);

  //   return () => {
  //     window.removeEventListener("resize", changeCollapse);
  //   };
  // }, []);
  return (
    <div>
      <footer className={footerClass}>
        <section className={belowSection}>
          {newLatter ? (
            <Container
              fluid={containerFluid ? containerFluid : ""}
              className={footerLayOut}
            >
              <section className={footerSection}>
                <Row>
                  <Col lg="8" md="12" sm="12" xs="12">
                    <div className="subscribe">
                      <div>
                        <h4>{subscription?.title}</h4>
                        <p>{subscription?.sub_title}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="12" sm="12" xs="12">
                    <form
                      className="form_search form-inline subscribe-form subscribe-form-custom-design"
                      role="textbox"
                    >
                      {/* eslint-disable-next-line */}
                      <Input
                        id="query search-autocomplete"
                        type="search"
                        placeholder="Type your email"
                        className="nav-search nav-search-field"
                        aria-expanded="true"
                      />
                      <button
                        type="submit"
                        name="nav-submit-button"
                        className="btn-search subscription-search-btn"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                    <Form className="form-inline subscribe-form d-none">
                      <div className="mx-sm-3">
                        <Input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your email"
                        />
                      </div>
                      <Button type="submit" className="btn btn-solid">
                        subscribe
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </section>
            </Container>
          ) : (
            ""
          )}
          <div className="dark-layout">
            <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
              <Row className="footer-theme partition-f">
                <Col lg="4" md="6">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 1 ? "active" : ""
                    } footer-mobile-title`}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(1);
                        setIsOpen(!isOpen);
                      }}
                    >
                      about
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                    className="footer-aboutUs"
                  >
                    <div className="footer-contant">
                      <div className="footer-logo">
                        <Logo logo={logoName} />
                      </div>
                      <p>{process.env.REACT_APP_ABOUT_US_FOOTER}</p>
                      <div className="footer-social">
                        <ul>
                          <li
                            onClick={() => {
                              window.location.href =
                                process.env.REACT_APP_LINKS_FACEBOOK;
                            }}
                          >
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>
                          </li>
                          <li
                            onClick={() => {
                              window.location.href =
                                process.env.REACT_APP_LINKS_YOUTUBE;
                            }}
                          >
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            ></i>
                          </li>
                          <li
                            onClick={() => {
                              window.location.href =
                                process.env.REACT_APP_LINKS_TWITTER;
                            }}
                          >
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </li>
                          <li
                            onClick={() => {
                              window.location.href =
                                process.env.REACT_APP_LINKS_INSTAGRAM;
                            }}
                          >
                            <i
                              className="fa fa-instagram"
                              aria-hidden="true"
                            ></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </Col>
                <Col className="offset-xl-1">
                  <div className="sub-title">
                    <div
                      className={`footer-title ${
                        isOpen && collapse == 2 ? "active" : ""
                      } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(2);
                          } else setIsOpen(true);
                        }}
                      >
                        Quick Links
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.ABOUTUS)}>
                            About Us
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.REVIEW)}>
                            Reviews
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.TERMS)}>
                            Terms & Conditions
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.PRIVACY)}>
                            Privacy Policy
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.FAQ)}>
                            FAQs
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.CONTACT)}>
                            Contact Us
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
                <Col>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${
                        isOpen && collapse == 3 ? "active" : ""
                      } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(3);
                          } else setIsOpen(true);
                        }}
                      >
                        Product Categories
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Men Wear
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Women Wear
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Shoes
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Bags
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Hats
                          </li>
                          <li onClick={() => navigate(ROUTE_CONSTANTS.SHOP)}>
                            Caps
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
                <Col>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${
                        isOpen && collapse == 4 ? "active" : ""
                      } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(4);
                          } else setIsOpen(true);
                        }}
                      >
                        store information
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 4 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul className="contact-list">
                          <li>
                            <i className="fa fa-map-marker"></i>
                            {process.env.REACT_APP_CONTACT_ADDRESS}
                          </li>
                          <li>
                            <i className="fa fa-phone"></i>Call Us:{" "}
                            <a href="tel:#">
                              {process.env.REACT_APP_CONTACT_US}
                            </a>
                          </li>
                          <li>
                            <i className="fa fa-envelope-o"></i>Email Us:{" "}
                            <a href="mailto:#">
                              {process.env.REACT_APP_CONTACT_EMAIL}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        />
      </footer>
    </div>
  );
};
export default Footer;
