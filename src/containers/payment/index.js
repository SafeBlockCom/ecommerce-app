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

  const { order_ref, payment_completed, payment_succeded, billing_details } =
    useSelector((state) => state.order);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;

  const handleSubmit = async (event) => {
    try {
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
        const orderData = {
          order_ref,
          payment_method: paymentMethod,
          payment_method_id: paymentMethod.id,
        };
        try {
          dispatch(ORDER_ACTIONS.PAY(stripe, orderData));
        } catch (error) {
          // Code that runs if an error occurs
          console.error("An error occurred:", error.message);
        }
        // Send the paymentMethod.id to your backend

        // setIsProcessing(false);
      }
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    if (HELPER.isNotEmpty(payment_completed) && payment_completed == 1) {
      setIsProcessing(false);
    }
    // Correct usage: Return nothing if no cleanup is needed.
    // Do not return a non-function value from useEffect.
    return () => {
      // Optional cleanup function
    };
  }, [payment_completed]);

  useEffect(() => {
    if (HELPER.isNotEmpty(payment_succeded) && payment_succeded == 1) {
      navigate(`${ROUTE_CONSTANTS.ORDER_STATUS_WITH_SLUG}/${order_ref}`);
    }
    // Correct usage: Return nothing if no cleanup is needed.
    // Do not return a non-function value from useEffect.
    return () => {
      // Optional cleanup function
    };
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
