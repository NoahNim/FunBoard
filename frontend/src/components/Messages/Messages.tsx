import { useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { CreateMessage } from "./CreateMessage";

export const Messages = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);

    return (
        <>
            {!sessionUser ? <></> : <CreateMessage sessionUser={sessionUser} />}
        </>
    )
}