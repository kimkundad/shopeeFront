import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import cart from "@/public/img/icon/cart.png";
import user from "@/public/img/icon/user copy.png";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  const { pathname } = router;
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
              <Flex
                textColor="black"
                h="7"
                mr="2"
                borderRadius="xl"
                bg="pink"
                alignItems="center"
              >
                <Image
                  pl="3"
                  borderRadius="50%"
                  src="/img/chat.png"
                  alt=""
                  h="5"
                />
                <Text className="set--font" px="1">
                  ย้อนกลับ
                </Text>
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
        <Box
          pb="28px"
          className="test"
          backgroundImage="url('/img/542730.png')"
          backgroundAttachment="fixed"
        >
          <Box
            className="test"
            w="100%"
            p="10px"
            pt="15px"
            pos="fixed"
            zIndex={100}
            bg="black"
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
          <Flex alignItems="center" px="2" pt="16" pos="sticky">
            <Box
              bg="white"
              borderRadius="50%"
              w="80px !important"
              h="80px !important"
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml="2"
            >
              <Image
                borderRadius="50%"
                src="/img/หมาโง่.jpg"
                alt=""
                h="80px !important"
                w="80px !important"
              />
            </Box>
            <Box className="set--width" textColor="white" pl="4">
              <Text className="set--font">SHOPZY สินค้าน่าใช้ ราคาถูก</Text>
              <Flex>
                <Text className="set--font">icon ดาว</Text>
                <Text pl="10px" className="set--font">ร้านแนะนำ</Text>
              </Flex>
            </Box>
            <Spacer />
            <Link href="/chat">
              <Flex
                textColor="black"
                h="7"
                mr="2"
                borderRadius="xl"
                bg="white"
                alignItems="center"
                mb="5"
              >
                <Image
                  pl="3"
                  borderRadius="50%"
                  src="/img/chat.png"
                  alt=""
                  h="5"
                />
                <Text className="set--font" px="1">
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
            pos="fixed"
            zIndex={100}
            bg="white"
            borderBottom="1px"
            borderColor="gray.300"
          >
            <Flex alignItems="center">
              <Flex
                textColor="black"
                h="7"
                mr="2"
                borderRadius="xl"
                bg="pink"
                alignItems="center"
              >
                <Image
                  pl="3"
                  borderRadius="50%"
                  src="/img/chat.png"
                  alt=""
                  h="5"
                />
                <Text className="set--font" px="1">
                  ย้อนกลับ
                </Text>
              </Flex>
              <Spacer />
              <Text>{nameheader}</Text>
              <Spacer />
              <Text></Text>
            </Flex>
          </Box>
        </Box>
      </>
    );
  }
}
