import { createSlice } from "@reduxjs/toolkit";


const userDetailsSlice = createSlice({
        name: "user",
        initialState: {
            user: {},
            loading: false,
            error: ''
        },
        reducers: {
            userDetailsRequest(state) {
                state.loading = true;
               
            },

            userDetailsSuccess(state, action) {
                state.loading = false;
                state.user = action.payload;
            },

            userDetailsFail(state, action) {
                state.loading = false;
                state.error = action.payload;
            },

            userDetailsReset(state, action) {
                state.user = {};
               
            },

           
        },
});



export const userDetailsActions = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;
export default userDetailsSlice;
