import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import style from "./style.module.css";
import { StarIcon } from "@chakra-ui/icons";
export default function Layout({ data }) {
  const [isBorderActive, setIsBorderActive] = useState([true]);

  if (data.Category != null) {
    useEffect(() => {
      setIsBorderActive(
        Array(data.Category.length).fill(false).fill(true, 0, 1)
      );
    }, [data.Category.length]);
  }

  const [cat_name, setCat_name] = useState("");
  const handleElementClick = (index, cat_name) => {
    const newArray = [...isBorderActive];
    for (let i = 0; i < newArray.length; i++) {
      if (i == index) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
    }
    setIsBorderActive(newArray);
    setCat_name(cat_name);
  };

  const fullStars = Math.floor(4.5);
  const hasHalfStar = 4.5 % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <StarIcon key={i} color="yellow.400" className={style.setIcon} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Icon
        key={fullStars}
        as={StarIcon}
        color="yellow.400"
        className={style.setIcon}
      />
    );
  }
  return (
    <>
      {data.Category !== null ? (
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
          {data.Category.map((item, index) => {
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
                onClick={() => handleElementClick(index, item.categoryname)}
                id={item.categoryname}
              >
                <Text fontWeight="bold">{item.categoryname}</Text>
              </Box>
            );
          })}
        </Flex>
      ) : null}

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(2, minmax(150px, 1fr))"
        m="15px"
      >
        {data.ProductAll.length !== 0
          ? data.ProductAll.product.map((item, index) => {
              let sales =
                item.price_sales !== 0
                  ? (item.price - (item.price_sales * item.price) / 100 )
                  : item.price;
              if (
                cat_name == "" ||
                isBorderActive[0] ||
                cat_name == "สินค้าทั้งหมด"
              ) {
                return (
                  <Link href="/product" key={item.id}>
                    <Card borderRadius="xl" boxShadow="xl" h="100%">
                      {item.price_sales !== 0 ? (
                        <Box
                          pos="absolute"
                          bg="red"
                          borderRadius="xl"
                          top="-8px"
                          right="-4px"
                        >
                          <Text
                            color="white"
                            px="10px"
                            className={style.textHead}
                          >
                            ลด {item.price_sales}%
                          </Text>
                        </Box>
                      ) : null}

                      <CardHeader
                        className={style.setPadding}
                        h="170px"
                        alignSelf="center"
                        w="100%"
                      >
                        <Image
                          src={`http://127.0.0.1:8000/images/shopee/products/${item.img_product}`}
                          alt={item.product_name}
                          height="100%"
                          width="100%"
                          borderRadius="xl"
                        />
                      </CardHeader>
                      <CardBody className={style.setPadding}>
                        <Text textAlign="center" className={style.textHead}>
                          {item.name_product.length > 20
                            ? item.name_product.substr(0, 20) + "..."
                            : item.name_product}
                        </Text>
                        <Box className={style.textBody}>
                          <Text className={style.lineclamp}>
                            {item.detail_product}
                          </Text>
                        </Box>
                      </CardBody>
                      <CardFooter px="15px" py="10px">
                        <Box alignSelf="end">
                          <HStack>{stars}</HStack>
                          <Text className={style.textFooter}>
                            ขายไปแล้ว 100 ชิ้น
                          </Text>
                        </Box>
                        <Spacer />
                        <Box>
                          <Flex className={style.textFooter}>
                            <Text position="relative">(ราคาปกติ </Text>
                            <Box
                              ml="7px"
                              display="inline-block"
                              position="relative"
                            >
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

                          <Box borderRadius="md" bg="red">
                            <Text
                              px="5px"
                              color="white"
                              className={style.textHead}
                              textAlign="center"
                            >
                              {sales}
                            </Text>
                          </Box>
                        </Box>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              } else if (cat_name == item.category) {
                return (
                  <Link href="/product" key={item.id}>
                    <Card borderRadius="xl" boxShadow="xl">
                      <Box
                        pos="absolute"
                        bg="red"
                        borderRadius="xl"
                        top="-8px"
                        right="-4px"
                      >
                        <Text
                          color="white"
                          px="10px"
                          className={style.textHead}
                        >
                          ลด 27%
                        </Text>
                      </Box>
                      <CardHeader className={style.setPadding}>
                        <Image src={item.image} alt="" borderRadius="xl" />
                      </CardHeader>
                      <CardBody className={style.setPadding}>
                        <Text textAlign="center" className={style.textHead}>
                          {item.productname}
                        </Text>
                        <Text className={style.textBody}>{item.detail}</Text>
                      </CardBody>
                      <CardFooter px="15px" py="10px">
                        <Box alignSelf="end">
                          <HStack>{stars}</HStack>
                          <Text className={style.textFooter}>
                            ขายไปแล้ว {item.totalsale} ชิ้น
                          </Text>
                        </Box>
                        <Spacer />
                        <Box>
                          <Text className={style.textFooter}>
                            (ราคาปกติ {item.pricesale})
                          </Text>
                          <Box borderRadius="md" bg="red">
                            <Text
                              px="5px"
                              color="white"
                              className={style.textHead}
                              textAlign="center"
                            >
                              {item.price}
                            </Text>
                          </Box>
                        </Box>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              }
            })
          : null}
      </SimpleGrid>
    </>
  );
}
