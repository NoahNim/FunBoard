import { useRef } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,

} from '@chakra-ui/react'
import { useAppSelector } from "../../redux/app/store";
import { LoginForm } from "./auth/loginForm";
import { LogoutButton } from "./auth/logoutButton";
import { SignupForm } from "./auth/signupForm";
import { UserInfo } from "./auth/UserInfo";

export const MainMenu = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<any | undefined | null>()


    return (
        <>
            <Button ref={btnRef} backgroundColor={'#CFD2CD'} onClick={onOpen}>
                {!sessionUser ? <Text>Login or Register!</Text> : <>Settings</>}
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}

            >
                <DrawerContent
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    background={'#A6A2A2'}
                >
                    <DrawerCloseButton />
                    <DrawerHeader>{sessionUser ? 'Setings' : 'Login or Register'}</DrawerHeader>

                    <DrawerBody
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        width={'100%'}
                        padding={'0'}
                    >
                        {
                            !sessionUser ?
                                <>
                                    <Accordion allowToggle width={'100%'} padding={'0'}>
                                        <AccordionItem width={'100%'} >
                                            <AccordionButton display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'center'}
                                                border={'2px solid'}
                                                borderRadius={'10px'}
                                                bg={'#CFD2CD'}
                                            >
                                                <Text>Login</Text>
                                            </AccordionButton>
                                            <AccordionPanel backgroundColor={'#ededed'}>
                                                <LoginForm />
                                            </AccordionPanel>
                                        </AccordionItem>
                                        <AccordionItem width={'100%'}>
                                            <AccordionButton display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'center'}
                                                border={'2px solid'}
                                                borderRadius={'10px'}
                                                bg={'#CFD2CD'}
                                            >
                                                <Text>Register</Text>
                                            </AccordionButton>
                                            <AccordionPanel backgroundColor={'#ededed'}>
                                                < SignupForm />
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </>
                                :
                                <Accordion allowToggle width={'100%'} padding={'0'}>
                                    <AccordionItem width={'100%'} >
                                        <AccordionButton display={'flex'}
                                            flexDirection={'row'}
                                            justifyContent={'center'}
                                            border={'2px solid'}
                                            borderRadius={'10px'}
                                            bg={'#CFD2CD'}
                                        >
                                            <Text>Profile Info</Text>
                                        </AccordionButton>
                                        <AccordionPanel backgroundColor={'#ededed'} padding={"0"}>
                                            <UserInfo />
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                        }
                    </DrawerBody>

                    <DrawerFooter width={'100%'} padding={'0'}>
                        <Button mr={3} backgroundColor={"#e69797"} onClick={onClose} width={'100%'}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}