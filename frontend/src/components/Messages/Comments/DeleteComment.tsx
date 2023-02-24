import { useState } from "react";
import { User, Comment } from "../../../redux/app/services/authApi";
import { useDeleteCommentMutation } from "../../../redux/app/services/authApi";
import {
    useModalContext,
    Box,
    Text,
    Button
} from "@chakra-ui/react";

interface DeleteCommentProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number
}

export const DeleteComment = ({ id, refetch }: DeleteCommentProps) => {
    const [deleteComment, { isLoading }] = useDeleteCommentMutation()
    const { onClose } = useModalContext();

    const deleteButtonHandler = async () => {
        try {
            await deleteComment(id)
            onClose();
            refetch();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            padding={'1%'}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={'bold'}
            >
                <Text>Are you sure you wanted to delete your comment?</Text>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                width={'100%'}
            >
                <Button margin={'10%'} bg={'#e77070'} onClick={deleteButtonHandler}>Yes</Button>
                <Button margin={'10%'} bg={'#89a5ec'}>No</Button>
            </Box>

        </Box>
    )
}