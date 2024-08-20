import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Card, CardBody, Media, TabPane } from "reactstrap";

// import Pagination from "react-js-pagination";
import { CLOSET_ACTIONS } from "../../../../store/actions";
import { HELPER, history, ROUTE_CONSTANTS } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const ProductCatalog = ({ product }) => {
  const navigate = useNavigate();
  console.log("product: ", product);
  return (
    <tr>
      <th scope="row">
        <Media src={product?.image} className="blur-up lazyloaded i-100" />
      </th>
      <td className="text-left">
        <pre>{product?.handle}</pre>
      </td>
      <td className="text-left">{product?.name}</td>
      <td>{product?.category}</td>
      <td>
        {product.discounted_price < product.price ? (
          <>
            {product.discounted_price} <br />
            {/* {product.discounted_price.toFixed(2)} <br /> */}
            <del>
              <span className="money">{product.price}</span>
              {/* <span className="money">{product.price.toFixed(2)}</span> */}
            </del>
          </>
        ) : (
          product.price
          // product.price.toFixed(2)
        )}
      </td>
      <td>{product?.quantity}</td>
      <td>
        <span
          aria-hidden="true"
          onClick={() =>
            navigate(
              `${ROUTE_CONSTANTS.PRODUCT_EDIT_WITH_HANDLE}/${product.handle}`
            )
          }
        >
          <i className="fa fa-pencil-square-o me-1"></i>
        </span>
        <span onClick={() => alert("product/delete/ api call")}>
          <i className="fa fa-trash-o ms-1" aria-hidden="true"></i>
        </span>
      </td>
    </tr>
  );
};

const ProductCatalogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closetAllProductsData, closetAllProducts } = useSelector(
    (state) => state.closet
  );
  const { products } = closetAllProducts;
  const [currentPage, setCurrentPage] = useState(products?.current_page);
  const { closetRef } = useSelector((state) => state.auth);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(
      CLOSET_ACTIONS.GET_CLOSET_PRODUCTS_PAGINATED_DATA(closetRef, pageNumber)
    );
  };

  return (
    <table className="table-responsive-md table mb-0">
      <thead>
        <tr>
          <th scope="col">image</th>
          <th scope="col">product sku</th>
          <th scope="col">product name</th>
          <th scope="col">category</th>
          <th scope="col">price</th>
          {/* <th scope="col">Discounted Price</th> */}
          <th scope="col">Quantity</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {HELPER.isEmpty(closetAllProductsData) ? (
          <tr>
            <td colSpan={8} className="text-center">
              {" "}
              No products found
            </td>
          </tr>
        ) : (
          closetAllProductsData.map((data, i) => {
            return (
              <ProductCatalog
                key={`catalog-all-products-${i}`}
                product={data}
              />
            );
          })
        )}
      </tbody>
      {/* {HELPER.isNotEmpty(closetAllProductsData) ?? (
        <tfoot>
          <div className="pagination-background">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={products?.per_page}
              totalItemsCount={products?.total}
              pageRangeDisplayed={Math.ceil(
                Number(products?.total) / Number(products?.per_page)
              )}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </tfoot>
      )} */}
    </table>
  );
};

const ProductsTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <TabPane tabId="2">
      <Row>
        <Col sm="12">
          <Card className="products/edit-product-table mt-0">
            <CardBody>
              <div className="top-sec">
                <h3>All products</h3>
                <a
                  onClick={() => {
                    // dispatch({ type: PRODUCTS_CONSTANTS.PRODUCT_DATA_RESET });
                    navigate(`${ROUTE_CONSTANTS.PRODUCT_ADD}`);
                  }}
                  className="btn btn-sm btn-solid"
                >
                  add product
                </a>
              </div>
              <ProductCatalogList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </TabPane>
  );
};

export default ProductsTab;
