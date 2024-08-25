import React, { useContext, Fragment } from "react";
import CartHeader from "../layouts/headers/common/cart-header";
import CartContext from "../../context/cart";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../context/Currency/CurrencyContext";
import { history } from "../../utils";
import { useNavigate } from "react-router-dom";

const CartContainer = ({ icon }) => {
  const navigate = useNavigate();

  const context = useContext(CartContext);
  const currency_context = useContext(CurrencyContext);
  const symbol = currency_context.selectedCurr.symbol;
  const cartList = context.state;
  const total = context.cartTotal;

  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartList.length}</div>
        <div onClick={() => navigate("/cart")}>
          <Media src={icon} className="img-fluid" alt="" />
        </div>
        <ul className="show-div shopping-cart">
          <div className="shopping-items cart-items">
            {cartList.map((item, index) => (
              <CartHeader
                key={index}
                item={item}
                total={total}
                symbol={symbol}
              />
            ))}
          </div>
          {cartList.length > 0 ? (
            <div className="shopping-items">
              <div className="total">
                <h5>
                  subtotal :{" "}
                  <span>
                    {symbol}
                    {total}
                  </span>
                </h5>
              </div>
              <div className="buttons view-cart">
                <a href={`/cart`} className="cart-btns">
                  view cart
                </a>
                <a href={`/checkout`} className="cart-btns checkout">
                  checkout
                </a>
              </div>
            </div>
          ) : (
            <li>
              <h5>Your cart is currently empty.</h5>
            </li>
          )}
        </ul>
      </li>
    </Fragment>
  );
};

export default CartContainer;
