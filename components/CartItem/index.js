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
  const [cartItem,setCartItem] = useState([]);

  useEffect(() =>{
    setCartItem(props.data.cartItem)
  },[])
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

  const sumPrice = () => {
    const newCheckAll = [...checkAll];
    let newSum = 0;
    for (let i = 0; i < newCheckAll.length; i++) {
      for (let k = 0; k < newCheckAll[i].length; k++) {
        newCheckAll[i][k]
          ? (newSum =
              newSum +
              (cartItem[i].product[k].type_product == 1
                ? cartItem[i].product[k].price_type_1 * num[i][k]
                : cartItem[i].product[k].type_product == 2
                ? cartItem[i].product[k].price_type_1 * num[i][k]
                : cartItem[i].product[k].price_type_3 * num[i][k]))
          : false;
      }
    }
    setSum(newSum);
  };
  const plusnum = (index, subIndex) => {
    const newNum = [...num];
    let number = 0;
    number = newNum[index][subIndex] + 1;
    newNum[index][subIndex] = number;
    setNum(newNum);
    sumPrice();
  };

  const minusnum = (index, subIndex) => {
    const newNum = [...num];
    let number = 1;
    number = newNum[index][subIndex] - 1;
    if (number >= 1) {
      newNum[index][subIndex] = number;
    }
    setNum(newNum);
    sumPrice();
  };

  /* const delete = async ($id) => {
    const res = await axios.post(`/api/deleteCartItem/${$id}`)

  } */
  return (
    <div>
      {cartItem.map((item, index) => (
        <Box bg="white" pt={index === 0 ? "30px" : "15px"} key={index}>
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
            <Text pl="15px">{item.name_shop}</Text>
          </Checkbox>
          <p>{item.product.name}</p>
          {item.product.map((subItem, subIndex) => {
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
                  <Flex pl="15px" alignItems="center">
                    <Box pt="10px">
                      <Image
                        src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem.img_product}`}
                        alt=""
                        className={style.wh}
                      ></Image>
                    </Box>
                    <Box
                      pl="15px"
                      wordBreak="break-all"
                      width="-webkit-fill-available"
                    >
                      <Text className={style.textHead} pt="7px">
                        {subItem.name_product}
                      </Text>
                      <Text className={style.textBody}>
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
                          ตัวเลือกสินค้า: {subItem.option1} {subItem.op_name}
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

                      <Flex className={style.textHead} pt="5px">
                        {subItem.type_product == 1 ? (
                          <Text>{subItem.price_type_1}.-</Text>
                        ) : subItem.type_product == 2 ? (
                          <Text>{subItem.price_type_2}.-</Text>
                        ) : (
                          <Text>{subItem.price_type_3}.-</Text>
                        )}

                        <Spacer />
                        <Box borderRadius="xl" bg="gray.100">
                          <Flex alignItems="center">
                            <Button
                              h="15px"
                              w="15px"
                              onClick={() => minusnum(index, subIndex)}
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
                              onClick={() => plusnum(index, subIndex)}
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
                    <Box h="20px" w="30px" bg="white" alignSelf="start" pt="10px">
                      <Button bg="white" h="20px" w="20px">
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
            <Link href="/order">
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
