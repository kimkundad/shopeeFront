import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Card,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Center,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { saveAs } from "file-saver";
import { connect, useDispatch, useSelector } from "react-redux";
function usePaymentBank() {
  const router = useRouter();
  const userInfo = useSelector((App) => App.userInfo);
  const storedOrder = localStorage.getItem("order");
  const order = storedOrder ? JSON.parse(storedOrder) : [];
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(order).length === 0) {
      router.back();
    }
    if (bank == null) {
      async function fetchData() {
        const formdataBank = new FormData();
        formdataBank.append("user_id", 3);
        formdataBank.append("id", order?.select);
        const bank = await axios.post(
          `https://api.sellpang.com/api/getBank`,
          formdataBank
        );
        setBank(bank.data.banks);
      }
      fetchData();
    }
  }, [order]);

  const handleDownload = async () => {
    event.preventDefault();
    let url = `https://api.sellpang.com/images/shopee/QR_code/${bank?.QR_code}`;
    fetch(url, {
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.download = url.replace(/^.*[\\\/]/, "");
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  async function downloadImage() {
    const image = await fetch(
      `https://zonepang.sgp1.digitaloceanspaces.com/shopee/QR_code/${bank?.QR_code}`
    );
    const imageBlog = await image.blob();
    console.log(image);
    saveAs(imageBlog, bank?.QR_code);
  }
  if (bank !== null || order !== null) {
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
            <Flex px="15px">
              <Box pr="15px">
                <Image
                  src="/img/approval.png"
                  h="25px"
                  w="25px"
                  maxWidth="none"
                />
              </Box>
              <Box>
                <Text>ข้อมูลการชำระเงิน</Text>
              </Box>
            </Flex>
            <Flex pl="60px" pr="15px">
              <Text>รวมการสั่งซื้อ</Text>
              <Spacer />
              <Text>{order?.numPrice}.-</Text>
            </Flex>
            <Flex pl="60px" pr="15px">
              <Text>ค่าจัดส่ง</Text>
              <Spacer />
              <Text>40.-</Text>
            </Flex>
            <Flex pl="60px" pr="15px">
              <Text>ยอดชำระเงินทั้งหมด</Text>
              <Spacer />
              <Text>
                {(parseFloat(order?.numPrice) + parseFloat(40)).toFixed(2)}.-
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box m="30px" mb="0px" bg="white" borderRadius="2xl" textAlign="-webkit-center">
          <Image
            src={`https://api.sellpang.com/images/shopee/QR_code/${bank?.QR_code}`}
          />
        </Box>
        <Box mt="10px" display="flex" justifyContent="center">
          <Button bg="white" borderRadius="xl" onClick={downloadImage}>
            <Text fontSize="xs">บันทึก QR CODE</Text>
          </Button>
        </Box>
        <Box m="30px" mb="0px" bg="white" borderRadius="2xl">
          <Flex alignItems="center" className="set--font" py="10px">
            <Image
              src={`https://api.sellpang.com/images/shopee/icon_bank/${bank?.icon_bank}`}
              borderRadius="xl"
              h="14"
              mx="15px"
            />
            <Box pr="5px">
              <Text>ธนาคาร</Text>
              <Text>เลขบัญชี</Text>
              <Text>ชื่อบัญชี</Text>
            </Box>
            <Box>
              <Text>: {bank?.name_bank}</Text>
              <Text>: {bank?.bankaccount_number}</Text>
              <Text>: {bank?.bankaccount_name}</Text>
            </Box>
          </Flex>
        </Box>
        <Box py="15px" px="30px" display="flex" justifyContent="end">
          <Link
            href={{
              pathname: "/payment/confirmPayment",
            }}
            as="/payment/confirmPayment"
          >
            <Button bg="red" borderRadius="xl">
              <Text>ถัดไป</Text>
            </Button>
          </Link>
        </Box>
      </>
    );
  }
}

export default usePaymentBank;
