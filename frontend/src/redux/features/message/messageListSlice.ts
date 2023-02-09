import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { MessageList } from "../../app/services/authApi";

type messageListState = {
    messages: MessageList
}

const messageListSlice = createSlice({
    name: "messageList",
    initialState: { messages: {} } as messageListState,
    reducers: {
        getMessages: (
            state,
            { payload: { messages } }: PayloadAction<{ messages: MessageList }>
        ) => {
            state.messages = messages
        }
    }
})

export const { getMessages } = messageListSlice.actions

export default messageListSlice.reducer