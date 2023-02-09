import { useState } from "react";
import { setMessage } from "../../redux/features/message/messageSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import { Modal } from "../Modal/Modal";
import useModal from "../Modal/UseModal";
import { User } from "../../redux/app/services/authApi";
import { useCreateMessageMutation } from "../../redux/app/services/authApi";
import "./messagesForm.css"

interface CreateMessageProps {
    sessionUser: User
}


export const CreateMessage = ({ sessionUser }: CreateMessageProps) => {
    const dispatch = useAppDispatch();
    const { isOpen, toggle } = useModal();
    const [makeMessage, { isLoading }] = useCreateMessageMutation();
    const [formState, setFormState] = useState({
        title: "",
        message: "",
        photo: null
    })

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            setFormState({
                ...formState,
                [e.target.name]: e.target.files[0]
            })

            console.log(formState)
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
        console.log(formState)
    }

    const CreateMessageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("title", formState.title);
        formData.append("message", formState.message);
        if (formState.photo) formData.append("photo", formState?.photo);

        try {
            const res = await makeMessage(formData).unwrap();
            const returnedMessage = { message: res.message }
            console.log(returnedMessage)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Post Message">
            <form onSubmit={CreateMessageSubmitHandler} className="message-form" encType="multipart/form-data">
                <label>Title</label>
                <input type="text" name="title" value={formState.title} onChange={changeHandler}></input>
                <label>Message Text</label>
                <input type="text" name="message" value={formState.message} onChange={changeHandler}></input>
                <label>Photo</label>
                <input type="file" id="file" name="photo" accept="image/png, image/jpeg, image/jpg" onChange={fileChangeHandler}></input>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )

}