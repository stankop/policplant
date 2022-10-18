import { createSlice } from '@reduxjs/toolkit'

const plantCategorySlice = createSlice({
    name: 'plantCategory',
    initialState: {
        categories: {},
        loading: false,
        error: ''
    },
    reducers:{
        plantCategoryRequest(state){
            state.loading = true
        },

        plantCategorySuccess(state, action) {
            state.loading = false
            state.error = false
            state.categories = action.payload     
        },

        plantCategoryFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const plantCategoryActions = plantCategorySlice.actions
export const plantCategoryReducer = plantCategorySlice.reducer
export default plantCategorySlice