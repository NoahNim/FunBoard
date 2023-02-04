import { createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { User } from "../../app/services/authApi";
import { RootState } from "../../app/store";
import { getCSRFCookie } from "../../app/hooks";

interface UserState {
  user: User | null
  token: string | null | undefined
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
}>()

const userSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as UserState,
  reducers: {
    setUser: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string | null | undefined }>
    ) => {
      state.user = user
      state.token = token
      localStorage.setItem('user', JSON.stringify(user))
    },
    restoreUser: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string | null | undefined }>
    ) => {
      state.user = user
      state.token = token
    },
    removeUser: (
      state
    ) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setUser, restoreUser, removeUser } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user