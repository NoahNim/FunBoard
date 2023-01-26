import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import { useLoginMutation } from '../../app/services/authApi'
import type { LoginRequest } from "../../app/services/authApi";

export const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
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

        const user = {username, password}

        try {
            const res = await login(user).unwrap();
            console.log(res)
            dispatch(setUser(res));
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