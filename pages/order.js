import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  GridItem,
  Image,
  Button,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
function Order() {
  const router = useRouter();
  const data = router.query;
  const { isOpen: isOpenSuccess, onOpen: onOpenSucces, onClose: onCloseSucces } = useDisclosure([]);
  const handleModalClick = () => {
    onOpenSucces();
  };

  const [sales, setSales] = useState(null);
  const [numPrice, setNumPrice] = useState(null);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    if (data.price_sales !== 0) {
      setNumPrice(
        (data.price - (data.price_sales * data.price) / 100) * data.num
      );
      setSales(data.price - (data.price_sales * data.price) / 100);
      setTotal(
        (data.price - (data.price_sales * data.price) / 100) * data.num + 40
      );
    } else {
      setSales(data.price);
      setNumPrice(data.price * data.num);
      setTotal(data.price + 40);
    }
  }, [data]);
  const [buttonId, setButtonId] = useState("");
  function handleClick(event) {
    setButtonId(event.target.id);
  }
  const paymenttype = [
    { label: "โอนเงิน", img: "/img/qr.png" },
    { label: "เก็บเงินปลายทาง", img: "/img/user-interface.png" },
  ];

  const createdOrder = async () => {
    let discount = null
    let status = "ที่ต้องชำระ"
    let user_id = 1
    const formData = new FormData();
    formData.append("shop_id", data?.shop_id);
    formData.append("user_id", user_id);
    formData.append("discount", discount);
    formData.append("price_sales", data?.price_sales);
    formData.append("num", data?.num);
    formData.append("price", data?.price);
    formData.append("status", status);
    formData.append("product_id", data?.product_id);
    formData.append("option1", data?.option1Id);
    formData.append("option2", data?.option2Id);
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/createdOrder",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }
  return (
    <>
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="25px">
        <Box py="10px" bg="white">
          <Flex px="15px">
            <Box>
              <Image
                src="/img/placeholder.png"
                alt=""
                h="25px"
                w="25px"
                maxWidth="none"
              />
            </Box>
            <Box pl="15px">
              <Text fontWeight="bold">ที่อยู่สำหรับจัดส่ง</Text>
              <Text>นายต๊อบ เจริญมี (081-789-7784)</Text>
              <Text>
                อำเภอเมืองชลบุรี 9/84 หมู่บ้านมหานคร ซอย 19
                ตำบลแสนสุขอำเภอเมืองชลบุรี จังหวัดชลบุรี 22130
              </Text>
            </Box>
            <Box display="flex" alignSelf="center">
              <Link href="/address/">
                <Box>
                  <Image
                    src="/img/arrow-right-sign-to-navigate.png"
                    alt=""
                    h="25px"
                    w="25px"
                    maxWidth="none"
                  />
                </Box>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box py="10px" mt="10px" bg="white">
        <Flex px="15px">
          <Box
            px="8px"
            bg="red"
            textColor="white"
            borderRadius="md"
            textAlign="center"
          >
            <Text>ร้านแนะนำ</Text>
          </Box>
          <Box pl="8px">
            <Text>{data.name_shop}</Text>
          </Box>
        </Flex>
      </Box>
      <Box bg="white" py="10px">
        <Flex px="15px">
          <Box pt="10px">
            <Image
              src={`https://shopee-api.deksilp.com/images/shopee/products/${data.img_product}`}
              alt=""
              w="100%"
              maxHeight="130px"
            />
          </Box>
          <Box pl="15px" width="-webkit-fill-available">
            <Text fontSize="xl" pt="7px">
              {data.name_product}
            </Text>
            <Text fontSize="sm">{data.detail_product}</Text>
            {data.type != 1 ? (
              <Text
                fontSize="sm"
                bg="gray.300"
                borderRadius="md"
                display="initial"
                px="7px"
              >
                ตัวเลือกสินค้า: {data.name_option1} {data.option1}{" "}
                {data.name_option2} {data.option2}
              </Text>
            ) : null}

            <Flex fontSize="xl">
              <Text>{sales}.-</Text>
              <Spacer />
              <Text>x{data.num}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box bg="white" py="10px" mt="10px">
        <Flex px="15px">
          <Box pr="15px" alignSelf="center">
            <Image src="/img/wallet.png" alt="" h="25px"></Image>
          </Box>
          <Box>
            <Text>เลือกวิธีการชำระเงิน</Text>
          </Box>
        </Flex>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(2, minmax(0px, 1fr))"
          mt="15px"
          px="40px"
          fontSize="sm"
        >
          {paymenttype.map((item, index) => {
            return buttonId === item.label ? (
              <Button
                key={index}
                w="100%"
                onClick={handleClick}
                boxShadow="outline"
                id={item.label}
                className="set--font"
                leftIcon={
                  <Image
                    onClick={handleClick}
                    id={item.label}
                    src={item.img}
                    alt=""
                    h="20px"
                  />
                }
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={index}
                className="set--font"
                w="100%"
                onClick={handleClick}
                id={item.label}
                leftIcon={
                  <Image
                    src={item.img}
                    onClick={handleClick}
                    id={item.label}
                    alt=""
                    h="20px"
                  />
                }
              >
                {item.label}
              </Button>
            );
          })}
        </SimpleGrid>
      </Box>
      <Box bg="white" py="10px" mt="10px">
        <Flex px="15px">
          <Box pr="15px">
            <Image src="/img/approval.png" alt="" h="25px" />
          </Box>
          <Box>
            <Text>ข้อมูลการชำระเงิน</Text>
          </Box>
        </Flex>
        <Flex pl="60px" pr="15px">
          <Text>รวมการสั่งซื้อ</Text>
          <Spacer />
          <Text>{numPrice}.-</Text>
        </Flex>
        <Flex pl="60px" pr="15px">
          <Text>ค่าจัดส่ง</Text>
          <Spacer />
          <Text>40.-</Text>
        </Flex>
        <Flex pl="60px" pr="15px">
          <Text>ยอดชำระเงินทั้งหมด</Text>
          <Spacer />
          <Text>{total}.-</Text>
        </Flex>
      </Box>
      <Box className="test" bottom={0}>
        <Box
          className="test"
          px="15px"
          mt="10px"
          py="8px"
          bg="white"
          pos="fixed"
          bottom={0}
        >
          <Grid
            spacing={4}
            templateColumns="repeat(2, minmax(30px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            <GridItem colSpan={1} gridColumn={2}>
              {buttonId === "โอนเงิน" ? (
                <Link
                href={{
                  pathname: "/payment",
                  query: {
                    num_price: numPrice,
                    delivery_fee: 40,
                    total: total,
                  },
                }}
              >
                <Button
                  w="100%"
                  bg="red"
                  borderRadius="xl"
                >
                  <Text>สั่งสินค้า</Text>
                </Button>
                </Link>
              ) : buttonId === "เก็บเงินปลายทาง" ? (
                <Button
                  w="100%"
                  bg="red"
                  borderRadius="xl"
                  onClick={() => handleModalClick()}
                >
                  <Text>สั่งสินค้า</Text>
                </Button>
              ) : (
                <Button w="100%" bg="red" borderRadius="xl">
                  <Text>สั่งสินค้า</Text>
                </Button>
              )}
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Modal onClose={onCloseSucces} size="xs" isOpen={isOpenSuccess}>
        <ModalOverlay />
        <ModalContent alignSelf="center">
          <ModalHeader alignSelf="center">สั่งซื้อสินค้าสำเร็จ</ModalHeader>
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Image src="/img/check3.png" alt="" h="100px" mx="auto" />
              <Text pt="15px" fontWeight="bold" fontSize="xl">
                ขอบคุณสำหรับการสั่งซื้อ
              </Text>
              <Text>
                ท่านสามารถตรวจสอบสถานะสินค้าที่ท่านสั่งซื้อได้ที่ปุ่มเมนู
                &quot;ดูสถานะสินค้า&quot; ในหน้าโปรไฟล์ได้เลย
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

export default Order;
