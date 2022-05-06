import { createSlice } from '@reduxjs/toolkit'

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        loading: false,
        error: null,
        page:1,
        pages:1
    },
    reducers:{
        productListRequest(state){
            state.loading = true
            state.products = []
        },

        productListSuccess(state, action) {
                    state.loading = false
                    state.products = action.payload.products
                    state.page = action.payload.page
                    state.pages = action.payload.pages
        },

        productListFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const productListActions = productListSlice.actions
export const productListReducer = productListSlice.reducer
export default productListSlice