import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo')
                             ? JSON.parse(localStorage.getItem('userInfo'))
                             : null

const userSlice = createSlice({
        name: "user",
        initialState: {
            userInfo: userInfoFromStorage,
            loading: false,
            error: ''
        },
        reducers: {
            userLoginRequest(state) {
                state.loading = true;
               
            },

            userLoginSuccess(state, action) {
                state.loading = false;
                state.userInfo = action.payload;
            },

            userLoginFail(state, action) {
                state.loading = false;
                state.error = action.payload;
            },

            userLogout(state, action) {
                state.userInfo = null;
                
            },
        },
});



export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
