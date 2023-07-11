import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Flex, Text, Image, Button, Spacer } from "@chakra-ui/react";
import ChatBox from "@/components/ChatBox";
import { useRouter } from "next/router";

const Chat = () => {
  const router = useRouter();
  const shopId = router.query.shopId;
  return (
    <Box height={`calc(100vh - 90px)`} bg="white">
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="15px" bg="white">
        <ChatBox shopId={shopId}/>
      </Box>
    </Box>
  );
}

export default Chat;
