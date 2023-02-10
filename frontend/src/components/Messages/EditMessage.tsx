import { useState } from "react";
import { Modal } from "../Modal/Modal";
import useModal from "../Modal/UseModal";
import { User } from "../../redux/app/services/authApi";
import { useEditMessageMutation } from "../../redux/app/services/authApi";
import "./messagesForm.css"

interface EditMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number;
    title: string;
    message: string;
}


export const EditMessage = ({ sessionUser, refetch, id, title, message }: EditMessageProps) => {
    const { isOpen, toggle } = useModal();
    const [editMessage, { isLoading }] = useEditMessageMutation();
    const [formState, setFormState] = useState(message)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState(e.target.value)
    }

    const CreateMessageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const messageData = { message: formState, id }

        try {
            const res = await editMessage(messageData).unwrap();
            const returnedMessage = { message: res.message }
            console.log(returnedMessage)
            refetch();
            toggle();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Edit Message">
            <div>{title}</div>
            <form onSubmit={CreateMessageSubmitHandler} className="message-form" encType="multipart/form-data">
                <label>Message Text</label>
                <textarea name="message" value={formState} onChange={changeHandler}></textarea>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )

}