import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  Center,
  useDisclosure,
  Box,
  Text,
  Image,
  Input,
  Flex,
  Spacer,
  Button,
  Skeleton,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { StarIcon } from "@chakra-ui/icons";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/router";
import { getAllProduct, getShop, getCategory } from "@/hooks/allProduct";
import ModalLogin from "@/components/ModalLogin";

export default function useHome(props) {
  const router = useRouter();
  const shopUrl = router.query.id;
  const [loadingImg, setLoadingImg] = useState(true);
  const { data: shop } = getShop(shopUrl);
  const { data: product } = getAllProduct(shop?.shop[0]?.id);
  const { data: category } = getCategory(shop?.shop[0]?.id);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollTop(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const [categoryAll, setCategoryAll] = useState(null);
  const [ProductAll, setProductAll] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    localStorage.removeItem("order");
    const newArr = { owner_shop_id: shop?.shop[0]?.user_code };
    localStorage.setItem("owner_shop_id", JSON.stringify(newArr));
    setNameShop(shop);
    setProductAll(product);
    setCount(count + 1);
    if (category != undefined && category?.category.length > 0) {
      if (category?.category[0]?.cat_name !== "สินค้าทั้งหมด") {
        category?.category.unshift({ cat_name: "สินค้าทั้งหมด" });
      }
      setCategoryAll(category);
    }
    setIsBorderActive(
      Array(category?.category.length).fill(false).fill(true, 0, 1)
    );
  }, [category, product]);

  const [bgColor, setBgColor] = useState("rgba(255,255,255,0)");

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    setScrollPosition(props.data);
  }, [props.data]);

  useEffect(() => {
    if (scrollTop == 0) {
      setBgColor("rgba(255,255,255,0)");
    } else if (scrollTop > 0 && scrollTop < 40) {
      setBgColor("rgba(255,255,255,0.1)");
    } else if (scrollTop > 40 && scrollTop < 50) {
      setBgColor("rgba(255,255,255,0.3)");
    } else if (scrollTop > 50 && scrollTop < 60) {
      setBgColor("rgba(255,255,255,0.5)");
    } else if (scrollTop > 60 && scrollTop < 70) {
      setBgColor("rgba(255,255,255,0.7)");
    } else if (scrollTop > 80 && scrollTop < 90) {
      setBgColor("rgba(255,255,255,0.9)");
    } else if (scrollTop > 90) {
      setBgColor("rgba(255,255,255,1)");
    }
  });
  const [nameShop, setNameShop] = useState(null);

  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure({ defaultIsOpen: true });

  const handleClick = () => {
    onCloseForm1();
  };

  const search = (event) => {
    async function fetchData() {
      const res = await axios.post(
        `https://api.sellpang.com/api/searchProduct/${nameShop.shop[0].id}?search=${event.target.value}`
      );
      setProductAll(res.data);
    }

    fetchData();
  };

  const [isBorderActive, setIsBorderActive] = useState([true]);

  const [catName, setCatName] = useState("");
  const handleElementClick = (index, catName) => {
    const newArray = [...isBorderActive];
    for (let i = 0; i < newArray.length; i++) {
      if (i == index) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
    }
    setIsBorderActive(newArray);
    setCatName(catName);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className="test" h="150px">
        <Box
          className="test"
          w="100%"
          p="10px"
          pb="15px"
          pt="15px"
          pos="fixed"
          zIndex={100}
          bg={bgColor}
        >
          <Flex alignItems="center">
            <InputGroup
              ml="2"
              mr="5"
              maxW="100%"
              bg="white"
              borderRadius="xl"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <InputLeftElement
                h="7"
                pointerEvents="none"
                /* children={<FaSearch color="gray.300" />} */
              />
              <Input
                h="7"
                borderRadius="xl"
                type="text"
                placeholder="ค้นหา"
                onChange={search}
              />
            </InputGroup>
            <Flex justifyContent="flex-end">
              <ModalLogin type="card" />
              <ModalLogin type="avatar" />
            </Flex>
          </Flex>
        </Box>
        {nameShop?.shop.map((item, index) => {
          return (
            <Flex
              key={index}
              alignItems="center"
              px="2"
              pt="16"
              pb="28px"
              backgroundImage={`url(https://api.sellpang.com/images/shopee/cover_img_shop/${item.cover_img_shop})`}
              h="100%"
            >
              <Box
                bg="white"
                borderRadius="50%"
                className="wh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                ml="2"
              >
                <Image
                  borderRadius="50%"
                  src={`https://api.sellpang.com/images/shopee/shop/${item.img_shop}`}
                  alt=""
                  className="wh"
                />
              </Box>
              <Box textColor="white" pl="4">
                <Box bg="black" borderRadius="md">
                  <Text pl="10px" className="textHead">
                    {item.name_shop}
                  </Text>
                </Box>

                <Flex alignItems="center" height="100%" mt="10px">
                  <Center bg="red" borderRadius="md" px="5px">
                    <StarIcon color="yellow.400" className="setIcon" />
                    <Text pl="5px" className="textBody">
                      {parseFloat(item.ratting).toFixed(1)}/5.0
                    </Text>
                  </Center>
                  <Box bg="red" borderRadius="md" ml="10px">
                    <Text px="5px" className="textBody">
                      ร้านแนะนำ
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Spacer />
              <ModalLogin type="chat" />
            </Flex>
          );
        })}
      </Box>
      <Flex
        flexWrap="nowrap"
        overflowX="auto"
        overflowY="hidden"
        h="12"
        pos="sticky"
        top="53px"
        bg="white"
        zIndex={1000}
        sx={{
          "::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
        }}
      >
        {categoryAll?.category?.map((item, index) => {
          return (
            <Box
              key={index}
              alignSelf="end"
              px="15px"
              pb="3px"
              flex="1"
              textAlign="center"
              whiteSpace="nowrap"
              borderBottom={isBorderActive[index] ? "2px" : "1px"}
              borderColor={isBorderActive[index] ? "red" : "gray.300"}
              onClick={() => handleElementClick(index, item.id)}
              id={item?.id}
            >
              <Text fontWeight="bold">{item?.cat_name}</Text>
            </Box>
          );
        })}
      </Flex>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(2, minmax(150px, 1fr))"
        m="15px"
      >
        {ProductAll?.product?.map((item, index) => {
          let sales =
            item?.price_sales !== 0
              ? item?.price - (item?.price * item?.price_sales) / 100
              : item?.price;
          if (
            catName == "" ||
            isBorderActive[0] ||
            catName == "สินค้าทั้งหมด"
          ) {
            return (
              <Link
                href={{
                  pathname: "/product",
                  query: {
                    product_id: item?.id,
                    shop_id: nameShop?.shop[0]?.id,
                    name_shop: nameShop?.shop[0]?.name_shop,
                  },
                }}
                key={item.id}
                /* as={`/product`} */
              >
                <Card borderRadius="xl" boxShadow="xl" h="100%">
                  {item?.price_sales !== 0 ? (
                    <Box
                      pos="absolute"
                      bg="red"
                      borderRadius="xl"
                      top="-8px"
                      right="-4px"
                    >
                      <Text color="white" px="10px" className="textHead">
                        ลด {item?.price_sales}%
                      </Text>
                    </Box>
                  ) : null}

                  <CardHeader
                    h="100%"
                    className="setPadding"
                    maxHeight="170px"
                    maxWidth="170px"
                    alignSelf="center"
                    w="100%"
                  >
                    <Skeleton
                      height="140px"
                      width="140px"
                      borderRadius="xl"
                      display={loadingImg ? "block" : "none"}
                    />
                    <Image
                      src={`https://api.sellpang.com/images/shopee/products/${item?.img_product}`}
                      alt={item?.product_name}
                      height="100%"
                      width="100%"
                      borderRadius="xl"
                      display={!loadingImg ? "block" : "none"}
                      onLoad={() => setLoadingImg(false)}
                    />
                  </CardHeader>
                  <CardBody className="setPadding">
                    <Text textAlign="center" className="textHead">
                      {item?.name_product?.length > 20
                        ? item?.name_product.substr(0, 20) + "..."
                        : item?.name_product}
                    </Text>
                    <Box className="textBody">
                      <Text className="lineclamp">{item?.detail_product}</Text>
                    </Box>
                  </CardBody>
                  <CardFooter px="15px" py="10px">
                    <Box alignSelf="end">
                      <HStack>
                        <StarRatings
                          rating={item?.ratting}
                          starDimension="10px"
                          starSpacing="0px"
                          starRatedColor="orange"
                        />
                      </HStack>
                      <Text className="textFooter">
                        ขายไปแล้ว{" "}
                        {item?.total_sales !== null
                          ? item?.total_sales?.toLocaleString()
                          : 0}{" "}
                        ชิ้น
                      </Text>
                    </Box>
                    <Spacer />
                    <Box>
                      <Flex
                        className="textFooter"
                        visibility={
                          item.price_sales !== 0 ? "visible" : "hidden"
                        }
                      >
                        <Text position="relative">(ราคาปกติ </Text>
                        <Box
                          ml="7px"
                          display="inline-block"
                          position="relative"
                        >
                          <Text position="relative" display="inline">
                            {item?.price}
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

                      <Box borderRadius="md" bg="red">
                        <Text
                          px="5px"
                          color="white"
                          className="textHead"
                          textAlign="center"
                        >
                          {sales.toFixed(2).toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                  </CardFooter>
                </Card>
              </Link>
            );
          } else if (catName == item?.category) {
            return (
              <Link
                href={{
                  pathname: "/product",
                  query: {
                    product_id: item?.id,
                    shop_id: nameShop?.shop[0]?.id,
                    name_shop: nameShop?.shop[0]?.name_shop,
                  },
                }}
                key={item?.id}
                /* as={`/product`} */
              >
                <Card borderRadius="xl" boxShadow="xl" h="100%">
                  {item?.price_sales !== 0 ? (
                    <Box
                      pos="absolute"
                      bg="red"
                      borderRadius="xl"
                      top="-8px"
                      right="-4px"
                    >
                      <Text color="white" px="10px" className="textHead">
                        ลด {item?.price_sales}%
                      </Text>
                    </Box>
                  ) : null}

                  <CardHeader
                    h="100%"
                    className="setPadding"
                    maxHeight="170px"
                    maxWidth="170px"
                    alignSelf="center"
                    w="100%"
                  >
                    {loadingImg ? (
                      <Skeleton height="170px" width="170px" />
                    ) : (
                      <Image
                        src={`https://api.sellpang.com/images/shopee/products/${item?.img_product}`}
                        alt={item?.product_name}
                        height="100%"
                        width="100%"
                        borderRadius="xl"
                        onLoad={() => setLoadingImg(false)}
                      />
                    )}
                  </CardHeader>
                  <CardBody className="setPadding">
                    <Text textAlign="center" className="textHead">
                      {item?.name_product?.length > 20
                        ? item?.name_product.substr(0, 20) + "..."
                        : item?.name_product}
                    </Text>
                    <Box className="textBody">
                      <Text className="lineclamp">{item?.detail_product}</Text>
                    </Box>
                  </CardBody>
                  <CardFooter px="15px" py="10px">
                    <Box alignSelf="end">
                      <HStack>
                        <StarRatings
                          rating={item?.ratting}
                          starDimension="10px"
                          starSpacing="0px"
                          starRatedColor="yellow"
                        />
                      </HStack>
                      <Text className="textFooter">
                        ขายไปแล้ว{" "}
                        {item.total_sales !== null
                          ? item.total_sales.toLocaleString()
                          : 0}{" "}
                        ชิ้น
                      </Text>
                    </Box>
                    <Spacer />
                    <Box>
                      <Flex
                        className="textFooter"
                        visibility={
                          item.price_sales !== 0 ? "visible" : "hidden"
                        }
                      >
                        <Text position="relative">(ราคาปกติ </Text>
                        <Box
                          ml="7px"
                          display="inline-block"
                          position="relative"
                        >
                          <Text position="relative" display="inline">
                            {item?.price}
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

                      <Box borderRadius="md" bg="red">
                        <Text
                          px="5px"
                          color="white"
                          className="textHead"
                          textAlign="center"
                        >
                          {sales.toFixed(2).toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                  </CardFooter>
                </Card>
              </Link>
            );
          }
        })}
      </SimpleGrid>
      {/* <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm1} isCentered>
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
              <FormControl>
                <Text fontSize="25px" fontWeight="bold">
                  กรอกเบอร์โทรศัพท์
                </Text>
                <Input bg="gray.100" />
                <Flex mt="15px">
                  <Text fontSize="25px" fontWeight="bold">
                    กรอกรหัส OTP
                  </Text>
                  <Spacer />
                  <Text fontSize="25px" color="orange" as="u">
                    รับรหัส OTP
                  </Text>
                </Flex>

                <Input bg="gray.100" />
              </FormControl>

              <Box textAlign="center">
                <Button mt="15px" bg="red" color="white" type="submit">
                  ยืนยัน
                </Button>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
}
