import { useState } from "react";
import { useAppSelector } from "../../redux/app/store";
import { LoginForm } from "./auth/loginForm";
import { LogoutButton } from "./auth/logoutButton";
import { SignupForm } from "./auth/signupForm";
import { UserInfo } from "./auth/UserInfo";
import "./menu.css"

interface MenuDrawerProps {
    show: boolean;
    toggle: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MenuDrawer = ({ show, toggle }: MenuDrawerProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)

    return (
        <div className={show ? "side-drawer open drawer-styles" : "side-drawer"}>
            <button style={{ backgroundColor: "#e69797", width: "20%" }} onClick={toggle}>Close</button>
            {
                !sessionUser ?
                    <>
                        <LoginForm />
                        <SignupForm />
                    </>
                    :
                    <>
                        <LogoutButton />
                        <UserInfo />
                    </>
            }
        </div>
    )
}