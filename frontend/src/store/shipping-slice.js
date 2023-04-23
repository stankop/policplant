import { createSlice } from '@reduxjs/toolkit'

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//                              ? JSON.parse(localStorage.getItem('shippingAddress'))
//                              : {}

const shippingSlice = createSlice({
    name: 'shipping',
    initialState: {
       shippingAddress: [] //shippingAddressFromStorage
    },
    reducers:{

        saveShippingAdress(state, action) {

                state.shippingAddress = action.payload
                
        },


    }
})
export const shippingActions = shippingSlice.actions
export const shippingReducer = shippingSlice.reducer
export default shippingSlice