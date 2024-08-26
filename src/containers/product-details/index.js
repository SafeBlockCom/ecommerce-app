import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommonLayout } from "../../components";
import LeftImagePage from "./product/leftImagePage";
import ProductTab from "./common/product-tab";
import ProductSection from "./common/product_section";
import { PRODUCT_ACTIONS } from "../../store/actions";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const dispatch = useDispatch();
  // Extract the 'id' parameter from the query string
  const { handle } = useParams();
  const { customerRef } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      dispatch(PRODUCT_ACTIONS.GET_PRODUCT_DETAIL(handle));
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      dispatch(PRODUCT_ACTIONS.GET_PRODUCT_DETAIL(handle));
    } catch (error) {
      // Code that runs if an error occurs
      console.error("An error occurred:", error.message);
    }
  }, [handle]);

  return (
    <CommonLayout parent="Home" title="Product">
      <LeftImagePage pathId={handle} />
      <ProductTab />
      {customerRef ? <ProductSection customerRef={customerRef} /> : ""}
    </CommonLayout>
  );
};

export default ProductDetail;
