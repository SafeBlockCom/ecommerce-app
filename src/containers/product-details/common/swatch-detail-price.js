import React, { useState, useContext } from "react";
import parse from "html-react-parser";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import CartContext from "../../../context/cart";
import MasterSocial from "./master_social";
import { IMAGE_SRC } from "../../../utils/images";

const SwatchDetailsWithPrice = (params) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.selectedCurr.symbol;
  const toggle = () => setModal(!modal);
  const product = params.item;
  const cartContext = useContext(CartContext);
  const addToCart = cartContext.addToCart;
  const stock = cartContext.stock;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  return (
    <>
      <div className={`product-right ${params.stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>
            {symbol}
            {product.price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {product.price - (product.price * product.discount) / 100}{" "}
        </h3>
        {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
        {uniqueColor ? (
          <ul className="color-variant">
            {uniqueColor.map((vari, i) => {
              return (
                <li
                  className={vari.color}
                  key={i}
                  title={vari.color}
                  onClick={() => params.changeColorVar(i)}
                ></li>
              );
            })}
          </ul>
        ) : (
          ""
        )}

        <ul className="image-swatch">
          <li className="active">
            <a href="#">
              <img
                src={IMAGE_SRC.FASHION1}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={IMAGE_SRC.FASHION2}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={IMAGE_SRC.FASHION3}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
        </ul>

        <div className="product-description border-product">
          {product.variants ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media
                    src={IMAGE_SRC.SIZECHART}
                    alt="size"
                    className="img-fluid"
                  />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={plusQty}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => addToCart(product, quantity)}
          >
            add to cart
          </a>
          <a
            href={`/checkout`}
            className="btn btn-solid"
            // onClick={() => BuynowClicked(item, quantity)}
          >
            buy now
          </a>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details </h6>
          <p>{product.description}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          {/* <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent /> */}
        </div>
      </div>
    </>
  );
};

export default SwatchDetailsWithPrice;
