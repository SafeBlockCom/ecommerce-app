import React from "react";
import { CommonLayout } from "../../components";
import WishlistPage from "./wishlist-page";

const Wishlist = () => {
  return (
    <CommonLayout parent="home" title="wishlist">
      <WishlistPage />
    </CommonLayout>
  );
};

export default Wishlist;
