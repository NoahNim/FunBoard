import { useState } from "react";
import { setMessage } from "../../redux/features/message/messageSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import { Modal } from "../Modal/Modal";
import useModal from "../Modal/UseModal";
import { useCreateMessageMutation } from "../../redux/app/services/authApi";

export const CreateMessage = () => {
    const dispatch = useAppDispatch();
    const { isOpen, toggle } = useModal();
    const [makeMessage, { isLoading }] = useCreateMessageMutation();

    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Post Message">
            <form></form>
        </Modal>
    )

}