import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import {
  Image,
  Box,
  Text,
  Flex,
  HStack,
  Icon,
  Spacer,
  SimpleGrid,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import StarRatings from "react-star-ratings";
function product() {
  const router = useRouter();
  const data = router.query;
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (data.id !== undefined) {
      async function fetchData() {
        const res = await axios.get(
          `http://192.168.0.86:8000/api/getProduct/${data.id}`
        );
        res.data.product[0].allImage.unshift({
          image: res.data.product[0].img_product,
        });
        setProduct(res.data);
      }
      fetchData();
    }
  }, [data]);

  const swiperRef = useRef(null);
  async function selectColor(event) {
    setColorId(event.target.id);
    const slideIndex = product.product[0].allImage.findIndex(
      (item) => item.color === event.target.id
    );
    swiperRef.current.swiper.slideTo(slideIndex);
  }

  const [num, setNum] = useState(0);
  function plusnum() {
    let a = num + 1;
    setNum(a);
  }
  function minusnum() {
    let a = num - 1;
    if (a >= 0) {
      setNum(a);
    }
  }

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
  const [colorId, setColorId] = useState(null);

  const [sizeId, setSizeId] = useState(null);
  function selectSize(event) {
    setSizeId(event.target.id);
  }
  return (
    <>
      <Head>
        <title>product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box px="15px" py="10px" bg="white">
        {product.length !== 0
          ? product.product.map((item, index) => {
              const sales =
                item.price_sales !== 0
                  ? item.price - (item.price_sales * item.price) / 100
                  : item.price;
              return (
                <Box key={index}>
                  <Swiper
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    ref={swiperRef}
                  >
                    {item.allImage.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Image
                            src={`http://192.168.0.86:8000/images/shopee/products/${item.image}`}
                            alt=""
                            h="350px"
                            w="100%"
                            maxHeight="500px"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>

                  <Box>
                    <Text fontSize="xl" pt="7px">
                      {item.name_product}
                    </Text>
                    <Text fontSize="sm">{item.detail_product}</Text>
                  </Box>
                  <Flex pt="15px">
                    <Box>
                      <HStack>
                        <StarRatings
                          rating={item.ratting}
                          starDimension="10px"
                          starSpacing="0px"
                          starRatedColor="yellow"
                        />
                      </HStack>
                      <Text pt="4px" fontSize="xs">
                        ขายไปแล้ว 1000 ชิ้น
                      </Text>
                    </Box>
                    <Spacer />
                    <Flex alignSelf="center" fontSize="xs">
                      <Text position="relative">(ราคาปกติ </Text>
                      <Box ml="7px" display="inline-block" position="relative">
                        <Text position="relative" display="inline">
                          {item.price}
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
                    <Box
                      ml="10px"
                      borderRadius="md"
                      bg="red"
                      alignSelf="center"
                    >
                      <Text
                        px="10px"
                        color="white"
                        fontSize="2xl"
                        fontWeight="bold"
                      >
                        {sales}.-
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })
          : null}
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
                  onClick={selectColor}
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
                  onClick={selectColor}
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
          <Flex alignItems="center" pt="7px">
            <Text fontSize="xl">จำนวน</Text>
            <Spacer />
            <Box borderRadius="xl" bg="gray.100" px="5px" mr="20px">
              <Flex alignItems="center">
                <Button h="15px" w="15px" onClick={minusnum} px="0px">
                  <Image
                    src="/img/minus.png"
                    alt="My Icon"
                    objectFit="contain"
                    w="full"
                    h="full"
                  ></Image>
                </Button>
                <Text px="20px" fontSize="xl">
                  {num}
                </Text>
                <Button h="15px" onClick={plusnum} px="0px">
                  <Image
                    src="/img/plus.png"
                    alt="My Icon"
                    objectFit="contain"
                    w="full"
                    h="full"
                  ></Image>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box className="test" bottom={0}>
        <Box
          className="test"
          px="15px"
          mt="10px"
          py="8px"
          bg="white"
          pos="fixed"
          bottom={0}
        >
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(2, minmax(30px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            <Link href="">
              <Button w="100%" borderRadius="xl">
                <Text>เพิ่มไปยังรถเข็น</Text>
              </Button>
            </Link>
            <Link
              href={
                sizeId !== null && colorId !== null && num > 0
                  ? {
                      pathname: "/order",
                      query: {
                        name_shop: data.name_shop,
                        product_id: product.product[0].id,
                        name_product: product.product[0].name_product,
                        detail_product: product.product[0].detail_product,
                        img_product: product.product[0].img_product,
                        price: product.product[0].price,
                        price_sales: product.product[0].price_sales,
                        size: sizeId,
                        color: colorId,
                        num: num,
                      },
                    }
                  : ""
              }
              as={`/order`}
            >
              <Button w="100%" bg="red" borderRadius="xl">
                <Text>ซื้อสินค้า</Text>
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

export default product;
