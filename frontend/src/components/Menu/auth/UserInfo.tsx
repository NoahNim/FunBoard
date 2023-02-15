import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/store";
import { getBase64Img } from "../../../redux/app/hooks";
import { LoginModal } from "../../Modal/LoginModal";
import useModal from "../../Modal/UseModal";

export const UserInfo = () => {
    const currentUser = useAppSelector((state) => state?.auth?.user);
    const { isOpen, toggle } = useModal();

    return (
        <LoginModal isOpen={isOpen} toggle={toggle} buttonValue="Profile" >
            <div>
                <ul>
                    <li>{currentUser?.username}</li>
                    <li>{currentUser?.fullName}</li>
                    <li>{currentUser?.email}</li>
                    <li>{currentUser?.biography}</li>
                    <li><img style={{ borderRadius: "10px", objectFit: "cover", width: "50%", height: "50%" }} src={`${window.location.href}${currentUser?.profilePhoto}`}></img></li>
                </ul>
            </div>
        </LoginModal>
    )

}