import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Spacer,
  Center,
  Grid,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import cart from "@/public/img/icon/cart.png";
import user from "@/public/img/icon/user copy.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { StarIcon } from "@chakra-ui/icons";
import style from "./style.module.css";
import { useEffect, useState } from "react";
export default function Header(props) {
  const router = useRouter();
  const { pathname } = router;
  const handleBack = () => {
    router.back();
  };
  const [bgColor, setBgColor] = useState("rgba(255,255,255,0)");

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    setScrollPosition(props.data);
  }, [props.data]);

  useEffect(() => {
    if (scrollPosition == 0) {
      setBgColor("rgba(255,255,255,0)");
    } else if (scrollPosition > 0 && scrollPosition < 40) {
      setBgColor("rgba(255,255,255,0.1)");
    } else if (scrollPosition > 40 && scrollPosition < 50) {
      setBgColor("rgba(255,255,255,0.3)");
    } else if (scrollPosition > 50 && scrollPosition < 60) {
      setBgColor("rgba(255,255,255,0.5)");
    } else if (scrollPosition > 60 && scrollPosition < 70) {
      setBgColor("rgba(255,255,255,0.7)");
    } else if (scrollPosition > 80 && scrollPosition < 90) {
      setBgColor("rgba(255,255,255,0.9)");
    } else if (scrollPosition > 90) {
      setBgColor("rgba(255,255,255,1)");
    }
  });
  let nameheader = "";
  if (pathname == "/address") {
    nameheader = "เลือกที่อยู่";
  } else if (pathname == "/order") {
    nameheader = "ทำการสั่งซื้อ";
  } else if (pathname == "/address/newaddress") {
    nameheader = "เพิ่มที่อยู่ใหม่";
  } else if (pathname == "/payment/confirmPayment") {
    nameheader = "ยืนยันการชำระเงิน";
  } else if (pathname.match("/payment/")) {
    nameheader = "การชำระเงิน";
  } else if (pathname == "/cartShop") {
    nameheader = "รถเข็น";
  } else if (pathname == "/profile") {
    nameheader = "โปรไฟล์";
  } else if (pathname.match("/statusProduct")) {
    nameheader = "สถานะสินค้า";
  } else if (pathname == "/chat") {
    nameheader = "แชทร้านค้า";
  }
  if (pathname == "/product") {
    return (
      <>
        <Box pb="53px" className="test">
          <Box
            className="test"
            w="100%"
            p="10px"
            pt="15px"
            pos="fixed"
            zIndex={100}
            bg="white"
            borderBottom="1px"
            borderColor="gray.300"
          >
            <Flex alignItems="center">
              <Flex textColor="white" h="7" alignItems="center">
                <Button
                  fontSize="xs"
                  borderRadius="xl"
                  onClick={handleBack}
                  bg="red"
                  h="25px"
                  leftIcon={
                    <Image
                      src="/img/arrow-left-sign-to-navigate.png"
                      alt=""
                      h="10px"
                      w="10px"
                      maxWidth="none"
                      filter="white"
                    />
                  }
                >
                  ย้อนกลับ
                </Button>
              </Flex>
              <Spacer />
              <Flex justifyContent="flex-end">
                <Link href="/cartShop">
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
                <Link href="/profile">
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
                  >
                    <Image src={user.src} alt="" h="7" />
                  </Box>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </>
    );
  } else if (pathname == "/") {
    return (
      <>
        <Box className="test" h="172px">
          <Box
            className="test"
            w="100%"
            p="10px"
            pt="15px"
            pos="fixed"
            zIndex={100}
            bg={bgColor}
          >
            <Flex alignItems="center">
              <InputGroup
                ml="2"
                mr="5"
                maxW="100%"
                bg="white"
                borderRadius="xl"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <InputLeftElement
                  h="7"
                  pointerEvents="none"
                  children={<FaSearch color="gray.300" />}
                />
                <Input
                  h="7"
                  borderRadius="xl"
                  type="text"
                  placeholder="ค้นหา"
                />
              </InputGroup>
              <Flex justifyContent="flex-end">
                <Link href="/cartShop">
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
                <Link href="/profile">
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
                  >
                    <Image src={user.src} alt="" h="7" />
                  </Box>
                </Link>
              </Flex>
            </Flex>
          </Box>
          <Flex
            alignItems="center"
            px="2"
            pt="16"
            pb="28px"
            backgroundImage="url('/img/542730.png')"
            h="100%"
          >
            <Box
              bg="white"
              borderRadius="50%"
              className={style.wh}
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml="2"
            >
              <Image
                borderRadius="50%"
                src="/img/หมาโง่.jpg"
                alt=""
                className={style.wh}
              />
            </Box>
            <Box textColor="white" pl="4">
              <Text className={style.textHead}>SHOPZY สินค้าน่าใช้ ราคาถูก</Text>
              <Flex alignItems="center" height="100%" mt="10px">
                <Center bg="red" borderRadius="md" px="5px">
                  <StarIcon color="yellow.400" className={style.setIcon} />
                  <Text pl="5px" className={style.textBody}>
                    4.8/5.0
                  </Text>
                </Center>
                <Box bg="red" borderRadius="md" ml="10px">
                  <Text px="5px" className={style.textBody}>
                    ร้านแนะนำ
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <Link href="/chat">
              <Flex
                textColor="black"
                h="20px !important"
                mr="2"
                borderRadius="xl"
                bg="white"
                alignItems="center"
                mb="8"
                className={style.setWidth}
              >
                <Image
                  pl="3"
                  borderRadius="50%"
                  src="/img/chat.png"
                  alt=""
                  h="10px"
                />
                <Text className={style.textBody} px="1">
                  แชทร้านค้า
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box pb="39px" className="test">
          <Box
            className="test"
            w="100%"
            p="10px"
            pt="15px"
            mb="10px"
            pos="fixed"
            zIndex={100}
            bg="white"
            borderBottom="1px"
            borderColor="gray.300"
          >
            <Grid templateColumns="repeat(3, 1fr)">
              <Flex textColor="white" h="7" alignItems="center">
                <Button
                  fontSize="xs"
                  borderRadius="xl"
                  onClick={handleBack}
                  bg="red"
                  h="25px"
                  leftIcon={
                    <Image
                      src="/img/arrow-left-sign-to-navigate.png"
                      alt=""
                      h="10px"
                      w="10px"
                      maxWidth="none"
                      filter="white"
                    />
                  }
                >
                  ย้อนกลับ
                </Button>
              </Flex>

              <Text textAlign="center">{nameheader}</Text>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}
