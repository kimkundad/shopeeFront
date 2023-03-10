import React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Card,
  Flex,
  Input,
  Text,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Upload from "@/components/Dropzone"
function confirmPayment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSizeClick = (newSize) => {
    onOpen();
  };
  return (
    <>
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="15px">
        <Box bg="white" py="10px" mt="10px">
          <Flex px="25px">
            <Text>ยอดชำระเงินทั้งหมด</Text>
            <Spacer />
            <Text>620.-</Text>
          </Flex>
        </Box>
        <Box px="25px">
          <Text py="10px" textColor="gray.400">
            กรุณาอัพโหลดรูปหลักฐานการชำระเงิน ทางเราจะตรวจสอบยอดเงินของคุณภายใน
            48 ชั่วโมง
          </Text>
        </Box>
      </Box>
      <Box pt="15px">
        <Box bg="white" py="10px" mt="10px">
          <Flex px="25px">
            <Text>อัพโหลดหลักฐานการชำระเงิน</Text>
          </Flex>
          <Upload/>
        </Box>
      </Box>
      <Box pt="15px">
        <Box py="10px" mt="10px">
          <Flex px="26px">
            <Text>วันที่โอนเงิน</Text>
          </Flex>
          <Box px="25px">
            <Input
              borderRadius="xl"
              bg="white"
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </Box>
        </Box>
        <Box py="10px" mt="10px">
          <Flex px="26px">
            <Text>เวลาที่โอนเงิน</Text>
          </Flex>
          <Box px="25px">
            <Input
              borderRadius="xl"
              bg="white"
              placeholder="Select Date and Time"
              size="md"
              type="time"
            />
          </Box>
        </Box>
      </Box>
      <Box py="15px" px="30px" display="flex" justifyContent="end">
        <Button bg="red" borderRadius="xl" onClick={() => handleSizeClick()}>
          <Text>ถัดไป</Text>
        </Button>
      </Box>
      <Modal onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent alignSelf="center">
          <ModalHeader alignSelf="center">
            ยืนยันการชำระเงินเรียบร้อย
          </ModalHeader>
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Image src="/img/check3.png" alt="" h="100px" mx="auto" />
              <Text fontWeight="bold" fontSize="xl">ขอบคุณสำหรับการสั่งซื้อ</Text>
              <Text>
                ท่านสามารถตรวจสอบสถานะสินค้าที่ท่านสั่งซื้อได้ที่ปุ่มเมนู
                "ดูสถานะสินค้า" ในหน้าโปรไฟล์ได้เลย
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <Link href="/profile" justifySelf="center">
              <Button w="100%" bg="red" borderRadius="xl">
                <Text color="white">ไปยังหน้าโปรไฟล์</Text>
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default confirmPayment;
