import React, { Fragment, useContext } from "react";
import CartContext from "../../../../context/cart";
import { Media } from "reactstrap";
import { ROUTE_CONSTANTS } from "../../../../routes";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  return (
    <div className="item">
      <div className="media">
        <a href={`${ROUTE_CONSTANTS.PRODUCTDETAIL_WITH_HANDLE}/${item.handle}`}>
          <Media alt="" className="me-3" src={`${item.image}`} />
        </a>
        <div className="media-body">
          <h5
            href={`${ROUTE_CONSTANTS.PRODUCTDETAIL_WITH_HANDLE}/${item.handle}`}
          >
            {item.name}
          </h5>

          <h4>
            <span>
              {item.qty} x {symbol}
              {item.price.toFixed(2)}
            </span>
          </h4>
        </div>
      </div>
      <div className="close-circle">
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => context.removeFromCart(item)}
        ></i>
      </div>
    </div>
  );
};

export default CartHeader;
