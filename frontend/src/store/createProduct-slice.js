import { createSlice } from '@reduxjs/toolkit'

const createProductSlice = createSlice({
    name: 'createProduct',
    initialState: {
        loading:false,
        success: false,
        error: '',
        product: {}
    },
    reducers:{
        createProductRequest(state){
            state.loading = true
            
        },

        createProductSuccess(state, action) {
            state.loading = false
            state.success = true
            state.product = action.payload        
        },

        createProductFail(state, action) {
            state.loading = false
            state.error = action.payload
            state.success = false
        },
        createProductReset(state, action) {
            
            state.product = {}
            state.success = false
            state.error = ''
        }

    }
})
export const createProductActions = createProductSlice.actions
export const createProductReducer = createProductSlice.reducer
export default createProductSlice