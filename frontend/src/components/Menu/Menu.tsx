import { useState, useRef } from "react";
import { MenuDrawer } from "./MenuDrawer";
import "./menu.css"
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Text,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
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
                Login Or Register
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
                    alignItems={'flex-start'}
                    background={'#A6A2A2'}
                >
                    <DrawerCloseButton />
                    <DrawerHeader>{!sessionUser ? <Text>Login or Register!</Text> : <></>}</DrawerHeader>

                    <DrawerBody
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        width={'100%'}
                    >
                        {
                            !sessionUser ?
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'flex-start'}
                                >
                                    <Accordion>
                                        <AccordionItem>
                                            <AccordionButton>Login</AccordionButton>
                                            <AccordionPanel>
                                                <LoginForm />
                                            </AccordionPanel>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionButton>Register</AccordionButton>
                                            <AccordionPanel>
                                                <SignupForm />
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>

                                </Box>
                                :
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'flex-start'}
                                >
                                    <UserInfo />
                                    <LogoutButton />
                                </Box>
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button mr={3} backgroundColor={"#e69797"} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}