/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-comment-textnodes */
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
import { useRouter } from "next/router";
export default function cartItem(props) {
  const [checkAll, setCheckAll] = useState(null);

  const handleCheckAllChange = (event, index, subIndex) => {
    const newCheckAll = [...checkAll];
    newCheckAll[index][subIndex] = event.target.checked;
    setCheckAll(newCheckAll);
  };

  useEffect(() => {
    const newItems = props.data.map((item) => {
      const subItems = item.product.map(() => false);
      return subItems;
    });
    setCheckAll(newItems);
  }, [props.data]);

  const CheckAll = (event, index) => {
    const newCheckAll = [...checkAll];
    for (let i = 0; i < newCheckAll[index].length; i++) {
      newCheckAll[index][i] = event.target.checked;
    }
    setCheckAll(newCheckAll);
  };

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
  return (
    <div>
      {props.data.map((item, index) => (
        <Box bg="white" pt="30px" key={index}>
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
          {item.product.map((subItem, subIndex) => (
            <div key={subIndex}>
              <Checkbox
                px="15px"
                colorScheme="red"
                sx={{
                  "& .chakra-checkbox__control": {
                    borderRadius: "50% !important",
                  },
                  "& svg": {
                    stroke: "none !important",
                  },
                }}
                key={subItem.shopname}
                id={subIndex}
                isChecked={
                  checkAll !== null ? checkAll[index][subIndex] : false
                }
                onChange={(event) =>
                  handleCheckAllChange(event, index, subIndex)
                }
              >
                <Flex px="15px" alignItems="center">
                  <Box pt="10px">{subItem.image}</Box>
                  <Box pl="15px" flex="1">
                    <Text fontSize="md" pt="7px">
                      {subItem.name}
                    </Text>
                    <Text fontSize="sm" noWrap>{subItem.detail}</Text>
                    <Text
                      fontSize="sm"
                      bg="gray.300"
                      borderRadius="md"
                      display="initial"
                      px="7px"
                    >
                      ตัวเลือกสินค้า: {subItem.select}
                    </Text>
                    <Flex fontSize="xl">
                      <Text>{subItem.price}</Text>
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
                </Flex>
              </Checkbox>
            </div>
          ))}
        </Box>
      ))}
    </div>
  );
}
