import React, { Fragment, useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { useForm } from "react-hook-form";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_ACTIONS } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import CheckoutCartInfo from "../cart/checkout-cart-info";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customerRef, closetRef } = useSelector((state) => state.auth);
  const { order_ref } = useSelector((state) => state.order);

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartShipmentTotal = cartContext.cartShipmentTotal;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook

  useEffect(() => {
    if (HELPER.isNotEmpty(order_ref)) {
      navigate(ROUTE_CONSTANTS.PAYMENT);
    }
  }, [order_ref]);

  // router.push({
  //   pathname: "/order-success",
  //   state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
  // });
  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = (data) => {
    if (data !== "") {
      const orderData = {
        total_amount: cartTotal + cartShipmentTotal,
        sub_total_amount: cartTotal,
        discount_amount: 0,
        shipment_charges: cartShipmentTotal,
        products: cartContext.items,
        closet_ref: closetRef,
        customer_ref: customerRef,
        billing_details: {
          f_name: data?.first_name,
          l_name: data?.last_name,
          email: data?.email,
          phone_number: data?.phone,
          country: data?.country,
          address: data?.address,
          city: data?.city,
          state: data?.state,
          postal_code: data?.postcode,
        },
        payment: payment,
      };
      dispatch(ORDER_ACTIONS.CREATE_ORDER(orderData));
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  return (
    <CommonLayout>
      <Fragment>
        <section className="section-b-space">
          <Container>
            <div className="checkout-page">
              <div className="checkout-form">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg="6" sm="12" xs="12">
                      <div className="checkout-title">
                        <h3>Billing Details</h3>
                      </div>
                      <div className="row check-out">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">First Name</div>
                          <input
                            type="text"
                            className={`${
                              errors.firstName ? "error_border" : ""
                            }`}
                            name="first_name"
                            {...register("first_name", { required: true })}
                          />
                          <span className="error-message">
                            {errors.firstName && "First name is required"}
                          </span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Last Name</div>
                          <input
                            type="text"
                            className={`${
                              errors.last_name ? "error_border" : ""
                            }`}
                            name="last_name"
                            {...register("last_name", { required: true })}
                          />
                          <span className="error-message">
                            {errors.last_name && "Last name is required"}
                          </span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Phone</div>
                          <input
                            type="text"
                            name="phone"
                            className={`${errors.phone ? "error_border" : ""}`}
                            {...register("phone", { pattern: /\d+/ })}
                          />
                          <span className="error-message">
                            {errors.phone && "Please enter number for phone."}
                          </span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Email Address</div>
                          <input
                            //className="form-control"
                            className={`${errors.email ? "error_border" : ""}`}
                            type="text"
                            name="email"
                            {...register("email", {
                              required: true,
                              pattern: /^\S+@\S+$/i,
                            })}
                          />
                          <span className="error-message">
                            {errors.email &&
                              "Please enter proper email address ."}
                          </span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Country</div>
                          <select
                            name="country"
                            {...register("country", { required: true })}
                          >
                            <option>Pakistan</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Address</div>
                          <input
                            //className="form-control"
                            className={`${
                              errors.address ? "error_border" : ""
                            }`}
                            type="text"
                            name="address"
                            {...register("address", {
                              required: true,
                              min: 20,
                              max: 450,
                            })}
                            placeholder="Street address"
                          />
                          <span className="error-message">
                            {errors.address && "Please right your address ."}
                          </span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Town/City</div>
                          <input
                            //className="form-control"
                            type="text"
                            className={`${errors.city ? "error_border" : ""}`}
                            name="city"
                            {...register("city", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">
                            {errors.city && "Enter city"}
                          </span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">State</div>
                          <input
                            //className="form-control"
                            type="text"
                            className={`${errors.state ? "error_border" : ""}`}
                            name="state"
                            {...register("state", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">
                            {errors.state && "Enter state"}
                          </span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">Postal Code</div>
                          <input
                            //className="form-control"
                            type="text"
                            name="postcode"
                            className={`${
                              errors.postcode ? "error_border" : ""
                            }`}
                            {...register("postcode", { required: true })}
                          />
                          <span className="error-message">
                            {errors.postcode && "Required string"}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col lg="6" sm="12" xs="12">
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
                                  <div className="text-left">Product Name</div>
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
                          <CheckoutCartInfo showPayment={true} />
                          <div className="payment-box">
                            <div className="upper-box">
                              <div className="payment-options">
                                <ul>
                                  <li>
                                    <div className="radio-option stripe">
                                      <input
                                        type="radio"
                                        name="payment-group"
                                        id="payment-2"
                                        defaultChecked={true}
                                        onClick={() => checkhandle("cod")}
                                      />
                                      <label htmlFor="payment-2">COD</label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="radio-option paypal">
                                      <input
                                        type="radio"
                                        name="payment-group"
                                        id="payment-1"
                                        onClick={() => checkhandle("paypal")}
                                      />
                                      <label htmlFor="payment-1">
                                        PayPal
                                        <span className="image">
                                          {/* <Media src={IMAGE_SRC.PAYPAL} alt="" /> */}
                                        </span>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="radio-option stripe">
                                      <input
                                        type="radio"
                                        name="payment-group"
                                        id="payment-1"
                                        onClick={() => checkhandle("stripe")}
                                      />
                                    </div>
                                    <div className="radio-option stripe">
                                      <label htmlFor="payment-1">
                                        Stripe
                                        <span className="image">
                                          {/* <Media src={IMAGE_SRC.PAYPAL} alt="" /> */}
                                        </span>
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {cartTotal !== 0 ? (
                              <div className="text-end">
                                <button type="submit" className="btn-solid btn">
                                  Place Order
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
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

export default CheckoutPage;
