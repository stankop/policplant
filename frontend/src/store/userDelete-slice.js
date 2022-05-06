import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo')
                             ? JSON.parse(localStorage.getItem('userInfo'))
                             : null

const userDeleteSlice = createSlice({
        name: "userDelete",
        initialState: {
            success: false,
            loading: false,
            error: null
        },
        reducers: {
            userDeleteRequest(state) {
                state.loading = true;
               
            },

            userDeleteSuccess(state, action) {
                state.loading = false;
                state.success = action.payload;
            },

            userDeleteFail(state, action) {
                state.loading = false;
                state.error = action.payload;
            },
        },
});



export const userDeleteActions = userDeleteSlice.actions;
export const userDeleteReducer = userDeleteSlice.reducer;
export default userDeleteSlice;
