import { useAppSelector } from "../../redux/app/store";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { Message } from "../../redux/app/services/authApi";
import "../general.css"
import "./messagesForm.css"
import { SingleMessage } from "./SingleMessage";
import { EditMessage } from "./EditMessage";
import { DeleteMessage } from "./DeleteMessage";
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
    Container,
} from '@chakra-ui/react'

interface MessageProps {
    messagesList: any
    refetch: () => any
}

export const Messages = ({ messagesList, refetch }: MessageProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);


    return (
        <Box width={'80%'}>
            <Card
                display={'flex'}
                flexDirection={'row'}
                overflow='scroll'
                variant='outline'
                margin={'1%'}
                maxWidth={'100%'}
                minWidth={'20%'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Image
                    objectFit={'cover'}
                    maxW={{ base: '100%', sm: '200px' }}
                    src={'https://i.imgur.com/KCVm8DV.jpg'}
                    alt='Photo Not Found!'
                    borderRadius={'lg'}
                />
                <Stack divider={<StackDivider />} spacing='4'>
                    <CardBody
                        alignItems={'center'}
                    >
                        <Heading>Hello everyone!</Heading>
                        <Text>Welcome to the Funboard! Click Create Message to make a message. Click Logon/Register in the Top Bar to Login or Register! Please be civil and kind to your fellow community members.</Text>
                    </CardBody>
                </Stack>
            </Card>
            {messagesList?.map((message: Message, index: number) => {
                return (
                    <Card
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        variant='outline'
                        margin={'1%'}
                        maxWidth={'100%'}
                        key={message.id}
                    >
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Image
                                objectFit={'cover'}
                                maxW={{ base: '100%', sm: '200px' }}
                                src={`${window.location.href}${message?.photo}`}
                                alt='Photo Not Found!'
                                borderRadius={'lg'}
                            />
                        </Stack>

                        <Stack
                            divider={<StackDivider />}
                            spacing='1'
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            maxHeight={'2xs'}
                        >
                            <Heading>{message.title}</Heading>
                            <Container overflowY={'scroll'} maxWidth={'200%'} border={'1px'} borderRadius={'5%'}>
                                <CardBody>
                                    <Text>{message.message}</Text>
                                </CardBody>
                            </Container>
                            {sessionUser?.id === message.userId || sessionUser?.username === "noah" ?
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <EditMessage title={message.title} message={message.message} id={message.id} sessionUser={sessionUser} refetch={refetch} />
                                    <DeleteMessage id={message.id} refetch={refetch} sessionUser={sessionUser} />
                                </Box> : <></>}
                        </Stack>

                        <CardFooter>
                            <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                        </CardFooter>
                    </Card>
                )
            })}
        </Box >
    )
}