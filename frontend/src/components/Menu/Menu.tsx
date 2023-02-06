import { useState } from "react";
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
            <button onClick={toggleDrawerHandler} className="hamburger">Menu</button>
            <MenuDrawer show={drawerOpen} toggle={toggleDrawerHandler} />
        </div>
    )
}