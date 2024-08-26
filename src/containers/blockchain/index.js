import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart";
import { CommonLayout } from "../../components";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { HELPER } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_ACTIONS, ORDER_ACTIONS } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import BlockchainScrollContainer from "./blockchainScroll";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

const Summary = ({ img, title, desc, blocks, state }) => {
  return <BlockchainScrollContainer blocks={blocks} state={state} />;
};

const Blockchain = () => {
  const dispatch = useDispatch();
  const { ref } = useParams(); // This will get the value of the `ref` URL parameter

  const { order, order_ref } = useSelector((state) => state.order);
  const [blocks, setBlocks] = useState([]);

  const state = {
    privateKey: "some-private-key",
    blockchainScrollContainer: React.createRef(),
    fullChain: blocks,
    // fullChain: [
    //   /* array of blocks */
    // ],
  };

  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.selectedCurr.symbol;

  useEffect(() => {
    try {
      dispatch(
        ORDER_ACTIONS.ORDER_STATUS(HELPER.isNotEmpty(ref) ? ref : order_ref)
      );
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
    cartContext.resetCart();

    // Fetch blocks initially
    fetchBlocks();

    // Set up an interval to fetch blocks every minute
    const intervalId = setInterval(() => {
      fetchBlocks();
    }, 60000); // 60000ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to fetch blocks from the API
  const fetchBlocks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blockchain"); // Replace with your actual API endpoint
      if (response.status == 200) {
        setBlocks(response.data.data); // Assuming response.data contains the array of blocks
      } else {
        dispatch(
          ALERT_ACTIONS.error("There is an issue while loading blockchain")
        );
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  return (
    <CommonLayout>
      <section className="section-b-space light-layout white-1">
        <Container>
          <Row>
            <Col md="12">
              <div className="success-text">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h2>Blockchain</h2>
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

export default Blockchain;
