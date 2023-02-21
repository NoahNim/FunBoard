import { useAppSelector } from "../../../redux/app/store";
import { LoginModal } from "../../Modal/LoginModal";
import useModal from "../../Modal/UseModal";
import "../menu.css"

export const UserInfo = () => {
    const currentUser = useAppSelector((state) => state?.auth?.user);
    const { isOpen, toggle } = useModal();

    return (
        <LoginModal isOpen={isOpen} toggle={toggle} buttonValue="Profile" >
            <div className="user-info">
                <ul>
                    <li> username: {currentUser?.username}</li>
                    <li> name: {currentUser?.fullName}</li>
                    <li> email: {currentUser?.email}</li>
                    <li> bio: {currentUser?.biography}</li>
                    <li style={{ borderRadius: "10px", objectFit: "cover", width: "70%", height: "70%" }}><img style={{ borderRadius: "10px", objectFit: "cover", width: "100%", height: "100%" }} src={`${window.location.href}${currentUser?.profilePhoto}`}></img></li>
                </ul>
            </div>
        </LoginModal>
    )

}