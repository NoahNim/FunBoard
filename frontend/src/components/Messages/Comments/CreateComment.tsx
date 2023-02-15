import { useState } from "react";
import { User, Comment } from "../../../redux/app/services/authApi";
import { Modal } from "../../Modal/Modal";
import useModal from "../../Modal/UseModal";
import { useCreateCommentMutation } from "../../../redux/app/services/authApi";

interface CreateMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    messageId: number;
}


export const CreateComment = ({ sessionUser, refetch, messageId }: CreateMessageProps) => {
    const { isOpen, toggle } = useModal();
    const [makeComment, { isLoading, isError }] = useCreateCommentMutation();
    const [formState, setFormState] = useState({
        comment: "",
        photo: null
    })
    const [errorList, setErrorList] = useState([])

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            setFormState({
                ...formState,
                [e.target.name]: e.target.files[0]
            })
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const CreateCommentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("messageId", messageId.toString())
        formData.append("comment", formState.comment);
        if (formState.photo) formData.append("photo", formState?.photo);

        try {
            const res = await makeComment(formData).unwrap();
            refetch();
            toggle();
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Post Comment">
            {isError ? <div style={{ color: "red" }}>{errorList?.map((error) => <div>{error}</div>)}</div> : <></>}
            <form onSubmit={CreateCommentSubmitHandler} className="message-form" encType="multipart/form-data">
                <label>Comment Text</label>
                <textarea name="comment" value={formState.comment} onChange={changeHandler}></textarea>
                <label>Photo</label>
                <input type="file" id="file" name="photo" accept="image/png, image/jpeg, image/jpg" onChange={fileChangeHandler}></input>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )

}