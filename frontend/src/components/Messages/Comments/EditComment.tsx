import { useState } from "react";
import { User } from "../../../redux/app/services/authApi";
import { useEditCommentMutation } from "../../../redux/app/services/authApi";
import {
    useModalContext,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Textarea,
    Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";


interface EditCommentProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number;
    messageId: number;
    comment: string;
}


export const EditComment = ({ sessionUser, refetch, id, messageId, comment }: EditCommentProps) => {
    const { onClose } = useModalContext()
    const [editComment, { isLoading, isError }] = useEditCommentMutation();
    const [formState, setFormState] = useState(comment)
    const [errorList, setErrorList] = useState([])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState(e.target.value)
    }

    const EditCommentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentData = { comment: formState, id, messageId }

        try {
            const res = await editComment(commentData).unwrap();
            const returnedComment = { comment: res.comment }
            onClose();
            refetch();
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }


    return (
        <>
            {isError ? <div style={{ color: "red" }}>{errorList?.map((error) => <div>{error}</div>)}</div> : <></>}
            <form onSubmit={EditCommentSubmitHandler}
                encType="multipart/form-data"
                style={{ height: '100%', width: '100%' }}
            >
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                    padding={'1%'}
                >
                    <FormLabel
                        marginTop={'1%'}
                        fontWeight={'bold'}
                    >Edit Comment</FormLabel>
                    <Textarea
                        height={'90%'}
                        border={'1px'}
                        bg={'#fff'}
                        name="comment"
                        value={formState}
                        onChange={changeHandler}></Textarea>
                    <Button
                        width={'100%'}
                        bg={'#CFD2CD'}
                        type="submit"
                    ><EditIcon /></Button>
                </FormControl>
            </form>
        </>
    )

}