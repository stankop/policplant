import { createSlice } from '@reduxjs/toolkit'


const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentMethod:''
    },
    reducers:{
        savePaymentMethod(state, action){
           
            state.paymentMethod = action.payload
        }

    }
})
export const paymentActions = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer
export default paymentSlice