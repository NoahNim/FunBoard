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

export const signup = createAppAsyncThunk(
  'api/users/',
  async (formData: FormData) => {
    const authToken = getCSRFCookie('XSRF-TOKEN')
    if (authToken) {
      try {
        const res = await fetch('/api/users/', {
          method: "POST",
          headers: {
            'XSRF-TOKEN': authToken
          },
          body: formData
        })
        if (res?.ok) {
          const user = await res.json();
          return user;
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
)


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
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {

    })
    builder.addCase(signup.fulfilled, (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string | null | undefined }>) => {
      state.user = user
      state.token = token
    })
    builder.addCase(signup.rejected, (state, { payload }) => {

    })
  }
})

export const { setUser, restoreUser, removeUser } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user