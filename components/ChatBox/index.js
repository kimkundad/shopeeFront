import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const message = [
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "19 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "19 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "19 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "19 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "20 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "20 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "20 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "20 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      image: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "สวัสดี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "มีไรให้ช่วยไหม?",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: "ไม่มี",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
    {
      sendername: "me",
      recivename: "solu",
      message: null,
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
      imagemessage: "/img/หมาโง่.jpg",
    },
    {
      sendername: "solu",
      recivename: "me",
      message: "โอเคครับ",
      status: "1",
      date: "21 มกราคม 2566",
      time: "10.52",
      avatar: "/img/หมาโง่.jpg",
    },
  ];
  let date = "";

  const [text,setText] = useState("");
  /* const [message,setMessage] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const formdata = new FormData();
      let user_id = 1;
      let shop_id = 2;
      formdata.append("user_id", user_id);
      formdata.append("shop_id", shop_id);
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/getMessage`,
        formdata
      );
      setMessage(res.data.message)
    }

    fetchData();
  }, []);

  
  const sendMessage = () => {
    async function sendMessage() {
      const formdata = new FormData();
      let user_id = 1;
      let shop_id = 2;
      formdata.append("user_id",user_id);
      formdata.append("shop_id",shop_id);
      formdata.append("message",text);
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/sendMessage`,
        formdata
      )
      setMessage(res.data.message)
    }

    sendMessage();
  }
 */
  return (
    <>
      <Box px="5px" bg="white" pt="10px" pb="60px">
        {message.map((item, index) => {
          if (item.date != date) {
            date = item.date;
            if (item.sendername == "me") {
              return (
                <Box key={index}>
                  <Flex pt="15px" justifyContent="center">
                    <Box bg="gray.200" borderRadius="xl">
                      <Text px="10px">{item.date}</Text>
                    </Box>
                  </Flex>
                  <Flex direction="row-reverse" py="10px">
                    <Box
                      mx="5px"
                      px="10px"
                      py="5px"
                      borderRadius="xl"
                      bg="gray.200"
                      alignSelf="center"
                    >
                      {item.message !== null ? (
                        <Text maxWidth="150px">{item.message}</Text>
                      ) : (
                        false
                      )}
                      {item.imagemessage !== undefined ? (
                        <Image
                          src={item.imagemessage}
                          alt=""
                          maxWidth="150px"
                          py="5px"
                        />
                      ) : (
                        false
                      )}
                    </Box>
                    <Box fontSize="10px" alignSelf="flex-end">
                      {item.status == 1 ? <Text>อ่านแล้ว</Text> : null}
                      <Text>{item.time} น.</Text>
                    </Box>
                  </Flex>
                </Box>
              );
            } else {
              return (
                <Box key={index}>
                  <Flex pt="10px" justifyContent="center">
                    <Box bg="gray.200" borderRadius="xl">
                      <Text px="10px">{item.date}</Text>
                    </Box>
                  </Flex>
                  <Flex pb="10px">
                    <Box
                      bg="white"
                      borderRadius="50%"
                      w="35px !important"
                      h="35px !important"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      ml="2"
                    >
                      <Image
                        borderRadius="50%"
                        src={item.avatar}
                        alt=""
                        h="35px !important"
                        w="35px !important"
                      />
                    </Box>
                    <Box
                      mx="5px"
                      px="10px"
                      py="5px"
                      borderRadius="xl"
                      bg="gray.200"
                      alignSelf="center"
                    >
                      {item.message !== null ? (
                        <Text maxWidth="150px">{item.message}</Text>
                      ) : (
                        false
                      )}
                      {item.imagemessage !== undefined ? (
                        <Image
                          src={item.imagemessage}
                          alt=""
                          maxWidth="150px"
                          py="5px"
                        />
                      ) : (
                        false
                      )}
                    </Box>
                    <Text alignSelf="end" fontSize="10px">
                      {item.time} น.
                    </Text>
                  </Flex>
                </Box>
              );
            }
          } else {
            if (item.sendername == "me") {
              return (
                <Flex direction="row-reverse" py="10px" key={index}>
                  <Box
                    mx="5px"
                    px="10px"
                    py="5px"
                    borderRadius="xl"
                    bg="gray.200"
                    alignSelf="center"
                  >
                    {item.message !== null ? (
                      <Text maxWidth="150px">{item.message}</Text>
                    ) : (
                      false
                    )}
                    {item.imagemessage !== undefined ? (
                      <Image
                        src={item.imagemessage}
                        alt=""
                        maxWidth="150px"
                        py="5px"
                      />
                    ) : (
                      false
                    )}
                  </Box>
                  <Box fontSize="10px" alignSelf="flex-end">
                    {item.status == 1 ? <Text>อ่านแล้ว</Text> : null}
                    <Text>{item.time} น.</Text>
                  </Box>
                </Flex>
              );
            } else {
              return (
                <Flex pb="10px" key={index}>
                  <Box
                    bg="white"
                    borderRadius="50%"
                    w="35px !important"
                    h="35px !important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml="2"
                  >
                    <Image
                      borderRadius="50%"
                      src={item.avatar}
                      alt=""
                      h="35px !important"
                      w="35px !important"
                    />
                  </Box>
                  <Box
                    mx="5px"
                    px="10px"
                    py="5px"
                    borderRadius="xl"
                    bg="gray.200"
                    alignSelf="center"
                  >
                    {item.message !== null ? (
                      <Text maxWidth="150px">{item.message}</Text>
                    ) : (
                      false
                    )}
                    {item.imagemessage !== undefined ? (
                      <Image
                        src={item.imagemessage}
                        alt=""
                        maxWidth="150px"
                        py="5px"
                      />
                    ) : (
                      false
                    )}
                  </Box>
                  <Text alignSelf="end" fontSize="10px">
                    {item.time} น.
                  </Text>
                </Flex>
              );
            }
          }
        })}
      </Box>
      <form /* onSubmit={sendMessage} */>
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
            <Flex alignItems="center">
              <Image src="/img/plus.png" h="25px" w="25px" />
              <InputGroup mx="10px">
                <Input
                  type="text"
                  value={text}
                  placeholder="พิมข้อความ"
                  borderRadius="3xl"
                  onChange={(e) => setText(e.target.value)}
                />
                <InputRightElement>
                  <Image src="/img/emoji.png" alt="" h="25px" />
                </InputRightElement>
              </InputGroup>
              <Button type="submit">
                send
              </Button>
            </Flex>
          </Box>
        </Box>
      </form>
    </>
  );
}
