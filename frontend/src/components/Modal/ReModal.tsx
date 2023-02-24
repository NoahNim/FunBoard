import { ReactNode } from "react";
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

interface ReModalProps {
    children?: ReactNode;
    buttonValue: string
}

export const ReModal = ({ children, buttonValue }: ReModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>{buttonValue}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalCloseButton />

                <ModalContent
                    width={'70%'}
                    height={'50%'}
                    padding={'0'}
                    mb={'0'}
                >
                    {children}
                </ModalContent>
            </Modal>
        </>
    )
}