import { useAppSelector } from "../../../redux/app/store";
import { useGetCommentsQuery, Comment } from "../../../redux/app/services/authApi";
import "../../general.css"
import { CreateComment } from "./CreateComment";
import { EditComment } from "./EditComment";
import { DeleteComment } from "./DeleteComment";
import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Box,
    Text,
    Heading,
    StackDivider,
    Image,
} from "@chakra-ui/react";

interface CommentsProps {
    messageId: number;
}

export const Comments = ({ messageId }: CommentsProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);
    const { data: commentsObj, isFetching, isLoading, refetch } = useGetCommentsQuery(messageId)
    const commentsList = commentsObj?.comments?.slice().reverse();

    return (
        <Box
            width={'100%'}
            height={'100%'}
        >
            {sessionUser ? <CreateComment messageId={messageId} sessionUser={sessionUser} refetch={refetch} /> : null}
            {commentsList?.map((comment: Comment, index: number) => {
                return (
                    <Card
                        display={'flex'}
                        flexDirection={'column'}
                        overflow='scroll'
                        variant='outline'
                        margin={'1%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                        key={comment.id}
                    >
                        {comment?.photo ? <Image
                            src={`${window.location.href}${comment?.photo}`}
                            alt='Photo Not Found!'
                            borderRadius={'lg'}
                        /> : <></>}
                        <Stack
                            divider={<StackDivider />}
                            spacing='1'
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            height={'2xs'}
                            width={'100%'}
                            margin={'0'}
                        >
                            <Box
                                overflowY={'scroll'}
                                width={{ base: '100%', md: '100%', lg: '100%' }}
                                height={'100%'}
                                border={'1px'}
                                borderRadius={'5%'}
                            >
                                <CardBody>{comment?.comment}</CardBody>
                            </Box>
                        </Stack>
                        <CardFooter
                            width={'100%'}
                            overflow={'scroll'}
                        >
                            {sessionUser?.id === comment.userId || sessionUser?.username === "noah" ? <>
                                <EditComment comment={comment.comment} id={comment.id} messageId={comment.messageId} sessionUser={sessionUser} refetch={refetch} />
                                <DeleteComment sessionUser={sessionUser} id={comment.id} refetch={refetch} />
                            </> : <></>}
                        </CardFooter>
                    </Card>
                )
            })}
        </Box>
    )
}