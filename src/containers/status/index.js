import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { useForm } from "react-hook-form";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER, IMAGE_SRC, ROUTE_CONSTANTS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_ACTIONS } from "../../store/actions";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import BlockchainScrollContainer from "./blockchainScroll";
import {
  Col,
  Container,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import axios from "axios";

const SummaryData = [
  {
    img: "/assets/images/icon/dashboard/order.png",
    title: "25",
    desc: "Total Products",
  },
  {
    img: "/assets/images/icon/dashboard/sale.png",
    title: "12500",
    desc: "Total Sales",
  },
  {
    img: "/assets/images/icon/dashboard/homework.png",
    title: "50",
    desc: "Order Pending",
  },
];

const Summary = ({ img, title, desc, blocks, state }) => {
  return <BlockchainScrollContainer blocks={blocks} state={state} />;
};

const _blocks = [
  {
    number: 3710,
    timestamp: "6/3/24 22:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 26:29:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 25:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  {
    number: 3710,
    timestamp: "6/3/24 32:57:22",
    miner: "Majito",
    head: true,
    isLast: true,
    isLongest: true,
    transactions: [
      {
        sender: { publicKey: "0" },
        receiver: "Majito",
        receiverAddress: "99730cd9a9...",
        amount: 6.25,
      },
    ],
    previousHash:
      "00007f8ab416be290db31b53d2da20d1de2997082e47b3a789fa96469ea863cf",
    nonce: 6760,
    hash: "00009204770d8926a11e2d2666d5213d498ee99266e213d9e25323964aa9386e",
    valid: true,
  },
  // Add more blocks as needed
];
const OrderStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref } = useParams(); // This will get the value of the `ref` URL parameter

  const { order, order_ref } = useSelector((state) => state.order);
  const [blocks, setBlocks] = useState(_blocks);
  // const [blocks, setBlocks] = useState([]);

  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;

  const state = {
    privateKey: "some-private-key",
    blockchainScrollContainer: React.createRef(),
    fullChain: [
      /* array of blocks */
    ],
  };

  useEffect(() => {
    dispatch(
      ORDER_ACTIONS.ORDER_STATUS(HELPER.isNotEmpty(ref) ? ref : order_ref)
    );
    cartContext.resetCart();
  }, []);

  // useEffect(() => {
  //   // Function to fetch blocks from the API
  //   const fetchBlocks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/blockchain"); // Replace with your actual API endpoint
  //       setBlocks(response.data); // Assuming response.data contains the array of blocks
  //     } catch (error) {
  //       console.error("Error fetching blocks:", error);
  //     }
  //   };

  //   // Fetch blocks initially
  //   fetchBlocks();

  //   // Set up an interval to fetch blocks every minute
  //   const intervalId = setInterval(() => {
  //     fetchBlocks();
  //   }, 60000); // 60000ms = 1 minute

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <CommonLayout>
      <section className="section-b-space light-layout white-1">
        <Container>
          <Row>
            <Col md="12">
              <div className="success-text">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h2>thank you</h2>
                <p>
                  Payment is successfully processsed and your order is on the
                  way
                </p>
                <p>Transaction ID:{order?.order?.order_id}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <Row className="order-success-sec">
                <Col sm="12">
                  <h4>summery</h4>
                  <ul className="order-detail">
                    <li>
                      <h6>order ID:</h6> &nbsp; {order?.order?.order_id}
                    </li>
                    <li>
                      <h6>Order Date:</h6> &nbsp; {order?.order?.created_at}
                    </li>
                    <li>
                      <h6>Order Total: </h6> &nbsp;{" "}
                      {`${symbol} ${order?.order?.total_amount}`}
                    </li>
                  </ul>
                </Col>
                <Col sm="12">
                  <h4>shipping address</h4>
                  <ul className="order-detail">
                    <li>
                      <h6>Name: </h6>{" "}
                      {`${order?.billing_details?.f_name} ${order?.billing_details?.l_name}`}
                    </li>
                    <li>
                      <h6>Email: </h6> {order?.billing_details?.email}
                    </li>
                    <li>
                      {" "}
                      <h6>Address: </h6>
                      {order?.billing_details?.address}
                    </li>
                    <li>
                      {order?.billing_details?.country},{" "}
                      {order?.billing_details?.state},{" "}
                      {order?.billing_details?.city},{" "}
                      {order?.billing_details?.postal_code}
                    </li>
                    <li>Contact No. {order?.billing_details?.phone_number}</li>
                  </ul>
                </Col>
                <Col sm="12" className="payment-mode">
                  <h4>payment method</h4>
                  <p>Paid by {order?.order?.payment_method}</p>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <div className="product-order">
                <h3>your order details</h3>

                {/* {cartItems.map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item.images[0].src}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>product name</h4>
                        <h5>{item.title}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>quantity</h4>
                        <h5>{item.qty}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>price</h4>
                        <h5>
                          {symbol}
                          {item.price}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                ))} */}
                <div className="total-sec">
                  <ul>
                    <li>
                      subtotal{" "}
                      <span>{`${symbol} ${order?.order?.sub_total_amount}`}</span>
                    </li>
                    <li>
                      shipping{" "}
                      <span>{`${symbol} ${order?.order?.shipment_charges}`}</span>
                    </li>
                    <li>
                      Discount{" "}
                      <span>
                        {" "}
                        - {`${symbol} ${order?.order?.discount_amount}`}
                      </span>
                    </li>
                    <li>
                      total{" "}
                      <span>{`${symbol} ${order?.order?.total_amount}`}</span>
                    </li>
                  </ul>
                </div>
                <div className="final-total">
                  <h3>
                    total{" "}
                    <span>{`${symbol} ${order?.order?.total_amount}`}</span>
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <div className="product-order">
                <h3>View blockchain</h3>

                <section className="dashboard-section section-b-space">
                  <Container>
                    <Row>
                      <Col lg="12">
                        <div className="dashboard-sidebar">
                          <div className="faq-content">
                            <div className="counter-section">
                              <Row>
                                <Summary blocks={blocks} state={state} />
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderStatus;
