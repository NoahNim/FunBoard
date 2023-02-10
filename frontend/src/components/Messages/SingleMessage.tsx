import { MessageModal } from "../Modal/MessaageModal";
import useModal from "../Modal/UseModal";
import { Comments } from "./Comments/Comments";


interface SingleMessageProps {
    title: string;
    message: string;
    photo: Blob;
    id: number;
    index: number;
}

export const SingleMessage = ({ title, message, photo, id, index }: SingleMessageProps) => {
    const { isOpen, toggle } = useModal();

    return (
        <MessageModal isOpen={isOpen} toggle={toggle} buttonValue="Comments...">
            <div className="box">
                <div className="box-container">
                    <div className="box-message">
                        <img className="post-images" src={`${window.location.href}${photo}`}></img>
                        <ul key={id}>
                            <li key={index}>{title}</li>
                            <li key={`${message}${Math.random()}`}>
                                <p>{message}</p>
                            </li>
                        </ul>
                    </div>
                    <div style={{ width: "100%" }}>
                        <Comments messageId={id} />
                    </div>
                </div>
            </div>
        </MessageModal>
    )
}