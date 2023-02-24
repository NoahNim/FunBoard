import { useAppSelector } from "../../redux/app/store";
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
    useDisclosure
} from '@chakra-ui/react'
import {
    EditIcon,
    DeleteIcon
} from "@chakra-ui/icons";
import { ReModal } from "../Modal/ReModal";

interface MessageProps {
    messagesList: any
    refetch: () => any
}

export const Messages = ({ messagesList, refetch }: MessageProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            width={'100%'}
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Card
                display={'flex'}
                flexDirection={'row'}
                overflow='scroll'
                variant='outline'
                margin={'1%'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'90%'}
            >
                <Image
                    objectFit={'cover'}
                    maxW={{ base: '200%', sm: '200px' }}
                    maxH={'100%'}
                    src={'https://i.imgur.com/KCVm8DV.jpg'}
                    alt='Photo Not Found!'
                    borderRadius={'lg'}
                />
                <Stack divider={<StackDivider />} spacing='4'>
                    <CardBody
                        alignItems={'center'}
                        border={'1px'} borderRadius={'5%'}
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
                        key={message.id}
                        overflow={'scroll'}
                        width={'90%'}
                    >
                        <Image
                            objectFit={'cover'}
                            width={{ base: '100%', sm: '200px' }}
                            src={`${window.location.href}${message?.photo}`}
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
                                {message.title}
                            </Heading>
                            <Box
                                overflowY={'scroll'}
                                width={{ base: '100%', md: '100%', lg: '100%' }}
                                height={'100%'}
                                border={'1px'}
                                borderRadius={'5%'}
                            >
                                <CardBody>
                                    <Text>{message.message}</Text>
                                </CardBody>
                            </Box>
                            {sessionUser?.id === message.userId || sessionUser?.username === "noah" ?
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                >
                                    <ReModal modalWidth="50%" modalHeight={'70%'} buttonValue={<><EditIcon /></>}>
                                        <EditMessage title={message.title} message={message.message} id={message.id} sessionUser={sessionUser} refetch={refetch} />
                                    </ReModal>
                                    <ReModal modalWidth="50%" modalHeight={'70%'} buttonValue={<><DeleteIcon color={'red'} /></>}>
                                        <DeleteMessage title={message.title} id={message.id} refetch={refetch} sessionUser={sessionUser} />
                                    </ReModal>
                                </Box> : <></>}
                        </Stack>

                        <Stack>
                            <CardFooter width={{ base: '100%', md: '100%', lg: '100%' }} overflow={'scroll'}>
                                <ReModal modalWidth={"70%"} modalHeight={'80%'} buttonValue="Click for Post and Comments">
                                    <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                                </ReModal>
                            </CardFooter>
                        </Stack>
                    </Card>
                )
            })}
        </Box >
    )
}