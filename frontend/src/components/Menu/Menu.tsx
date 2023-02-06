import { useState } from "react";
import { LoginForm } from "./auth/loginForm";
import { LogoutButton } from "./auth/logoutButton";
import { SignupForm } from "./auth/signupForm";
import { MenuDrawer } from "./MenuDrawer";
import "./menu.css"

export const Menu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        if (!drawerOpen) {
            setDrawerOpen(true);
        } else {
            setDrawerOpen(false);
        }
    }

    return (
        <div>
            <button onClick={toggleDrawerHandler}>Hamburger</button>
            <MenuDrawer show={drawerOpen} toggle={toggleDrawerHandler} />
        </div>
    )
}