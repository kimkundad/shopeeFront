import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
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
  IconButton,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Pusher from "pusher-js";
import { TiLocationArrow, TiTimes } from "react-icons/ti";
import { FiImage } from "react-icons/fi";
import { FaSmile } from "react-icons/fa";
import { createObjectURL, revokeObjectURL } from "blob-util";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import EmojiPicker from "emoji-picker-react";

const Chats = () => {
  const router = useRouter();
  const { id: shopId } = router.query;
  let date = "";
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const authen = useSelector((App) => App.authen);
  const userInfo = useSelector((App) => App.userInfo);
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);
  const [lineTextareaMessage, setLineTextareaMessage] = useState(null);
  const [calLineHeight, setCalLineHeight] = useState(null);
  const [heightMessage, setHeightMessage] = useState(38);
  const [imagesChat, setImagesChat] = useState([]);
  const [imagesLightBox, setImagesLightBox] = useState(null);
  const [open, setOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile((selectFiles) => {
      const updatedFiles = [...selectFiles];
      updatedFiles.push(...files);
      return updatedFiles;
    });
    // setSelectedFile(files);

    const filePreviews = files.map((file) => createObjectURL(file));
    setPreviewFile((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.push(...filePreviews);
      return updatedFiles;
    });
    // setPreviewFile(filePreviews);
    // สามารถทำสิ่งอื่น ๆ กับไฟล์ที่เลือกได้ต่อจากนี้
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFile];
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);

    const updatedFiles2 = [...previewFile];
    updatedFiles2.splice(index, 1);
    setPreviewFile(updatedFiles2);
  };

  const handleInputMessage = (e) => {
    const lines = e.target.value.split("\n");
    const lineCount = lines.length;
    setLineTextareaMessage(lineCount);
    if (lineCount > 1) {
      // กรณีเกิน 3 บรรทัด ให้ปรับแก้ความสูงของ textarea ได้ตามต้องการ
      // ตัวอย่างเช่น คำนวณและกำหนด rows ให้สอดคล้องกับข้อความที่มีอยู่
      const lineHeight = 20; // สมมติว่าสูงของแต่ละบรรทัดเท่ากับ 20px
      const rows = Math.min(6, lineCount); // กำหนดจำนวนแถวสูงสุดที่ยอมรับ (เช่น 6 แถว)

      e.target.rows = rows; // ปรับแก้ความสูงของ textarea ให้ตรงกับข้อความที่มีอยู่
      // e.target.style.height = `120px`; // ปรับแก้ความสูงของ textarea ใน CSS
      // e.target.style.height = `${lineHeight * rows}px`; // ปรับแก้ความสูงของ textarea ใน CSS
      setHeightMessage(lineHeight * rows);
      setCalLineHeight(lineHeight * rows);
    } else if (e.target.value == "") {
      e.target.rows = 1; // ปรับแก้ความสูงของ textarea ให้ตรงกับข้อความที่มีอยู่
      // e.target.style.height = `38px`; // ปรับแก้ความสูงของ textarea ใน CSS
      setHeightMessage(38);
    }

    setText(e.target.value);
  };

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
        axios
          .get(
            `https://api.sellpang.com/api/getImagesMessage/${userInfo?.data[0]?.id}/${shopId}`
          )
          .then(function (response) {
            if (response.data.img_chat) {
              setImagesChat(response.data.img_chat);
            }
          });
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
    // if (text !== "") {
    async function newMessage() {
      const formdata = new FormData();
      formdata.append("sender_id", userInfo?.data[0]?.id);
      formdata.append("user_id", userInfo?.data[0]?.id);
      formdata.append("shop_id", shopId);
      formdata.append("message", text);
      selectedFile.forEach((file, index) => {
        formdata.append(`image[${index}]`, file);
      });
      const res = await axios.post(
        `https://api.sellpang.com/api/sendMessage`,
        formdata
      );
      if (res.data.message) {
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
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
      axios
        .get(
          `https://api.sellpang.com/api/getImagesMessage/${userInfo?.data[0]?.id}/${shopId}`
        )
        .then(function (response) {
          if (response.data.img_chat) {
            setImagesChat(response.data.img_chat);
          }
        });
      // const newMess = { ...res.data.message[0], type: "message", room };
      // socket.send(JSON.stringify(newMess));
      setText("");
      setSelectedFile([]);
      setPreviewFile([]);
      setHeightMessage(38);
      setLineTextareaMessage(null);
      setShowEmojiPicker(false);
    }
    newMessage();
    // }
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
            if (data.img_message != null) {
              axios
                .get(
                  `https://api.sellpang.com/api/getImagesMessage/${userInfo?.data[0]?.id}/${shopId}`
                )
                .then(function (response) {
                  if (response.data.img_chat) {
                    setImagesChat(response.data.img_chat);
                  }
                });
            }
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

  const formatDateThai = (dateString, timeString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("th-TH", options);
    const formattedYear = date.toLocaleDateString("th-TH", { year: "numeric" });
    // const yearThai = Number(formattedYear) + 543;

    return `${formattedDate} ${timeString}`;
  };

  const reorderImages = (index) => {
    const selectedImage = imagesChat[index];
    const updatedImages = [
      selectedImage,
      ...imagesChat.filter((_, i) => i !== index),
    ];

    setImagesLightBox(updatedImages);
  };

  return (
    <Box height={`calc(100vh - 90px)`} bg="white">
      <Head>
        <title>Sellpang</title>
        <meta name="description" content="Generated by sellpang" />
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
                        <Box borderRadius="xl">
                          <Text px="10px">
                            {formatDateThai(dateString, timeString)}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex direction="row-reverse" pt="10px">
                        <Box
                          mx="5px"
                          px="10px"
                          py="5px"
                          borderRadius="xl"
                          bg={
                            item.img_message !== null ? "" : "#cd2626"
                          }
                          boxShadow={
                            item.img_message !== null ? "" : "lg"
                          }
                          alignSelf="center"
                        >
                          {item.message !== null ? (
                            <Text maxWidth="100px" fontSize={"20px"} color={'white'}>
                              {item.message}
                            </Text>
                          ) : (
                            false
                          )}
                          {item.img_message !== null ? (
                            <Image
                              src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                              alt=""
                              borderRadius={"15px"}
                              maxWidth="100px"
                              py="5px"
                              _hover={{
                                cursor: "pointer",
                                opacity: "0.8",
                              }}
                              onClick={() => {
                                const selectedIndex = imagesChat.findIndex(
                                  (image) =>
                                    image.img_message === item.img_message
                                );
                                reorderImages(selectedIndex);
                                setOpen(true);
                              }}
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
                        <Box borderRadius="xl">
                          <Text px="10px">
                            {formatDateThai(dateString, timeString)}
                          </Text>
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
                          bg={
                            item.img_message !== null ? "" : "#e4e6eb"
                          }
                          alignSelf="center"
                        >
                          {item.message !== null ? (
                            <Text
                              maxWidth="100px"
                              color={"#050505"}
                              fontSize={"20px"}
                            >
                              {item.message}
                            </Text>
                          ) : (
                            false
                          )}
                          {item.img_message !== null ? (
                            <Image
                              src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                              alt=""
                              borderRadius={"15px"}
                              maxWidth="100px"
                              py="5px"
                              _hover={{
                                cursor: "pointer",
                                opacity: "0.8",
                              }}
                              onClick={() => {
                                const selectedIndex = imagesChat.findIndex(
                                  (image) =>
                                    image.img_message === item.img_message
                                );
                                reorderImages(selectedIndex);
                                setOpen(true);
                              }}
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
                        bg={
                          item.img_message !== null ? "" : "#cd2626"
                        }
                        boxShadow={
                          item.img_message !== null ? "" : "lg"
                        }
                        alignSelf="center"
                      >
                        {item.message !== null ? (
                          <Text maxWidth="100px" fontSize={"20px"} color={'white'}>
                            {item.message}
                          </Text>
                        ) : (
                          false
                        )}
                        {item.img_message !== null ? (
                          <Image
                            src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                            alt=""
                            borderRadius={"15px"}
                            maxWidth="100px"
                            py="5px"
                            _hover={{
                              cursor: "pointer",
                              opacity: "0.8",
                            }}
                            onClick={() => {
                              const selectedIndex = imagesChat.findIndex(
                                (image) =>
                                  image.img_message === item.img_message
                              );
                              reorderImages(selectedIndex);
                              setOpen(true);
                            }}
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
                        bg={
                          item.img_message !== null ? "" : "#e4e6eb"
                        }
                        alignSelf="center"
                      >
                        {item.message !== null ? (
                          <Text
                            maxWidth="100px"
                            color={"#050505"}
                            fontSize={"20px"}
                          >
                            {item.message}
                          </Text>
                        ) : (
                          false
                        )}
                        {item.img_message !== null ? (
                          <Image
                            src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                            alt=""
                            borderRadius={"15px"}
                            maxWidth="100px"
                            py="5px"
                            _hover={{
                              cursor: "pointer",
                              opacity: "0.8",
                            }}
                            onClick={() => {
                              const selectedIndex = imagesChat.findIndex(
                                (image) =>
                                  image.img_message === item.img_message
                              );
                              reorderImages(selectedIndex);
                              setOpen(true);
                            }}
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
          <Lightbox
            plugins={[Zoom, Download]}
            open={open}
            close={() => {
              setOpen(false);
            }}
            carousel={{ finite: true }}
            slides={imagesLightBox?.map((image) => ({
              src: `https://api.sellpang.com/images/shopee/img_message/${image.img_message}`,
            }))}
          />
        </Box>
        {/* {previewFile.length != 0 && (
          <Box
            className="test"
            px="15px"
            pt="15px"
            bg="white"
            mr="8px"
            borderTop="1px solid #efefef"
          >
            <Flex>
              {previewFile.map((prefiles, index) => {
                return (
                  <Box key={index} position="relative" display="inline-block">
                    <Image
                      src={prefiles}
                      position="relative"
                      w={"80px"}
                      h={"80px"}
                      border={"1px solid gray"}
                      borderRadius={"10px"}
                      p={1}
                      mr={"10px"}
                    />
                    <IconButton
                      position="absolute"
                      top="-8px"
                      right="3px"
                      size="xs"
                      fontSize="xl"
                      borderRadius={"20px"}
                      icon={<Icon as={TiTimes} boxSize={6} />}
                      colorScheme="red"
                      onClick={() => handleFileDelete(index)}
                    />
                  </Box>
                );
              })}
            </Flex>
          </Box>
        )} */}

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
              {previewFile.length != 0 && (
                <Flex mb={3}>
                  {previewFile.map((prefiles, index) => {
                    return (
                      <Box
                        key={index}
                        position="relative"
                        display="inline-block"
                      >
                        <Image
                          src={prefiles}
                          position="relative"
                          w={"80px"}
                          h={"80px"}
                          border={"1px solid gray"}
                          borderRadius={"10px"}
                          p={1}
                          mr={"10px"}
                        />
                        <IconButton
                          position="absolute"
                          top="-8px"
                          right="3px"
                          size="xs"
                          fontSize="xl"
                          borderRadius={"20px"}
                          icon={<Icon as={TiTimes} boxSize={6} />}
                          colorScheme="red"
                          onClick={() => handleFileDelete(index)}
                        />
                      </Box>
                    );
                  })}
                </Flex>
              )}
              {showEmojiPicker && (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  marginBottom={3}
                >
                  <EmojiPicker onEmojiClick={addEmoji} searchDisabled/>
                </Flex>
              )}
              <Flex alignItems="center">
                {/* <FiImage /> */}
                <label htmlFor="fileInput" mr="10px">
                  <FiImage
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
                <InputGroup mx="10px">
                  {/* <Input
                    type="text"
                    value={text}
                    placeholder="พิมข้อความ"
                    borderRadius="3xl"
                    onChange={(e) => setText(e.target.value)}
                    onClick={handleTouch}
                  /> */}
                  <Textarea
                    value={text}
                    placeholder="พิมข้อความ"
                    borderRadius="3xl"
                    border="1px solid gray"
                    bgColor="white"
                    resize={"none"}
                    onChange={handleInputMessage}
                    height={`${heightMessage}px`}
                    rows={1}
                    style={{
                      overflow: "hidden",
                      overflowY: "scroll",
                      scrollbarWidth: "none", // สำหรับ Firefox
                      "&::-webkit-scrollbar": {
                        display: "none", // สำหรับ Chrome และ Safari
                      },
                    }}
                  />
                  <InputRightElement
                    onClick={() =>
                      setShowEmojiPicker((prevState) => !prevState)
                    }
                  >
                    <FaSmile size={23} color="red"/>
                  </InputRightElement>
                </InputGroup>
                <Button
                  type="submit"
                  bg="white"
                  padding="0px"
                  w="35px"
                  h="35px"
                  onClick={sendMessage}
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
};

export default Chats;
