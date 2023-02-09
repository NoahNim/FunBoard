import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { getMessages } from "../../redux/features/message/messageListSlice";
import { Message } from "../../redux/app/services/authApi";
import "../general.css"
import "./messagesForm.css"
import { SingleMessage } from "./SingleMessage";

export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: messagesObj, isFetching, isLoading, refetch } = useGetMessagesQuery({})
    if (isLoading) return <div>Loading...</div>
    const messagesList = messagesObj?.messages?.slice().reverse();

    return (
        <div className="messages-options">
            {!sessionUser ? <></> : <CreateMessage refetch={refetch} sessionUser={sessionUser} />}
            <div className="messages-list">
                {messagesList?.map((message: Message, index: number) => {
                    return (
                        <div className="box">
                            <div className="box-container">
                                <div className="box-message">
                                    <img className="post-images" src={`${window.location.href}${message?.photo}`}></img>
                                    <ul key={message.id}>
                                        <li key={index}>{message.title}</li>
                                        <li key={`${message.message}${Math.random()}`}>
                                            <p>{message.message}</p>
                                        </li>
                                    </ul>
                                </div>
                                <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}