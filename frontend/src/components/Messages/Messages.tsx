import { useAppSelector } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { Message } from "../../redux/app/services/authApi";
import "../general.css"
import "./messagesForm.css"
import { SingleMessage } from "./SingleMessage";
import { EditMessage } from "./EditMessage";
import { DeleteMessage } from "./DeleteMessage";
import {
    Card, CardHeader,
    CardBody,
    CardFooter,
    Stack,
    Box,
    Text,
    Heading,
    StackDivider,
    Image
} from '@chakra-ui/react'

export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: messagesObj, refetch } = useGetMessagesQuery({})
    const messagesList = messagesObj?.messages?.slice().reverse();

    return (
        <Box width={'60%'}>
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
            {!sessionUser ? <></> : <CreateMessage refetch={refetch} sessionUser={sessionUser} />}
            {messagesList?.map((message: Message, index: number) => {
                return (
                    <Card
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        overflow='scroll'
                        variant='outline'
                        margin={'1%'}
                        maxWidth={'100%'}
                        minWidth={'20%'}
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
                        <Stack divider={<StackDivider />} spacing='4'>
                            <CardBody>
                                <Heading>{message.title}</Heading>
                                <Text>{message.message}</Text>
                            </CardBody>
                        </Stack>
                        <CardFooter>
                            {sessionUser?.id === message.userId || sessionUser?.username === "noah" ?
                                <>
                                    <EditMessage title={message.title} message={message.message} id={message.id} sessionUser={sessionUser} refetch={refetch} />
                                    <DeleteMessage id={message.id} refetch={refetch} sessionUser={sessionUser} />
                                </> : <></>}
                            <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                        </CardFooter>
                    </Card>
                )
            })}
        </Box>
    )
}