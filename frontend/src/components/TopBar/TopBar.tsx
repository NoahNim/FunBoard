import { Box, Image, Text } from "@chakra-ui/react";
import { MainMenu } from "../Menu/Menu";
import { CreateMessage } from "../Messages/CreateMessage";
import { useAppSelector } from "../../redux/app/store";
import { ReModal } from "../Modal/ReModal";


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
            alignItems={'center'}
            bg={'#847577'}
        >
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'Center'}
                width={'10%'}
            >
                <Image
                    objectFit={'cover'}
                    src={require('./FunBoardLogo.png')}
                    maxW={{ base: '100%', sm: '40px' }} />
                <Text fontSize={{ base: '12px', sm: '12px', md: '12px', lg: '16px' }}>FunBoard</Text>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
            >
                {sessionUser ?
                    <ReModal modalWidth={'50%'} modalHeight={'80%'} buttonValue="Create Message">
                        <CreateMessage refetch={refetch} sessionUser={sessionUser} />
                    </ReModal>
                    : <>
                        <Image
                            objectFit={'cover'}
                            src={require('./funboard_banner_image_2.png')}
                            width={{ base: '100%', sm: '80px' }}
                            margin={'0'}
                            padding={'0'}
                        />
                    </>}
            </Box>
            <Box>
                <MainMenu />
            </Box>
        </Box>
    )
}