import { Box, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import style from "./style.module.css";
export default function purchaseHistory(props) {
  const Prouct = [
    {
      shopname: "T-Shirt By OHMSTYLE",
      name: "เสื้อยืด Oversize",
      detail: "เสื้อยืด Oversize ใส่ได้ทั้งชายและหญิง",
      image: "/img/หมาโง่.jpg",
      select: "สีฟ้า ไซด์ 42",
      num: "1",
      price: "290",
      address: "ดีคอมโด บางแสน ชลบุรี",
    },
    {
      shopname: "Jenny Brandname",
      name: "ร้องเท้าฉลาม2",
      detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
      image: "/img/หมาโง่.jpg",
      select: "สีฟ้า ไซด์ 42",
      num: "1",
      price: "290",
      address: "ดีคอมโด บางแสน ชลบุรี",
    },
    {
      shopname: "Jenny Brandname",
      name: "ร้องเท้าฉลาม2",
      detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
      image: "/img/หมาโง่.jpg",
      select: "สีฟ้า ไซด์ 42",
      num: "1",
      price: "290",
      address: "ดีคอมโด บางแสน ชลบุรี",
    },
  ];

  return (
    <>
      <Box bg="white" mt="10px">
        <Text px="25px" pt="15px">
          ประวัตการสั่งซื้อ
        </Text>
        <Box>
          {Prouct.map((item, index) => (
              <Box bg="white" key={index}>
                <Box pt="10px" px="15px">
                  <Text className={style.textHead}>{item.shopname}</Text>
                  <Box my="10px" borderBottom="1px" borderColor="gray.300">
                    <Flex alignItems="center" pb="10px">
                      <Box><Image src={item.image} alt="" className={style.wh} /></Box>
                      <Box pl="15px" width="-webkit-fill-available">
                        <Text className={style.textHead}>{item.name}</Text>
                        <Text className={style.textBody}>{item.detail}</Text>
                        <Flex alignItems="center">
                          <Text
                            className={style.textBody}
                            bg="gray.300"
                            borderRadius="md"
                            display="initial"
                            px="7px"
                          >
                            ตัวเลือกสินค้า: {item.select}
                          </Text>
                          <Text pl="15px" className={style.textHead}>
                            x{item.num}
                          </Text>
                        </Flex>

                        <Flex alignItems="center">
                          <Text className={style.textHead}>{item.price}.-</Text>
                          <Spacer />
                          <Text className={style.textBody} color="blue">
                            พัสดุจัดส่งเรียบร้อย: {item.address}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
