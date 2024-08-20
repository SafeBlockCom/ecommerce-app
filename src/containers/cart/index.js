import React from "react";
import { CommonLayout } from "../../components";
import CartPage from "./cart-page";

const Cart = () => {
  return (
    <CommonLayout parent="home" title="cart">
      <CartPage />
    </CommonLayout>
  );
};

export default Cart;
