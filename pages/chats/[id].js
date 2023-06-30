import React from "react";
import Link from "next/link";
import Head from "next/head";
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
import ChatBox from "@/components/ChatBox";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import Pusher from "pusher-js";
import { connect, useDispatch, useSelector } from "react-redux";
import { TiLocationArrow } from "react-icons/Ti";

function chats() {
  const router = useRouter();
  const { id: shopId } = router.query;
  let date = "";
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const authen = useSelector((App) => App.authen);
  const userInfo = useSelector((App) => App.userInfo);
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false);

  useEffect(() => {
    if (!hasFetchedMessages && shopId) {
      async function fetchData() {
        const formdata = new FormData();
        formdata.append("user_id", userInfo?.data[0]?.id);
        formdata.append("shop_id", shopId);
        formdata.append("type", "customer");
        const res = await axios.post(
          `https://api.sellpang.com/api/getMessage`,
          formdata
        );
        setMessages(res.data.message);
        setHasFetchedMessages(true);
      }
      fetchData();
    }

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [hasFetchedMessages, shopId]);

  const handleTouch = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  };

  const sendMessage = () => {
    event.preventDefault();
    let room = "1" + "2";
    if (text !== "") {
      async function newMessage() {
        const formdata = new FormData();
        formdata.append("sender_id", userInfo?.data[0]?.id);
        formdata.append("user_id", userInfo?.data[0]?.id);
        formdata.append("shop_id", shopId);
        formdata.append("message", text);
        const res = await axios.post(
          `https://api.sellpang.com/api/sendMessage`,
          formdata
        );
        if (res.data.message) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
        // const newMess = { ...res.data.message[0], type: "message", room };
        // socket.send(JSON.stringify(newMess));
        setText("");
      }
      newMessage();
    }
  };

  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (shopId) {
      const scrollToBottom = () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      };

      if (!renderAfterCalled.current) {
        Pusher.logToConsole = false;

        const pusher = new Pusher("bf877b740f5cd647307e", {
          cluster: "ap1",
        });

        const channel = pusher.subscribe(
          "chat." + userInfo?.data[0]?.id + "." + shopId
        );
        channel.bind(
          "message." + userInfo?.data[0]?.id + "." + shopId,
          function (data) {
            setMessages((prevMessages) => {
              const newArray = [...prevMessages, data];
              return newArray;
            });
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }
        );
      }
      renderAfterCalled.current = true;
      scrollToBottom();
    }
  }, [messages, shopId]);

  return (
    <Box height={`calc(100vh - 90px)`} bg="white">
      <Head>
        <title>order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="15px" bg="white">
        <Box px="5px" bg="white" pt="10px" pb="65px">
          {messages !== null ? (
            messages.map((item, index) => {
              const datatime = moment(item.created_at);
              const dateString = datatime.format("YYYY-MM-DD");
              const timeString = datatime.format("HH:mm");
              if (dateString != date) {
                date = dateString;
                if (item.sender_id == userInfo?.data[0]?.id) {
                  return (
                    <Box key={index}>
                      <Flex pt="15px" justifyContent="center">
                        <Box bg="gray.200" borderRadius="xl">
                          <Text px="10px">{dateString}</Text>
                        </Box>
                      </Flex>
                      <Flex direction="row-reverse" pt="10px">
                        <Box
                          mx="5px"
                          px="10px"
                          py="5px"
                          borderRadius="xl"
                          bg="gray.200"
                          alignSelf="center"
                        >
                          {item.message !== null ? (
                            <Text maxWidth="100px">{item.message}</Text>
                          ) : (
                            false
                          )}
                          {item.img_message !== null ? (
                            <Image
                              src={item.img_message}
                              alt=""
                              maxWidth="100px"
                              py="5px"
                            />
                          ) : (
                            false
                          )}
                        </Box>
                        <Box fontSize="13px" alignSelf="flex-end">
                          {item.status == 1 ? <Text>อ่านแล้ว</Text> : null}
                          <Text>{timeString} น.</Text>
                        </Box>
                      </Flex>
                    </Box>
                  );
                } else {
                  return (
                    <Box key={index}>
                      <Flex pt="10px" justifyContent="center">
                        <Box bg="gray.200" borderRadius="xl">
                          <Text px="10px">{dateString}</Text>
                        </Box>
                      </Flex>
                      <Flex pt="10px">
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
                            src={`https://api.sellpang.com/images/shopee/shop/${item.img_shop}`}
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
                            <Text maxWidth="100px">{item.message}</Text>
                          ) : (
                            false
                          )}
                          {item.img_message !== null ? (
                            <Image
                              src={item.img_message}
                              alt=""
                              maxWidth="100px"
                              py="5px"
                            />
                          ) : (
                            false
                          )}
                        </Box>
                        <Text alignSelf="end" fontSize="13px">
                          {timeString} น.
                        </Text>
                      </Flex>
                    </Box>
                  );
                }
              } else {
                if (item.sender_id == userInfo?.data[0]?.id) {
                  return (
                    <Flex direction="row-reverse" pt="10px" key={index}>
                      <Box
                        mx="5px"
                        px="10px"
                        py="5px"
                        borderRadius="xl"
                        bg="gray.200"
                        alignSelf="center"
                      >
                        {item.message !== null ? (
                          <Text maxWidth="100px">{item.message}</Text>
                        ) : (
                          false
                        )}
                        {item.img_message !== null ? (
                          <Image
                            src={item.img_message}
                            alt=""
                            maxWidth="100px"
                            py="5px"
                          />
                        ) : (
                          false
                        )}
                      </Box>
                      <Box fontSize="13px" alignSelf="flex-end">
                        {item.status == 1 ? <Text>อ่านแล้ว</Text> : null}
                        <Text>{timeString} น.</Text>
                      </Box>
                    </Flex>
                  );
                } else {
                  return (
                    <Flex pt="10px" key={index}>
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
                          src={`https://api.sellpang.com/images/shopee/shop/${item.img_shop}`}
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
                          <Text maxWidth="100px">{item.message}</Text>
                        ) : (
                          false
                        )}
                        {item.img_message !== null ? (
                          <Image
                            src={item.img_message}
                            alt=""
                            maxWidth="100px"
                            py="5px"
                          />
                        ) : (
                          false
                        )}
                      </Box>
                      <Text alignSelf="end" fontSize="13px">
                        {timeString} น.
                      </Text>
                    </Flex>
                  );
                }
              }
            })
          ) : (
            <Box>
              <Text>ยังไม่เริ่มต้นแชท</Text>
            </Box>
          )}
        </Box>
        <form onSubmit={sendMessage}>
          <Box className="test" bottom={0}>
            <Box
              className="test"
              px="15px"
              mt="10px"
              py="8px"
              bg="white"
              pos="fixed"
              bottom={0}
              borderTop="1px solid #efefef"
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
                    onClick={handleTouch}
                  />
                  <InputRightElement>
                    <Image src="/img/emoji.png" alt="" h="25px" />
                  </InputRightElement>
                </InputGroup>
                <Button
                  type="submit"
                  bg="white"
                  padding="0px"
                  w="35px"
                  h="35px"
                >
                  <TiLocationArrow
                    style={{ height: "40px", width: "40px", color: "red" }}
                  />
                </Button>
              </Flex>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default chats;