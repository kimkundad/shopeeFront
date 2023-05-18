import {
  Box,
  Checkbox,
  Text,
  Flex,
  Spacer,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import axios from "axios";
export default function CartItem(props) {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    setCartItem(props.data.cartItem);
  }, []);
  const [checkAll, setCheckAll] = useState([]);
  const handleCheckAllChange = (event, index, subIndex) => {
    const newCheckAll = [...checkAll];
    newCheckAll[index][subIndex] = event.target.checked;
    sumPrice();
    setCheckAll(newCheckAll);
  };

  useEffect(() => {
    const newItems = cartItem.map((item) => {
      const subItems = item.product.map(() => false);
      return subItems;
    });
    setCheckAll(newItems);
  }, [cartItem]);

  const [sum, setSum] = useState(0);

  const [num, setNum] = useState([]);
  useEffect(() => {
    const newItems = cartItem.map((item) => {
      const subItems = item.product.map((subItem) => subItem.num);
      return subItems;
    });
    setNum(newItems);
  }, [cartItem]);

  const CheckAll = (event, index) => {
    const newCheckAll = [...checkAll];
    for (let i = 0; i < newCheckAll[index].length; i++) {
      newCheckAll[index][i] = event.target.checked;
    }
    sumPrice();
    setCheckAll(newCheckAll);
  };

  const [productId, setProductId] = useState([]);
  const sumPrice = () => {
    const newCheckAll = [...checkAll];
    let newSum = 0;
    let pro_id = [];
    console.log(cartItem);
    for (let i = 0; i < newCheckAll.length; i++) {
      for (let k = 0; k < newCheckAll[i].length; k++) {
        if (newCheckAll[i][k]) {
          pro_id.push(cartItem[i].product[k].id);
          newSum =
            newSum +
            (cartItem[i].product[k].price_sales == 0
              ? cartItem[i].product[k].type_product === 1
                ? cartItem[i].product[k].price_type_1 * num[i][k]
                : cartItem[i].product[k].type_product === 2
                ? cartItem[i].product[k].price_type_2 * num[i][k]
                : cartItem[i].product[k].price_type_3 * num[i][k]
              : cartItem[i].product[k].type_product === 1
              ? ((cartItem[i].product[k].price_type_1 *
                  cartItem[i].product[k].price_sales) /
                  100) *
                num[i][k]
              : cartItem[i].product[k].type_product === 2
              ? ((cartItem[i].product[k].price_type_2 *
                  cartItem[i].product[k].price_sales) /
                  100) *
                num[i][k]
              : ((cartItem[i].product[k].price_type_3 *
                  cartItem[i].product[k].price_sales) /
                  100) *
                num[i][k]);
        } else {
          false;
        }
      }
    }
    setProductId(pro_id);
    setSum(newSum);
  };
  const plusnum = async (index, subIndex, cart_id) => {
    const newNum = [...num];
    let number = 0;
    number = newNum[index][subIndex] + 1;
    newNum[index][subIndex] = number;
    setNum(newNum);
    sumPrice();
    const data = {
      cart_id,
      number,
    };
    const response = await axios.post(
      "https://api.sellpang.com/api/addProductToCart",
      data
    );
  };

  const minusnum = async (index, subIndex, cart_id) => {
    const newNum = [...num];
    let number = 1;
    number = newNum[index][subIndex] - 1;
    if (number >= 1) {
      newNum[index][subIndex] = number;
      const data = {
        cart_id,
        number,
      };
      const response = await axios.post(
        "https://api.sellpang.com/api/addProductToCart",
        data
      );
    }
    setNum(newNum);
    sumPrice();
  };

  const deleteCartItem = async (id) => {
    let arr = [];
    arr.push(id);
    const formdata = new FormData();
    arr.forEach((e, index) => {
      formdata.append(`cart_id[${index}]`, e);
    });

    const res = await axios.post(
      `https://api.sellpang.com/api/deleteCartItem`,
      formdata
    );
    setCartItem(res.data.cartItem);
  };
  return (
    <div>
      {cartItem.length == 0 ? (
        <Box textAlign="center" pt="20%">
          ไม่มีสินค้าในรถเข็น
        </Box>
      ) : null}
      {cartItem.map((item, index) => (
        <Box
          bg="white"
          pt={index === 0 ? "30px" : "15px"}
          mt={index === 0 ? "0px" : "15px"}
          key={index}
        >
          <Checkbox
            px="15px"
            isChecked={
              checkAll.length > 0 ? checkAll[index].every(Boolean) : false
            }
            onChange={(event) => CheckAll(event, index)}
            colorScheme="red"
            sx={{
              "& .chakra-checkbox__control": {
                borderRadius: "50% !important",
              },
              "& svg": {
                stroke: "none !important",
              },
            }}
          >
            <Text className={style.textHead} pl="15px" fontWeight="bold">
              {item.name_shop}
            </Text>
          </Checkbox>
          <p>{item.product.name}</p>
          {item.product.map((subItem, subIndex) => {
            let price =
              subItem.price_sales == 0
                ? subItem.type_product == 1
                  ? subItem.price_type_1
                  : subItem.type_product == 2
                  ? subItem.price_type_2
                  : subItem.price_type_3
                : subItem.type_product == 1
                ? (subItem.price_type_1 * subItem.price_sales) / 100
                : subItem.type_product == 2
                ? (subItem.price_type_2 * subItem.price_sales) / 100
                : (subItem.price_type_3 * subItem.price_sales) / 100;
            return (
              <div key={subIndex}>
                <Checkbox
                  width="-webkit-fill-available"
                  mx="15px"
                  pb="10px"
                  colorScheme="red"
                  sx={{
                    "& .chakra-checkbox__control": {
                      borderRadius: "50% !important",
                    },
                    "& svg": {
                      stroke: "none !important",
                    },
                    "& .chakra-checkbox__label": {
                      width: "100%",
                    },
                  }}
                  borderBottom={
                    index === cartItem.length - 1 &&
                    subIndex === item.product.length - 1
                      ? ""
                      : "1px"
                  }
                  borderColor="gray.300"
                  key={subItem.id}
                  id={subIndex}
                  isChecked={
                    checkAll.length > 0 ? checkAll[index][subIndex] : false
                  }
                  onChange={(event) =>
                    handleCheckAllChange(event, index, subIndex)
                  }
                >
                  <Flex pl="5px" alignItems="center">
                    <Box>
                      <Image
                        src={`https://api.sellpang.com/images/shopee/products/${subItem.img_product}`}
                        alt=""
                        className={style.wh}
                      ></Image>
                    </Box>
                    <Box
                      pl="15px"
                      wordBreak="break-all"
                      width="-webkit-fill-available"
                    >
                      <Text
                        className={(style.textHead, style.oneLines)}
                        pt="7px"
                        fontWeight="bold"
                      >
                        {subItem.name_product}
                      </Text>
                      <Text className={(style.textBody, style.twoLines)}>
                        {subItem.detail_product}
                      </Text>
                      {subItem.option1 !== null && subItem.option2 !== null ? (
                        <Text
                          className={style.textBody}
                          bg="gray.300"
                          borderRadius="md"
                          display="initial"
                          px="7px"
                        >
                          ตัวเลือกสินค้า: {subItem.option1} {subItem.op_name}{" "}
                          {subItem.option2} {subItem.sub_op_name}
                        </Text>
                      ) : subItem.option1 !== null ? (
                        <Text
                          className={style.textBody}
                          bg="gray.300"
                          borderRadius="md"
                          display="initial"
                          px="7px"
                        >
                          ตัวเลือกสินค้า: {subItem.option1} {subItem.op_name}
                        </Text>
                      ) : null}

                      <Flex pt="5px">
                        <Text
                          className={style.textHead}
                          fontWeight="bold"
                          color="red"
                        >
                          {price.toFixed(2)}.-
                        </Text>

                        <Spacer />
                        <Box borderRadius="xl" bg="gray.100" alignSelf="center">
                          <Flex alignItems="center">
                            <Button
                              h="15px"
                              w="15px"
                              onClick={() =>
                                minusnum(index, subIndex, subItem.id)
                              }
                              px="0px"
                            >
                              <Image
                                src="/img/minus.png"
                                alt="My Icon"
                                objectFit="contain"
                                w="full"
                                h="full"
                              ></Image>
                            </Button>
                            <Text px="5px" className={style.textHead}>
                              {num.length > 0 ? num[index][subIndex] : false}
                            </Text>
                            <Button
                              h="15px"
                              w="15px"
                              onClick={() =>
                                plusnum(index, subIndex, subItem.id)
                              }
                              px="0px"
                            >
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
                    <Box
                      h="20px"
                      w="30px"
                      bg="white"
                      alignSelf="start"
                      pt="10px"
                    >
                      <Button
                        bg="white"
                        h="20px"
                        w="20px"
                        onClick={() => deleteCartItem(subItem.id)}
                      >
                        <Image
                          src="/img/delete.png"
                          alt=""
                          h="20px"
                          w="20px"
                          maxWidth="none"
                        />
                      </Button>
                    </Box>
                  </Flex>
                </Checkbox>
              </div>
            );
          })}
        </Box>
      ))}
      <Box className="test" bottom={0}>
        <Box
          className="test"
          px="15px"
          py="8px"
          bg="white"
          pos="fixed"
          bottom={0}
        >
          <Flex bg="white" alignItems="center">
            <Text>รวมทั้งหมด</Text>
            <Spacer />
            <Text>{sum}.-</Text>
            <Spacer />
            <Link
              href={{
                pathname: "/order",
                query: {
                  product: productId,
                  type: "cart",
                },
              }}
            >
              <Button bg="red" borderRadius="xl">
                <Text>ชำระเงิน</Text>
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
