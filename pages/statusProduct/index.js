import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Flex,
  Grid,
  Text,
  GridItem,
  Image,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Statusproduct from "@/components/statusProduct";
function statusProduct() {
  const Product = [
    {
      item: [
        {
          shopname: "SHOPZY",
          name: "ร้องเท้าฉลาม2",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY",
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY4",
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY3",
          name: "ร้องเท้าฉลาม",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
      ],
    },
    {
      item: [
        {
          shopname: "SHOPZY1",
          name: "ร้องเท้าฉลาม1",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY",
          name: "ร้องเท้าฉลาม1",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY2",
          name: "ร้องเท้าฉลาม1",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY1",
          name: "ร้องเท้าฉลาม1",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
      ],
    },
    {
      item: [
        {
          shopname: "SHOPZY2",
          name: "ร้องเท้าฉลาม2",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY2",
          name: "ร้องเท้าฉลาม2",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY3",
          name: "ร้องเท้าฉลาม2",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
          price: "290.-",
        },
        {
          shopname: "SHOPZY2",
          name: "ร้องเท้าฉลาม2",
          detail: "น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี",
          image: "/img/หมาโง่.jpg",
          select: "สีฟ้า ไซด์ 42",
          num: "1",
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
      <Box pt="15px">
        <Statusproduct data={Product} />
      </Box>

      <></>
    </>
  );
}

export default statusProduct;
