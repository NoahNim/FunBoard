import { Comments } from "./Comments/Comments";
import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Box,
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
            marginTop={'1%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Card
                display={'flex'}
                flexDirection={'column'}
                overflow='scroll'
                variant='outline'
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
                width={'100%'}
            >

                <Image
                    objectFit={'cover'}
                    maxW={{ base: '50%', sm: '300px', lg: "350px" }}
                    maxH={'100%'}
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
                    height={'40%'}
                    width={'95%'}
                    overflowY={'scroll'}
                    margin={'1%'}
                >
                    <Heading>
                        {title}
                    </Heading>
                    <Box
                        overflowY={'scroll'}
                        border={'1px'}
                        borderRadius={'5%'}
                    >
                        <CardBody height={'100%'}>
                            {message}
                        </CardBody>
                    </Box>
                </Stack>
                <Stack
                    divider={<StackDivider />}
                    spacing='1'
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    height={'2xs'}
                    width={'100%'}
                >
                    <Box width={'100%'}>
                        <CardFooter width={'100%'}>
                            <Comments messageId={id} />
                        </CardFooter>
                    </Box>

                </Stack>
            </Card>
        </Box>
    )
}