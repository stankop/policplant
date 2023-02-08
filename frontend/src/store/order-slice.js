import { createSlice } from '@reduxjs/toolkit'


const orderSlice = createSlice({
    name: 'order',
    initialState: {
       loading: false,
       success: false,
       order:{},
       error: ''
    },
    reducers:{
        orderCreateRequest(state, action){
           
            state.loading = true
        },

        orderCreateSuccess(state, action) {
               
                state.loading = false;
                state.success = true;
                state.order = action.payload;
                state.error = ''
        },

        orderCreateFail(state, action) {
            state.loading = false;
            state.error = action.payload
        },

        orderCreateReset(state, action) {
            state.loading = false;
            state.order = {};
            state.error = false;
            state.success = false
        },


    }
})
export const orderActions = orderSlice.actions
export const orderReducer = orderSlice.reducer
export default orderSlice