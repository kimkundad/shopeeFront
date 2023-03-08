import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Image, Box, Text, Flex, HStack ,Icon, Spacer} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function App() {
  const fullStars = Math.floor(4.5);
  const hasHalfStar = 4.5 % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={i} color="yellow.400" />);
  }

  if (hasHalfStar) {
    stars.push(
      <Icon
        key={fullStars}
        as={StarIcon}
        color="yellow.400"
        ml="4px !important"
      />
    );
  }
  return (
    <>
      <Box>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" />
          </SwiperSlide>
        </Swiper>
        <Box>
          <Text fontSize="xl" pt="7px">
            ร้องเท้าฉลาม สุดฮิต!
          </Text>
          <Text fontSize="sm">น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี</Text>
        </Box>
        <Flex pt="15px">
          <Box>
            <HStack>{stars}</HStack>
            <Text pt="4px" fontSize="xs">
              ขายไปแล้ว 300 ชิ้น
            </Text>
          </Box>
          <Spacer />
          <Flex alignSelf="center">
            <Text position="relative">(ราคาปกติ </Text>
            <Box ml="7px" display="inline-block" position="relative">
              <Text position="relative" display="inline">
                390
              </Text>
              <Box
                opacity="7"
                content=""
                position="absolute"
                top="50%"
                left="0"
                w="100%"
                h="1px"
                bgColor="red"
                transform="rotate(-15deg)"
              />
            </Box>
            <Text>.-)</Text>
          </Flex>
          <Box ml="10px" borderRadius="md" bg="red" alignSelf="center">
            <Text px="10px" color="white" fontSize="2xl" fontWeight="bold">
              290.-
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
