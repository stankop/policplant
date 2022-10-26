import { createSlice } from '@reduxjs/toolkit'

const categoryListSlice = createSlice({
    name: 'categoryList',
    initialState: {
        categories: [],
        allcategories:[],
        loading: false,
        error: '',
        page:1,
        pages:1
    },
    reducers:{
        categoryListRequest(state){
            state.loading = true
            state.categories = []
        },

        categoryListSuccess(state, action) {
                    state.loading = false
                    state.categories = action.payload.categories
                    state.allcategories = action.payload.allcategories
                    state.page = action.payload.page
                    state.pages = action.payload.pages
        },

        categoryListFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const categoryListActions = categoryListSlice.actions
export const categoryListReducer = categoryListSlice.reducer
export default categoryListSlice