import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/app/store";
import { setUser } from "../../../redux/features/auth/userSlice";
import { useLoginMutation } from '../../../redux/app/services/authApi'
import './loginForm.css'
import { LoginModal } from "../../Modal/LoginModal";
import useModal from "../../Modal/UseModal";


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

    const loginSubmitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
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

    return (
        <LoginModal isOpen={isOpen} toggle={toggle} buttonValue="Login" >
            {isError ? <div style={{ color: "red" }}>{errorList.map((error) => <div>{error}</div>)}</div> : <></>}
            <form onSubmit={loginSubmitFunction} className="login-form">
                <label>username/email </label>
                <input type="text" value={username} onChange={usernameChangeHandler}></input>
                <label>password </label>
                <input type="password" value={password} onChange={passwordChangeHandler}></input>
                <button type="submit">Login</button>
            </form>
        </LoginModal>
    )
}