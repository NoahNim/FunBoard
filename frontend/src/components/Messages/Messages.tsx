import { useAppSelector } from "../../redux/app/store";
import { CreateMessage } from "./CreateMessage";
import { useGetMessagesQuery } from "../../redux/app/services/authApi";
import { Message } from "../../redux/app/services/authApi";
import "../general.css"
import "./messagesForm.css"
import { SingleMessage } from "./SingleMessage";
import { EditMessage } from "./EditMessage";
import { DeleteMessage } from "./DeleteMessage";

export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: messagesObj, isFetching, isLoading, refetch } = useGetMessagesQuery({})
    if (isLoading) return <div>Loading...</div>
    const messagesList = messagesObj?.messages?.slice().reverse();
    const adminMessages = messagesObj?.messages?.forEach((message: Message) => {
        if (message.userId === 4) {
            return message
        }
    })

    return (
        <div className="messages-options">
            {!sessionUser ? <></> : <CreateMessage refetch={refetch} sessionUser={sessionUser} />}
            <div className="messages-list">
                {adminMessages?.map((message: Message, index: number) => {
                    if (message.userId === 4) {
                        return (
                            <div className="box">
                                <div className="box-container">
                                    <div className="box-message">
                                        <div className="box-message-contents">
                                            <img className="post-images" src={`${window.location.href}${message?.photo}`}></img>
                                            <ul key={message.id}>
                                                {sessionUser?.id === message.userId || sessionUser?.username === "noah" ?
                                                    <>
                                                        <EditMessage title={message.title} message={message.message} id={message.id} sessionUser={sessionUser} refetch={refetch} />
                                                        <DeleteMessage id={message.id} refetch={refetch} sessionUser={sessionUser} />
                                                    </> : <></>}
                                                <li key={index}>{message.title}</li>
                                                <li key={`${message.message}${Math.random()}`}>
                                                    <p>{message.message}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
                {messagesList?.map((message: Message, index: number) => {
                    return (
                        <div className="box">
                            <div className="box-container">
                                <div className="box-message">
                                    <div className="box-message-contents">
                                        <img className="post-images" src={`${window.location.href}${message?.photo}`}></img>
                                        <ul key={message.id}>
                                            {sessionUser?.id === message.userId || sessionUser?.username === "noah" ?
                                                <>
                                                    <EditMessage title={message.title} message={message.message} id={message.id} sessionUser={sessionUser} refetch={refetch} />
                                                    <DeleteMessage id={message.id} refetch={refetch} sessionUser={sessionUser} />
                                                </> : <></>}
                                            <li key={index}>{message.title}</li>
                                            <li key={`${message.message}${Math.random()}`}>
                                                <p>{message.message}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <SingleMessage id={message.id} index={index} title={message?.title} message={message?.message} photo={message?.photo} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}