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
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import Pusher from "pusher-js";
import { connect, useDispatch, useSelector } from "react-redux";

export default function Layout(props) {
  let date = "";
  // console.log('props', props?.shopId);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const authen = useSelector((App) => App.authen);
  const userInfo = useSelector((App) => App.userInfo);
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false);

  // const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   const newSocket = new WebSocket("ws://192.168.0.86:3004/");
  //   setSocket(newSocket);
  //   newSocket.addEventListener("open", () => {
  //     console.log("WebSocket connection established");
  //   });
  //   newSocket.addEventListener("message", (event) => {
  //     const message = JSON.parse(event.data);
  //     setMessages((messages) => {
  //       const messageIds = messages.map((m) => m.id);
  //       if (!messageIds.includes(message.id)) {
  //         return [...messages, message];
  //       }
  //       return messages;
  //     });
  //   });
  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  useEffect(() => {
    if (!hasFetchedMessages) {
      async function fetchData() {
        const formdata = new FormData();
        formdata.append("user_id", userInfo?.data[0]?.id);
        formdata.append("shop_id", props?.shopId);
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
  }, [hasFetchedMessages]);

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
        formdata.append("shop_id", props?.shopId);
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

  // useEffect(() => {
  //   let user_id = 1;
  //   let shop_id = 1;
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher("bf877b740f5cd647307e", {
  //     cluster: "ap1",
  //   });

  //   const channel = pusher.subscribe("chat");
  //   channel.bind("message", function (data) {
  //     setMessages((prevMessages) => {
  //       const newArray = [...prevMessages, data];
  //       return newArray;
  //     });
  //   });
  // }, []);
  const renderAfterCalled = useRef(false);

  useEffect(() => {
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
        "chat." + userInfo?.data[0]?.id + "." + props?.shopId
      );
      channel.bind("message", function (data) {
        setMessages((prevMessages) => {
          const newArray = [...prevMessages, data];
          return newArray;
        });
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    renderAfterCalled.current = true;
    scrollToBottom();
  }, [messages]);
  return (
    <>
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
              >ส่ง</Button>
            </Flex>
          </Box>
        </Box>
      </form>
    </>
  );
}
