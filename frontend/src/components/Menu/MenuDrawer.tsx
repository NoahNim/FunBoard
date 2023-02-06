import { useState } from "react";
import { useAppSelector } from "../../redux/app/store";
import { LoginForm } from "./auth/loginForm";
import { LogoutButton } from "./auth/logoutButton";
import { SignupForm } from "./auth/signupForm";
import "./menu.css"

interface MenuDrawerProps {
    show: boolean;
    toggle: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MenuDrawer = ({ show, toggle }: MenuDrawerProps) => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)

    return (
        <div className={show ? "side-drawer open drawer-styles" : "side-drawer"}>
            <button onClick={toggle}>Close</button>
            {
                !sessionUser ?
                    <>
                        <LoginForm />
                        <SignupForm />
                    </>
                    : <LogoutButton />
            }
        </div>
    )
}