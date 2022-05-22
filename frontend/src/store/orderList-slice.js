import { createSlice } from '@reduxjs/toolkit'

const orderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        orders: [],
        loading: false,
        error: null,
       
    },
    reducers:{
        orderListRequest(state){
            state.loading = true
            state.orders = []
        },

        orderListSuccess(state, action) {
                    state.loading = false
                    state.orders = action.payload
                   
        },

        orderListFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const orderListActions = orderListSlice.actions
export const orderListReducer = orderListSlice.reducer
export default orderListSlice