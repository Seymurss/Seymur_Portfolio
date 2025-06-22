import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/Css/LogosCarousel.css'
import html from '../assets/img/carousel/html.png';
import css  from '../assets/img/carousel/css-3.png';
import scss from '../assets/img/carousel/sass.png';
import javascript from '../assets/img/carousel/javascript.png';
import jguery from '../assets/img/carousel/jquery-original-wordmark-icon-485x512-7kn0h2yt.png';
import react from '../assets/img/carousel/science.png'
import redux from '../assets/img/carousel/redux toolkit.webp'
import next from '../assets/img/carousel/nextjs-icon-1024x617-rl2bcqfj.png'
import node from '../assets/img/carousel/nodejs-1-logo-png-transparent.png'
import reactNative from '../assets/img/carousel/react-native-1.png'
import mongo  from '../assets/img/carousel/MongoDB-Logo.png'
import material  from '../assets/img/carousel/material-ui-icon-2048x1626-on580ia9.png'
import antDesign  from '../assets/img/carousel/ant-design-icon-2048x2046-dl3neb73.png'
import Tailwind  from '../assets/img/carousel/Tailwind-CSS-Logo-1.png'
import Bootstrap  from '../assets/img/carousel/bootstrap-logo-vector.png'
import Typescript from '../assets/img/carousel/TypeScript-Logo.wine.svg'

const MyCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const items = [
    { id: 1,  image: html ,percent: 100},
    { id: 2,  image: css ,percent: 95 },
    { id: 3,  image: scss  ,percent: 80},
    { id: 4,  image: javascript ,percent: 70 },
    { id: 5,  image: jguery ,percent: 90 },
    { id: 6,  image: react ,percent: 70 },
    { id: 7,  image: redux ,percent: 80 },
    { id: 8,  image: next ,percent: 75 },
    { id: 14, image: Typescript ,percent: 80 },
    { id: 12, image: material ,percent: 80 },
    { id: 13, image: antDesign ,percent: 75 },
    { id: 13, image: Bootstrap ,percent: 90 },
    { id: 13, image: Tailwind ,percent: 70 },
    { id: 9,  image: node ,percent: 50 },
    { id: 10, image: mongo ,percent: 50},
    { id: 11, image: reactNative ,percent: 50 },
  ];

  return (
    <div style={{ width: "100%", margin: "136px auto" }}>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="slidebox">
                <p>{`${item.percent}%`}</p>

                <img
  src={item.image}
  alt={`Slide ${item.id}`}
  style={
    item.id === 7
      ? {
          width: '127px',
          height: '72px',
          marginTop: '6px',
        }
      : item.id === 11
      ? {
          width: '113px',
          height: '74px',
          marginLeft: '50px',
          marginTop: '14px',
          marginBottom: '-11px',
        }
      : item.id === 9
      ? {
          width: '113px',
          height: '74px',
          marginLeft: '50px',
          marginTop: '14px',
          marginBottom: '-11px',
        }
      : item.id === 10
      ? {
          width: '113px',
          height: '74px',
          marginLeft: '50px',
          marginTop: '14px',
          marginBottom: '-11px',
        }
      : {}
  }
/>

              <div className="percent">
                    <div style={{ width: `${item.percent}%`, backgroundColor: "black" }}></div>
                    <div style={{ width: `${100 - item.percent}%`, backgroundColor: "silver" }}></div>
                </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyCarousel;
