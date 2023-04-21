import React, {useState, useEffect} from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Card, Flex, Text, Image, Button, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
function useIndex() {
  const router = useRouter();
  const data = router.query

  const [order,setOrder] = useState([]);
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
      <Card></Card>
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
      <Box pt="20px" pb="10px" display="flex" justifyContent="center">
        <Text>บัญชีธนาคาร</Text>
      </Box>
      <Box mx="30px" mb="10px" bg="white" borderRadius="2xl" border="1px solid">
        <Flex alignItems="center" className="set--font" py="10px">
          <Image src="/img/icon_kbank.png" borderRadius="xl" h="14" mx="15px" />
          <Box pr="5px">
            <Text>ธนาคาร</Text>
            <Text>เลขบัญชี</Text>
            <Text>ชื่อบัญชี</Text>
          </Box>
          <Box>
            <Text>: กสิกรไทย</Text>
            <Text>: 123-4-5789-0</Text>
            <Text>: นางสาวบี นามสมมุติ</Text>
          </Box>
        </Flex>
      </Box>
      <Box mx="30px" mb="10px" bg="white" borderRadius="2xl">
        <Flex alignItems="center" className="set--font" py="10px">
          <Image src="/img/icon_kbank.png" borderRadius="xl" h="14" mx="15px" />
          <Box pr="5px">
            <Text>ธนาคาร</Text>
            <Text>เลขบัญชี</Text>
            <Text>ชื่อบัญชี</Text>
          </Box>
          <Box>
            <Text>: กสิกรไทย</Text>
            <Text>: 123-4-5789-0</Text>
            <Text>: นางสาวบี นามสมมุติ</Text>
          </Box>
        </Flex>
      </Box>
      <Box mx="30px" mb="10px" bg="white" borderRadius="2xl">
        <Flex alignItems="center" className="set--font" py="10px">
          <Image src="/img/icon_kbank.png" borderRadius="xl" h="14" mx="15px" />
          <Box pr="5px">
            <Text>ธนาคาร</Text>
            <Text>เลขบัญชี</Text>
            <Text>ชื่อบัญชี</Text>
          </Box>
          <Box>
            <Text>: กสิกรไทย</Text>
            <Text>: 123-4-5789-0</Text>
            <Text>: นางสาวบี นามสมมุติ</Text>
          </Box>
        </Flex>
      </Box>
      <Box mx="30px" mb="10px" bg="white" borderRadius="2xl">
        <Flex alignItems="center" className="set--font" py="10px">
          <Image src="/img/icon_kbank.png" borderRadius="xl" h="14" mx="15px" />
          <Box pr="5px">
            <Text>ธนาคาร</Text>
            <Text>เลขบัญชี</Text>
            <Text>ชื่อบัญชี</Text>
          </Box>
          <Box>
            <Text>: กสิกรไทย</Text>
            <Text>: 123-4-5789-0</Text>
            <Text>: นางสาวบี นามสมมุติ</Text>
          </Box>
        </Flex>
      </Box>
      <Box py="15px" px="30px" display="flex" justifyContent="end">
        <Link
          href={{
            pathname: "/payment/paymentbank",
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

export default useIndex;
