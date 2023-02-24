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
    StackDivider,
    Image,
    Text
} from "@chakra-ui/react";
import {
    EditIcon,
    DeleteIcon
} from "@chakra-ui/icons";
import { ReModal } from "../../Modal/ReModal";

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
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            {sessionUser ? <ReModal
                modalWidth={"50%"}
                modalHeight={'70%'}
                buttonValue='Click Here to Post Comment'
            >
                <CreateComment messageId={messageId} sessionUser={sessionUser} refetch={refetch} />
            </ReModal>
                : null}
            <Box
                borderTop={'2px'}
                width={'100%'}
                fontWeight={'bold'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Text
                    marginTop={'1%'}
                >Here's what people are saying...</Text>
            </Box>
            {commentsList?.map((comment: Comment, index: number) => {
                return (
                    <Box
                        width={'100%'}
                        height={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Card
                            border={'1px'}
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
                                    width={{ base: '90%', md: '100%', lg: '100%' }}
                                    height={'100%'}
                                    borderRadius={'5%'}
                                >
                                    <CardBody>{comment?.comment}</CardBody>
                                </Box>
                            </Stack>
                            <CardFooter
                                width={'100%'}
                                overflow={'scroll'}
                            >
                                {sessionUser?.id === comment.userId || sessionUser?.username === "noah" ?
                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        flexDirection={'row'}
                                        justifyContent={'flex-end'}
                                    >
                                        <ReModal modalWidth="50%" modalHeight={'70%'} buttonValue={<><EditIcon /></>}>
                                            <EditComment comment={comment.comment} id={comment.id} messageId={comment.messageId} sessionUser={sessionUser} refetch={refetch} />
                                        </ReModal>
                                        <ReModal modalWidth="30%" modalHeight={'40%'} buttonValue={<><DeleteIcon color={'red'} /></>}>
                                            <DeleteComment sessionUser={sessionUser} id={comment.id} refetch={refetch} />
                                        </ReModal>
                                    </Box> : <></>}
                            </CardFooter>
                        </Card>
                    </Box>
                )
            })}
        </Box>
    )
}