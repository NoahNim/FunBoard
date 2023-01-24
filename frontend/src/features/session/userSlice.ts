import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../api/types";

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
  };

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
})

export default sessionSlice.reducer