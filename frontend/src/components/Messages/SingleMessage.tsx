import { Comments } from "./Comments/Comments";
import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Box,
    Text,
    Heading,
    StackDivider,
    Image,
} from "@chakra-ui/react";


interface SingleMessageProps {
    title: string;
    message: string;
    photo: Blob;
    id: number;
    index: number;
}

export const SingleMessage = ({ title, message, photo, id, index }: SingleMessageProps) => {
    return (
        <Box
            width={'100%'}
            height={'100%'}
        >
            <Card
                display={'flex'}
                flexDirection={'column'}
                overflow='scroll'
                variant='outline'
                margin={'1%'}
                justifyContent={'center'}
                alignItems={'center'}
            >

                <Image
                    width={{ base: '100%', sm: '200px' }}
                    src={`${window.location.href}${photo}`}
                    alt='Photo Not Found!'
                    borderRadius={'lg'}
                />
                <Stack
                    divider={<StackDivider />}
                    spacing='1'
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    height={'2xs'}
                    width={'100%'}
                    margin={'0'}
                >
                    <Heading>
                        {title}
                    </Heading>
                    <Box
                        overflowY={'scroll'}
                        width={{ base: '100%', md: '100%', lg: '100%' }}
                        height={'100%'}
                        border={'1px'}
                        borderRadius={'5%'}
                    >
                        <CardBody>
                            <Text>{message}</Text>
                        </CardBody>
                    </Box>
                </Stack>
                <CardFooter width={'100%'}>
                    <Comments messageId={id} />
                </CardFooter>
            </Card>
        </Box>
    )
}