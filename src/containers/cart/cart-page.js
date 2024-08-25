/* eslint-disable no-undef */

import React, { useState, useContext } from "react";
import CartContext from "../../context/cart";
import { Container, Row, Col, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);
  const cartItems = context.state;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;
  const total = context.cartTotal;
  const cartShipmentTotal = context.cartShipmentTotal;
  const removeFromCart = context.removeFromCart;
  const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  const updateQty = context.updateQty;

  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">quantity</th>
                      <th scope="col">shipping cost</th>
                      <th scope="col">sub total</th>
                      <th scope="col">total</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  {cartItems.map((item, index) => {
                    const shippingPrice =
                      item?.shipping_price <= 0
                        ? item.shipping_price
                        : item?.shipping_cost;
                    return (
                      <tbody key={index}>
                        <tr>
                          <td
                            onClick={() =>
                              navigate(
                                `${ROUTE_CONSTANTS.PRODUCTDETAIL}/${item.handle}`
                              )
                            }
                          >
                            <Media src={item.image} alt="" />
                          </td>
                          <td>
                            <span>
                              <b>SKU:</b> {item?.handle}
                            </span>{" "}
                            <br />
                            <span
                              onClick={() =>
                                navigate(
                                  `${ROUTE_CONSTANTS.PRODUCTDETAIL}/${item.handle}`
                                )
                              }
                            >
                              {item.name}
                            </span>
                            <br />
                            <div className="mobile-cart-content row">
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      name="quantity"
                                      onChange={(e) =>
                                        handleQtyUpdate(item, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue={item.qty}
                                      style={{
                                        borderColor: quantityError && "red",
                                      }}
                                    />
                                  </div>
                                </div>
                                {item.qty >= item.stock ? "out of Stock" : ""}
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {`${symbol} n ${item.price}`}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => removeFromCart(item)}
                                    ></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>{`${symbol} ${item.price}`}</h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleQtyUpdate(item, e.target.value)
                                  }
                                  className="form-control input-number"
                                  defaultValue={item.qty}
                                  style={{
                                    borderColor: quantityError && "red",
                                  }}
                                />
                              </div>
                            </div>
                            {item.qty >= item.stock ? "out of Stock" : ""}
                          </td>
                          <td>
                            <h4>{`${symbol} ${shippingPrice}`}</h4>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {item.total}
                            </h2>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {item.total + shippingPrice}
                            </h2>
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => removeFromCart(item)}
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>{`${symbol} ${total + cartShipmentTotal}`}</h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <a className="btn btn-solid" href={`/shop`}>
                  continue shopping
                </a>
              </Col>
              <Col xs="6">
                <a className="btn btn-solid" href={`/checkout`}>
                  check out
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={IMAGE_SRC.EMPTY_CART}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </Col>
              <Col
                md="12"
                className="title-center mt-5"
                onClick={() =>
                  // navigate(
                  //   `${ROUTE_CONSTANTS.SHOP}?slug=all&child=&brand=&condition=&standard=&color=&size=&minPrice=&maxPrice=`
                  // )
                  false
                }
              >
                <button className="btn btn-solid" type="submit">
                  Keep shopping
                </button>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CartPage;
