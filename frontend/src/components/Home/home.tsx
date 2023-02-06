import { useAppSelector } from "../../redux/app/hooks";
import { LoginForm } from "../Menu/auth/loginForm";
import { LogoutButton } from "../Menu/auth/logoutButton";
import { SignupForm } from "../Menu/auth/signupForm";
import { Menu } from "../Menu/Menu";


export const Home = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    console.log(sessionUser)
    return (
        <div>
            <Menu />
        </div>
    )
}