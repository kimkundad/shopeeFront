import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import Upload from "@/components/Dropzone";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
function ConfirmPayment() {
  const router = useRouter();
  const userInfo = useSelector((App) => App.userInfo);
  const storedOrder = localStorage.getItem("order");
  const order = storedOrder ? JSON.parse(storedOrder) : [];
  const storedOwner = localStorage.getItem("user_code");
  const OwnerShopId = storedOwner ? JSON.parse(storedOwner) : [];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (Object.keys(order).length === 0) {
      router.back();
    }
  }, []);

  useEffect(() => {
    if (order !== null) {
      setIsLoading(false);
    }
  }, [order]);
  const { isOpen, onOpen, onClose } = useDisclosure([]);

  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [validateSlip, setValidateSlip] = useState(null);
  const [validateText, setValidateText] = useState(null);

  const confirmPayment = () => {
    let check = 0;
    if (image == null) {
      check++;
      setValidateSlip("กรุณาอัพโหลดหลักฐานการชำระเงิน");
    } else {
      setValidateSlip(null);
    }
    if (date == "" || time == "") {
      check++;
      setValidateText("กรุณาเลือก");
    } else {
      setValidateText(null);
    }
    if (check !== 0) {
      return;
    }
    async function addData() {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      const startDateTimestamp = startDate.getTime();
      const endDateTimestamp = endDate.getTime();
      const year = startDate.getFullYear();
      const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
      const day = ("0" + startDate.getDate()).slice(-2);
      const formdataDate = new FormData();
      formdataDate.append("startDate", startDateTimestamp);
      formdataDate.append("endDate", endDateTimestamp);

      const count = await axios.post(
        `https://api.sellpang.com/api/countOrder`,
        formdataDate
      );
      const invoiceNumber = `${year}${month}${day}${(
        "0000" +
        (count.data.count + 1)
      ).slice(-4)}`;
      if (order.type == 'cart') {
        let discount = 0.0;
        let status = "ตรวจสอบคำสั่งซื้อ";
        let user_id = userInfo.data[0].id;
        const formData = new FormData();
        formData.append("products", JSON.stringify(order?.products));
        formData.append("user_id", user_id);
        formData.append("user_code", OwnerShopId.user_code);
        formData.append("address_id", order?.address_id);
        formData.append("discount", discount);
        formData.append("num", order?.num);
        formData.append("total", order?.numPrice);
        formData.append("status", status);
        formData.append("invoice_id", invoiceNumber);
        formData.append("type_payment", "โอนเงิน");
        formData.append("type_noti","new_order");
        const response = await axios.post(
          "https://api.sellpang.com/api/createdOrder",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const formdelete = new FormData();
        order?.pro_id.forEach((e, index) => [
          formdelete.append(`cart_id[${index}]`, e),
        ]);

        const res = await axios.post(
          `https://api.sellpang.com/api/deleteCartItem`,
          formdelete
        );
        const formdataTran = new FormData();
        formdataTran.append("date", date);
        formdataTran.append("time", time);
        formdataTran.append("order_id", response?.data?.order?.id);
        formdataTran.append("bankaccount_id", order?.select);
        image.forEach((file, index) => {
          formdataTran.append(`file[${index}]`, file);
        });
        const resTran = await axios.post(
          `https://api.sellpang.com/api/confirmPayment`,
          formdataTran
        );
        
        localStorage.removeItem("order");
        onOpen();
      } else {
        let discount = 0.0;
        let status = "ตรวจสอบคำสั่งซื้อ";
        let user_id = userInfo.data[0].id;
        const formData = new FormData();
        formData.append("shop_id", order?.shop_id);
        formData.append("address_id", order?.address_id);
        formData.append("user_code", OwnerShopId.user_code);
        formData.append("user_id", user_id);
        formData.append("discount", discount);
        formData.append("price_sales", order?.price_sales);
        formData.append("num", order?.num);
        formData.append("price", order?.price);
        formData.append("total", order?.numPrice);
        formData.append("status", status);
        formData.append("product_id", order?.product_id);
        formData.append("option1", order?.option1Id);
        formData.append("option2", order?.option2Id);
        formData.append("invoice_id", invoiceNumber);
        formData.append("type_payment", "โอนเงิน");
        formData.append("type_noti","new_order");
        const response = await axios.post(
          "https://api.sellpang.com/api/createdOrder",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const formdataTran = new FormData();
        formdataTran.append("date", date);
        formdataTran.append("time", time);
        formdataTran.append("order_id", response?.data?.order?.id);
        formdataTran.append("bankaccount_id", order?.select);
        image.forEach((file, index) => {
          formdataTran.append(`file[${index}]`, file);
        });
        const res = await axios.post(
          `https://api.sellpang.com/api/confirmPayment`,
          formdataTran
        );
        localStorage.removeItem("order");
        onOpen();
      }

    }
    addData();
  };

  if (!isLoading) {
    return (
      <>
        <Head>
          <title>Sellpang</title>
          <meta name="description" content="Generated by sellpang" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box pt="15px">
          <Box bg="white" py="10px" mt="10px">
            <Flex px="25px">
              <Text>ยอดชำระเงินทั้งหมด</Text>
              <Spacer />
              <Text>{(parseFloat(order?.numPrice) + parseFloat(40)).toFixed(2)}.-</Text>
            </Flex>
          </Box>
          <Box px="25px">
            <Text py="10px" textColor="gray.400">
              กรุณาอัพโหลดรูปหลักฐานการชำระเงิน
              ทางเราจะตรวจสอบยอดเงินของคุณภายใน 48 ชั่วโมง
            </Text>
          </Box>
        </Box>
        <Box pt="15px">
          <Box bg="white" py="10px" mt="10px">
            <Flex px="25px">
              <Text>อัพโหลดหลักฐานการชำระเงิน</Text>
            </Flex>
            <Upload setImage={setImage} />
            {image == null ? (
              <Text px="25px" py="10px" color="red">
                {validateSlip}
              </Text>
            ) : null}
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
                onChange={(e) => setDate(e.target.value)}
              />
            </Box>
            {date == "" && validateText != null ? (
              <Text px="25px" pt="10px" color="red">
                {validateText}วันที่
              </Text>
            ) : null}
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
                onChange={(e) => setTime(e.target.value)}
              />
            </Box>
            {time == "" && validateText !== null ? (
              <Text px="25px" pt="10px" color="red">
                {validateText}เวลาที่โอนเงิน
              </Text>
            ) : null}
          </Box>
        </Box>
        <Box py="15px" px="30px" display="flex" justifyContent="end">
          <Button bg="red" borderRadius="xl" onClick={() => confirmPayment()}>
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
                <Text fontWeight="bold" fontSize="xl">
                  ขอบคุณสำหรับการสั่งซื้อ
                </Text>
                <Text>
                  ท่านสามารถตรวจสอบสถานะสินค้าที่ท่านสั่งซื้อได้ที่ปุ่มเมนู
                  &quot;ดูสถานะสินค้า&quot; ในหน้าโปรไฟล์ได้เลย
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter alignSelf="center">
              <Link href="/profile">
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
}

export default ConfirmPayment;
