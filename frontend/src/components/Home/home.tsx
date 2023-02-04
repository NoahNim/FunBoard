import { LoginForm } from "../auth/loginForm";
import { LogoutButton } from "../auth/logoutButton";
import { SignupForm } from "../auth/signupForm";
import { Modal } from "../Modal/modal";

export const Home = () => {

    return (
        <div>
            <Modal buttonValue="Login" ><LoginForm /></Modal>
            <Modal buttonValue="Register"><SignupForm /></Modal>
            <LogoutButton />

        </div>
    )
}