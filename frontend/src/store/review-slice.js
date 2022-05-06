import { createSlice } from '@reduxjs/toolkit'

const reviewCreateSlice = createSlice({
    name: 'reviewCreate',
    initialState: {
        success:false,
        loading: false,
        error: null
    },
    reducers:{
        reviewCreateRequest(state){
            state.loading = true
            
        },

        reviewCreateSuccess(state, action) {
                    state.loading = false
                    state.success = true
        },

        reviewCreateFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        reviewCreateReset(state, action){
            state.success = false
            state.loading = false
            state.error =  null
        }

    }
})
export const reviewCreateActions = reviewCreateSlice.actions
export const reviewCreateReducer = reviewCreateSlice.reducer
export default reviewCreateSlice