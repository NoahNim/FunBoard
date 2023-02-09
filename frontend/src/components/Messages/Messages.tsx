import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { getMessages } from "../../redux/features/message/messageListSlice";
import { Message } from "../../redux/app/services/authApi";
import "../general.css"
import "./messagesForm.css"

export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const dispatch = useAppDispatch();
    const { data: messagesObj, isFetching, isLoading, isError } = useGetMessagesQuery({})
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="messages-options">
            {!sessionUser ? <></> : <CreateMessage sessionUser={sessionUser} />}
            <div className="messages-list">
                {messagesObj?.messages?.map((message: Message, index: number) => {
                    return (
                        <div className="box">
                            <img className="post-images" src={`${window.location.href}${message?.photo}`}></img>
                            <ul key={message.id}>
                                <li key={index}>{message.title}</li>
                                <li key={`${message.message}${Math.random()}`}>
                                    <p>{message.message}</p>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}