import { Flex, Stack, Text , Center } from "@chakra-ui/react";
import style from "./style.module.css"

export default function NaviTop(props) {
    return (
      <>
        <Stack className={style.bg_color}>
            <Center>
                <Flex alignItems="center"
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    mb={1}>
                    {props.icon}
                </Flex>
            </Center>
            <Center>
                <Text fontSize='xs' alignItems="center" fontWeight={600}>{props.title}</Text>
            </Center>
        </Stack>
      </>
    );
  }
  