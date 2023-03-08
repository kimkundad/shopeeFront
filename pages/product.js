import {useState} from "react";
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
import Link from "next/link";
function product() {
  const colorProduct = [
    { label: "pink" },
    { label: "blue" },
    { label: "yellow" },
    { label: "orange" },
  ];
  const size = [
    {label: "38"},
    {label: "39"},
    {label: "40"},
    {label: "41"},
    {label: "42"},
    {label: "43"},
    {label: "44"},
  ]
  const [colorId, setColorId] = useState("");
  function selectColor(event) {
    setColorId(event.target.id);
  }

  const [sizeId, setSizeId] = useState("");
  function selectSize(event) {
    setSizeId(event.target.id);
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
      </Box>
      <Box px="15px" mt="10px" bg="white" pb="10px">
        <Box>
          <Text fontSize="xl" mt="7px">
            สี
          </Text>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(4, minmax(30px, 1fr))"
            my="15px"
            fontSize="sm"
            
          >
            {colorProduct.map((item, index) => {
              return colorId === item.label ? (
                // eslint-disable-next-line react/jsx-key
                <Button
                  w="100%"
                  onClick={selectColor}
                  boxShadow="outline"
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button w="100%" onClick={selectColor} id={item.label}>
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
            templateColumns="repeat(4, minmax(30px, 1fr))"
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
                  w="100%"
                  onClick={selectSize}
                  boxShadow="outline"
                  id={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <Button w="100%" onClick={selectSize} id={item.label}>
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
            <Link href="" justifySelf="center">
              <Button w="100%" borderRadius="xl">
                <Text>เพิ่มไปยังรถเข็น</Text>
              </Button>
            </Link>
            <Link href="/order" justifySelf="center">
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
