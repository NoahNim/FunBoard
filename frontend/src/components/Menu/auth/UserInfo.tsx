import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/store";
import { getBase64Img } from "../../../redux/app/hooks";
import { Modal } from "../../Modal/modal";
import useModal from "../../Modal/useModal";

export const UserInfo = () => {
    const currentUser = useAppSelector((state) => state?.auth?.user);
    const { isOpen, toggle } = useModal();

    console.log(window.location.href)

    return (
        <Modal isOpen={isOpen} toggle={toggle} buttonValue="Profile" >
            <div>
                <ul>
                    <li>{currentUser?.username}</li>
                    <li>{currentUser?.fullName}</li>
                    <li>{currentUser?.email}</li>
                    <li>{currentUser?.biography}</li>
                    <li><img style={{ borderRadius: "10px", objectFit: "cover", width: "50%", height: "50%" }} src={`${window.location.href}${currentUser?.profilePhoto}`}></img></li>
                </ul>
            </div>
        </Modal>
    )

}