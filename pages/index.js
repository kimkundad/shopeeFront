import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Product from "@/components/ProductAll";
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import cart from "@/public/img/icon/cart.png";
import user from "@/public/img/icon/user copy.png";
import { StarIcon } from "@chakra-ui/icons";
export default function Home(props) {
  const Category = null;

  const [ProductAll, setProductAll] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://127.0.0.1:8000/api/allProduct");
      setProductAll(res.data);
    }

    fetchData();
  }, []);

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
  const [nameShop, setNameShop] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://127.0.0.1:8000/api/shop");
      setNameShop(res.data);
    }

    fetchData();
  }, []);

  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isOpenForm2,
    onOpen: onOpenForm2,
    onClose: onCloseForm2,
  } = useDisclosure();

  const handleClick = () => {
    onCloseForm1();
    onCloseForm2();
  };

  const loginClick = () => {
    onOpenForm2();
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {nameShop.length !== 0
        ? nameShop.shop.map((item, index) => {
            return (
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
                  backgroundImage={`url(http://127.0.0.1:8000/images/shopee/cover_img_shop/${item.cover_img_shop})`}
                  h="100%"
                >
                  <Box
                    bg="white"
                    borderRadius="50%"
                    className="wh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml="2"
                  >
                    <Image
                      borderRadius="50%"
                      src="/img/หมาโง่.jpg"
                      alt=""
                      className="wh"
                    />
                  </Box>
                  <Box textColor="white" pl="4">
                    <Text className="textHead">{item.name_shop}</Text>
                    <Flex alignItems="center" height="100%" mt="10px">
                      <Center bg="red" borderRadius="md" px="5px">
                        <StarIcon
                          color="yellow.400"
                          className="setIcon"
                        />
                        <Text pl="5px" className="textBody">
                          4.8/5.0
                        </Text>
                      </Center>
                      <Box bg="red" borderRadius="md" ml="10px">
                        <Text px="5px" className="textBody">
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
                </Flex>
              </Box>
            );
          })
        : null}
      <Product data={{ ProductAll, Category }} />
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
      <Modal onClose={onCloseForm2} size="xs" isOpen={isOpenForm2} isCentered>
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
              <FormControl>
                <Text fontSize="25px" fontWeight="bold">
                  กรอกเบอร์โทรศัพท์
                </Text>
                <Input bg="gray.100" />
                <Flex mt="15px">
                  <Text fontSize="25px" fontWeight="bold">
                    กรอกรหัส OTP
                  </Text>
                  <Spacer />
                  <Text fontSize="25px" color="orange" as="u">
                    รับรหัส OTP
                  </Text>
                </Flex>

                <Input bg="gray.100" />
              </FormControl>

              <Box textAlign="center">
                <Button mt="15px" bg="red" color="white" type="submit">
                  ยืนยัน
                </Button>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
