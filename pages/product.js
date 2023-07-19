import { useRef, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import Link from "next/link";
import axios, { all } from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Login from "@/components/ModalLogin/login";
// import required modules
import { Pagination } from "swiper";
import StarRatings from "react-star-ratings";
function useProduct() {
  const authen = useSelector((App) => App.authen);
  const userInfo = useSelector((App) => App.userInfo);
  const router = useRouter();
  const data = router.query;
  const [product, setProduct] = useState(null);
  const [allSubOption, setAllSubOption] = useState(null);
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    localStorage.removeItem("order");
    if (data?.product_id !== undefined) {
      async function fetchData() {
        const formData = new FormData();
        let pro_id = [data?.product_id];
        pro_id.forEach((e, index) => {
          formData.append(`product_id[${index}]`, e);
        });
        formData.append("shop_id", data?.shop_id);
        const res = await axios.post(
          `https://api.sellpang.com/api/getProduct`,
          formData
        );
        if (
          res.data.product[0].type !== 1 &&
          res.data.product[0].option1 !== null
        ) {
          for (let i = res.data.product[0].allImage.length - 1; i >= 0; i--) {
            let getIndex = res.data.product[0]?.allOption1.findIndex(
              (item) => item.img_name == res.data.product[0].allImage[i].image
            );
            if (getIndex == -1) {
              res.data.product[0].allOption1.unshift({
                img_name: res.data.product[0].allImage[i].image,
              });
            }
          }
          res.data.product[0].allOption1.unshift({
            img_name: res.data.product[0].img_product,
          });
        } else {
          res.data.product[0].allImage.unshift({
            image: res.data.product[0].img_product,
          });
        }
        const subOption = res.data.allSupOption;
        const getProduct = res.data.product;
        setProduct(getProduct);
        setAllSubOption(subOption);
        setPrice(res.data.product[0].price);
      }
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (product !== null && price !== null) {
      setIsLoading(false);
    }
  }, [product, price]);

  const swiperRef = useRef(null);
  const [option2, setOption2] = useState(null);
  const [option1, setOption1] = useState(null);
  const [option1Id, setOption1Id] = useState(0);
  function selectOption1(event, id) {
    if (event.target.id == option1) {
      setOption1(null);
      setOption1Id(0);
      swiperRef.current.swiper.slideTo(0);
      setPrice(product[0].price);
    } else {
      if (option2 !== null) {
        let a = price;
        product[0]?.allOption1?.forEach((element) => {
          if (element.op_name == event.target.id) {
            element?.allOption2?.forEach((e) => {
              if (e.sub_op_name == option2) {
                a = e.price;
                return;
              }
            });
            return;
          }
        });
        setPrice(a);
      }
      
      setOption1(event.target.id);
      setOption1Id(id);
      const slideIndex = product[0]?.allOption1.findIndex(
        (item) => item.op_name == event.target.id
      );
      swiperRef.current.swiper.slideTo(slideIndex);
    }
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

  function selectOption2(event) {
    if (event.target.id == option2) {
      setOption2(null);
      setPrice(product[0].price);
    } else {
      setOption2(event.target.id);
      let a = price;
      product[0]?.allOption1?.forEach((element) => {
        if (element.op_name == option1) {
          element?.allOption2?.forEach((e) => {
            if (e.sub_op_name == event.target.id) {
              a = e.price;
              return;
            }
          });
          return;
        }
      });
      setPrice(a);
    }
  }

  const [option2Id, setOption2Id] = useState(null);
  function setSubOptionId(event) {
    let a = 0;
    product[0]?.allOption1?.forEach((element) => {
      if (element.op_name == option1) {
        element?.allOption2?.forEach((e) => {
          if (e.sub_op_name == option2) {
            a = e.id;
            return;
          }
        });
        return;
      }
    });
    return a;
  }

  async function addToCart(event) {
    event.preventDefault();
    let user_id = userInfo.data[0].id;
    const productId = product[0].id;
    const shopId = router.query.shop_id;
    const productOptionId = option1Id;
    let productSubOptionId = 0;
    if (product[0]?.allOption1?.length > 0 && option1 == null) {
      return;
    }
    if (allSubOption.length > 0 && option2 == null) {
      return;
    }
    product[0]?.allOption1?.forEach((element) => {
      if (element.op_name == option1) {
        element?.allOption2?.forEach((e) => {
          if (e.sub_op_name == option2) {
            productSubOptionId = e.id;
            return;
          }
        });
        return;
      }
    });

    const data = {
      user_id,
      productId,
      shopId,
      productOptionId,
      productSubOptionId,
      num,
    };
    const response = await axios.post(
      "https://api.sellpang.com/api/addProductToCart",
      data
    );
  }

  function setLocal() {
    const newArr = {
      shop_id: data?.shop_id,
      name_shop: data?.name_shop,
      product_id: product[0]?.id,
      name_product: product[0]?.name_product,
      detail_product: product[0]?.detail_product,
      img_product: product[0]?.img_product,
      price: price,
      price_sales: product[0]?.price_sales,
      option1: option1,
      option2: option2,
      name_option1: product[0]?.option1,
      name_option2: product[0]?.option2,
      type: product[0]?.type,
      num: num,
      option1Id: option1Id !== null ? option1Id : 0,
      option2Id: setSubOptionId(),
    };
    if (product[0]?.type == 1 && num > 0) {
      localStorage.setItem("order", JSON.stringify(newArr));
    } else if (product[0]?.type == 2 && option1 !== null && num > 0) {
      localStorage.setItem("order", JSON.stringify(newArr));
    } else if (
      product[0]?.type == 3 &&
      option1 !== null &&
      option2 !== null &&
      num > 0
    ) {
      localStorage.setItem("order", JSON.stringify(newArr));
    } else {
      return;
    }

    router.push({
      pathname: "/order",
    });
  }
  ///////////////////
  const [showLogin, setShowLogin] = useState(false);

  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure();
  const {
    isOpen: isOpenForm2,
    onOpen: onOpenForm2,
    onClose: onCloseForm2,
  } = useDisclosure();

  const handleClick = () => {
    onCloseForm1();
    onCloseForm2();
    console.log("--->handleClick");
  };

  const loginClick = () => {
    setShowLogin(true);
    onCloseForm1();
  };
  if (!isLoading) {
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
                ? price - (item?.price_sales * price) / 100
                : price;
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
                              src={`https://api.sellpang.com/images/shopee/products/${item?.image}`}
                              alt=""
                              h="400px"
                              w="400px"
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
                            src={`https://api.sellpang.com/images/shopee/products/${item?.img_name}`}
                            alt=""
                            h="400px"
                            w="400px"
                            maxHeight="500px"
                          />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <SwiperSlide key={index}>
                      <Image
                        src={`https://api.sellpang.com/images/shopee/products/${item?.img_product}`}
                        alt=""
                        h="400px"
                        w="400px"
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
                      ขายไปแล้ว {item?.total_sales} ชิ้น
                    </Text>
                  </Box>
                  <Spacer />
                  {item.price_sales !== 0 ? (
                    <Flex alignSelf="center" fontSize="xs">
                      <Text position="relative">(ราคาปกติ </Text>
                      <Box ml="7px" display="inline-block" position="relative">
                        <Text position="relative" display="inline">
                          {item?.price.toFixed(2)}
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
                  ) : null}

                  <Box ml="10px" borderRadius="md" bg="red" alignSelf="center">
                    <Text
                      px="10px"
                      color="white"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {sales.toFixed(2)}.-
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
                  return item.op_name ? (
                    option1 == item?.op_name ? (
                      <Button
                        height="25px"
                        key={index}
                        w="100%"
                        borderRadius="md"
                        onClick={(e) => {
                          selectOption1(e, item.id);
                          /* setPrice(product[0].type == 2 ? item.price : price); */
                        }}
                        border={`2px solid red`}
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
                        color={
                          option2 !== null
                            ? !item.allOption2.some(
                                (element) => element.sub_op_name === option2
                              )
                              ? "lightgrey"
                              : "inherit"
                            : "inherit"
                        }
                      >
                        <Image
                          src={`https://api.sellpang.com/images/shopee/products/${item.img_name}`}
                          alt=""
                          boxSize="15px"
                          mr={1}
                          onClick={(e) => {
                            selectOption1(e, item.id);
                            /* setPrice(product[0].type == 2 ? item.price : price); */
                          }}
                        />
                        {item?.op_name}
                      </Button>
                    ) : (
                      <Button
                        height="25px"
                        key={index}
                        w="100%"
                        borderRadius="md"
                        border={`1px solid gray`}
                        onClick={(e) => {
                          selectOption1(e, item.id);
                          /* setPrice(product[0].type == 2 ? item.price : price); */
                        }}
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
                        color={
                          option2 !== null
                            ? !item.allOption2.some(
                                (element) => element.sub_op_name === option2
                              )
                              ? "lightgrey"
                              : "inherit"
                            : "inherit"
                        }
                      >
                        <Image
                          src={`https://api.sellpang.com/images/shopee/products/${item.img_name}`}
                          alt=""
                          boxSize="15px"
                          mr={1}
                          onClick={(e) => {
                            selectOption1(e, item.id);
                            setPrice(product[0].type == 2 ? item.price : price);
                          }}
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
                  <Button
                    height="25px"
                    key={index}
                    w="100%"
                    borderRadius="md"
                    border={`2px solid red`}
                    bg="gray.300"
                    onClick={(e) => {
                      selectOption2(e);
                    }}
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
                            (element) =>
                              element.sub_op_name === item.sub_op_name
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
                    border={`1px solid gray`}
                    onClick={(e) => {
                      selectOption2(e);
                    }}
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
                            (element) =>
                              element.sub_op_name === item.sub_op_name
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
              <Box borderRadius="xl" bg="gray.100" px="5px" mr="20px" w="140px">
                <Flex alignItems="center">
                  <Button h="15px" w="15px" onClick={minusnum} px="0px">
                    <Image
                      src="/img/minus.png"
                      alt="My Icon"
                      objectFit="contain"
                      w="full"
                      h="full"
                    />
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
                    />
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box className="test" bottom={0}>
          {authen?.isAuthenticate === true ? (
            <Box
              className="test"
              px="15px"
              mt="10px"
              py="8px"
              bg="white"
              pos="fixed"
              bottom={0}
              zIndex="100"
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
                <Button w="100%" bg="red" borderRadius="xl" onClick={setLocal}>
                  <Text>ซื้อสินค้า</Text>
                </Button>
              </SimpleGrid>
            </Box>
          ) : (
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
                <Button w="100%" borderRadius="xl" onClick={onOpenForm1}>
                  <Text>เพิ่มไปยังรถเข็น</Text>
                </Button>
                <Button
                  w="100%"
                  bg="red"
                  borderRadius="xl"
                  onClick={onOpenForm1}
                >
                  <Text>ซื้อสินค้า</Text>
                </Button>
              </SimpleGrid>
            </Box>
          )}
        </Box>
        <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm1} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
              <Image
                src="/img/cancel.png"
                alt=""
                h="25px"
                w="25px"
                onClick={() => handleClick()}
              />
            </ModalHeader>
            <ModalBody>
              <Box px="5px">
                <Text
                  bg="red"
                  textAlign="center"
                  borderRadius="xl"
                  fontSize="25px"
                  color="white"
                  fontWeight="bold"
                  onClick={() => loginClick()}
                >
                  ลงชื่อเข้าใช้ด้วยโทรศัพท์
                </Text>
                <Text color="gray.400" textAlign="center">
                  ระบบจะจดจำที่อยู่ในการส่งสินค้าเมื่อใช้งานในครั้งต่อไป
                </Text>
                <Text
                  mt="15px"
                  bg="gray.100"
                  textAlign="center"
                  borderRadius="xl"
                  fontSize="25px"
                  fontWeight="bold"
                  onClick={() => handleClick()}
                >
                  สั่งตอนนี้
                </Text>
                <Text color="gray.400" textAlign="center">
                  ต้องกรอกที่อยู่ในการจัดส่งทุกครั้งที่เข้้าใช้งานใหม่
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <Login onOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    );
  }
}

export default useProduct;
