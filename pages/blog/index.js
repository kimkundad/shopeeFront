
import {
    Box, Heading,
    Avatar,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Grid,
    GridItem,
    SimpleGrid,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Card
} from "@chakra-ui/react";
import Link from 'next/link'
import Head from 'next/head'


function Blog({ users }) {
    return (
        <>
            <Head>
                <title>Sellpang</title>
                <meta name="description" content="Generated by sellpang" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box pt="35px">
                <Text fontSize='xl'>ดึงข้อมูล getServerSideProps</Text>
                <Card p="10px">
                    <TableContainer>
                        <Table variant='simple'>
                            <Tbody>
                                {users.map((post) => (
                                    // <li key={post.id}>{post.name}</li>
                                    <Tr key={post.id}>
                                        <Td isNumeric>
                                            <Link href={'/blog/'+post.id}>
                                                Go
                                            </Link>
                                        </Td>
                                        <Td>{post.title}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card >
            </Box>
        </>
    )
}

export async function getServerSideProps() {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
    const users = await res.json()

    return { props: { users } }

}

export default Blog