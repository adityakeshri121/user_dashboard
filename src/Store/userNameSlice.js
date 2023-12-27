import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        userLogin(state, action) {
            // console.log(state, action);
            // state.push(action.payload);
            return action.payload;
        }
    }
})



export const { userLogin } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;