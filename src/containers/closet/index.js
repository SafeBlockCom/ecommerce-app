/* eslint-disable no-undef */

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommonLayout } from "../../components";
import { CLOSET_ACTIONS } from "../../store/actions";
import { Container, Row, Col, Media } from "reactstrap";
import Masonry from "react-masonry-css";
import ProductBox from "./modules/product-box";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import Slider from "react-slick";
import NotFound from "../../components/common/NotFound";
import { useLocation, useParams } from "react-router-dom";

const Product5 = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const Closet = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the 'id' parameter from the query string
  const { reference } = useParams();
  const { closet, categories, closetDataLoading, closetAllProductsData } =
    useSelector((state) => state.closet);

  useEffect(() => {
    try {
      dispatch(CLOSET_ACTIONS.GET_CLOSET_DETAILS(reference));
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  }, []);

  const data = [];
  return (
    <CommonLayout
      parent="Home"
      title={HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet`}
      showBreadcrumb={true}
    >
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0 pt-0 mt-5 mb-0">
          <Container fluid={true}>
            {closetDataLoading ? (
              "loading"
            ) : (
              <>
                {HELPER.isEmpty(closet?.name) ? (
                  <>
                    <NotFound
                      errTitle="No closet found"
                      errDescription="Explore more shortlist some items."
                    />
                  </>
                ) : (
                  <div className="collection-wrapper">
                    <Container>
                      <Row>
                        <Col className="collection-content">
                          <div className="page-main-content">
                            <div className="top-banner-wrapper">
                              <Media
                                src={closet?.banner}
                                className="img-fluid blur-up lazyload"
                                alt=""
                              />
                              <div className="top-banner-content small-section pb-0">
                                <h4>
                                  About{" "}
                                  {HELPER.isNotEmpty(closet?.name)
                                    ? closet?.name
                                    : `Closet`}
                                </h4>
                                <p>{closet?.description}</p>
                                <h4 className="mt-4">Categories</h4>
                                <div className="top-banner-content small-section pb-0">
                                  <section className="section-b-space border-section noTopPadding pb-3">
                                    <Row>
                                      <Col>
                                        <Row className="background slide-category">
                                          <Slider
                                            {...Product5}
                                            className="no-arrow"
                                          >
                                            {categories.map((data, i) => {
                                              return (
                                                <Col
                                                  key={i}
                                                  onClick={() =>
                                                    navigate(
                                                      `${ROUTE_CONSTANTS.CLOSET_CATEGORY_WITH_SLUG}/${reference}/${data?.pim_cat_reference}`
                                                    )
                                                  }
                                                >
                                                  <div className="contain-bg">
                                                    <div
                                                      className={`category-image `}
                                                    >
                                                      <Media
                                                        src={
                                                          data?.image === ""
                                                            ? IMAGE_SRC.CATEGORY_ICON
                                                            : data?.image
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                    <h4 data-hover="size 06">
                                                      {data.name}
                                                    </h4>
                                                  </div>
                                                </Col>
                                              );
                                            })}
                                          </Slider>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </section>
                                </div>
                              </div>
                            </div>
                            <div className="collection-product-wrapper">
                              <section className="portfolio-section portfolio-padding metro-section port-col">
                                <Container fluid={true}>
                                  <Masonry
                                    breakpointCols={4}
                                    className="isotopeContainer row"
                                    columnClassName={`isotopeSelector
                          col-xl-2 col-lg-3 col-md-4 col-sm-6`}
                                  >
                                    {closetAllProductsData.map(
                                      (product, index) => {
                                        return (
                                          <ProductBox
                                            product={product}
                                            addCart={() =>
                                              // eslint-disable-next-line no-undef
                                              cartContext.addToCart(
                                                product,
                                                quantity
                                              )
                                            }
                                            addWish={() =>
                                              // eslint-disable-next-line no-undef
                                              wishlistContext.addToWish(product)
                                            }
                                            addCompare={() =>
                                              // eslint-disable-next-line no-undef
                                              compareContext.addToCompare(
                                                product
                                              )
                                            }
                                            key={index}
                                          />
                                        );
                                      }
                                    )}
                                  </Masonry>
                                </Container>
                              </section>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>
  );
};

export default Closet;
