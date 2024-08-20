/* eslint-disable no-undef */

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Slider from "react-slick";

import { CommonLayout } from "../../components";
import { CATEGORY_ACTIONS, CLOSET_ACTIONS } from "../../store/actions";
import { Container, Row, Col, Media } from "reactstrap";
import Masonry from "react-masonry-css";
import ProductBox from "./modules/product-box";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import NotFound from "../../components/common/NotFound";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract the 'id' parameter from the query string
  const { slug } = useParams();

  const {
    category,
    categoryDataLoading,
    products,
    loading,
    parentCategory,
    subCategories,
  } = useSelector((state) => state.products);
  const { data } = products;

  useEffect(() => {
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_DETAILS(slug));
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(slug));
  }, []);

  useEffect(() => {
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_DETAILS(slug));
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(slug));
  }, [slug]);

  return (
    <CommonLayout
      parent={
        HELPER.isNotEmpty(parentCategory?.name) ? parentCategory?.name : "Home"
      }
      title={HELPER.isNotEmpty(category?.name) ? category?.name : `Category`}
      showBreadcrumb={true}
    >
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0 pt-0 mt-5 mb-0">
          <Container fluid={true}>
            {categoryDataLoading ? (
              "loading"
            ) : (
              <>
                <div className="collection-wrapper">
                  <Container>
                    <Row>
                      <Col className="collection-content">
                        <div className="page-main-content">
                          <div className="top-banner-wrapper">
                            <Media
                              src={category?.banner}
                              className="img-fluid blur-up lazyload"
                              alt=""
                            />
                            <div className="top-banner-content small-section pb-0">
                              {HELPER.isNotEmpty(parentCategory?.name) ? (
                                <Col sm="6">
                                  <nav
                                    aria-label="breadcrumb"
                                    className="theme-breadcrumb"
                                  >
                                    <ol className="breadcrumb">
                                      <li
                                        className="breadcrumb-item"
                                        onClick={() =>
                                          navigate(
                                            `${ROUTE_CONSTANTS.CATEGORY_WITH_SLUG}/${parentCategory?.slug}`
                                          )
                                        }
                                      >
                                        {parentCategory?.name}
                                      </li>
                                      <li
                                        className="breadcrumb-item"
                                        aria-current="page"
                                      >
                                        {category?.name}
                                      </li>
                                    </ol>
                                  </nav>
                                </Col>
                              ) : (
                                ``
                              )}

                              <h4>
                                {HELPER.isNotEmpty(category?.name)
                                  ? category?.name
                                  : `Category`}{" "}
                                Categories
                              </h4>
                              <section className="section-b-space border-section noTopPadding pb-3">
                                <Row>
                                  <Col>
                                    <Row className="background slide-category">
                                      <Slider
                                        {...Product5}
                                        className="no-arrow"
                                      >
                                        {subCategories.map((data, i) => {
                                          return (
                                            <Col
                                              key={i}
                                              onClick={() =>
                                                navigate(
                                                  `${ROUTE_CONSTANTS.CATEGORY_WITH_SLUG}/${data?.slug}`
                                                )
                                              }
                                            >
                                              <div className="contain-bg">
                                                {/* <a href={data.link}> */}
                                                <div
                                                  className={`category-image`}
                                                >
                                                  <Media
                                                    src={
                                                      data.icon === ""
                                                        ? IMAGE_SRC.CATEGORY_ICON
                                                        : data?.icon
                                                    }
                                                    alt=""
                                                  />
                                                </div>
                                                {/* </a> */}
                                                <h4 data-hover="size 06">
                                                  {data.name}
                                                </h4>
                                              </div>
                                            </Col>
                                          );
                                        })}

                                        {/* {Data.map((data, i) => {
                                          return (
                                            <MasterCategory
                                              key={i}
                                              img={data.img.src}
                                              link={data.link}
                                              title={data.title}
                                            />
                                          );
                                        })} */}
                                      </Slider>
                                    </Row>
                                  </Col>
                                </Row>
                              </section>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            <section className="portfolio-section portfolio-padding metro-section port-col">
                              {loading ? (
                                <Container fluid={true}>
                                  <Row>
                                    <Col xs="12">
                                      <div>
                                        <div className="col-sm-12 empty-cart-cls text-center">
                                          {"loading"}
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </Container>
                              ) : (
                                <Container fluid={true}>
                                  {HELPER.isEmpty(data) ? (
                                    <>
                                      <NotFound
                                        errTitle="No products found"
                                        errDescription="Explore more shortlist some items."
                                      />
                                    </>
                                  ) : (
                                    <Masonry
                                      breakpointCols={4}
                                      className="isotopeContainer row"
                                      columnClassName={`isotopeSelector
      col-xl-2 col-lg-3 col-md-4 col-sm-6`}
                                    >
                                      {data.map((product, index) => {
                                        return (
                                          <ProductBox
                                            product={product}
                                            addCart={() =>
                                              cartContext.addToCart(
                                                product,
                                                quantity
                                              )
                                            }
                                            addWish={() =>
                                              wishlistContext.addToWish(product)
                                            }
                                            addCompare={() =>
                                              compareContext.addToCompare(
                                                product
                                              )
                                            }
                                            key={index}
                                          />
                                        );
                                      })}
                                    </Masonry>
                                  )}
                                </Container>
                              )}
                            </section>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </>
            )}
          </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>
  );
};

export default Category;
