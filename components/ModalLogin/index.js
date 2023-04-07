import React, { Fragment, useEffect, useState, useRef } from 'react'
import { connect, useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Center,
    useDisclosure,
    Box,
    Text,
    Image,
    Input,
    Flex,
    Spacer,
    Button,
    FormControl,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    HStack,
    Stack,
    useColorModeValue,
    Link ,
    InputRightElement,
  } from "@chakra-ui/react";
  import NextLink from 'next/link'
  import user from "@/public/img/icon/user copy.png";
  import cart from "@/public/img/icon/cart.png";
  import { getUserAuthen } from '@/store/slices/authen'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

  export default function ModalLogin(props) {

    const authen = useSelector(App => App.authen)
    const router = useRouter()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);  
    
    const [checkauth, setCheckauth] = useState(authen?.isAuthenticate); 

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            phone,
            password,
          }
   
          dispatch(getUserAuthen(user))
          console.log('--->', user)

          onCloseForm2() 
    }



    const {
        isOpen: isOpenForm1,
        onOpen: onOpenForm1,
        onClose: onCloseForm1,
      } = useDisclosure();
      const {
        isOpen: isOpenForm2,
        onOpen: onOpenForm2,
        onClose: onCloseForm2,
      } = useDisclosure();
    const handleClick = () => {
        onCloseForm1();
        onCloseForm2();
      };

      const loginClick = () => {
        onCloseForm1();
        onOpenForm2();
      };

    return (
        <>
        {authen?.isAuthenticate === true ?
         (
            <>
            {props?.type === 'avatar' &&
            <Link as={NextLink} href="/profile">
            <Box
              bg="white"
              borderRadius="50%"
              w="7"
              h="7"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr="2"
              order="1px"
              borderColor="gray.300"
              ids={props.type}
            >
              <Image src={user.src} alt="" h="7" />
            </Box>
            </Link>
            }
            {props?.type === 'card' &&
            <Link as={NextLink} href="/cartShop">
            <Box
                  bg="white"
                  borderRadius="50%"
                  w="7"
                  h="7"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr="5"
                  border="1px"
                  borderColor="gray.300"
                >
                  <Image src={cart.src} alt="" h="4" />
                </Box>
            </Link>
            }
            </>
        ):(
            <>
            {props?.type === 'avatar' &&
            <Box onClick={onOpenForm1}
                  bg="white"
                  borderRadius="50%"
                  w="7"
                  h="7"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr="2"
                  order="1px"
                  borderColor="gray.300"
                  ids={props.type}
                >
                  <Image src={user.src} alt="" h="7" />
            </Box>
            }
            {props?.type === 'card' &&
                <Box onClick={onOpenForm1}
                bg="white"
                borderRadius="50%"
                w="7"
                h="7"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr="5"
                border="1px"
                borderColor="gray.300"
            >
                <Image src={cart.src} alt="" h="4" />
            </Box>
            }
            </>
        )
        }
                


        <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/img/cancel.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => handleClick()}
            />
          </ModalHeader>
          <ModalBody>
            <Box px="5px">
              <Text
                bg="red"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                color="white"
                fontWeight="bold"
                onClick={() => loginClick()}
              >
                ลงชื่อเข้าใช้ด้วยโทรศัพท์
              </Text>
              <Text color="gray.400" textAlign="center">
                ระบบจะจดจำที่อยู่ในการส่งสินค้าเมื่อใช้งานในครั้งต่อไป
              </Text>
              <Text
                mt="15px"
                bg="gray.100"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                fontWeight="bold"
                onClick={() => handleClick()}
              >
                สั่งตอนนี้
              </Text>
              <Text color="gray.400" textAlign="center">
                ต้องกรอกที่อยู่ในการจัดส่งทุกครั้งที่เข้้าใช้งานใหม่
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm2} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/img/cancel.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => handleClick()}
            />
          </ModalHeader>
          <ModalBody>
            <Box px="5px">
              <FormControl>
                <Text fontSize="24px" fontWeight="bold">
                  กรอกเบอร์โทรศัพท์
                </Text>
                <Input bg="gray.100" type="number" name="phone" onChange={onChangePhone}/>
                <Flex mt="15px">
                  <Text fontSize="24px" fontWeight="bold">
                   รหัสผ่าน
                  </Text>
                </Flex>

                <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={onChangePassword} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              </FormControl>

              <Box textAlign="center">
                <Button mt="15px" bg="red" color="white" onClick={handleSubmit}>
                  เข้าสู่ระบบ
                </Button>
              </Box>
              <Stack pt={6}>
              <Text align={'center'} fontSize="20px" >
                หากคุณยังไม่มีบัญชี? <Link as={NextLink} fontSize="22px" href="#" color={'blue.400'}>สมัครใช้งาน</Link>
              </Text>
            </Stack>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
        </>
    );

  }