import { createSlice } from '@reduxjs/toolkit'

const productDetailsSlice = createSlice({
    name: 'product',
    initialState: {
            product: {},
            reviews:[],
            loading: false,
            error:null

    },
    reducers:{
        productDetailsRequest(state){
            state.loading = true
            
        },

        productDetailsSuccess(state, action) {
                    state.loading = false
                    state.product = action.payload
        },

        productDetailsFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const productDetailsActions = productDetailsSlice.actions
export const productDetailsReducer = productDetailsSlice.reducer
export default productDetailsSlice