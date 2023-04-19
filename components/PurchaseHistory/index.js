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
          {props.data.map((item, index) => item.status == "สำเร็จแล้ว" ? (
            <Box bg="white" key={index}>
              <Box pt="10px" px="15px">
                <Text className={style.textHead}>{item.name_shop}</Text>
                {item?.item?.map((subItem, subIndex) => {
                  return (
                    <Box my="10px" borderBottom="1px" borderColor="gray.300" key={subIndex}>
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
                              {subItem.type == 1
                                ? subItem.price * subItem.num
                                : subItem.type == 2
                                ? subItem.op_price * subItem.num
                                : subItem.sub_op_price * subItem.num}
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
            </Box>
          ):null)}
        </Box>
      </Box>
    </>
  );
}
