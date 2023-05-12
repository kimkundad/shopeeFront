import { Box, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import style from "./style.module.css";
export default function purchaseHistory(props) {
  return (
    <>
      <Box bg="white" mt="10px">
        <Text px="25px" pt="15px">
          ประวัติการสั่งซื้อ
        </Text>
        <Box>
          {props.data.map((item, index) =>
            item.status == "ส่งสำเร็จ" ? (
              <Box bg="white" key={item.id}>
                {item?.shops.map((subItem, subIndex) => {
                  return (
                    <Box pt="10px" px="15px" key={subIndex}>
                      <Text className={style.textHead}>
                        {subItem.name_shop}
                      </Text>
                      {subItem?.products?.map((subItem, subIndex) => {
                        return (
                          <Box
                            my="10px"
                            borderBottom="1px"
                            borderColor="gray.300"
                            key={subItem.id}
                          >
                            <Flex alignItems="center" pb="10px">
                              <Box>
                                <Image
                                  src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                                  alt=""
                                  className={style.wh}
                                />
                              </Box>
                              <Box pl="15px" width="-webkit-fill-available">
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
                                    {subItem.price_sales == 0
                                      ? subItem.type == 1
                                        ? subItem.price * subItem.num
                                        : subItem.type == 2
                                        ? subItem.op_price * subItem.num
                                        : subItem.sub_op_price * subItem.num
                                      : subItem.type == 1
                                      ? subItem.price -
                                        ((subItem.price * subItem.price_sales) /
                                          100) *
                                          subItem.num
                                      : subItem.type == 2
                                      ? subItem.op_price -
                                        ((subItem.op_price *
                                          subItem.price_sales) /
                                          100) *
                                          subItem.num
                                      : subItem.sub_op_price -
                                        ((subItem.sub_op_price *
                                          subItem.price_sales) /
                                          100) *
                                          subItem.num}
                                    .-
                                  </Text>
                                  <Spacer />
                                  <Text className={style.textBody} color="blue">
                                    พัสดุจัดส่งเรียบร้อย: {item.address}
                                  </Text>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            ) : null
          )}
        </Box>
      </Box>
    </>
  );
}
