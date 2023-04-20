import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Spacer,
  Input,
} from "@chakra-ui/react";
import Statusproduct from "@/components/statusProductProfile";
import Purchasehistory from "@/components/PurchaseHistory";
import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
function chartShop() {
  const [order, setOrder] = useState([]);
  const userInfo = useSelector((App) => App.userInfo);
  const [name, setName] = useState();
  useEffect(() => {
    async function fetchdata() {
      const order = await axios.get(
        `https://shopee-api.deksilp.com/api/getOrder/?user_id=${1}&shop_id=${2}`
      );
      const formdata = new FormData();
      formdata.append("user_id",1)
      const user = await axios.post(
        `https://shopee-api.deksilp.com/api/getUser`,formdata
      );
      setName(user.data.user.name)
      setOrder(order.data.orders);
    }
    fetchdata();
  }, []);
  const [isEditName, setEditName] = useState(false);
  
  const editName = () => {
    setEditName(!isEditName);
    if(isEditName){
      async function fetchdata() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("user_id", 1);
        const newName = await axios.post(
          `https://shopee-api.deksilp.com/api/editUser/`,formData
        );
      }
      fetchdata();
    }
  };

  return (
    <>
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg="white" py="25px" px="15px">
        <Box
          bg="white"
          borderRadius="50%"
          w="70px !important"
          h="70px !important"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="2"
        >
          <Image
            borderRadius="50%"
            src="/img/icon/user copy.png"
            alt=""
            h="70px !important"
            w="70px !important"
          />
        </Box>
        <Box pl="5px" alignSelf="center">
          {!isEditName ? (
            <Text
              fontSize="xl"
              display="flex"
              alignItems="center"
            >
              {name?.length > 20 ? name?.slice(0, 10) + "..." : name}
              <Image
                pl="7px"
                src="/img/edit.png"
                alt=""
                h="20px !important"
                onClick={editName}
              />
            </Text>
          ) : (
            <Flex alignItems="center">
              <Input
                w="100px"
                h="20px"
                my="5px"
                px="1px"
                fontSize="xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Image
                pl="7px"
                src="/img/edit.png"
                alt=""
                h="20px !important"
                onClick={editName}
              />
            </Flex>
          )}

          <Text
            color="white"
            textAlign="center"
            bg="red"
            borderRadius="xl"
            fontSize="xs"
            w="80px"
          >
            Gold member
          </Text>
        </Box>

        <Spacer />
        <Box alignSelf="center">
          <Link href="/address">
            <Button bg="red" borderRadius="xl" size="md" height="30px">
              <Text fontSize="xs" color="white">
                แก้ไขที่อยู่
              </Text>
            </Button>
          </Link>
        </Box>
      </Flex>
      <Box mt="10px">
        <Statusproduct data={order} />
      </Box>

      <Purchasehistory data={order} />
    </>
  );
}

export default chartShop;
