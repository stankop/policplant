import { createSlice } from '@reduxjs/toolkit'

const orderOrdersProfileSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orders:[],
        loading: false,
        error: null
    },
    reducers:{
        orderOrdersProfileRequest(state){
            state.loading = true
            
        },

        orderOrdersProfileSuccess(state, action) {
                state.loading = false
                state.orders = action.payload
        },

        orderOrdersProfileFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        orderOrdersProfileReset(state, action) {
            state.loading = false
            state.orders = []
        }

    }
})
export const orderOrdersProfileActions = orderOrdersProfileSlice.actions
export const orderOrdersProfileReducer = orderOrdersProfileSlice.reducer
export default orderOrdersProfileSlice