import { useAppSelector } from "../../../redux/app/store";
import { useGetCommentsQuery, Comment } from "../../../redux/app/services/authApi";
import "../../general.css"
import { CreateComment } from "./CreateComment";

interface CommentsProps {
    messageId: number;
}

export const Comments = ({ messageId }: CommentsProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: commentsObj, isFetching, isLoading, refetch } = useGetCommentsQuery(messageId)
    const commentsList = commentsObj?.comments?.slice().reverse();

    return (
        <div className="box-container">
            <CreateComment messageId={messageId} sessionUser={sessionUser} refetch={refetch} />
            {commentsList?.map((comment: Comment, index: number) => {
                return (
                    <div className="box-comment">
                        {comment?.photo ? <img className="post-images" src={`${window.location.href}${comment?.photo}`}></img> : <></>}
                        <ul key={comment?.id}>
                            <li key={index}>{comment?.comment}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}