import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Text,
  SimpleGrid,
  Input,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
function useNewaddress() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [postcode, setPostcode] = useState("");
  const userInfo = useSelector((App) => App.userInfo);

  const [validataTel, setValidateTel] = useState(null);
  const [validateText, setValidateText] = useState(null);
  const [validatePostcode, setValidatePostcode] = useState(null);

  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure([]);

  const [isDefault, setIsDefault] = useState(true);
  const [checkDefault,setCheckDefault] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let user_id = userInfo.data[0].id;
      const formdataAddress = new FormData();
      formdataAddress.append("user_id", user_id);
      const dataAddress = await axios.post(
        `https://api.sellpang.com/api/getAddress`,
        formdataAddress
      );
      setCheckDefault(dataAddress.data.address);
    }

    fetchData();
  }, [isDefault]);

  const handleTelChange = (e) => {
    const input = e.target.value.toString();
    if (input.length <= e.target.maxLength) {
      if (e.target.maxLength == 10) {
        setTel(input);
      } else {
        setPostcode(input);
      }
    }
  };
  const handleKeyPress = (e) => {
    const keyCode = e.which ? e.which : e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault();
    }
  };
  async function newAddress() {
    event.preventDefault();

    let check = 0;
    if (
      name == null ||
      address == null ||
      subDistrict == null ||
      district == null ||
      province == null
    ) {
      check++;
      setValidateText("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      setValidateText(null);
    }
    if (tel == "" || tel?.length < 10) {
      check++;
      setValidateTel("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
    } else {
      setValidateTel(null);
    }

    if (postcode == "" || postcode?.length < 5) {
      check++;
      console.log("s");
      setValidatePostcode("กรุณากรอกรหัสไปษณีย์ให้ถูกต้อง");
    } else {
      setValidatePostcode(null);
    }

    if (check !== 0) {
      return;
    }
    let user_id = userInfo.data[0].id;
    let setdefault = isDefault ? 1 : 0;
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("tel", tel.toString());
    formdata.append("address", address);
    formdata.append("subDistrict", subDistrict);
    formdata.append("district", district);
    formdata.append("province", province);
    formdata.append("postcode", postcode);
    formdata.append("user_id", user_id);
    formdata.append("default", setdefault);

    const res = await axios.post(
      `https://api.sellpang.com/api/newAddress`,
      formdata
    );
    if (res.data.status == "success") {
      router.back();
    } else {
      onOpenError();
    }
  }

  return (
    <>
      <Head>
        <title>newaddress</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="25px" bg="white">
        <form onSubmit={newAddress}>
          <Box
            m="15px"
            px="20px"
            borderBottom="2px"
            mb="0px"
            pb="15px"
            borderBottomColor="gray.100"
          >
            <label>ชื่อ - นามสกุล</label>
            <Input
              bg="gray.100"
              border="0px"
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              <Text color="red">{name == null ? validateText : null}</Text>
            </label>
            <label>เบอร์โทรศศัพท์</label>
            <Input
              bg="gray.100"
              border="0px"
              type="tel"
              value={tel}
              maxLength={10}
              onChange={handleTelChange}
              onKeyPress={handleKeyPress}
            />
            <label>
              <Text color="red">
                {tel == ""
                  ? validataTel
                  : tel?.length < 10
                  ? validataTel
                  : null}
              </Text>
            </label>

            <label>ที่อยู่</label>
            <Input
              bg="gray.100"
              border="0px"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>
              <Text color="red">{address == null ? validateText : null}</Text>
            </label>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(2, minmax(100px, 1fr))"
            >
              <Box>
                <label>ตำบล</label>
                <Input
                  bg="gray.100"
                  onChange={(e) => setSubDistrict(e.target.value)}
                />
                <label>
                  <Text color="red">
                    {subDistrict == null ? validateText : null}
                  </Text>
                </label>
              </Box>
              <Box>
                <label>อำเภอ</label>
                <Input
                  bg="gray.100"
                  onChange={(e) => setDistrict(e.target.value)}
                />
                <label>
                  <Text color="red">
                    {district == null ? validateText : null}
                  </Text>
                </label>
              </Box>
              <Box>
                <label>จังหวัด</label>
                <Input
                  bg="gray.100"
                  onChange={(e) => setProvince(e.target.value)}
                />
                <label>
                  <Text color="red">
                    {province == null ? validateText : null}
                  </Text>
                </label>
              </Box>
              <Box>
                <label>รหัสไปรษณีย์</label>
                <Input
                  bg="gray.100"
                  type="number"
                  maxLength={5}
                  value={postcode}
                  onChange={handleTelChange}
                  onKeyPress={handleKeyPress}
                />
                <label>
                  <Text color="red">
                    {postcode == ""
                      ? validatePostcode
                      : postcode.length < 5
                      ? validatePostcode
                      : null}
                  </Text>
                </label>
              </Box>
            </SimpleGrid>
            <Box display="flex" pt="20px">
              <Switch
                id="email-alerts"
                isChecked={isDefault}
                onChange={(e) => checkDefault !== null ? setIsDefault(!isDefault):false}
              />
              <label htmlFor="email-alerts" mb="0" pl="10px">
                ตั้งเป็นที่อยู่เริ่มต้นสำหรับการจัดส่ง
              </label>
            </Box>
          </Box>
          <Box bg="white" py="15px" display="flex" justifyContent="center">
            <Button bg="red" type="submit">
              <Text>ยืนยัน</Text>
            </Button>
          </Box>
        </form>
      </Box>
      <Modal onClose={onCloseError} size="xs" isOpen={isOpenError}>
        <ModalOverlay />
        <ModalContent alignSelf="center">
          <ModalHeader alignSelf="center">เพิ่มที่อยู่ไม่สำเร็จ</ModalHeader>
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Text>เพิ่มข้อมูลที่อยู่ไม่สำเร็จ</Text>
            </Box>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <Link href="/address">
              <Button w="100%" bg="red" borderRadius="xl">
                <Text color="white">ไปยังหน้าโปรไฟล์</Text>
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default useNewaddress;
