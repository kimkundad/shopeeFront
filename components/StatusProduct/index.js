/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Box,
  Grid,
  Text,
  Flex,
  Spacer,
  GridItem,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./style.module.css";
export default function statusProduct(props) {
  const [isBorderActive, setIsBorderActive] = useState([true, false, false]);
  const status = [
    { label: "ที่ต้องชำระ" },
    { label: "กำลังจัดส่ง" },
    { label: "จัดส่งสำเร็จ" },
  ];
  const handleElementClick = (index) => {
    const newArray = [...isBorderActive];
    for (let i = 0; i < newArray.length; i++) {
      if (i == index) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
    }
    setIsBorderActive(newArray);
  };

  let name = "";
  const router = useRouter();
  const { pathname } = router;
  return (
    <div>
      <Box bg="white" py="10px">
        {pathname === "/profile" ? <Text px="25px">สถานะสินค้า</Text> : false}
        <Grid templateColumns="repeat(3, 1fr)" fontSize="xs" width="100%">
          {status.map((item, index) => {
            return (
              <GridItem
                py="10px"
                key={index}
                id={index}
                borderBottom={isBorderActive[index] ? "2px" : "1px"}
                borderColor={isBorderActive[index] ? "red" : "gray.300"}
                onClick={() => handleElementClick(index)}
              >
                <Text textAlign="center" className="set--font">
                  {item.label}
                </Text>
              </GridItem>
            );
          })}
        </Grid>
      </Box>

      {props.data.map((item, index) =>
        isBorderActive[index] ? (
          <>
            <Box bg="white">
              {item.item.map((subitem, subindex) => {
                if (name !== subitem.shopname) {
                  name = subitem.shopname;
                  return index === 0 ? (
                    <>
                      <Box bg="white">
                        <Box>
                          <Text px="15px" className={style.textHead}>
                            {subitem.shopname}
                          </Text>
                        </Box>
                      </Box>
                      <Link href="/order">
                        <Box
                          my="10px"
                          mx="15px"
                          borderBottom="1px"
                          borderColor="gray.300"
                        >
                          <Flex alignItems="center" pb="10px">
                            <Box>
                              <Image
                                src={subitem.image}
                                alt=""
                                className={style.wh}
                              />
                            </Box>
                            <Box pl="15px" width="-webkit-fill-available">
                              <Text className={style.textHead}>
                                {subitem.name}
                              </Text>
                              <Text className={style.textBody}>
                                {subitem.detail}
                              </Text>
                              <Flex alignItems="center">
                                <Text
                                  className={style.textBody}
                                  bg="gray.300"
                                  borderRadius="md"
                                  display="initial"
                                  px="7px"
                                >
                                  ตัวเลือกสินค้า: {subitem.select}
                                </Text>
                                <Text pl="15px" className={style.textHead}>
                                  x{subitem.num}
                                </Text>
                              </Flex>

                              <Flex alignItems="center">
                                <Text className={style.textHead}>
                                  {subitem.price}.-
                                </Text>
                                <Spacer />
                                <Text
                                  bg={isBorderActive[0] ? "red" : ""}
                                  borderRadius="xl"
                                  className={style.textBody}
                                  height="-webkit-fill-available"
                                  px="10px"
                                  color={
                                    isBorderActive[0]
                                      ? "white"
                                      : isBorderActive[1]
                                      ? "orange"
                                      : "blue"
                                  }
                                >
                                  {isBorderActive[0]
                                    ? "ชำระเงิน"
                                    : isBorderActive[1]
                                    ? `จะได้รับสินค้าในวันที่ ${subitem.date}`
                                    : "พัสดุถูกจัดส่งเรียบร้อย"}
                                </Text>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Box bg="white">
                        <Box>
                          <Text pt="10px" px="15px" className={style.textHead}>
                            {subitem.shopname}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        my="10px"
                        mx="15px"
                        borderBottom="1px"
                        borderColor="gray.300"
                      >
                        <Flex alignItems="center" pb="10px">
                          <Box>
                            <Image
                              src={subitem.image}
                              alt=""
                              className={style.wh}
                            />
                          </Box>
                          <Box pl="15px" width="-webkit-fill-available">
                            <Text className={style.textHead}>
                              {subitem.name}
                            </Text>
                            <Text className={style.textBody}>
                              {subitem.detail}
                            </Text>
                            <Flex alignItems="center">
                              <Text
                                className={style.textBody}
                                bg="gray.300"
                                borderRadius="md"
                                display="initial"
                                px="7px"
                              >
                                ตัวเลือกสินค้า: {subitem.select}
                              </Text>
                              <Text pl="15px" className={style.textHead}>
                                x{subitem.num}
                              </Text>
                            </Flex>

                            <Flex alignItems="center">
                              <Text className={style.textHead}>
                                {subitem.price}.-
                              </Text>
                              <Spacer />
                              <Text
                                bg={isBorderActive[0] ? "red" : ""}
                                borderRadius="xl"
                                className={style.textBody}
                                height="-webkit-fill-available"
                                px="10px"
                                color={
                                  isBorderActive[0]
                                    ? "white"
                                    : isBorderActive[1]
                                    ? "orange"
                                    : "blue"
                                }
                              >
                                {isBorderActive[0]
                                  ? "ชำระเงิน"
                                  : isBorderActive[1]
                                  ? `จะได้รับสินค้าในวันที่ ${subitem.date}`
                                  : "พัสดุถูกจัดส่งเรียบร้อย"}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </>
                  );
                } else {
                  return index === 0 ? (
                    <>
                      <Link href="/order">
                        <Box
                          my="10px"
                          mx="15px"
                          borderBottom="1px"
                          borderColor="gray.300"
                        >
                          <Flex alignItems="center" pb="10px">
                            <Box>
                              <Image
                                src={subitem.image}
                                alt=""
                                className={style.wh}
                              />
                            </Box>
                            <Box pl="15px" width="-webkit-fill-available">
                              <Text className={style.textHead}>
                                {subitem.name}
                              </Text>
                              <Text className={style.textBody}>
                                {subitem.detail}
                              </Text>
                              <Flex alignItems="center">
                                <Text
                                  className={style.textBody}
                                  bg="gray.300"
                                  borderRadius="md"
                                  display="initial"
                                  px="7px"
                                >
                                  ตัวเลือกสินค้า: {subitem.select}
                                </Text>
                                <Text pl="15px" className={style.textHead}>
                                  x{subitem.num}
                                </Text>
                              </Flex>

                              <Flex alignItems="center">
                                <Text className={style.textHead}>
                                  {subitem.price}.-
                                </Text>
                                <Spacer />
                                <Text
                                  bg={isBorderActive[0] ? "red" : ""}
                                  borderRadius="xl"
                                  className={style.textBody}
                                  height="-webkit-fill-available"
                                  px="10px"
                                  color={
                                    isBorderActive[0]
                                      ? "white"
                                      : isBorderActive[1]
                                      ? "orange"
                                      : "blue"
                                  }
                                >
                                  {isBorderActive[0]
                                    ? "ชำระเงิน"
                                    : isBorderActive[1]
                                    ? `จะได้รับสินค้าในวันที่ ${subitem.date}`
                                    : "พัสดุถูกจัดส่งเรียบร้อย"}
                                </Text>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Box
                        my="10px"
                        mx="15px"
                        borderBottom="1px"
                        borderColor="gray.300"
                      >
                        <Flex alignItems="center" pb="10px">
                          <Box>
                            <Image
                              src={subitem.image}
                              alt=""
                              className={style.wh}
                            />
                          </Box>
                          <Box pl="15px" width="-webkit-fill-available">
                            <Text className={style.textHead}>
                              {subitem.name}
                            </Text>
                            <Text className={style.textBody}>
                              {subitem.detail}
                            </Text>
                            <Flex alignItems="center">
                              <Text
                                className={style.textBody}
                                bg="gray.300"
                                borderRadius="md"
                                display="initial"
                                px="7px"
                              >
                                ตัวเลือกสินค้า: {subitem.select}
                              </Text>
                              <Text pl="15px" className={style.textHead}>
                                x{subitem.num}
                              </Text>
                            </Flex>

                            <Flex alignItems="center">
                              <Text className={style.textHead}>
                                {subitem.price}.-
                              </Text>
                              <Spacer />
                              <Text
                                bg={isBorderActive[0] ? "red" : ""}
                                borderRadius="xl"
                                className={style.textBody}
                                height="-webkit-fill-available"
                                px="10px"
                                color={
                                  isBorderActive[0]
                                    ? "white"
                                    : isBorderActive[1]
                                    ? "orange"
                                    : "blue"
                                }
                              >
                                {isBorderActive[0]
                                  ? "ชำระเงิน"
                                  : isBorderActive[1]
                                  ? `จะได้รับสินค้าในวันที่ ${subitem.date}`
                                  : "พัสดุถูกจัดส่งเรียบร้อย"}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </>
                  );
                }
              })}
            </Box>
          </>
        ) : (
          false
        )
      )}
    </div>
  );
}
