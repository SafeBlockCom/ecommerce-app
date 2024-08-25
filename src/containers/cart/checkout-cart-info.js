import React, { Fragment, useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { useForm } from "react-hook-form";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutCartInfo = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartShipmentTotal = cartContext.cartShipmentTotal;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;

  const [payment, setPayment] = useState("cod");
  const checkhandle = (value) => {
    setPayment(value);
  };

  return cartItems && cartItems.length > 0 > 0 ? (
    <>
      <Row>
        <ul className="qty">
          {cartItems.map((item, index) => {
            const shipCost =
              item?.shipping_price <= 0
                ? item.shipping_price
                : item?.shipping_cost;
            return (
              <li key={index} className="d-flex">
                <Col md="3">
                  {item ? (
                    item.image === "undefined" ? (
                      "false"
                    ) : (
                      <div className="back i-100">
                        <Media
                          src={`${item.image}`}
                          className="img-fluid m-auto"
                          alt=""
                        />
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </Col>
                <Col md="3">
                  <div className="text-left">{item.name}</div>
                </Col>
                <Col md="3" className="">
                  {`${symbol} ${item.price} × ${item.qty}`}
                </Col>
                <Col md="2" className="">
                  {shipCost == undefined
                    ? "Free shipping"
                    : `${symbol} ${shipCost}`}
                </Col>
                <Col md="1" className="">
                  <span>{`${symbol} ${item.total + shipCost}`}</span>
                </Col>
              </li>
            );
          })}
        </ul>
      </Row>
      <ul className="sub-total">
        <li>
          Subtotal <span className="count">{`${symbol} ${cartTotal}`}</span>
        </li>
        <li>
          Shipping
          <span className="count">{`${symbol} ${cartShipmentTotal}`}</span>
        </li>
      </ul>
      <ul className="total">
        <li>
          Total{" "}
          <span className="count">
            {`${symbol} ${cartTotal + cartShipmentTotal}`}
          </span>
        </li>
      </ul>
    </>
  ) : (
    ""
  );
};

export default CheckoutCartInfo;
