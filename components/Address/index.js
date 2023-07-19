import { Box, Checkbox, Text, Flex, Spacer, Link,Button } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";

export default function useAddress(props) {
  const userInfo = useSelector((App) => App.userInfo);
  const router = useRouter();
  const [address,setAddress] = useState([]);
  useEffect(() => {
    setAddress(props.data)
  },[props])
  async function updateDefaultAddress (id) {
    let user_id = userInfo.data[0].id
    const formdata = new FormData()
    formdata.append("id",id);
    formdata.append("user_id",user_id);
    const res = await axios.post(
      `https://api.sellpang.com/api/setDefaultAddress`,formdata
    )
    const newAddress = res.data.address
    console.log('newAddress', newAddress);
    setAddress(newAddress);
  }

  async function deleteAddress(id){
    let user_id = userInfo.data[0].id
    const formdata = new FormData();
    formdata.append("user_id",user_id)
    formdata.append("address_id",id);
    const res = await axios.post(
      `https://api.sellpang.com/api/deleteAddress`,formdata
    )
    const newAddress = res.data.address
    setAddress(newAddress);
  }
  
  function editAddress(id){
    router.push({
      pathname: "/address/editaddress",
      query: { address_id: id}
    })
  }
  return (
    <>
      {/* checkbox address */}
      {address?.map((item, index) => {
        return (
          <Box my="10px" mx="10px" borderBottom="1px" key={index}>
            <Checkbox
              w="100%"
              colorScheme="red"
              sx={{
                "& .chakra-checkbox__control": {
                  borderRadius: "50% !important",
                  alignSelf: "flex-start",
                  marginTop: "3px",
                },
                "& svg": {
                  stroke: "none !important",
                },
                ".chakra-checkbox__label": {
                  width: "100%",
                }
              }}
              isChecked={item.default == 1 ? true : false}
              onChange={(e) => updateDefaultAddress(item.id)}
            >
              <Flex>
                <Text>{item.name}</Text>
                <Text pl="5px">({item.tel})</Text>
                <Spacer />
                  <Button
                    borderRadius="xl"
                    bg="red"
                    border="2px"
                    borderColor="red"
                    width="50px"
                    h="20px"
                    textAlign="center"
                    color="white"
                    alignItems="stretch"
                    fontWeight="light"
                    onClick={(e) => editAddress(item.id)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    ml="10px"
                    borderRadius="xl"
                    border="2px"
                    borderColor="red"
                    width="50px"
                    h="20px"
                    textAlign="center"
                    alignItems="stretch"
                    fontWeight="light"
                    onClick={(e) => deleteAddress(item.id)}
                  >
                    ลบ
                  </Button>
              </Flex>
              <Text>
                {item.address} อำเภอ{item.district} ตำบล{item.sub_district}{" "}
                จังหวัด{item.province} {item.postcode}
              </Text>
            </Checkbox>
          </Box>
        );
      })}
      {address.length ==0 ? <Box m="50px" textAlign="center" fontWeight="bold">ไม่พบที่อยู่</Box>:null}
    </>
  );
}
