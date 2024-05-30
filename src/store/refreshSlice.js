import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false
}

const refreshSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        refresh: (state) => {
            state.status = !state.status;
        }
    }
})

export const { refresh} = refreshSlice.actions;

export default refreshSlice.reducer;