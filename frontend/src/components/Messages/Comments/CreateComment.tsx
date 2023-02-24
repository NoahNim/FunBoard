import { useState } from "react";
import { User, Comment } from "../../../redux/app/services/authApi";
import {
    useModalContext,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Textarea,
    Box,
    Text
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useCreateCommentMutation } from "../../../redux/app/services/authApi";

interface CreateMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    messageId: number;
}


export const CreateComment = ({ sessionUser, refetch, messageId }: CreateMessageProps) => {
    const { onClose } = useModalContext()
    const [makeComment, { isLoading, isError }] = useCreateCommentMutation();
    const [formState, setFormState] = useState({
        comment: "",
        photo: null
    })
    const [errorList, setErrorList] = useState([])

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            setFormState({
                ...formState,
                [e.target.name]: e.target.files[0]
            })
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const CreateCommentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("messageId", messageId.toString())
        formData.append("comment", formState.comment);
        if (formState.photo) formData.append("photo", formState?.photo);

        try {
            const res = await makeComment(formData).unwrap();
            onClose();
            refetch();
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }

    return (
        <>
            <form onSubmit={CreateCommentSubmitHandler} style={{ height: '100%', width: '100%' }} encType="multipart/form-data">
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                    padding={'1%'}
                >
                    {isError ? <FormHelperText color={'red'}>{errorList?.map((error) => <div>{error}</div>)}</FormHelperText> : <></>}
                    <FormLabel
                        marginTop={'1%'}
                    >Enter Your Comment</FormLabel>
                    <Textarea
                        height={'90%'}
                        border={'1px'}
                        name="comment"
                        value={formState.comment}
                        onChange={changeHandler}></Textarea>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                        marginTop={'2%'}
                    >
                        <FormLabel
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Text>Photo Upload</Text>
                            <Box display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                                cursor={'grab'}
                            >
                                <DownloadIcon
                                    cursor={'grab'}
                                    width={'100%'} />
                                <Input
                                    type="file"
                                    id="file"
                                    name="photo"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={fileChangeHandler}
                                    opacity={'0'}
                                    marginTop={'-5%'}
                                    cursor={'grab'}
                                    height={'10%'}
                                    width={'100%'}
                                ></Input>
                            </Box>
                        </FormLabel>
                    </Box>
                    <Button
                        type="submit"
                        bg={'#CFD2CD'}
                        width={'100%'}
                        marginTop={'2%'}
                    >Post Comment</Button>
                </FormControl>
            </form>
        </>
    )

}