import { useState } from "react";
import {
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Box,
    Text
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { User } from "../../redux/app/services/authApi";
import { useCreateMessageMutation } from "../../redux/app/services/authApi";
import { ReModal } from "../Modal/ReModal";

interface CreateMessageProps {
    sessionUser: User;
    refetch: () => any;
}


export const CreateMessage = ({ sessionUser, refetch }: CreateMessageProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [makeMessage, { isLoading, isError }] = useCreateMessageMutation();
    const [formState, setFormState] = useState({
        title: "",
        message: "",
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

    const CreateMessageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("title", formState.title);
        formData.append("message", formState.message);
        if (formState.photo) formData.append("photo", formState?.photo);

        try {
            const res = await makeMessage(formData).unwrap();
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
            <ReModal buttonValue="Post Message">
                {isError ? <div style={{ color: "red" }}>{errorList?.map((error) => <div>{error}</div>)}</div> : <></>}
                <form onSubmit={CreateMessageSubmitHandler} style={{ height: '100%', width: '100%' }}>
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
                            marginBottom={'-1%'}>
                            Title
                        </FormLabel>
                        <Input border={'1px'} bg={'#fff'} type="text" name="title" value={formState.title} onChange={changeHandler}></Input>
                        <FormLabel
                            marginTop={'1%'}
                            marginBottom={'-1%'}
                        >
                            Message Text
                        </FormLabel>
                        <Textarea height={'90%'} border={'1px'} bg={'#fff'} name="message" value={formState.message} onChange={changeHandler}></Textarea>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'100%'}
                        >
                            <FormLabel
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Text>Photo Upload</Text>
                                <DownloadIcon cursor={'grab'} />
                                <Input type="file" id="file" name="photo" accept="image/png, image/jpeg, image/jpg" onChange={fileChangeHandler} opacity={'0'}
                                    marginTop={'-3%'}
                                    cursor={'grab'}
                                    height={'10%'}
                                ></Input>
                            </FormLabel>
                        </Box>
                        <Box
                            width={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'
                            }>
                            <Button
                                type="submit"
                                bg={'#CFD2CD'}
                                width={'100%'}
                            >
                                Post
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            </ReModal>
        </>
    )
}