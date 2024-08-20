import React, { useContext } from "react";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";

const FeaturedProductDetail = ({
  product,
  productDetail,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  const curContext = useContext(CurrencyContext);
  const { symbol, value } = curContext.selectedCurr;

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.title}</h6>
        {des ? <p>{product.description}</p> : ""}
        <h4>
          {symbol} {(product.discounted_price * value).toFixed(2)}
          <del>
            <span className="money">
              {symbol} {(product.price * value).toFixed(2)}
            </span>
          </del>
        </h4>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        <>
          {title !== "Product style 4" ? (
            // {title !== "Product style 4" && uniqueTags[0].color ? (
            <ul className="color-variant">
              {uniqueTags.map((vari, i) => {
                return (
                  <li
                    className={vari.color}
                    key={i}
                    title={vari.color}
                    onClick={() =>
                      variantChangeByColor(vari.image_id, product.images)
                    }
                  ></li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
};

export default FeaturedProductDetail;
