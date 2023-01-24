import { createSlice } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";

const initialState: Array<any> = []

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {}
})

export default sessionSlice.reducer