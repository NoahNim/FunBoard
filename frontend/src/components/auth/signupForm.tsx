import { useState, useEffect } from "react";

export const SignupForm = () => {
    const [formState, setFormState] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        biography: "",
        profilePhoto: null,
    })


    // useEffect(() => {
    //     if (selectFile !== null) {
    //         setFormState({
    //             ...formState,
    //             ["profilePhoto"]: selectFile,
    //         })
    //     }
    // }, [selectFile, formState, setFormState])

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            setFormState({
                ...formState,
                [e.target.name]: e.target.files[0]
            })
            console.log(formState)
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();


        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
        console.log(formState)

    }

    return (
        <div>
            <form className="login-form">
                <label>username</label>
                <input type="text" name="username" value={formState.username} onChange={changeHandler}></input>
                <label>fullName</label>
                <input type="text" name="fullname" value={formState.fullname} onChange={changeHandler}></input>
                <label>email</label>
                <input type="email" name="email" value={formState.email} onChange={changeHandler}></input>
                <label>password</label>
                <input type="password" name="password" value={formState.password} onChange={changeHandler}></input>
                <label>biography</label>
                <input type="text" name="biography" value={formState.biography} onChange={changeHandler}></input>
                <label>profile photo</label>
                <input type="file" name="profilePhoto" accept="image/png, image/jpeg, image/jpg" onChange={fileChangeHandler}></input>
                <button type="submit"></button>
            </form>
        </div>
    )
}