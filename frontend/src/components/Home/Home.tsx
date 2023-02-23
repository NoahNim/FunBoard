// import { MainMenu } from "../Menu/Menu";
import { Box } from "@chakra-ui/react";
import { Messages } from "../Messages/Messages";
import { TopBar } from "../TopBar/TopBar";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";


export const Home = () => {
    const { data: messagesObj, refetch } = useGetMessagesQuery({})
    const messagesList = messagesObj?.messages?.slice().reverse();

    return (
        <Box>
            <Box>
                <TopBar refetch={refetch} />
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                w={'100%'}
            >
                <Messages messagesList={messagesList} refetch={refetch} />
            </Box>
        </Box>
    )
}