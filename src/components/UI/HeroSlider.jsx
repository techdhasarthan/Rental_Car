import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";
import FindCarForm from "./FindCarForm";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <div className="slider">
      <div className="slider__item slider__item-01 ">
        <Container>
          <div className="slider__content ">
            <h1 className="text-light mb-4">
              Reserve your ideal ride anytime !
            </h1>

            <button className="btn reserve__btn mt-4 hide-on-mobile">
              <Link to="/cars">Book Now</Link>
            </button>
          </div>
        </Container>
        <FindCarForm />
      </div>
    </div>
  );
};

export default HeroSlider;
