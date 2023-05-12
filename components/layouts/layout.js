import Header from "./header";
import React,{ useContext, useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const [scrollPosition, setScrollPosition] = useState(0);
  return (
      <Box
        /* overflow={pathname == "/[id]"? "auto":"none"}
        h={pathname == "/[id]"? "100vh":""} */
        bg={
          pathname == "/address/newaddress" ||
          pathname == "/chat"
            ? "white"
            : "gray.100"
        }
        maxWidth="65ch"
        marginRight="auto"
        marginLeft="auto"
        onScroll={(e) => setScrollPosition(parseInt(e.target.scrollTop))}
      >
        <Header data={scrollPosition}/>
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
            pathname == "/address/newaddress"
              ? "white"
              : "gray.100"
          }
          border="-1px"
        >
          {children && React.cloneElement(children, { data: scrollPosition })}
        </Box>
      </Box>
  );
}
