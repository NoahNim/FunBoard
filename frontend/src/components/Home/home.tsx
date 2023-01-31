import { LoginForm } from "../auth/loginForm";
import { LogoutButton } from "../auth/logoutButton";
import { SignupForm } from "../auth/signupForm";

export const Home = () => {

    return (
        <div>
            <LoginForm />
            <LogoutButton />
            <SignupForm />
        </div>
    )
}