import { createSlice } from "@reduxjs/toolkit";


const userUpdateProfileSlice = createSlice({
        name: "userUpdateProfile",
        initialState: {
            userInfo: {},
            loading: false,
            error: '',
            success: false
        },
        reducers: {
            userUpdateProfileRequest(state) {
                state.loading = true;
               
            },

            userDetailsSuccess(state, action) {
                state.loading = false;
                state.userInfo = action.payload;
                state.success= true;
            },

            userUpdateProfileFail(state, action) {
                state.loading = false;
                state.error = action.payload;
            },
            userUpdateProfileReset(state, action) {
                state.userInfo = {}
            },

           
        },
});



export const userUpdateProfileActions = userUpdateProfileSlice.actions;
export const userUpdateProfileReducer = userUpdateProfileSlice.reducer;
export default userUpdateProfileSlice;
