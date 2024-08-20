import React, { useContext } from "react";
import CurrencyContext from "../../../context/Currency/CurrencyContext";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  const currencyContext = useContext(CurrencyContext);
  const { symbol, value } = currencyContext.selectedCurr;

  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  console.log("--issue: ", product.price);
  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        <h6>{product.name}</h6>
        <h4>
          {`${symbol} ${(product.discounted_price * value).toFixed(2)}`}
          {product.discounted_price < product.price ? (
            <del>
              <span className="money">{`${symbol} ${product.price.toFixed(
                2
              )}`}</span>
            </del>
          ) : (
            ""
          )}
        </h4>
        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}
      </div>
    </div>
  );
};

export default MasterProductDetail;
