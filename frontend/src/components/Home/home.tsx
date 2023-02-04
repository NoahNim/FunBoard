import { useAppSelector } from "../../redux/app/hooks";
import { LoginForm } from "../auth/loginForm";
import { LogoutButton } from "../auth/logoutButton";
import { SignupForm } from "../auth/signupForm";


export const Home = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    console.log(sessionUser)
    return (
        <div>
            <LoginForm />
            <SignupForm />
            <LogoutButton />
        </div>
    )
}