import React from "react";
import Slider from "react-slick";
import { Container, Row, Col, Media } from "reactstrap";
import { IMAGE_SRC } from "../../../utils";

const Product5 = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const Data = [
  { img: IMAGE_SRC.CAT_1, title: "sport shoes", link: "#" },
  { img: IMAGE_SRC.CAT_2, title: "casual shoes", link: "#" },
  { img: IMAGE_SRC.CAT_3, title: "formal shoes", link: "#" },
  { img: IMAGE_SRC.CAT_4, title: "flat", link: "#" },
  { img: IMAGE_SRC.CAT_5, title: "heels", link: "#" },
  { img: IMAGE_SRC.CAT_1, title: "boots", link: "#" },
  { img: IMAGE_SRC.CAT_2, title: "casual shoes", link: "#" },
  { img: IMAGE_SRC.CAT_3, title: "casual shoes", link: "#" },
];

const MasterCategory = ({ img, title, link }) => {
  return (
    <div className="category-block">
      <a href={link}>
        <div className="category-image">
          <Media src={img} alt="" />
        </div>
      </a>
      <div className="category-details">
        <a href={link}>
          <h5>{title}</h5>
        </a>
      </div>
    </div>
  );
};

const CategoryBanner = ({ img, about, offer, classes }) => {
  return (
    <Container>
      <section className="section-b-space border-section border-top-0">
        <Row>
          <Col>
            <Slider {...Product5} className="slide-6 no-arrow">
              {Data.map((data, i) => {
                return (
                  <MasterCategory
                    key={i}
                    img={data.img.src}
                    link={data.link}
                    title={data.title}
                  />
                );
              })}
            </Slider>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default CategoryBanner;
