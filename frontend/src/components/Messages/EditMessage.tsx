import { useState } from "react";
import { User } from "../../redux/app/services/authApi";
import { useEditMessageMutation } from "../../redux/app/services/authApi";
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

interface EditMessageProps {
    sessionUser: User | null;
    refetch: () => any;
    id: number;
    title: string;
    message: string;
}


export const EditMessage = ({ sessionUser, refetch, id, title, message }: EditMessageProps) => {
    const { onClose } = useModalContext()
    const [editMessage, { isLoading, isError }] = useEditMessageMutation();
    const [formState, setFormState] = useState(message)
    const [errorList, setErrorList] = useState([])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();

        setFormState(e.target.value)
    }

    const CreateMessageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const messageData = { message: formState, id }

        try {
            const res = await editMessage(messageData).unwrap();
            const returnedMessage = { message: res.message }
            onClose();
            refetch();
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }


    return (
        <>
            <form onSubmit={CreateMessageSubmitHandler} encType="multipart/form-data" style={{ height: '100%', width: '100%' }}>
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                    padding={'1%'}
                >
                    <Box
                        fontWeight={'bold'}
                        marginTop={'1%'}
                    >Edit {title}</Box>
                    {isError ? <FormHelperText color={'red'}>{errorList?.map((error) => <div>{error}</div>)}</FormHelperText> : <></>}
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}
                    >Message Text</FormLabel>
                    <Textarea
                        height={'90%'}
                        border={'1px'}
                        bg={'#fff'}
                        name="message"
                        value={formState}
                        onChange={changeHandler}></Textarea>
                    <Button bg={'#CFD2CD'} type="submit"><EditIcon /></Button>
                </FormControl>
            </form>
        </>
    )

}