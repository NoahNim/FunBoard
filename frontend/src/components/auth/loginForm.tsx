import React, {useState} from "react";
import { getCSRFCookie, useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/userSlice";
import { useLoginMutation } from '../../app/services/authApi'
import './loginForm.css'

export const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const [login, { isLoading}] = useLoginMutation();

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
        
        const user = {credential, password}

        try {
            const res = await login(user).unwrap();
            const logUser = { user: res.user, token: res.token }
            dispatch(setUser(logUser));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={loginSubmitFunction}>
                <label>username/email </label>
                <input type="text" value={username} onChange={usernameChangeHandler}></input>
                <label>password </label>
                <input type="password" value={password} onChange={passwordChangeHandler}></input>
                <button type="submit">Submiit</button>
            </form>
        </div>
    )
}