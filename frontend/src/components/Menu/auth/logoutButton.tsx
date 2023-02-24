import { useAppDispatch } from "../../../redux/app/store";
import { useLazyLogoutQuery } from "../../../redux/app/services/authApi";
import { removeUser } from "../../../redux/features/auth/userSlice";
import { Button } from "@chakra-ui/react";

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
        <Button bg={'#e69797'}
            border={'2px solid'}
            borderRadius={'10px'}
            onClick={logoutHandler}
            width={'100%'}
        >
            Logout
        </Button>
    )
}