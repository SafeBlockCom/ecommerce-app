import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Header,
  HeaderCarousel,
  TapTop,
  SearchByTags,
  RecommendedItems,
  BrandsFooter,
  Footer,
  Featured,
  TrendingSellers,
} from "../../components";

import Loader from "../../features/loader";
import InternetConnection from "../../features/internet-connection";

import { HOMEPAGE_ACTIONS } from "../../store/actions";
import { HOME_CONSTANTS } from "../../store/actionTypes";
import { IMAGE_SRC } from "../../utils";
import { Helmet } from "react-helmet";

export default function Home(props) {
  const { meta, brands, appLoading } = useSelector((state) => state.metadata);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HOMEPAGE_ACTIONS.GET_HOMEPAGE_CONTENTS());
    dispatch(HOMEPAGE_ACTIONS.GET_MEGA_MENU_CONTENTS());
  }, []);

  return appLoading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={meta?.favicon} />
        <title>{meta?.app_title}</title>
      </Helmet>
      <InternetConnection />
      {/* HEADER */}
      <Header logoName={meta?.logo} topClass="top-header" />
      {/* HEADER Carousel */}
      <HeaderCarousel />
      {/* Search By Tags */}
      <SearchByTags />
      {/* RecommendedItems We Offer */}
      <RecommendedItems />
      <Featured />
      <TrendingSellers featured={props?.featured_by} />
      <BrandsFooter
        title={brands?.title}
        description={brands?.sub_title}
        btn_name={"shop now"}
        bg_img_src={IMAGE_SRC.HOME_BG_1}
      />
      <Footer
        footerClass={`footer-dark`}
        footerLayOut={"light-layout upper-footer bg-white"}
        footerSection={
          "border-section border-top-0 noTopPadding footer-section"
        }
        belowSection={"noTopPadding"}
        newLatter={true}
        logoName={meta?.logo_white}
        layoutClass={"dark-subfooter"}
      />
      <TapTop />
    </>
  );
}
