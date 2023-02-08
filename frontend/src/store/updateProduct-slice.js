import { createSlice } from '@reduxjs/toolkit'

const updateProductSlice = createSlice({
    name: 'updateProduct',
    initialState: {
        loading:false,
        success: false,
        error: '',
        product: {}
    },
    reducers:{
        updateProductRequest(state){
            state.loading = true
            //state.success = false
        },

        updateProductSuccess(state, action) {
            state.loading = false
            state.success = true
            state.error = ''
            state.product = action.payload        
        },

        updateProductFail(state, action) {
            state.loading = false
            state.error = action.payload
            state.success = false
        },
        updateProductReset(state, action) {
            
            state.product = {}
            state.success = false
            state.error = ''
        }

    }
})
export const updateProductActions = updateProductSlice.actions
export const updateProductReducer = updateProductSlice.reducer
export default updateProductSlice