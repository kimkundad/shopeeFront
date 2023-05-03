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
import { useRouter } from "next/router";
import axios from "axios";
function useEditaddress() {
  const router = useRouter();
  const data = router.query;

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postcode, setPostcode] = useState("");

  const [validataTel, setValidateTel] = useState(null);
  const [validateText, setValidateText] = useState(null);
  const [validatePostcode, setValidatePostcode] = useState(null);

  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure([]);

  const [isDefault, setIsDefault] = useState(true);
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
  useEffect(() => {
    if (data?.address_id !== undefined) {
      async function fetchdata() {
        const formdata = new FormData();
        formdata.append("address_id", data?.address_id);
        const res = await axios.post(
          `https://shopee-api.deksilp.com/api/getAddress`,
          formdata
        );
        setName(res.data.address.name);
        setTel(res.data.address.tel);
        setAddress(res.data.address.address);
        setSubDistrict(res.data.address.sub_district);
        setDistrict(res.data.address.district);
        setProvince(res.data.address.province);
        setPostcode(res.data.address.postcode);
      }
      fetchdata();
    }
  }, [data]);
  console.log(name.length);
  async function editAddress() {
    event.preventDefault();

    let check = 0;
    if (
      name == null ||
      address == null ||
      subDistrict == null ||
      district == null ||
      province == null ||
      name.length <= 0||
      address.length <= 0 ||
      subDistrict.length <= 0 ||
      district.length <= 0 ||
      province.length <= 0
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

    let user_id = 1;
    let setdefault = isDefault ? 1 : 0;
    const formdata = new FormData();
    formdata.append("address_id", data?.address_id);
    formdata.append("name", name);
    formdata.append("tel", tel);
    formdata.append("address", address);
    formdata.append("subDistrict", subDistrict);
    formdata.append("district", district);
    formdata.append("province", province);
    formdata.append("postcode", postcode);
    formdata.append("user_id", user_id);
    formdata.append("default", setdefault);

    const res = await axios.post(
      `https://shopee-api.deksilp.com/api/editAddress`,
      formdata
    );
    if (res.data.status == "success") {
      router.push("/address");
    } else {
      onOpenError();
    }
  }
  return (
    <>
      <Head>
        <title>editaddress</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt="25px" bg="white">
        <form onSubmit={editAddress}>
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
              value={name}
            />
            <label>
              <Text color="red">{name.length <= 0 ? validateText : null}</Text>
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
              value={address}
            />
            <label>
              <Text color="red">{address.length <= 0 ? validateText : null}</Text>
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
                  value={subDistrict}
                />
                <label>
                  <Text color="red">
                    {subDistrict.length <= 0 ? validateText : null}
                  </Text>
                </label>
              </Box>
              <Box>
                <label>อำเภอ</label>
                <Input
                  bg="gray.100"
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                />
                <label>
                  <Text color="red">
                    {district.length <= 0 ? validateText : null}
                  </Text>
                </label>
              </Box>
              <Box>
                <label>จังหวัด</label>
                <Input
                  bg="gray.100"
                  onChange={(e) => setProvince(e.target.value)}
                  value={province}
                />
                <label>
                  <Text color="red">
                    {province.length <= 0 ? validateText : null}
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
                onChange={(e) => setIsDefault(!isDefault)}
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
          <ModalHeader alignSelf="center">แก้ไขที่อยู่ไม่สำเร็จ</ModalHeader>
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Text>แก้ไขที่อยู่ไม่สำเร็จ</Text>
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

export default useEditaddress;
