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
  Skeleton,
} from "@chakra-ui/react";
import Statusproduct from "@/components/StatusProductProfile";
import Purchasehistory from "@/components/PurchaseHistory";
import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useDropzone } from "react-dropzone";
function useProfile() {
  const [order, setOrder] = useState([]);
  const userInfo = useSelector((App) => App.userInfo);
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const storedOwner = localStorage.getItem("user_code");
  const OwnerShopId = storedOwner ? JSON.parse(storedOwner) : [];
  const [cartsItem, setCartsItem] = useState([]);
  useEffect(() => {
    if (userInfo) {
      async function fetchdata() {
        let user_id = userInfo.data[0].id;
        const formdataOrder = new FormData();
        formdataOrder.append("user_id", user_id);
        formdataOrder.append("user_code", OwnerShopId.user_code);
        const order = await axios.post(
          `https://api.sellpang.com/api/getAllOrder`,
          formdataOrder
        );
        const formdata = new FormData();
        formdata.append("user_id", user_id);
        const user = await axios.post(
          `https://api.sellpang.com/api/getUser`,
          formdata
        );
        const formdataCart = new FormData();
        formdataCart.append("user_id", userInfo.data[0].id);
        formdataCart.append("user_code",OwnerShopId.user_code)
        const carts = await axios.post(
          `https://api.sellpang.com/api/getAllCartItem/`,
          formdataCart
        );
        setCartsItem(carts.data);
        setName(user.data.user.name);
        setOrder(order.data.orders);
        setAvatar(user.data.user.avatar);
      }
      fetchdata();
    }
  }, []);
  const [isEditName, setEditName] = useState(false);

  const editName = () => {
    setEditName(!isEditName);
    if (isEditName) {
      async function fetchdata() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("user_id", userInfo.data[0].id);
        const newName = await axios.post(
          `https://api.sellpang.com/api/editUser/`,
          formData
        );
      }
      fetchdata();
    }
  };

  const [file, setFile] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      async function update() {
        let userId = userInfo.data[0].id;
        const formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("avatar", acceptedFiles[0]);
        const res = await axios.post(
          `https://api.sellpang.com/api/editAvatar/`,
          formdata
        );
        setName(res.data.user.name);
        setAvatar(res.data.user.avatar);
      }
      update();
    },
  });

  return (
    <>
      <Head>
        <title>Sellpang</title>
        <meta name="description" content="Generated by sellpang" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg="white" pb="25px" pt="40px" px="15px">
        <Box
          bg="white"
          borderRadius="50%"
          h="70px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="2"
        >
          <Box {...getRootProps({ className: "dropzone" })} borderRadius="50%">
            <Input {...getInputProps()} />
            {avatar !== null ? (
              avatar == undefined ? (
                <Skeleton circle="true" height={70} width={70} />
              ) : (
                <Image
                  src={`https://api.sellpang.com/images/shopee/avatar/${avatar}`}
                  alt=""
                  h="70px"
                  w="70px"
                  borderRadius="50%"
                />
              )
            ) : (
              <Image
                borderRadius="50%"
                src="/img/icon/user copy.png"
                alt=""
                h="70px !important"
                w="70px !important"
              />
            )}
          </Box>
        </Box>
        <Box pl="5px" alignSelf="center">
          {!isEditName ? (
            <Text fontSize="xl" display="flex" alignItems="center">
              {name?.length > 10 ? name?.slice(0, 10) + "..." : name}
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
        <Statusproduct data={order} carts={cartsItem} />
      </Box>

      <Purchasehistory data={order} />
    </>
  );
}

export default useProfile;
