import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";

import { Container, Row, Col } from "reactstrap";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Input } from "@mui/joy";

import { CONSTANTS, HELPER } from "../../../../../utils";
import { PRODUCT_ACTIONS } from "../../../../../store/actions";
import { useNavigate } from "react-router-dom";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "2px dashed #eee",
  marginBottom: 8,
  marginRight: 10,
  marginLeft: 10,
  width: 250,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  margin: "0 auto",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const PhotoAndDescription = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeStep } = props;

  const { photo_and_description } = useSelector(
    (state) => state.products.addedProduct
  );

  const [name, setProductName] = useState(photo_and_description?.name);
  const [sku, setProductSKU] = useState(photo_and_description?.sku);
  const [price, setPrice] = useState(photo_and_description?.price);
  const [discountedPrice, setDiscountedPrice] = useState(
    photo_and_description?.discountedPrice
  );
  const [multiFiles, setMultipleFiles] = useState(
    HELPER.isNotEmpty(photo_and_description?.images)
      ? photo_and_description?.images
      : []
  ); //
  const [description, setDescription] = useState(
    photo_and_description?.description
  );

  useImperativeHandle(ref, () => ({
    handleNextAction() {
      dispatch(
        PRODUCT_ACTIONS.ADD_NEW_PRODUCT_DATA(
          activeStep,
          CONSTANTS.PRODUCT_ADDED.PHOTO_AND_DESCRIPTION,
          {
            name,
            sku,
            price,
            discountedPrice,
            images: multiFiles,
            description: description,
          }
        )
      );
    },
    handleValidationAction() {
      let error = false;
      let errorDescription = "";
      if (HELPER.isEmpty(name)) {
        error = true;
        errorDescription = "Product name is required.";
      }
      if (HELPER.isEmpty(sku)) {
        error = true;
        errorDescription = "Product sku is required.";
      }
      if (HELPER.isEmpty(description)) {
        error = true;
        errorDescription = "Product description is required.";
      }
      if (HELPER.isEmpty(discountedPrice)) {
        error = true;
        errorDescription = "Product discounted price is required.";
      }
      if (HELPER.isEmpty(price)) {
        error = true;
        errorDescription = "Product price is required.";
      }
      if (HELPER.isEmpty(multiFiles)) {
        error = true;
        errorDescription = "Product images are required.";
      }
      return {
        error: error,
        description: errorDescription,
      };
    },
    handleWizardCompleteAction() {
      return false;
    },
  }));

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    accept: {
      "image/png": [".pneg", ".png"],
      "image/jpg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
    },
    maxFiles: 4,
    onDrop: (acceptedFiles) => {
      let _multiFiles = [];
      acceptedFiles.map((file, key) => {
        HELPER.blobToDataURL(file, function (dataurl) {
          _multiFiles[key] = { preview: dataurl };
        });
      });
      setMultipleFiles(_multiFiles);
    },
  });

  const thumbs =
    multiFiles &&
    multiFiles.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

  return (
    <Container className="dashboard-product-section">
      <Row className="mt-4">
        <Col lg="6" md="6" sm="6" xs="6">
          <div className="account-setting">
            <h6>
              <b>Name</b>
            </h6>
            <Input
              name="Outlined"
              value={name}
              variant="outlined"
              type="text"
              placeholder="Enter name"
              onChange={(event) => setProductName(event.target.value)}
              startDecorator={<InventoryIcon />}
            />
          </div>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <div className="account-setting">
            <h6>
              <b>SKU</b>
            </h6>
            <Input
              name="Outlined"
              value={sku}
              variant="outlined"
              type="text"
              placeholder="Enter product sku"
              onChange={(event) => setProductSKU(event.target.value)}
              startDecorator={<QrCodeScannerIcon />}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg="6" md="6" sm="6" xs="6">
          <div className="account-setting">
            <h6>
              <b>Price</b>
            </h6>
            <Input
              name="Outlined"
              value={price}
              variant="outlined"
              type="number"
              placeholder="Enter price"
              onChange={(event) => {
                const newValue = Number(event.target.value);
                if (newValue >= 0 && newValue <= 10000000) setPrice(newValue);
              }}
              startDecorator={<PaidOutlinedIcon />}
            />
          </div>
        </Col>
        <Col lg="6" md="6" sm="6" xs="6">
          <div className="account-setting">
            <h6>
              <b>Discounted Price</b>
            </h6>
            <Input
              name="Outlined"
              value={discountedPrice}
              variant="outlined"
              type="number"
              placeholder="Enter discounted price"
              onChange={(event) => {
                const newValue = Number(event.target.value);
                if (newValue >= 0 && newValue <= 100000000 && newValue < price)
                  setDiscountedPrice(newValue);
              }}
              startDecorator={<LocalOfferOutlinedIcon />}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="collection-content">
          <div className="page-main-content">
            <div className="top-banner-wrapper">
              <div className="top-banner-content small-section pb-0">
                <h4>Photo & Description</h4>
                <div className="dashboard-product-section-container">
                  <div {...getRootProps({ className: "dropzone mt-3 mb-3" })}>
                    <input {...getInputProps()} />
                    <Container>
                      <Row>
                        <Col
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          className="icon pb-0 mb-0 h-50"
                        >
                          <AddAPhotoOutlinedIcon />
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8} className="pb-0 mb-0">
                          <h4>Add up to 4 photos</h4>
                          <p>
                            Make sure first photo clearly shows your item in
                            full – it should be shot from the front and not
                            hidden by any other items. JPEG or PNG format only.
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg="12" md="12" sm="12" xs="12">
          <div className="account-setting">
            <h5>
              <b>Description</b>
            </h5>
            <>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="10"
                className="col-12"
                placeholder="Enter product description"
              />
            </>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default PhotoAndDescription;
