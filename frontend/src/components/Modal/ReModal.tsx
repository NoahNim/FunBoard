import { ReactNode } from "react";
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";


interface ReModalProps {
    children?: ReactNode
    buttonValue: string | ReactNode | null
    modalHeight: string
    modalWidth: string
}

export const ReModal = ({ children, buttonValue, modalHeight, modalWidth }: ReModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>{buttonValue}</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay justifyContent={'center'} />

                <ModalContent
                    maxWidth={modalWidth}
                    height={modalHeight}
                >
                    <ModalCloseButton />
                    <ModalBody padding={'0'} marginTop={'3%'}>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}