import React, { useCallback } from "react";

import {
  Box,
  SimpleGrid,
  Grid,
  Text,
  GridItem,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Footer() {
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);
  if (pathname == "/product") {
    return (
      <>
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
  } else if (pathname == "/order") {
    return (
      <>
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
                <Link href="/payment/paymentQRcode" justifySelf="center">
                  <Button w="100%" bg="red" borderRadius="xl">
                    <Text>สั่งสินค้า</Text>
                  </Button>
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </>
    );
  } 
}
