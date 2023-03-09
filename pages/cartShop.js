import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Card,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  GridItem,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@chakra-ui/react";
import CartItem from "@/components/CartItem";
function chartShop() {
  const item = [
    {
      shopname: "SHOPZY",
      product: [
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี33333333333333333333333333333333333333333333333",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="130px" h="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
      ],
    },
    {
      shopname: "SHOPZY 2",
      product: [
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
        {
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: (
            <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="130px" />
          ),
          select: "สีฟ้า ไซด์ 42",
          price: "290.-",
        },
      ],
    },
  ];
  return (
    <>
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartItem data={item} />

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
            <Text>0.-</Text>
            <Spacer />
            <Link href="/order">
              <Button bg="red" borderRadius="xl">
                <Text>ชำระเงิน</Text>
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default chartShop;
