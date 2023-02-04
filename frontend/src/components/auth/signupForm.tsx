import { useState, useEffect } from "react";
import { setUser } from "../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../redux/app/store";
import { User } from "../../redux/app/services/authApi";
import { useSignupMutation, UserResponse } from "../../redux/app/services/authApi";
import { Modal } from "../Modal/modal";
import useModal from "../Modal/useModal";

export const SignupForm = () => {
    const { isOpen, toggle } = useModal();
    const dispatch = useAppDispatch();
    const [signup, { isLoading }] = useSignupMutation();
    const [formState, setFormState] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        biography: "",
        profilePhoto: null,
    })

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
        console.log(typeof formData)
        try {
            const res = await signup(formData).unwrap();
            const signupUser = { user: res.user, token: res.token }
            dispatch(setUser(signupUser));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Register">
            <form onSubmit={signupSubmitHandler} className="login-form" encType="multipart/form-data">
                <label>username</label>
                <input type="text" name="username" value={formState.username} onChange={changeHandler}></input>
                <label>fullName</label>
                <input type="text" name="fullName" value={formState.fullName} onChange={changeHandler}></input>
                <label>email</label>
                <input type="email" name="email" value={formState.email} onChange={changeHandler}></input>
                <label>password</label>
                <input type="password" name="password" value={formState.password} onChange={changeHandler}></input>
                <label>biography</label>
                <input type="text" name="biography" value={formState.biography} onChange={changeHandler}></input>
                <label>profile photo</label>
                <input type="file" id="file" name="profilePhoto" accept="image/png, image/jpeg, image/jpg" onChange={fileChangeHandler}></input>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )
}