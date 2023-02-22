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
} from '@chakra-ui/react'
import { useAppSelector } from "../../redux/app/store";
import { LoginForm } from "./auth/loginForm";
import { LogoutButton } from "./auth/logoutButton";
import { SignupForm } from "./auth/signupForm";
import { UserInfo } from "./auth/UserInfo";

export const Menu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<any | undefined | null>()


    return (
        <>
            <Button ref={btnRef} backgroundColor={'#CFD2CD'} onClick={onOpen}>
                Open
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerContent>
                    <DrawerCloseButton />


                    <DrawerBody>

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