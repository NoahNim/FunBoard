import { User } from "../../redux/app/services/authApi";
import { useDeleteMessageMutation } from "../../redux/app/services/authApi";
import { DeleteModal } from "../Modal/DeleteModal";
import useModal from "../Modal/UseModal";

interface DeleteMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number
}

export const DeleteMessage = ({ id, refetch }: DeleteMessageProps) => {
    const { isOpen, toggle } = useModal();
    const [deleteMsg, { isLoading }] = useDeleteMessageMutation()

    const deleteButtonHandler = async () => {
        try {
            await deleteMsg(id)
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