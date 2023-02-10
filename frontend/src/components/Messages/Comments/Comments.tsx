import { useAppSelector } from "../../../redux/app/store";
import { useGetCommentsQuery } from "../../../redux/app/services/authApi";
import "../../general.css"

interface CommentsProps {
    messageId: number;
}

export const Comments = ({ messageId }: CommentsProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: commentsObj, isFetching, isLoading, refetch } = useGetCommentsQuery(messageId)

    return (
        <div className="box-message">
        </div>
    )
}