import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { getMessages } from "../../redux/features/message/messageListSlice";
import { Message } from "../../redux/app/services/authApi";


export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const dispatch = useAppDispatch();
    const { data: messagesObj, isFetching, isLoading, isError } = useGetMessagesQuery({})
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            {!sessionUser ? <></> : <CreateMessage sessionUser={sessionUser} />}
            {messagesObj?.messages?.map((message: Message, index: number) => {
                return (
                    <div>
                        <ul key={message.id}>
                            <li key={index}>{message.title}</li>
                        </ul>
                    </div>
                )
            })}
        </>
    )
}