import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { Message } from "react-hook-form";

interface MessageState {
    message: Message | null
}

const messageSlice = createSlice({
    name: 'message',
    initialState: { message: null } as MessageState,
    reducers: {
        setMessage: (
            state,
            { payload: { message } }: PayloadAction<{ message: Message }>
        ) => {
            state.message = message
        }

    }
})

export default messageSlice.reducer