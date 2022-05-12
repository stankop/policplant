import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
        name: "userUpdate",
        initialState: {
            user:{},
            success: false,
            loading: false,
            error: null
        },
        reducers: {
            userUpdateRequest(state) {
                state.loading = true;
               
            },

            userUpdateSuccess(state, action) {
                state.loading = false;
                state.success = true;
            },

            userUpdateFail(state, action) {
                state.loading = false;
                state.error = action.payload;
            },
            userUpdateReset(state, action) {
                state.loading = false;
                state.success = false;
                state.user = {}
            },
        },
});



export const userUpdateActions = userUpdateSlice.actions;
export const userUpdateReducer = userUpdateSlice.reducer;
export default userUpdateSlice;
