import React from "react";
import Link from "next/link";
import Head from "next/head";
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
  Button,
  Spacer,
} from "@chakra-ui/react";
import Checkbox from "@/components/Checkbox";
function address() {
  const item = [
    {
      name: "นายต๊อบ เจริญมี",
      tel: "081-789-7784",
      address:
        "อำเภอเมืองชลบุรี 9/84 หมู่บ้านมหานครซอย 19 ตำบลแสนสุขอำเภอเมืองชลบุรี จังหวัดชลบุรี 22130",
    },
    {
      name: "นายต๊อบ เจริญมี",
      tel: "081-789-7784",
      address:
        "อำเภอเมืองชลบุรี 9/84 หมู่บ้านมหานครซอย 19 ตำบลแสนสุขอำเภอเมืองชลบุรี จังหวัดชลบุรี 22130",
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
      <Box pt="25px">
        <Box px="35px">
          <Text fontSize="xl">ที่อยู่</Text>
        </Box>
      </Box>
      <Box py="10px" mt="10px" bg="white">
        <Checkbox data={item} />
        <Flex justifyContent="center">
          <Link href="/address/newaddress">
            <Button bg="red">
              <Text>เพิ่มที่อยู่ใหม่</Text>
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
}

export default address;
