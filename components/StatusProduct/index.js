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
  const [isBorderActive, setIsBorderActive] = useState("ที่ต้องชำระ");
  const status = [
    { label: "ที่ต้องชำระ" },
    { label: "กำลังจัดส่ง" },
    { label: "จัดส่งสำเร็จ" },
  ];

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
                borderBottom={isBorderActive == item.label ? "2px" : "1px"}
                borderColor={isBorderActive == item.label ? "red" : "gray.300"}
                onClick={() => setIsBorderActive(item.label)}
              >
                <Text textAlign="center" className="set--font">
                  {item.label}
                </Text>
              </GridItem>
            );
          })}
        </Grid>
      </Box>

      {props.data.map((item, index) => {
        return item.status == isBorderActive ? (
          <Box bg="white" key={index} pt="10px">
            <Box>
              <Box bg="white">
                <Box>
                  <Text px="15px" className={style.textHead}>
                    {item.name_shop}
                  </Text>
                </Box>
              </Box>
              {isBorderActive == "ที่ต้องชำระ" ? (
                <Link href="/order">
                  {item?.item?.map((subItem, subIndex) => {
                    return (
                      <Box
                        key={subIndex}
                        py="10px"
                        mx="15px"
                        borderBottom="1px"
                        borderColor="gray.300"
                      >
                        <Flex alignItems="center">
                          <Box>
                            <Image
                              src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                              alt=""
                              className={style.wh}
                            />
                          </Box>
                          <Box
                            pl="15px"
                            width="-webkit-fill-available"
                            wordBreak="break-all"
                          >
                            <Text className={style.textHead}>
                              {subItem.name_product}
                            </Text>
                            <Text className={style.textBody}>
                              {subItem.detail_product}
                            </Text>
                            <Flex alignItems="center">
                              <Text
                                className={style.textBody}
                                bg="gray.300"
                                borderRadius="md"
                                display="initial"
                                px="7px"
                              >
                                ตัวเลือกสินค้า: {subItem.option1}{" "}
                                {subItem.op_name} {subItem.option2}{" "}
                                {subItem.sub_op_name}
                              </Text>
                              <Text pl="15px" className={style.textHead}>
                                x{subItem.num}
                              </Text>
                            </Flex>

                            <Flex alignItems="center">
                              <Text className={style.textHead}>
                                {subItem.type == 1
                                  ? subItem.price * subItem.num
                                  : subItem.type == 2
                                  ? subItem.op_price * subItem.num
                                  : subItem.sub_op_price * subItem.num}
                                .-
                              </Text>
                              <Spacer />
                              <Text
                                bg={
                                  isBorderActive == "ที่ต้องชำระ" ? "red" : ""
                                }
                                borderRadius="xl"
                                className={style.textBody}
                                px="10px"
                                color={"white"}
                              >
                                {isBorderActive}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })}
                </Link>
              ) : (
                item?.item?.map((subItem, subIndex) => {
                  return (
                    <Box
                      key={subIndex}
                      py="10px"
                      mx="15px"
                      borderBottom="1px"
                      borderColor="gray.300"
                    >
                      <Flex alignItems="center">
                        <Box>
                          <Image
                            src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                            alt=""
                            className={style.wh}
                          />
                        </Box>
                        <Box
                          pl="15px"
                          width="-webkit-fill-available"
                          wordBreak="break-all"
                        >
                          <Text className={style.textHead}>
                            {subItem.name_product}
                          </Text>
                          <Text className={style.textBody}>
                            {subItem.detail_product}
                          </Text>
                          <Flex alignItems="center">
                            <Text
                              className={style.textBody}
                              bg="gray.300"
                              borderRadius="md"
                              display="initial"
                              px="7px"
                            >
                              ตัวเลือกสินค้า: {subItem.option1}{" "}
                              {subItem.op_name} {subItem.option2}{" "}
                              {subItem.sub_op_name}
                            </Text>
                            <Text pl="15px" className={style.textHead}>
                              x{subItem.num}
                            </Text>
                          </Flex>

                          <Flex alignItems="center">
                            <Text className={style.textHead}>
                              {subItem.type == 1
                                ? subItem.price * subItem.num
                                : subItem.type == 2
                                ? subItem.op_price * subItem.num
                                : subItem.sub_op_price * subItem.num}
                              .-
                            </Text>
                            <Spacer />
                            <Text
                              bg={isBorderActive == "ที่ต้องชำระ" ? "red" : ""}
                              borderRadius="xl"
                              className={style.textBody}
                              px="10px"
                              color={
                                isBorderActive == "ที่ต้องชำระ"
                                  ? "white"
                                  : isBorderActive == "กำลังจัดส่ง"
                                  ? "orange"
                                  : "blue"
                              }
                            >
                              {isBorderActive == "กำลังจัดส่ง"
                                ? "จะได้รับสินค้าภายใน date"
                                : isBorderActive == "จัดส่งสำเร็จ"
                                ? "พัสดุจัดส่งเรียบร้อย: address"
                                : isBorderActive}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        ) : null;
      })}
    </div>
  );
}
