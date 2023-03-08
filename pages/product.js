import { useState } from "react";
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
  HStack,
  Icon,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Link from "next/link";
function product() {
  const colorProduct = [
    { label: "สีชมพู" },
    { label: "สีฟ้า" },
    { label: "สีเหลือง" },
    { label: "สีส้ม" },
  ];
  const size = [
    { label: "38" },
    { label: "39" },
    { label: "40" },
    { label: "41" },
    { label: "42" },
    { label: "43" },
    { label: "44" },
  ];
  const [colorId, setColorId] = useState("");
  function selectColor(event) {
    setColorId(event.target.id);
  }

  const [sizeId, setSizeId] = useState("");
  function selectSize(event) {
    setSizeId(event.target.id);
  }

  const fullStars = Math.floor(4.5);
  const hasHalfStar = 4.5 % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={i} color="yellow.400" />);
  }

  if (hasHalfStar) {
    stars.push(
      <Icon
        key={fullStars}
        as={StarIcon}
        color="yellow.400"
        ml="4px !important"
      />
    );
  }
  return (
    <>
      <Head>
        <title>product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box px="15px" py="10px" bg="white">
        <Box>
          <Image src="/img/หมาโง่.jpg" alt="" w="100%" maxHeight="500px" />
          <Text fontSize="xl" pt="7px">
            ร้องเท้าฉลาม สุดฮิต!
          </Text>
          <Text fontSize="sm">น่ารักไม่ไหว ร้องเท้าแฟชั่นเกาหลี</Text>
        </Box>
        <Flex pt="15px">
          <Box>
            <HStack>{stars}</HStack>
            <Text pt="4px" fontSize="xs">
              ขายไปแล้ว 300 ชิ้น
            </Text>
          </Box>
          <Spacer />
          <Text
            alignSelf="center"
            fontSize="xs"
            style={{
              position: "relative",
            }}
          >
            (ราคาปกติ{" "}
            <s style={{ position: "relative", textDecoration: "none"}}>
              390
              <span
                style={{
                  top: "50%",
                  background: "red",
                  opacity: "0.7",
                  content: "",
                  width: "110%",
                  position: "absolute",
                  height: "0.1em",
                  borderRadius: "0.1em",
                  left: "-5%",
                  whiteSpace: "nowrap",
                  display: "block",
                  transform: "rotate(-15deg)",
                }}
              ></span>
            </s>
            .-)
          </Text>
          <Box ml="10px" borderRadius="md" bg="red" alignSelf="center">
            <Text px="10px" color="white" fontSize="2xl" fontWeight="bold">
              290.-
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box px="15px" mt="10px" bg="white" pb="10px">
        <Box>
          <Text fontSize="xl" mt="7px">
            สี
          </Text>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(4, minmax(0px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            {colorProduct.map((item, index) => {
              return colorId === item.label ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  height="35px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectColor}
                  outline={`2px solid red`}
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  height="35px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectColor}
                  id={item.label}
                >
                  {item.label}
                </Button>
              );
            })}
          </SimpleGrid>
          <Text fontSize="xl" pt="7px">
            ขนาด
          </Text>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(4, minmax(0px, 1fr))"
            mt="15px"
            pb="15px"
            fontSize="sm"
            borderBottom="1px"
            borderColor="gray.300"
          >
            {size.map((item, index) => {
              return sizeId === item.label ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  height="30px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectColor}
                  outline={`2px solid red`}
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  height="30px"
                  key={index}
                  w="100%"
                  borderRadius="md"
                  onClick={selectSize}
                  id={item.label}
                >
                  {item.label}
                </Button>
              );
            })}
          </SimpleGrid>
          <Flex>
            <Text fontSize="xl" pt="7px">
              จำนวน
            </Text>
            <Spacer />
            <Text>asdasd</Text>
          </Flex>
        </Box>
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
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(2, minmax(30px, 1fr))"
            my="15px"
            fontSize="sm"
          >
            <Link href="">
              <Button w="100%" borderRadius="xl">
                <Text>เพิ่มไปยังรถเข็น</Text>
              </Button>
            </Link>
            <Link href="/order">
              <Button w="100%" bg="red" borderRadius="xl">
                <Text>ซื้อสินค้า</Text>
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

export default product;
