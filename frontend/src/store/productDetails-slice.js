import { createSlice } from '@reduxjs/toolkit'

const productDetailsSlice = createSlice({
    name: 'product',
    initialState: {
            product: {},
            loading: false,
            success: false,
            error:''

    },
    reducers:{
        productDetailsRequest(state){
            state.loading = true
            state.success = false
        },

        productDetailsSuccess(state, action) {
                    state.loading = false
                    state.success = true
                    state.product = action.payload
                    state.error = ''
        },

        productDetailsFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        productDetailsReset(state) {
            
           
            state.success = false
            state.error = ''
        }

    }
})
export const productDetailsActions = productDetailsSlice.actions
export const productDetailsReducer = productDetailsSlice.reducer
export default productDetailsSlice