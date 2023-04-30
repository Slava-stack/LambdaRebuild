import React, { useState } from "react";
import info from "./slidersInfo";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "./Slider.scss";
import quotationSVG from "./images/quots.svg";

export default function Slider() {
  const [sliderIndex, setSliderIndex] = useState(1);

  function nextSlide() {
    if (sliderIndex !== info.length) {
      setSliderIndex((sliderIndex) => sliderIndex + 1);
    } else if (sliderIndex === info.length) {
      setSliderIndex(1);
    }
  }

  function previousSlide() {
    if (sliderIndex !== 1) {
      setSliderIndex((sliderIndex) => sliderIndex - 1);
    } else if (sliderIndex === 1) {
      setSliderIndex(info.length);
    }
  }

  return (
    <div className="container-slider">
      {info.map((obj, index) => {
        return (
          sliderIndex === index + 1 && (
            <div className="slider-card" key={obj.id}>
              <img
                src={obj.img}
                alt="product img"
                className={`product-img ${obj.aka}`}
              />
              <div className={`slider-text ${obj.aka}`}>
                <p>{obj.text}</p>
                <img src={quotationSVG} alt="quotes" />
              </div>
              <div className="company-block">
                <img
                  src={obj.logo}
                  className={`company-logo ${obj.aka}`}
                  alt={obj.name}
                />
                <div className="name-position-block">
                  <p>{obj.name}</p>
                  <p>{obj.position}</p>
                </div>
              </div>
              <div className="slider-buttons-block">
                <button onClick={previousSlide}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="slider-left-svg"
                  >
                    <rect
                      width="40"
                      height="40"
                      rx="8"
                      transform="matrix(-1 0 0 1 40 0)"
                      fill="#D2D2D2"
                    />
                    <path
                      d="M13.3333 20C13.3333 19.6415 13.4734 19.2831 13.7529 19.0099L22.5533 10.4103C23.1131 9.86324 24.0207 9.86324 24.5803 10.4103C25.1399 10.9571 25.1399 11.8439 24.5803 12.391L16.7933 20L24.58 27.609C25.1396 28.1561 25.1396 29.0427 24.58 29.5895C24.0205 30.1368 23.1128 30.1368 22.553 29.5895L13.7526 20.9901C13.4731 20.7167 13.3333 20.3583 13.3333 20Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                </button>
                <button className="slider-right-svg" onClick={nextSlide}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="8" fill="#D2D2D2" />
                    <path
                      d="M26.6667 20C26.6667 19.6415 26.5266 19.2831 26.2471 19.0099L17.4467 10.4103C16.8869 9.86324 15.9793 9.86324 15.4197 10.4103C14.8601 10.9571 14.8601 11.8439 15.4197 12.391L23.2067 20L15.42 27.609C14.8604 28.1561 14.8604 29.0427 15.42 29.5895C15.9795 30.1368 16.8872 30.1368 17.447 29.5895L26.2474 20.9901C26.5269 20.7167 26.6667 20.3583 26.6667 20Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        );
      })}
      <div className="container-rectangles">
        {Array.from({ length: info.length }).map((el, index) => {
          return (
            <div
              className={`${sliderIndex !== index + 1 ? "rec" : "rec active"}`}
              key={index}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export function Slider768() {
  return (
    <Swiper
      loop={true}
      spaceBetween={50}
      pagination={{ el: ".container-rectangles" }}
      modules={[Pagination]}
      className="container-slider"
    >
      {info.map((obj, index) => (
        <SwiperSlide key={index}>
          <div className="slider-card" key={obj.id}>
            <img
              src={obj.img768}
              alt="product img"
              className={`product-img ${obj.aka}`}
            />
            <div className={`slider-text ${obj.aka}`}>
              <p>{obj.text}</p>
              <img src={quotationSVG} alt="quotes" />
            </div>
            <div className="company-block">
              <img
                src={obj.logo}
                className={`company-logo ${obj.aka}`}
                alt={obj.name}
              />
              <div className="name-position-block">
                <p>{obj.name}</p>
                <p>{obj.position}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="container-rectangles" />
    </Swiper>
  );
}
