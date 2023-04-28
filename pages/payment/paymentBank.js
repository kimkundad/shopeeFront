import React, {useState, useEffect} from "react";
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
function usePaymentBank() {
  const router = useRouter();
  const data = router.query;
  const [order,setOrder] = useState([]);
  const [bank,setBank] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      let user_id = 1;
      const formdata = new FormData();
      formdata.append("order_id",data?.order);
      formdata.append("user_id",user_id);
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/getOrder`,
        formdata
      )
      setOrder(res.data.order);
      const formdataBank = new FormData();
      formdataBank.append("user_id",3);
      formdataBank.append("id",data?.select);
      const bank = await axios.post(
        `https://shopee-api.deksilp.com/api/getBank`,
        formdataBank
      )
      setBank(bank.data.banks);
    }

    fetchData();
  },[data])
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
            <Text>{order?.price}.-</Text>
          </Flex>
          <Flex pl="60px" pr="15px">
            <Text>ค่าจัดส่ง</Text>
            <Spacer />
            <Text>40.-</Text>
          </Flex>
          <Flex pl="60px" pr="15px">
            <Text>ยอดชำระเงินทั้งหมด</Text>
            <Spacer />
            <Text>{parseInt(order?.price)+parseInt(40)}.-</Text>
          </Flex>
        </Box>
      </Box>
      <Box m="30px" mb="0px" bg="white" borderRadius="2xl">
        
        <Image src={`https://shopee-api.deksilp.com/images/shopee/QR_code/${bank?.QR_code}`} />
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button bg="white" borderRadius="xl">
          <Text fontSize="xs">บันทึก QR CODE</Text>
        </Button>
      </Box>
      <Box m="30px" mb="0px" bg="white" borderRadius="2xl">
        <Flex alignItems="center" className="set--font" py="10px">
          <Image src={`https://shopee-api.deksilp.com/images/shopee/icon_bank/${bank?.icon_bank}`} borderRadius="xl" h="14" mx="15px" />
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
            query: {
              order: data?.order
            },
          }}
        >
          <Button bg="red" borderRadius="xl">
            <Text>ถัดไป</Text>
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default usePaymentBank;
