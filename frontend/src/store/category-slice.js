import { createSlice } from '@reduxjs/toolkit'

const categoryListSlice = createSlice({
    name: 'categoryList',
    initialState: {
        categories: [],
        allcategories:[],
        loading: false,
        success: false,
        error: '',
        page:1,
        pages:1
    },
    reducers:{
        categoryListRequest(state){
            state.loading = true
            state.success = false
            state.categories = []
        },

        categoryListSuccess(state, action) {
                    state.loading = false
                    state.categories = action.payload.categories
                    state.allcategories = action.payload.allcategories
                    state.success = true
                    state.page = action.payload.page
                    state.pages = action.payload.pages
        },

        categoryListFail(state, action) {
            state.loading = false
            state.error = action.payload
            state.success = false
        }

    }
})
export const categoryListActions = categoryListSlice.actions
export const categoryListReducer = categoryListSlice.reducer
export default categoryListSlice