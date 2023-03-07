import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  Box,
  Card,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Center,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import Link from "next/link";
import Product from "@/components/Product"

export default function Home() {

  const Category =[
    {
      categoryname: "สินค้าทั้งหมด",
    },
    {
      categoryname: "ของใช้ภายในบ้าน",
    },
    {
      categoryname: "เสื้อผ้าแฟชั่น",
    },
    {
      categoryname: "สินค้าแม่และเด็ก",
    },
    {
      categoryname: "สินค้าทั้งหมด",
    },
    {
      categoryname: "ของใช้ภายในบ้าน",
    },
    {
      categoryname: "เสื้อผ้าแฟชั่น",
    },
    {
      categoryname: "สินค้าแม่และเด็ก",
    },
  ]
  const ProductAll =[
   {
    productname: "ร้องเท้าฉลาม สุดฮิต!",
    detail: "น่ารักไม่ไหว",
    price: "390.-",
    pricesale: "290.-",
    num: "1000",
    image: "/img/หมาโง่.jpg",
    category: "เสื้อผ้าแฟชั่น"
   },
   {
    productname: "ร้องเท้าฉลาม สุดฮิต!1",
    detail: "น่ารักไม่ไหว",
    price: "390.-",
    pricesale: "290.-",
    num: "1000",
    image: "/img/หมาโง่.jpg",
    category: "ของใช้ภายในบ้าน"
   },
   {
    productname: "ร้องเท้าฉลาม สุดฮิต!2",
    detail: "น่ารักไม่ไหว",
    price: "390.-",
    pricesale: "290.-",
    num: "1000",
    image: "/img/หมาโง่.jpg",
    category: "สินค้าแม่และเด็ก"
   },
   {
    productname: "ร้องเท้าฉลาม สุดฮิต!3",
    detail: "น่ารักไม่ไหว",
    price: "390.-",
    pricesale: "290.-",
    num: "1000",
    image: "/img/หมาโง่.jpg",
    category: "สินค้าแม่และเด็ก"
   },
   {
    productname: "ร้องเท้าฉลาม สุดฮิต!4",
    detail: "น่ารักไม่ไหว",
    price: "390.-",
    pricesale: "290.-",
    num: "1000",
    image: "/img/หมาโง่.jpg",
    category: "ของใช้ภายในบ้าน"
   },
  ]
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Product data={{ ProductAll, Category }}/>
    </>
  );
}
