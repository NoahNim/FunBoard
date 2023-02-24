import { Box } from "@chakra-ui/react";
import { MainMenu } from "../Menu/Menu";
import { CreateMessage } from "../Messages/CreateMessage";
import { useAppSelector } from "../../redux/app/store";

interface TopBarProps {
    refetch: () => any
}


export const TopBar = ({ refetch }: TopBarProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    return (
        <Box
            as="header"
            w={"100%"}
            h={'5%'}
            position={'sticky'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            bg={'#847577'}
        >

            FunBoard
            {sessionUser ? <CreateMessage refetch={refetch} sessionUser={sessionUser} /> : <></>}
            <MainMenu />
        </Box>
    )
}