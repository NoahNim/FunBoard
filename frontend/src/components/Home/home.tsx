import { LoginForm } from "../auth/loginForm";
import { LogoutButton } from "../auth/logoutButton";

export const Home = () => {

    return (
        <div>
            <LoginForm />
            <LogoutButton />
        </div>
    )
}