import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo')
                             ? JSON.parse(localStorage.getItem('userInfo'))
                             : null

const userListSlice = createSlice({
        name: "userList",
        initialState: {
            users: [],
            loading: false,
            error: null
        },
        reducers: {
            userListRequest(state) {
                state.loading = true;
               
            },

            userListSuccess(state, action) {
                state.loading = false;
                state.users = action.payload;
                state.error = null
            },

            userListFail(state, action) {
                state.loading = false;
                state.error = action.payload;
                console.log('jel se ovo ispalilo?')
            },

            userListReset(state, action) {
                state.users = [];
                
            },
        },
});



export const userListActions = userListSlice.actions;
export const userListReducer = userListSlice.reducer;
export default userListSlice;
