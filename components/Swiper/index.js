import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Image,
  } from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
        <SwiperSlide><Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" /></SwiperSlide>
      </Swiper>
    </>
  );
}