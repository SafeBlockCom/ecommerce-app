import React from "react";

import { Media } from "reactstrap";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const ItemContent = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className={`media `}>
      <div className="media-image">
        <Media
          src={item?.image}
          alt={item?.name}
          className="img-fluid blur-up lazyload mr-3"
        />
      </div>
      <div className="media-body">
        <h4 onClick={() => navigate(item?.handle)}>{item?.name}</h4>
        <p>{parse(item?.short_description ?? "")}</p>
        <div className="price">{item?.price}</div>
      </div>
    </div>
  );
};

export default ItemContent;
