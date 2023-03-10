import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/app/store";
import { setUser } from "../../../redux/features/auth/userSlice";
import { useLoginMutation } from '../../../redux/app/services/authApi'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Box
} from '@chakra-ui/react'


export const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const [login, { isLoading, isError }] = useLoginMutation();
    const [errorList, setErrorList] = useState([])

    const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const loginSubmitFunction = async (e: any) => {
        e.preventDefault();

        const credential = username

        const user = { credential, password }

        try {
            const res = await login(user).unwrap();
            const logUser = { user: res.user, token: res.token }
            dispatch(setUser(logUser));
            setErrorList([])
        } catch (error: any | unknown) {
            const data = await error?.data.errors
            console.log(data)
            setErrorList(data)
        }
    }

    return (
        <form onSubmit={loginSubmitFunction}>
            <FormControl
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                h={'100%'}
            >
                {isError ? <FormHelperText
                    display={'flex'}
                    flexDirection={'column'}
                    color={'red'}
                >{errorList.map((error) => <Box>{error}</Box>)}</FormHelperText> : <></>}
                <FormLabel
                    marginTop={'1%'}
                    marginBottom={'-1%'}
                >
                    username / email
                </FormLabel>
                <Input border={'1px'} bg={'#fff'} type="text" value={username} onChange={usernameChangeHandler}></Input>
                <FormLabel
                    marginTop={'1%'}
                    marginBottom={'-1%'}
                >
                    password
                </FormLabel>
                <Input border={'1px'} bg={'#fff'} type="password" value={password} onChange={passwordChangeHandler}></Input>
                <Button type="submit" margin={'2%'} width={'100%'} bg={'#CFD2CD'} >Login</Button>
            </FormControl >
        </form >
    )
}