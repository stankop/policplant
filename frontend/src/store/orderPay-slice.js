import { createSlice } from '@reduxjs/toolkit'


const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {
       loading: false,
       success: false,
      
    },
    reducers:{
        orderPayRequest(state, action){
           
            state.loading = true
        },

        orderPaySuccess(state, action) {
               
                state.loading = false;
               
                state.success = true;
        },

        orderPayFail(state, action) {
            state.loading = false;
            state.error = action.payload
        },

        orderPayReset(state, action) {
            state.loading = false;
            state.success = false
        },


    }
})
export const orderPayActions = orderPaySlice.actions
export const orderPayReducer = orderPaySlice.reducer
export default orderPaySlice