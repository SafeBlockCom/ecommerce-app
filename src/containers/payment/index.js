import React, { Fragment, useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { useForm } from "react-hook-form";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_ACTIONS } from "../../store/actions";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import CheckoutCartInfo from "../cart/checkout-cart-info";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customerRef } = useSelector((state) => state.auth);
  const { order_ref, payment_completed, payment_succeded, billing_details } =
    useSelector((state) => state.order);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartShipmentTotal = cartContext.cartShipmentTotal;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billing_details,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      console.log("PaymentMethod:", paymentMethod);

      const orderData = {
        order_ref,
        payment_method: paymentMethod,
        payment_method_id: paymentMethod.id,
      };
      dispatch(ORDER_ACTIONS.PAY(stripe, orderData));
      // Send the paymentMethod.id to your backend

      // setIsProcessing(false);
    }
  };
  useEffect(async () => {
    if (HELPER.isEmpty(order_ref)) {
      navigate(ROUTE_CONSTANTS.BASE);
    }
  }, []);

  useEffect(() => {
    if (HELPER.isNotEmpty(payment_completed) && payment_completed == 1) {
      setIsProcessing(false);
    }
  }, [payment_completed]);

  useEffect(() => {
    if (HELPER.isNotEmpty(payment_succeded) && payment_succeded == 1) {
      navigate(`${ROUTE_CONSTANTS.ORDER_STATUS_WITH_SLUG}/${order_ref}`);
    }
  }, [payment_succeded]);

  return (
    <CommonLayout>
      <Fragment>
        <section className="section-b-space">
          <Container>
            <div className="checkout-page">
              <div className="checkout-form">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg="6" sm="12" xs="12">
                      <div className="checkout-title">
                        <h3>Billing Details</h3>
                      </div>
                      <div className="row check-out">
                        <div className="form-group">
                          <label>Card Number</label>
                          <div className="stripe-input">
                            <CardNumberElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                      color: "#aab7c4",
                                    },
                                  },
                                  invalid: {
                                    color: "#9e2146",
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Expiration Date</label>
                          <div className="stripe-input">
                            <CardExpiryElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                      color: "#aab7c4",
                                    },
                                  },
                                  invalid: {
                                    color: "#9e2146",
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>CVC</label>
                          <div className="stripe-input">
                            <CardCvcElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                      color: "#aab7c4",
                                    },
                                  },
                                  invalid: {
                                    color: "#9e2146",
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                        {/* <CardElement /> */}
                        {errorMessage && (
                          <div style={{ color: "red" }}>{errorMessage}</div>
                        )}
                      </div>
                    </Col>
                    <Col lg="6" sm="12" xs="12">
                      {cartItems && cartItems.length > 0 > 0 ? (
                        <div className="checkout-details">
                          <div className="order-box">
                            <div className="title-box">
                              <div>
                                Product <span>Total</span>
                              </div>
                            </div>
                            <Row>
                              <ul className="qty">
                                <li className="d-flex">
                                  <Col md="3">Product Image</Col>
                                  <Col md="3">
                                    <div className="text-left">
                                      Product Name
                                    </div>
                                  </Col>
                                  <Col md="3" className="">
                                    Price
                                  </Col>
                                  <Col md="2" className="">
                                    Shipping
                                  </Col>
                                  <Col md="1" className="">
                                    Product Total
                                  </Col>
                                </li>
                              </ul>
                            </Row>
                            <Row>
                              <ul className="qty">
                                <CheckoutCartInfo showPayment={false} />
                              </ul>
                            </Row>
                            <ul className="sub-total">
                              <li>
                                Subtotal{" "}
                                <span className="count">
                                  {`${symbol} ${cartTotal}`}
                                </span>
                              </li>
                              <li>
                                Shipping
                                <span className="count">
                                  {`${symbol} ${cartShipmentTotal}`}
                                </span>
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
                          </div>
                          <div className="payment-box">
                            {cartTotal !== 0 ? (
                              <div className="text-end">
                                <button
                                  type="submit"
                                  disabled={!stripe || isProcessing}
                                  className="btn-solid btn"
                                >
                                  {isProcessing ? "Processing…" : "Pay"}
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Container>
        </section>
      </Fragment>
    </CommonLayout>
  );
};

export default Payment;
