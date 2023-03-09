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
export default function cartItem(props) {
  const [checkAll, setCheckAll] = useState(null);

  const handleCheckAllChange = (event, index, subIndex) => {
    const newCheckAll = [...checkAll];
    let newSum = 0;
    newCheckAll[index][subIndex] = event.target.checked;
    for (let i = 0; i < newCheckAll.length; i++) {
      for (let k = 0; k < newCheckAll[i].length; k++) {
        newCheckAll[i][k] ? (newSum = newSum+props.data[i].product[k].price):false
      }
    }
    setCheckAll(newCheckAll);
    setSum(newSum);
  };

  useEffect(() => {
    const newItems = props.data.map((item) => {
      const subItems = item.product.map(() => false);
      return subItems;
    });
    setCheckAll(newItems);
  }, [props.data]);

  const [sum, setSum] = useState(0);

  const CheckAll = (event, index) => {
    const newCheckAll = [...checkAll];
    let newSum = 0;
    for (let i = 0; i < newCheckAll[index].length; i++) {
      newCheckAll[index][i] = event.target.checked;
    }
    for (let i = 0; i < newCheckAll.length; i++) {
      for (let k = 0; k < newCheckAll[i].length; k++) {
        newCheckAll[i][k] ? (newSum = newSum+props.data[i].product[k].price):false
      }
    }
    setCheckAll(newCheckAll);
    setSum(newSum);
  };

  

  return (
    <div>
      {props.data.map((item, index) => (
        <Box bg="white" pt={index === 0 ? "30px" : "15px"} key={index}>
          <Checkbox
            px="15px"
            isChecked={
              checkAll !== null ? checkAll[index].every(Boolean) : false
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
            <Text pl="15px">{item.shopname}</Text>
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
                    index === props.data.length - 1 &&
                    subIndex === item.product.length - 1
                      ? ""
                      : "1px"
                  }
                  borderColor="gray.300"
                  key={subItem.shopname}
                  id={subIndex}
                  isChecked={
                    checkAll !== null ? checkAll[index][subIndex] : false
                  }
                  onChange={(event) =>
                    handleCheckAllChange(event, index, subIndex)
                  }
                >
                  <Flex pl="15px" alignItems="center">
                    <Box pt="10px">
                      <Image
                        src={subItem.image}
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
                        {subItem.name}
                      </Text>
                      <Text className={style.textBody}>{subItem.detail}</Text>
                      <Text
                        className={style.textBody}
                        bg="gray.300"
                        borderRadius="md"
                        display="initial"
                        px="7px"
                      >
                        ตัวเลือกสินค้า: {subItem.select}
                      </Text>
                      <Flex className={style.textHead} pt="5px">
                        <Text>{subItem.price}.-</Text>
                        <Spacer />
                        <Box borderRadius="xl" bg="gray.100">
                          <Flex alignItems="center">
                            <Button
                              h="15px"
                              w="15px"

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
                              {subItem.num}
                            </Text>
                            <Button h="15px" px="0px">
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
