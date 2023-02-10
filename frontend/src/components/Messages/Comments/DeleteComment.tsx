import { useState } from "react";
import { User, Comment } from "../../../redux/app/services/authApi";
import { DeleteModal } from "../../Modal/DeleteModal";
import useModal from "../../Modal/UseModal";
import { useDeleteCommentMutation } from "../../../redux/app/services/authApi";

interface DeleteCommentProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number
}

export const DeleteComment = ({ id, refetch }: DeleteCommentProps) => {
    const { isOpen, toggle } = useModal();
    const [deleteComment, { isLoading }] = useDeleteCommentMutation()

    const deleteButtonHandler = async () => {
        try {
            await deleteComment(id)
            refetch();
            toggle();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DeleteModal isOpen={isOpen} toggle={toggle} buttonValue="Delete">
            <div>
                <p>
                    Are you sure?
                </p>
                <button onClick={deleteButtonHandler}>Yes</button>
                <button onClick={toggle}>No</button>
            </div>
        </DeleteModal>
    )
}