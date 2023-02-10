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
    const [editComment, { isLoading }] = useEditCommentMutation();
    const [formState, setFormState] = useState(comment)

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
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Edit comment">
            <form onSubmit={CreateMessageSubmitHandler} className="message-form" encType="multipart/form-data">
                <label>Edit Comment</label>
                <textarea name="message" value={formState} onChange={changeHandler}></textarea>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )

}