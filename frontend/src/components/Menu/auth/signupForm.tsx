import { useState } from "react";
import { setUser } from "../../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../../redux/app/store";
import { useSignupMutation, } from "../../../redux/app/services/authApi";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Box,
    Text
} from '@chakra-ui/react'
import { DownloadIcon } from "@chakra-ui/icons";


export const SignupForm = () => {
    const dispatch = useAppDispatch();
    const [signup, { isLoading, isError }] = useSignupMutation();
    const [formState, setFormState] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        biography: "",
        profilePhoto: null,
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

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const signupSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("username", formState.username)
        formData.append("fullName", formState.fullName)
        formData.append("email", formState.email)
        formData.append("password", formState.password)
        formData.append("biography", formState.biography)
        if (formState.profilePhoto) formData.append("profilePhoto", formState.profilePhoto)
        try {
            const res = await signup(formData).unwrap();
            const signupUser = { user: res.user, token: res.token }
            dispatch(setUser(signupUser));
            setErrorList([])
        } catch (error: unknown | any) {
            const data = await error.data.errors

            setErrorList(data)
        }
    }

    return (
        <>
            <form onSubmit={signupSubmitHandler} encType="multipart/form-data">
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {isError ? <FormHelperText color={'red'}>{errorList?.map((error) => <div>{error}</div>)}</FormHelperText> : <></>}
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}
                    >
                        username</FormLabel>
                    <Input
                        type="text" name="username"
                        value={formState.username}
                        onChange={changeHandler}
                        border={'1px'}
                        bg={'#fff'}
                    ></Input>
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}>
                        fullName
                    </FormLabel>
                    <Input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={changeHandler}
                        border={'1px'}
                        bg={'#fff'}
                    ></Input>
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}
                    >
                        email
                    </FormLabel>
                    <Input
                        type="email" name="email"
                        value={formState.email}
                        onChange={changeHandler}
                        border={'1px'}
                        bg={'#fff'}
                    ></Input>
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}
                    >
                        password
                    </FormLabel>
                    <Input
                        type="password" name="password"
                        value={formState.password}
                        onChange={changeHandler}
                        border={'1px'}
                        bg={'#fff'}></Input>
                    <FormLabel
                        marginTop={'1%'}
                        marginBottom={'-1%'}
                    >
                        biography
                    </FormLabel>
                    <Input
                        type="text" name="biography"
                        value={formState.biography}
                        onChange={changeHandler}
                        border={'1px'}
                        bg={'#fff'}
                    ></Input>
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
                                    name="profilePhoto"
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

                    <Button type="submit" margin={'2%'} width={'100%'} bg={'#CFD2CD'} >Register</Button>
                </FormControl>
            </form>
        </>
    )
}