import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/services/authApi";
import { RootState } from "../../app/store";
import { useLoginMutation } from "../../app/services/authApi";

interface UserState {
    user: User | null;
    token: string | null
}


const userSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as UserState,
    reducers: {
        setUser: (
          state,
          { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
        ) => {
          state.user = user
          state.token = token
        },
      },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user