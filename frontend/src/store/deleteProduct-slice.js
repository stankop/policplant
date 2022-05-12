import { createSlice } from '@reduxjs/toolkit'

const deleteProductSlice = createSlice({
    name: 'deleteProduct',
    initialState: {
        loading:false,
        success: false,
        error: null
    },
    reducers:{
        deleteProductRequest(state){
            state.loading = true
        },

        deleteProductSuccess(state, action) {
            state.loading = false
            state.success = true
                    
        },

        deleteProductFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        deleteProductReset(state, action) {
            state.error = null
            state.success = false
        }

    }
})
export const deleteProductActions = deleteProductSlice.actions
export const deleteProductReducer = deleteProductSlice.reducer
export default deleteProductSlice