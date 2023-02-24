import { useAppSelector } from "../../../redux/app/store";
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Image, Text } from '@chakra-ui/react'
import { LogoutButton } from "./logoutButton";

export const UserInfo = () => {
    const currentUser = useAppSelector((state) => state?.auth?.user);

    return (
        <Card
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Stack divider={<StackDivider />} spacing='4'>
                <Image
                    objectFit={'cover'}
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`${window.location.href}${currentUser?.profilePhoto}`}
                    alt='Photo Not Found!'
                    borderRadius={'lg'}
                />
            </Stack>
            <Stack divider={<StackDivider />} spacing='4'>
                <CardBody>
                    <Heading>{currentUser?.username}</Heading>
                    <Text>{currentUser?.fullName}</Text>
                    <Text>{currentUser?.email}</Text>
                    <Text>{currentUser?.biography}</Text>
                </CardBody>
            </Stack>

            <CardFooter width={'100%'} padding={'0.01'}>
                <LogoutButton />
            </CardFooter>
        </Card>
    )

}