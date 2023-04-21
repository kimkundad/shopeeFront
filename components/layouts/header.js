import {
  Box,
  Flex,
  Image,
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

export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const handleBack = () => {
    const backUrl = {
      pathname: router.pathname,
      query: router.query
    };

    router.back();
    router.push(backUrl, backUrl, { shallow: true });
  };
  let nameheader = "";
  if (pathname == "/address") {
    nameheader = "เลือกที่อยู่";
  } else if (pathname == "/order") {
    nameheader = "ทำการสั่งซื้อ";
  } else if (pathname == "/address/newaddress") {
    nameheader = "เพิ่มที่อยู่ใหม่";
  } else if (pathname == "/address/editaddress") {
    nameheader = "แก้ไขที่อยู่";
  } else if (pathname == "/payment/confirmPayment") {
    nameheader = "ยืนยันการชำระเงิน";
  } else if (pathname.match("/payment")) {
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
  } else if (pathname == "/" || pathname == "/[id]") {
    return null;
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

              <Text textAlign="center" fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">{nameheader}</Text>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}
