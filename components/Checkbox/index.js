import { Box, Checkbox, Text, Flex, Spacer, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function checkbox(props) {

  return (
    <>
      {/* checkbox address */}
      {props.data.map((item, index) => {
        return (
          <>
            <Box my="10px" mx="10px" borderBottom="1px" key={index}>
              <Checkbox
                colorScheme="red"
                sx={{
                  "& .chakra-checkbox__control": {
                    borderRadius: "50% !important",
                  },
                  "& svg": {
                    stroke: "none !important",
                  },
                }}
              >
                <Flex>
                  <Box>
                    <Flex>
                      <Text>{item.name}</Text>
                      <Text pl="5px">({item.tel})</Text>
                      <Spacer />
                      <Link href="/address/editaddress">
                        <Box borderRadius="xl" bg="red" border="2px" borderColor="red" width="50px" textAlign="center">
                          <Text color="white">แก้ไข</Text>
                        </Box>
                      </Link>
                      <Link href="/">
                        <Box ml="10px" borderRadius="xl" border="2px" borderColor="red" width="50px" textAlign="center">
                          <Text>ลบ</Text>
                        </Box>
                      </Link>
                    </Flex>
                    <Text>{item.address}</Text>
                  </Box>
                </Flex>
              </Checkbox>
            </Box>
          </>
        );
      })}
    </>
  );
}
