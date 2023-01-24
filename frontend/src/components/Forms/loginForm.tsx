import React, {useState} from "react";

export const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserName(e.target.value)
    }
    
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    return (
        <div>
            <label>username/email </label>
            <input type="text" value={username} onChange={usernameChangeHandler}></input>
            <label>password </label>
            <input type="text" value={password} onChange={passwordChangeHandler}></input>
        </div>
    )
}