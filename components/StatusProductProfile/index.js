import {
  Box,
  Grid,
  Text,
  Flex,
  Spacer,
  GridItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./style.module.css";
export default function useStatusProductProfile(props) {
  const [isBorderActive, setIsBorderActive] = useState("ที่ต้องชำระ");
  const status = [
    { label: "ที่ต้องชำระ" },
    { label: "กำลังจัดส่ง" },
    { label: "จัดส่งสำเร็จ" },
  ];
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const newArr = [];
    props.data.map((item) => {
      if (item.status == isBorderActive) {
        newArr.push(item);
      }
    });
    setOrders(newArr);
    let num = 0;
    const newCarts = [];
    props?.carts?.cartItem?.map((item, index) => {
      if (num == 3) {
        return;
      }
      const product = [];
      item.product.map((subItem, subIndex) => {
        if (num == 3) {
          return;
        }
        num++;
        product.push(subItem);
      });
      newCarts.push({ name_shop: item.name_shop, product: product });
    });
    setCount(num);
    setCarts(newCarts);
  }, [props.data, props.carts]);
  useEffect(() => {
    const newArr = [];
    props.data.map((item) => {
      if (item.status == isBorderActive) {
        newArr.push(item);
      }
    });
    setOrders(newArr);
  }, [isBorderActive]);
  const router = useRouter();
  const { pathname } = router;
  return (
    <div>
      <Box bg="white" pt="10px">
        {pathname === "/profile" ? <Text className={style.textHead} px="25px" fontWeight="bold">สถานะสินค้า</Text> : false}
        <Grid templateColumns="repeat(3, 1fr)" fontSize="xs" width="100%">
          {status.map((item, index) => {
            return (
              <GridItem
                py="10px"
                key={index}
                id={index}
                borderBottom={isBorderActive == item.label ? "2px" : "1px"}
                borderColor={isBorderActive == item.label ? "red" : "gray.300"}
                onClick={() => setIsBorderActive(item.label)}
              >
                <Text textAlign="center" className="set--font">
                  {item.label}
                </Text>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
      {carts?.map((item, index) => {
        return isBorderActive == "ที่ต้องชำระ" ? (
          <Box bg="white" key={index} py="10px" mt={index == 0? "0px":"10px"}>
            <Box>
              <Box bg="white">
                <Box>
                  <Text px="15px" className={style.textHead} fontWeight="bold">
                    {item.name_shop}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Link
              href={{
                pathname: "/cartShop",
              }}
            >
              {item?.product?.map((subItem, subIndex) => {
                return (
                  <Box
                    key={subItem.id}
                    pb="10px"
                    mx="15px"
                    /* borderBottom="1px"
                    borderColor="gray.300" */
                  >
                    <Flex alignItems="center">
                      <Box>
                        <Image
                          src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                          alt=""
                          className={style.wh}
                        />
                      </Box>
                      <Box
                        pl="15px"
                        width="-webkit-fill-available"
                        wordBreak="break-all"
                      >
                        <Text className={style.textHead,style.oneLines} fontWeight="bold">
                          {subItem.name_product}
                        </Text>
                        <Text className={style.textBody,style.twoLines}>
                          {subItem.detail_product}
                        </Text>
                        <Flex alignItems="center">
                          <Text
                            className={style.textBody}
                            bg="gray.300"
                            borderRadius="md"
                            display="initial"
                            px="7px"
                          >
                            ตัวเลือกสินค้า: {subItem.option1} {subItem.op_name}{" "}
                            {subItem.option2} {subItem.sub_op_name}
                          </Text>
                          <Text pl="15px" className={style.textHead}>
                            x{subItem.num}
                          </Text>
                        </Flex>

                        <Flex alignItems="center">
                          <Text className={style.textHead}>
                            {subItem.price_sales == 0
                              ? subItem.type_product == 1
                                ? subItem.price_type_1 * subItem.num
                                : subItem.type_product == 2
                                ? subItem.price_type_2 * subItem.num
                                : subItem.price_type_3 * subItem.num
                              : subItem.type_product == 1
                              ? subItem.price_type_1 -
                                ((subItem.price_type_1 * subItem.price_sales) /
                                  100) *
                                  subItem.num
                              : subItem.type_product == 2
                              ? subItem.price_type_2 -
                                ((subItem.price_type_2 * subItem.price_sales) /
                                  100) *
                                  subItem.num
                              : subItem.price_type_3 -
                                ((subItem.price_type_3 * subItem.price_sales) /
                                  100) *
                                  subItem.num}
                            .-
                          </Text>
                          <Spacer />
                          <Text
                            bg={isBorderActive == "ที่ต้องชำระ" ? "red" : ""}
                            borderRadius="xl"
                            className={style.textBody}
                            px="10px"
                            color={"white"}
                          >
                            {isBorderActive}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Link>
          </Box>
        ) : null;
      })}
      <Box
        textAlign="center"
        pb="10px"
        bg="white"
        pt="10px"
        display={count == 3 && isBorderActive == "ที่ต้องชำระ" ? "block" : "none"}
      >
        <Link href="/statusProduct">
          <Button bg="red" borderRadius="xl" size="md" height="30px">
            <Text fontSize="xs" color="white">
              ดูเพิ่มเติม
            </Text>
          </Button>
        </Link>
      </Box>
      {orders?.map((item, index) => {
        return item.status == isBorderActive && index < 3 ? (
          <Box key={item.id}>
            {item?.shops.map((subItem, subIndex) => {
              return (
                <Box
                  bg="white"
                  key={subIndex}
                  mt={index == 0? "0px":"10px"}
                  py="10px"
                  display={isBorderActive == "ที่ต้องชำระ" ? "none" : "block"}
                >
                  <Box>
                    <Box bg="white">
                      <Box>
                        <Text px="15px" className={style.textHead} fontWeight="bold">
                          {subItem.name_shop}
                        </Text>
                      </Box>
                    </Box>
                    {isBorderActive == "ที่ต้องชำระ" ? (
                      <Link
                        href={{
                          pathname: "/cartShop",
                          query: {
                            order: item.id,
                          },
                        }}
                      >
                        {/* {subItem?.products?.map((subItem, subIndex) => {
                          return (
                            <Box
                              key={subIndex}
                              py="10px"
                              mx="15px"
                              borderBottom="1px"
                              borderColor="gray.300"
                            >
                              <Flex alignItems="center">
                                <Box>
                                  <Image
                                    src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                                    alt=""
                                    className={style.wh}
                                  />
                                </Box>
                                <Box
                                  pl="15px"
                                  width="-webkit-fill-available"
                                  wordBreak="break-all"
                                >
                                  <Text className={style.textHead}>
                                    {subItem.name_product}
                                  </Text>
                                  <Text className={style.textBody}>
                                    {subItem.detail_product}
                                  </Text>
                                  <Flex alignItems="center">
                                    <Text
                                      className={style.textBody}
                                      bg="gray.300"
                                      borderRadius="md"
                                      display="initial"
                                      px="7px"
                                    >
                                      ตัวเลือกสินค้า: {subItem.option1}{" "}
                                      {subItem.op_name} {subItem.option2}{" "}
                                      {subItem.sub_op_name}
                                    </Text>
                                    <Text pl="15px" className={style.textHead}>
                                      x{subItem.num}
                                    </Text>
                                  </Flex>

                                  <Flex alignItems="center">
                                    <Text className={style.textHead}>
                                      {subItem.price_sales == 0
                                        ? subItem.type == 1
                                          ? subItem.price * subItem.num
                                          : subItem.type == 2
                                          ? subItem.op_price * subItem.num
                                          : subItem.sub_op_price * subItem.num
                                        : subItem.type == 1
                                        ? subItem.price -
                                          ((subItem.price *
                                            subItem.price_sales) /
                                            100) *
                                            subItem.num
                                        : subItem.type == 2
                                        ? subItem.op_price -
                                          ((subItem.op_price *
                                            subItem.price_sales) /
                                            100) *
                                            subItem.num
                                        : subItem.sub_op_price -
                                          ((subItem.sub_op_price *
                                            subItem.price_sales) /
                                            100) *
                                            subItem.num}
                                      .-
                                    </Text>
                                    <Spacer />
                                    <Text
                                      bg={
                                        isBorderActive == "ที่ต้องชำระ"
                                          ? "red"
                                          : ""
                                      }
                                      borderRadius="xl"
                                      className={style.textBody}
                                      px="10px"
                                      color={"white"}
                                    >
                                      {isBorderActive}
                                    </Text>
                                  </Flex>
                                </Box>
                              </Flex>
                            </Box>
                          );
                        })} */}
                      </Link>
                    ) : (
                      subItem?.products?.map((subItem, subIndex) => {
                        return (
                          <Box
                            pb="10px"
                            mx="15px"
                            /* borderBottom="1px"
                            borderColor="gray.300" */
                            key={subItem.id}
                          >
                            <Flex alignItems="center">
                              <Box>
                                <Image
                                  src={`https://shopee-api.deksilp.com/images/shopee/products/${subItem?.img_product}`}
                                  alt=""
                                  className={style.wh}
                                />
                              </Box>
                              <Box
                                pl="15px"
                                width="-webkit-fill-available"
                                wordBreak="break-all"
                              >
                                <Text className={style.textHead,style.oneLines} fontWeight="bold">
                                  {subItem.name_product}
                                </Text>
                                <Text className={style.textBody,style.twoLines}>
                                  {subItem.detail_product}
                                </Text>
                                <Flex alignItems="center">
                                  <Text
                                    className={style.textBody}
                                    bg="gray.300"
                                    borderRadius="md"
                                    display="initial"
                                    px="7px"
                                  >
                                    ตัวเลือกสินค้า: {subItem.option1}{" "}
                                    {subItem.op_name} {subItem.option2}{" "}
                                    {subItem.sub_op_name}
                                  </Text>
                                  <Text pl="15px" className={style.textHead}>
                                    x{subItem.num}
                                  </Text>
                                </Flex>

                                <Flex alignItems="center">
                                  <Text className={style.textHead}>
                                    {subItem.price_sales == 0
                                      ? subItem.type == 1
                                        ? subItem.price * subItem.num
                                        : subItem.type == 2
                                        ? subItem.op_price * subItem.num
                                        : subItem.sub_op_price * subItem.num
                                      : subItem.type == 1
                                      ? subItem.price -
                                        ((subItem.price * subItem.price_sales) /
                                          100) *
                                          subItem.num
                                      : subItem.type == 2
                                      ? subItem.op_price -
                                        ((subItem.op_price *
                                          subItem.price_sales) /
                                          100) *
                                          subItem.num
                                      : subItem.sub_op_price -
                                        ((subItem.sub_op_price *
                                          subItem.price_sales) /
                                          100) *
                                          subItem.num}
                                    .-
                                  </Text>
                                  <Spacer />
                                  <Text
                                    bg={
                                      isBorderActive == "ที่ต้องชำระ"
                                        ? "red"
                                        : ""
                                    }
                                    borderRadius="xl"
                                    className={style.textBody}
                                    px="10px"
                                    color={
                                      isBorderActive == "ที่ต้องชำระ"
                                        ? "white"
                                        : isBorderActive == "กำลังจัดส่ง"
                                        ? "orange"
                                        : "blue"
                                    }
                                  >
                                    {isBorderActive == "กำลังจัดส่ง"
                                      ? "จะได้รับสินค้าภายใน date"
                                      : isBorderActive == "จัดส่งสำเร็จ"
                                      ? "พัสดุจัดส่งเรียบร้อย: address"
                                      : isBorderActive}
                                  </Text>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      })
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : index == 3 ? (
          <Box textAlign="center" pb="10px" bg="white" pt="10px" key={item.id}>
            <Link href="/statusProduct">
              <Button bg="red" borderRadius="xl" size="md" height="30px">
                <Text fontSize="xs" color="white">
                  ดูเพิ่มเติม
                </Text>
              </Button>
            </Link>
          </Box>
        ) : null;
      })}
    </div>
  );
}
