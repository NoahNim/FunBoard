import { ReactNode, PropsWithChildren } from "react";
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
    children?: ReactNode
    buttonValue: string | ReactNode | null
}

export const ReModal = ({ children, buttonValue }: ReModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>{buttonValue}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent
                    width={'70%'}
                    height={'50%'}
                    padding={'0'}
                    mb={'0'}
                >
                    <ModalCloseButton width={'6%'} height={'5%'} />
                    <ModalBody marginTop={'1%'}>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}