import { User } from "../../redux/app/services/authApi";
import { useDeleteMessageMutation } from "../../redux/app/services/authApi";
import {
    useModalContext,
    Box,
    Text,
    Button
} from "@chakra-ui/react";


interface DeleteMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number
    title: string
}

export const DeleteMessage = ({ id, refetch, title }: DeleteMessageProps) => {
    const [deleteMsg, { isLoading }] = useDeleteMessageMutation()
    const { onClose } = useModalContext();

    const deleteButtonHandler = async () => {
        try {
            await deleteMsg(id)
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
                <Text>Are you sure you wanted to delete your post:</Text>
                <Text>{title}?</Text>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
            >
                <Button bg={'#e77070'} onClick={deleteButtonHandler}>Yes</Button>
                <Button bg={'#89a5ec'}>No</Button>
            </Box>

        </Box>
    )
}