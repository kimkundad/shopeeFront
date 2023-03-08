import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Image, Box, Text, Flex, HStack, Icon, Spacer,SimpleGrid,Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function App() {
  const productDetail = [
    {
      productname: "ร้องเท้าฉลาม สุดฮิต!",
      detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
      numsale: "300",
      price: "390",
      pricesale: "290",
      images: [
        {
          img: "/img/หมาโง่.jpg",
          color: "สีชมพู",
        },
        {
          img: "/img/หมาโง่.jpg",
          color: "สีฟ้า",
        },
        {
          img: "/img/หมาโง่.jpg",
          color: "สีเหลือง",
        },
        {
          img: "/img/หมาโง่.jpg",
          color: "สีส้ม",
        },
      ],
    },
  ];
  const colorProduct = [
    { label: "สีชมพู" },
    { label: "สีฟ้า" },
    { label: "สีเหลือง" },
    { label: "สีส้ม" },
  ];
  const size = [
    { label: "38" },
    { label: "39" },
    { label: "40" },
    { label: "41" },
    { label: "42" },
    { label: "43" },
    { label: "44" },
  ];
  const [colorId, setColorId] = useState("");

  const [sizeId, setSizeId] = useState("");
  function selectSize(event) {
    setSizeId(event.target.id);
  }
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
  const swiperRef = useRef(null);
  const handleButtonClick = (event) => {
    // Find the index of the slide with the key "สีเหลือง"
    setColorId(event.target.id);// slide to the found slide index
    const slideIndex = productDetail[0].images.findIndex(item => item.color === colorId);

    // Slide to the found slide index
    swiperRef.current.swiper.slideTo(slideIndex);
  };
  

  return (
    <>
      <Box px="15px" py="10px" bg="white">
        <Box>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            ref={swiperRef}
          >
            {productDetail[0].images.map((item, index) => {
              return (
                <SwiperSlide key={item.color}>
                  <Image src={item.img} alt="" w="100%" maxHeight="500px" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Box>
            <Text fontSize="xl" pt="7px">
              {productDetail[0].productname}
            </Text>
            <Text fontSize="sm">{productDetail[0].detail}</Text>
          </Box>
          <Flex pt="15px">
            <Box>
              <HStack>{stars}</HStack>
              <Text pt="4px" fontSize="xs">
                ขายไปแล้ว {productDetail[0].numsale} ชิ้น
              </Text>
            </Box>
            <Spacer />
            <Flex alignSelf="center" fontSize="xs">
              <Text position="relative">(ราคาปกติ </Text>
              <Box ml="7px" display="inline-block" position="relative">
                <Text position="relative" display="inline">
                  {productDetail[0].price}
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
                {productDetail[0].pricesale}.-
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box px="15px" mt="10px" bg="white" pb="10px">
        <Box>
          <Text fontSize="xl" mt="7px">
            สี
          </Text>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(4, minmax(0px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            {colorProduct.map((item, index) => {
              return colorId === item.label ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  height="35px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={handleButtonClick}
                  outline={`2px solid red`}
                  bg="gray.300"
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  height="35px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={handleButtonClick}
                  id={item.label}
                >
                  {item.label}
                </Button>
              );
            })}
          </SimpleGrid>
          <Text fontSize="xl" pt="7px">
            ขนาด
          </Text>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(4, minmax(0px, 1fr))"
            mt="15px"
            pb="15px"
            fontSize="sm"
            borderBottom="1px"
            borderColor="gray.300"
          >
            {size.map((item, index) => {
              return sizeId === item.label ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  height="30px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectColor}
                  bg="gray.300"
                  outline={`2px solid red`}
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  height="30px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectSize}
                  id={item.label}
                >
                  {item.label}
                </Button>
              );
            })}
          </SimpleGrid>
          <Flex>
            <Text fontSize="xl" pt="7px">
              จำนวน
            </Text>
            <Spacer />
            <Text>asdasd</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
