import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  useDisclosure,
  Box,
  Text,
  Image,
  Input,
  Flex,
  Spacer,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Stack,
  useColorModeValue,
  Link,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import user from "@/public/img/icon/user copy.png";
import cart from "@/public/img/icon/cart.png";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getUserLogout } from "@/store/slices/authen";

import Login from "@/components/ModalLogin/login";

export default function ModalLogin(props) {
  const authen = useSelector((App) => App.authen);
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const userInfo = useSelector((App) => App.userInfo);
  useEffect(() => {
    async function fetchdata() {
      if (userInfo) {
        let user_id = userInfo?.data?.[0]?.id;
        const formdata = new FormData();
        formdata.append("user_id", user_id);
        const user = await axios.post(
          `https://api.sellpang.com/api/getUser`,
          formdata
        );
        setName(user.data?.user?.name);
        setAvatar(user.data?.user?.avatar);
      }
    }
    fetchdata();
  }, []);
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure();
  const {
    isOpen: isOpenForm2,
    onOpen: onOpenForm2,
    onClose: onCloseForm2,
  } = useDisclosure();

  const handleClick = () => {
    onCloseForm1();
    onCloseForm2();
    console.log("--->handleClick");
  };

  const loginClick = () => {
    setShowLogin(true);
    onCloseForm1();
  };

  const logout = () => {
    window.location.reload();
    dispatch(getUserLogout());
  };

  return (
    <>
      {authen?.isAuthenticate === true ? (
        <>
          {props?.type === "avatar" && (
            <Menu>
              <MenuButton>
                <Box
                  bg="white"
                  borderRadius="50%"
                  w="7"
                  h="7"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr="2"
                  order="1px"
                  borderColor="gray.300"
                  ids={props.type}
                >
                  <Image
                    src={`https://api.sellpang.com/images/shopee/avatar/${avatar}`}
                    alt=""
                    h="7"
                    borderRadius="50%"
                  />
                </Box>
              </MenuButton>
              <MenuList>
                <Link as={NextLink} href="/profile">
                  <MenuItem>โปรไฟล์</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </MenuList>
            </Menu>
          )}
          {props?.type === "card" && (
            <Link as={NextLink} href="/cartShop">
              <Box
                bg="white"
                borderRadius="50%"
                w="7"
                h="7"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr="5"
                border="1px"
                borderColor="gray.300"
              >
                <Image src={cart.src} alt="" h="4" />
              </Box>
            </Link>
          )}
          {props?.type === "chat" && (
            <Link as={NextLink} href={"/chats/" + props?.shopId}>
              <Flex
                textColor="black"
                h="20px !important"
                mr="2"
                borderRadius="xl"
                bg="white"
                alignItems="center"
                mb="8"
                className="setWidth"
              >
                <Image
                  pl="3"
                  borderRadius="50%"
                  src="/img/chat.png"
                  alt=""
                  h="10px"
                />
                <Text className="textBody" px="1">
                  แชทร้านค้า
                </Text>
              </Flex>
            </Link>
          )}
        </>
      ) : (
        <>
          {props?.type === "avatar" && (
            <Box
              onClick={onOpenForm1}
              bg="white"
              borderRadius="50%"
              w="7"
              h="7"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr="2"
              order="1px"
              borderColor="gray.300"
              ids={props.type}
            >
              <Image src={user.src} alt="" h="7" />
            </Box>
          )}
          {props?.type === "card" && (
            <Box
              onClick={onOpenForm1}
              bg="white"
              borderRadius="50%"
              w="7"
              h="7"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr="5"
              border="1px"
              borderColor="gray.300"
            >
              <Image src={cart.src} alt="" h="4" />
            </Box>
          )}
          {props?.type === "chat" && (
            <Flex
              onClick={onOpenForm1}
              textColor="black"
              h="20px !important"
              mr="2"
              borderRadius="xl"
              bg="white"
              alignItems="center"
              mb="8"
              className="setWidth"
            >
              <Image
                pl="3"
                borderRadius="50%"
                src="/img/chat.png"
                alt=""
                h="10px"
              />
              <Text className="textBody" px="1">
                แชทร้านค้า
              </Text>
            </Flex>
          )}
        </>
      )}

      <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/img/cancel.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => handleClick()}
            />
          </ModalHeader>
          <ModalBody>
            <Box px="5px">
              <Text
                bg="red"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                color="white"
                fontWeight="bold"
                onClick={() => loginClick()}
              >
                ลงชื่อเข้าใช้ด้วยโทรศัพท์
              </Text>
              <Text color="gray.400" textAlign="center">
                ระบบจะจดจำที่อยู่ในการส่งสินค้าเมื่อใช้งานในครั้งต่อไป
              </Text>
              <Text
                mt="15px"
                bg="gray.100"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                fontWeight="bold"
                onClick={() => handleClick()}
              >
                สั่งตอนนี้
              </Text>
              <Text color="gray.400" textAlign="center">
                ต้องกรอกที่อยู่ในการจัดส่งทุกครั้งที่เข้้าใช้งานใหม่
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Login onOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
