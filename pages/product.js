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
import axios, { all } from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import StarRatings from "react-star-ratings";
function useProduct() {
  const router = useRouter();
  const data = router.query;
  const [product, setProduct] = useState([]);
  const [allSubOption, setAllSubOption] = useState([]);
  useEffect(() => {
    if (data?.product_id !== undefined) {
      async function fetchData() {
        const res = await axios.get(
          `https://shopee-api.deksilp.com/api/getProduct/?product_id=${data?.product_id}&shop_id=${data?.shop_id}`
        );
        if (res.data.product[0].type !== 1) {
          if (res.data.product[0].option1 !== null) {
            res.data.product[0].allOption1.unshift({
              img_name: res.data.product[0].img_product,
            });
          }
        } else {
          res.data.product[0].allImage.unshift({
            image: res.data.product[0].img_product,
          });
        }
        const subOption = res.data.allSupOption;
        const getProduct = res.data.product;
        setProduct(getProduct);
        setAllSubOption(subOption);
      }
      fetchData();
    }
  }, [data]);
  const swiperRef = useRef(null);
  const [option1, setOption1] = useState(null);
  const [option1Id, setOption1Id] = useState(null);
  async function selectOption1(event, id) {
    setOption1(event.target.id);
    setOption1Id(id);
    const slideIndex = product[0]?.allOption1.findIndex(
      (item) => item.op_name == event.target.id
    );
    swiperRef.current.swiper.slideTo(slideIndex);
  }

  const [num, setNum] = useState(1);
  function plusnum() {
    let a = num + 1;
    setNum(a);
  }
  function minusnum() {
    let a = num - 1;
    if (a >= 1) {
      setNum(a);
    }
  }

  const [option2, setOption2] = useState(null);
  function selectOption2(event) {
    setOption2(event.target.id);
  }

  async function addToCart(event) {
    event.preventDefault();
    let user_id = 1;
    const productId = product[0].id;
    const shopId = router.query.shop_id;
    const productOptionId = option1Id;
    const productSubOptionId = option2Id;

    const data = {
      user_id,
      productId,
      shopId,
      productOptionId,
      productSubOptionId,
      num,
    };
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/addProductToCart",
      data
    );
  }
  console.log(option2);
  return (
    <>
      <Head>
        <title>product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box px="15px" py="10px" bg="white">
        {product?.map((item, index) => {
          const sales =
            item?.price_sales !== 0
              ? item?.price - (item?.price_sales * item?.price) / 100
              : item?.price;
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
                {item.type === 1 ? (
                  item.allImage !== null ? (
                    item?.allImage.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Image
                            src={`https://shopee-api.deksilp.com/images/shopee/products/${item?.image}`}
                            alt=""
                            h="100%"
                            w="100%"
                            maxHeight="500px"
                          />
                        </SwiperSlide>
                      );
                    })
                  ) : null
                ) : item.option1 !== null ? (
                  item?.allOption1.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          src={`https://shopee-api.deksilp.com/images/shopee/products/${item?.img_name}`}
                          alt=""
                          h="100%"
                          w="100%"
                          maxHeight="500px"
                        />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <SwiperSlide key={index}>
                    <Image
                      src={`https://shopee-api.deksilp.com/images/shopee/products/${item?.img_product}`}
                      alt=""
                      h="100%"
                      w="100%"
                      maxHeight="500px"
                    />
                  </SwiperSlide>
                )}
              </Swiper>

              <Box>
                <Text fontSize="xl" pt="7px">
                  {item?.name_product}
                </Text>
                <Text fontSize="sm">{item?.detail_product}</Text>
              </Box>
              <Flex pt="15px">
                <Box>
                  <HStack>
                    <StarRatings
                      rating={item?.ratting}
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
                      {item?.price}
                    </Text>
                    <Box
                      opacity="7"
                      content=""
                      position="absolute"
                      top="45%"
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
        })}
      </Box>
      <Box px="15px" mt="10px" bg="white" pb="10px">
        {product[0]?.option1 !== null ? (
          <Box>
            <Text fontSize="xl" mt="7px">
              {product[0]?.option1}
            </Text>
            <SimpleGrid
              spacing={3}
              templateColumns="repeat(4, minmax(0px, 1fr))"
              my="15px"
              fontSize="sm"
            >
              {product[0]?.allOption1.map((item, index) => {
                return index !== 0 ? (
                  option1 == item?.op_name ? (
                    <Button
                      height="25px"
                      key={index}
                      w="100%"
                      borderRadius="md"
                      onClick={selectOption1}
                      outline={`2px solid red`}
                      bg="gray.300"
                      id={item?.op_name}
                      fontWeight="0px"
                      padding="0px"
                      isDisabled={
                        option2 !== null
                          ? !item.allOption2.some(
                              (element) => element.sub_op_name === option2
                            )
                          : false
                      }
                      color={ option2 !== null
                        ? !item.allOption2.some(
                            (element) => element.sub_op_name === option2
                          )? "lightgrey":"inherit"
                        : "inherit"
                      }
                    >
                        <Image
                          src={`https://shopee-api.deksilp.com/images/shopee/products/${item.img_name}`}
                          alt=""
                          boxSize="15px"
                          mr={1}
                        />
                        {item?.op_name}
                    </Button>
                  ) : (
                    <Button
                      height="25px"
                      key={index}
                      w="100%"
                      borderRadius="md"
                      outline={`1px solid gray`}
                      onClick={selectOption1}
                      id={item?.op_name}
                      fontWeight="0px"
                      padding="0px"
                      isDisabled={
                        option2 !== null
                          ? !item.allOption2.some(
                              (element) => element.sub_op_name === option2
                            )
                          : false
                      }
                      color={ option2 !== null
                        ? !item.allOption2.some(
                            (element) => element.sub_op_name === option2
                          )? "lightgrey":"inherit"
                        : "inherit"
                      }
                    >
                      <Image
                        src={`https://shopee-api.deksilp.com/images/shopee/products/${item.img_name}`}
                        alt=""
                        boxSize="15px"
                        mr={1}
                      />
                      {item?.op_name}
                    </Button>
                  )
                ) : null;
              })}
            </SimpleGrid>
          </Box>
        ) : null}

        <Box>
          <Text fontSize="xl" mt="7px">
            {product[0]?.option2}
          </Text>
          <SimpleGrid
            spacing={3}
            templateColumns="repeat(4, minmax(0px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            {allSubOption?.map((item, index) => {
              return option2 == item?.sub_op_name ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  height="25px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  outline={`2px solid red`}
                  bg="gray.300"
                  onClick={selectOption2}
                  id={item?.sub_op_name}
                  fontWeight="0px"
                  isDisabled={product[0]?.allOption1.some((e) => {
                    if (option1 === e.op_name) {
                      return !e.allOption2.some(
                        (element) => element.sub_op_name === item.sub_op_name
                      );
                    }
                    return false;
                  })}
                  color={
                    product[0]?.allOption1.some((e) => {
                      if (option1 === e.op_name) {
                        return !e.allOption2.some(
                          (element) => element.sub_op_name === item.sub_op_name
                        );
                      }
                      return false;
                    })
                      ? "lightgrey"
                      : "inherit"
                  }
                >
                  {item?.sub_op_name}
                </Button>
              ) : (
                <Button
                  height="25px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  outline={`1px solid gray`}
                  onClick={selectOption2}
                  id={item?.sub_op_name}
                  fontWeight="0px"
                  isDisabled={product[0]?.allOption1.some((e) => {
                    if (option1 === e.op_name) {
                      return !e.allOption2.some(
                        (element) => element.sub_op_name === item.sub_op_name
                      );
                    }
                    return false;
                  })}
                  color={
                    product[0]?.allOption1.some((e) => {
                      if (option1 === e.op_name) {
                        return !e.allOption2.some(
                          (element) => element.sub_op_name === item.sub_op_name
                        );
                      }
                      return false;
                    })
                      ? "lightgrey"
                      : "inherit"
                  }
                >
                  {item?.sub_op_name}
                </Button>
              );
            })}
          </SimpleGrid>
        </Box>
        <Box>
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
            <Button w="100%" borderRadius="xl" onClick={addToCart}>
              <Text>เพิ่มไปยังรถเข็น</Text>
            </Button>
            <Link
              href={
                product.length !== 0
                  ? product[0]?.type == 1 && num > 0
                    ? {
                        pathname: "/order",
                        query: {
                          name_shop: data?.name_shop,
                          product_id: product[0]?.id,
                          name_product: product[0]?.name_product,
                          detail_product: product[0]?.detail_product,
                          img_product: product[0]?.img_product,
                          price: product[0]?.price,
                          price_sales: product[0]?.price_sales,
                          option1: option1,
                          option2: option2,
                          name_option1: product[0]?.option1,
                          name_option2: product[0]?.option2,
                          type: product[0]?.type,
                          num: num,
                        },
                      }
                    : product[0]?.type == 2 && option1 !== null && num > 0
                    ? {
                        pathname: "/order",
                        query: {
                          name_shop: data?.name_shop,
                          product_id: product[0]?.id,
                          name_product: product[0]?.name_product,
                          detail_product: product[0]?.detail_product,
                          img_product: product[0]?.img_product,
                          price: product[0]?.price,
                          price_sales: product[0]?.price_sales,
                          option1: option1,
                          option2: option2,
                          name_option1: product[0]?.option1,
                          name_option2: product[0]?.option2,
                          type: product[0]?.type,
                          num: num,
                        },
                      }
                    : product[0]?.type == 3 &&
                      option1 !== null &&
                      option2 !== null &&
                      num > 0
                    ? {
                        pathname: "/order",
                        query: {
                          name_shop: data?.name_shop,
                          product_id: product[0]?.id,
                          name_product: product[0]?.name_product,
                          detail_product: product[0]?.detail_product,
                          img_product: product[0]?.img_product,
                          price: product[0]?.price,
                          price_sales: product[0]?.price_sales,
                          option1: option1,
                          option2: option2,
                          name_option1: product[0]?.option1,
                          name_option2: product[0]?.option2,
                          type: product[0]?.type,
                          num: num,
                        },
                      }
                    : { query: data }
                  : { query: data }
              }
              /* as={`/order`} */
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

export default useProduct;
