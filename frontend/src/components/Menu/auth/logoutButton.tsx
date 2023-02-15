import { useAppDispatch } from "../../../redux/app/store";
import { useLazyLogoutQuery } from "../../../redux/app/services/authApi";
import { removeUser } from "../../../redux/features/auth/userSlice";
import "./loginForm";

export const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const [trigger, result] = useLazyLogoutQuery()

    const logoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const res = await trigger('/api/session/').unwrap()

        if (res.message === 'success') {
            localStorage.removeItem('user');
            dispatch(removeUser());
        }
    }

    return (
        <div>
            <button className="logout-button" onClick={logoutHandler}>Logout</button>
        </div>
    )
}