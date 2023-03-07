import Header from "./header";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Box
        overflow="auto"
        h="100vh"
        bg={
          pathname == "/address/newaddress" || pathname == "/statusProduct" || pathname == "/chat"
            ? "white"
            : "gray.100"
        }
        maxWidth="65ch"
        marginRight="auto"
        marginLeft="auto"
      >
        <Header />
        <Box
          className="chakra-container"
          mb={
            pathname == "/order" ||
            pathname == "/product" ||
            pathname == "/cartShop"
              ? "98px"
              : "0px"
          }
          bg={
            pathname == "/address/newaddress" || pathname == "/statusProduct"
              ? "white"
              : "gray.100"
          }
          border="-1px"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
