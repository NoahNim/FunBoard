import { useAppSelector } from "../../../redux/app/store";
import { useGetCommentsQuery, Comment } from "../../../redux/app/services/authApi";
import "../../general.css"

interface CommentsProps {
    messageId: number;
}

export const Comments = ({ messageId }: CommentsProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: commentsObj, isFetching, isLoading, refetch } = useGetCommentsQuery(messageId)
    const commentsList = commentsObj?.comments?.slice().reverse();

    console.log(commentsList)

    return (
        <div className="box-container">
            {commentsList?.map((comment: Comment, index: number) => {
                return (
                    <div className="box-comment">
                        <ul key={comment?.id}>
                            <li key={index}>{comment?.comment}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}