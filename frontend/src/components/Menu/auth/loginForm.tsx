import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/app/store";
import { setUser } from "../../../redux/features/auth/userSlice";
import { useLoginMutation } from '../../../redux/app/services/authApi'
import './loginForm.css'
import { LoginModal } from "../../Modal/LoginModal";
import useModal from "../../Modal/UseModal";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'


export const LoginForm = () => {
    const { isOpen, toggle } = useModal();
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
            toggle()
            setErrorList([])
        } catch (error: any | unknown) {
            const data = await error?.data.errors

            setErrorList(data)
        }
    }

    console.log(typeof FormControl)

    return (
        <FormControl onSubmit={loginSubmitFunction}>
            {isError ? <FormErrorMessage>{errorList.map((error) => <>{error}</>)}</FormErrorMessage> : <></>}
            <FormLabel>username / email </FormLabel>
            <Input type="text" value={username} onChange={usernameChangeHandler}></Input>
            <FormLabel>password </FormLabel>
            <Input type="password" value={password} onChange={passwordChangeHandler}></Input>
            <Button type="submit">Login</Button>
        </FormControl >
    )
}