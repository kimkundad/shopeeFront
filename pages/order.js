import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import axios from "axios";
function Order() {
  const router = useRouter();
  const data = router.query;
  const userInfo = useSelector((App) => App.userInfo);
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSucces,
    onClose: onCloseSucces,
  } = useDisclosure([]);
  const handleModalClick = () => {
    createdOrder();
    onOpenSucces();
  };

  const [address, setAddress] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data !== undefined) {
      async function fetchData() {
        let user_id = userInfo.data[0].id;
        const formdataAddress = new FormData();
        formdataAddress.append("user_id", user_id);
        const dataAddress = await axios.post(
          `https://shopee-api.deksilp.com/api/getAddress`,
          formdataAddress
        );
        setAddress(dataAddress.data.address);
      }

      fetchData();
    }
  }, [data.product]);
  useEffect(() => {
    if (data?.product !== undefined) {
      async function fetchData() {
        let user_id = userInfo.data[0].id;
        const formdataAddress = new FormData();
        formdataAddress.append("user_id", user_id);
        const dataAddress = await axios.post(
          `https://shopee-api.deksilp.com/api/getAddress`,
          formdataAddress
        );
        setAddress(dataAddress.data.address);
        const formData = new FormData();
        if (Array.isArray(data?.product)) {
          data?.product.forEach((item, index) => {
            formData.append(`carts[${index}]`, parseInt(item));
          });
        } else {
          const arr = [];
          arr.push(data?.product);
          arr.forEach((item, index) => {
            formData.append(`carts[${index}]`, parseInt(item));
          });
        }

        const res = await axios.post(
          `https://shopee-api.deksilp.com/api/getProduct/`,
          formData
        );
        setProducts(res.data.product);
      }

      fetchData();
    }
  }, [data?.product]);

  const [sales, setSales] = useState(null);
  const [numPrice, setNumPrice] = useState(null);
  const [total, setTotal] = useState(null);
  const [num, setNum] = useState(null);
  useEffect(() => {
    if (data?.product_id) {
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
    } else {
      let price = 0;
      let num = 0;
      products.forEach((e) => {
        e.product.forEach((Element) => {
          if (Element.price_sales == 0) {
            if (Element.type_product == 1) {
              price = price + Element.price_type_1;
            } else if (Element.type_product == 2) {
              price = price + Element.price_type_2;
            } else {
              price = price + Element.price_type_3;
            }
            num = num + Element.num;
          } else {
            if (Element.type_product == 1) {
              price =
                price + (Element.price_type_1 * Element.price_sales) / 100;
            } else if (Element.type_product == 2) {
              price =
                price + (Element.price_type_2 * Element.price_sales) / 100;
            } else {
              price =
                price + (Element.price_type_3 * Element.price_sales) / 100;
            }
            num = num + Element.num;
          }
        });
      });
      setNumPrice(price);
      setNum(num);
      setTotal(price + 40);
    }
  }, [products]);
  const [buttonId, setButtonId] = useState("");
  function handleClick(event) {
    setButtonId(event.target.id);
  }
  const paymenttype = [
    { label: "โอนเงิน", img: "/img/qr.png" },
    { label: "เก็บเงินปลายทาง", img: "/img/user-interface.png" },
  ];

  const createdOrder = async () => {
    let invoiceId = 0;
    async function fetchData() {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23,59,59,999);
      const startDateTimestamp = startDate.getTime();
      const endDateTimestamp = endDate.getTime();
      const year = startDate.getFullYear();
      const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
      const day = ("0" + startDate.getDate()).slice(-2);
      const formdataDate = new FormData();
      formdataDate.append('startDate',startDateTimestamp)
      formdataDate.append('endDate',endDateTimestamp)

      const count = await axios.post(
        `https://shopee-api.deksilp.com/api/countOrder`,
        formdataDate
      );
      const invoiceNumber = `${year}${month}${day}${(
        "0000" +
        (count.data.count + 1)
      ).slice(-4)}`;
      invoiceId = invoiceNumber
    }
    await fetchData();
    if (address == null) {
      router.push("/address/newaddress");
      return;
    }
    if (data?.product_id) {
      let discount = 0.0;
      let status = "ที่ต้องชำระ";
      let user_id = userInfo.data[0].id;
      const formData = new FormData();
      formData.append("shop_id", data?.shop_id);
      formData.append("address_id", address?.id);
      formData.append("user_id", user_id);
      formData.append("discount", discount);
      formData.append("price_sales", data?.price_sales);
      formData.append("num", data?.num);
      formData.append("price", data?.price);
      formData.append("total", data?.price * data?.num);
      formData.append("status", status);
      formData.append("product_id", data?.product_id);
      formData.append("option1", data?.option1Id);
      formData.append("option2", data?.option2Id);
      formData.append("invoice_id", invoiceId);
      const response = await axios.post(
        "https://shopee-api.deksilp.com/api/createdOrder",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (buttonId == "โอนเงิน") {
        router.push({
          pathname: "/payment",
          query: { order: response.data.order.id },
        });
      }
    } else {
      let discount = 0.0;
      let status = "ที่ต้องชำระ";
      let user_id = userInfo.data[0].id;
      const formData = new FormData();
      formData.append("products", JSON.stringify(products));
      formData.append("user_id", user_id);
      formData.append("address_id", address?.id);
      formData.append("shop_id", products[0].id);
      formData.append("discount", discount);
      formData.append("num", num);
      formData.append("total", numPrice);
      formData.append("status", status);
      formData.append("invoice_id", invoiceId);
      const response = await axios.post(
        "https://shopee-api.deksilp.com/api/createdOrder",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const formdelete = new FormData();
      data?.product.forEach((e, index) => [
        formdelete.append(`cart_id[${index}]`, e),
      ]);

      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/deleteCartItem`,
        formdelete
      );
      if (buttonId == "โอนเงิน") {
        router.push({
          pathname: "/payment",
          query: { order: response.data.order.id },
        });
      }
    }
  };
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
            {address !== null ? (
              <Box pl="15px">
                <Text fontWeight="bold">ที่อยู่สำหรับจัดส่ง</Text>
                <Text>
                  {address?.name} ({address?.tel})
                </Text>
                <Text>
                  {address?.address} อำเภอ{address?.district} ตำบล
                  {address?.sub_district} จังหวัด{address?.province}{" "}
                  {address?.postcode}
                </Text>
              </Box>
            ) : (
              <Box pl="15px">
                <Text>ไม่พบที่อยู่สำหรับจัดส่ง</Text>
              </Box>
            )}

            <Spacer />
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
      {products.map((item, index) => (
        <Box key={index}>
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
                <Text>{item.name_shop}</Text>
              </Box>
            </Flex>
          </Box>
          {item.product.map((subItem, subIndex) => {
            return (
              <Box bg="white" py="10px" key={subIndex}>
                <Flex px="15px">
                  <Box pt="10px">
                    <Image
                      src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem.img_product}`}
                      alt=""
                      w="100%"
                      maxHeight="130px"
                    />
                  </Box>
                  <Box pl="15px" width="-webkit-fill-available">
                    <Text fontSize="xl" pt="7px">
                      {subItem.name_product}
                    </Text>
                    <Text fontSize="sm">{subItem.detail_product}</Text>
                    {subItem.type_product != 1 ? (
                      <Text
                        fontSize="sm"
                        bg="gray.300"
                        borderRadius="md"
                        display="initial"
                        px="7px"
                      >
                        ตัวเลือกสินค้า: {subItem.option1} {subItem.op_name}{" "}
                        {subItem.option2} {subItem.sub_op_name}
                      </Text>
                    ) : null}

                    <Flex fontSize="xl">
                      <Text>
                        {subItem.price_sales == 0
                          ? subItem.type_product == 1
                            ? subItem.price_type_1
                            : subItem.type_product == 2
                            ? subItem.price_type_2
                            : subItem.price_type_3
                          : subItem.type_product == 1
                          ? (subItem.price_type_1 * subItem.price_sales) / 100
                          : subItem.type_product == 2
                          ? (subItem.price_type_2 * subItem.price_sales) / 100
                          : (subItem.price_type_3 * subItem.price_sales) / 100}
                        .-
                      </Text>
                      <Spacer />
                      <Text>x{subItem.num}</Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Box>
      ))}
      {data?.product_id ? (
        <Box>
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
        </Box>
      ) : null}

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
                <Button
                  w="100%"
                  bg="red"
                  borderRadius="xl"
                  onClick={createdOrder}
                >
                  <Text>สั่งสินค้า</Text>
                </Button>
              ) : buttonId === "เก็บเงินปลายทาง" ? (
                <Button
                  w="100%"
                  bg="red"
                  borderRadius="xl"
                  onClick={
                    address !== null ? () => handleModalClick() : createdOrder
                  }
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

export default Order;
