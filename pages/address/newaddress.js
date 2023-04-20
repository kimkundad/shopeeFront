import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  SimpleGrid,
  Input,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
function newaddress() {

  const [name,setName] = useState(null);
  const [tel,setTel] = useState(null);
  const [address,setAddress] = useState(null);
  const [subDistrict,setSubDistrict] = useState(null);
  const [district,setDistrict] = useState(null);
  const [province,setProvince] = useState(null);
  const [postcode,setPostcode] = useState(null);

  async function newAddress() {
    event.preventDefault();
    let user_id = 1;
    const formdata = new FormData();
    formdata.append("name",name);
    formdata.append("tel",tel);
    formdata.append("address",address);
    formdata.append("subDistrict",subDistrict);
    formdata.append("district",district);
    formdata.append("province",province);
    formdata.append("postcode",postcode);
    formdata.append("user_id",user_id)
    
    const res = await axios.post(
      `https://shopee-api.deksilp.com/api/newAddress`,formdata
    )
    console.log('s');
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
            <Input bg="gray.100" border="0px" onChange={(e) => setName(e.target.value)} isRequired/>
            <label>เบอร์โทรศศัพท์</label>
            <Input bg="gray.100" border="0px" onChange={(e) => setTel(e.target.value)} isRequired/>
            <label>ที่อยู่</label>
            <Input bg="gray.100" border="0px" onChange={(e) => setAddress(e.target.value)} isRequired/>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(2, minmax(100px, 1fr))"
            >
              <Box>
                <label>ตำบล</label>
                <Input bg="gray.100" onChange={(e) => setSubDistrict(e.target.value)} isRequired/>
              </Box>
              <Box>
                <label>อำเภอ</label>
                <Input bg="gray.100" onChange={(e) => setDistrict(e.target.value)} isRequired/>
              </Box>
              <Box>
                <label>จังหวัด</label>
                <Input bg="gray.100" onChange={(e) => setProvince(e.target.value)} isRequired/>
              </Box>
              <Box>
                <label>รหัสไปรษณีย์</label>
                <Input bg="gray.100" onChange={(e) => setPostcode(e.target.value)} isRequired/>
              </Box>
            </SimpleGrid>
            <Box display="flex" pt="20px">
              <Switch id="email-alerts" isChecked={true}/>
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
    </>
  );
}

export default newaddress;
