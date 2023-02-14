import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import useModal from "../../Modal/UseModal";
import { User } from "../../../redux/app/services/authApi";
import { useEditCommentMutation } from "../../../redux/app/services/authApi";
import "../messagesForm.css"

interface EditCommentProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number;
    messageId: number;
    comment: string;
}


export const EditComment = ({ sessionUser, refetch, id, messageId, comment }: EditCommentProps) => {
    const { isOpen, toggle } = useModal();
    const [editComment, { isLoading, isError }] = useEditCommentMutation();
    const [formState, setFormState] = useState(comment)
    const [errorList, setErrorList] = useState([])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState(e.target.value)
    }

    const CreateMessageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentData = { comment: formState, id, messageId }

        try {
            const res = await editComment(commentData).unwrap();
            const returnedComment = { comment: res.comment }
            console.log(returnedComment)
            refetch();
            toggle();
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Edit comment">
            {isError ? <div style={{ color: "red" }}>{errorList?.map((error) => <div>{error}</div>)}</div> : <></>}
            <form onSubmit={CreateMessageSubmitHandler} className="message-form" encType="multipart/form-data">
                <label>Edit Comment</label>
                <textarea name="message" value={formState} onChange={changeHandler}></textarea>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )

}