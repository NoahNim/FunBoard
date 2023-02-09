import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesMutation } from "../../redux/app/services/authApi";
import { getMessages } from "../../redux/features/message/messageListSlice";


export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const [getMessages, { isLoading }] = useGetMessagesMutation()
    const dispatch = useAppDispatch();

    const getMessagesFunction = async () => {
        try {
            const res = await getMessages("/api/messages/").unwrap()

            const messagesData = res.messages

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!sessionUser ? <></> : <CreateMessage sessionUser={sessionUser} />}
        </>
    )
}