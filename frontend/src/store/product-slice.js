import { createSlice } from '@reduxjs/toolkit'

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        allProducts:[],
        loading: false,
        error: '',
        success:false,
        page:1,
        pages:1
    },
    reducers:{
        productListRequest(state){
            state.loading = true
            state.success = false
            state.products = []
        },

        productListSuccess(state, action) {
                    state.loading = false
                    state.products = action.payload.products
                    state.success = true
                    state.page = action.payload.page
                    state.pages = action.payload.pages
        },

        productListFail(state, action) {
            state.loading = false
            state.error = action.payload
            state.success = false
        },

        productListResetSuccess(state, action) {
            state.loading = false
            state.error = ''
            state.success = false
            state.products = []
        },

        allProducts(state, action) {
           
            state.allProducts = action.payload.products
        }

    }
})
export const productListActions = productListSlice.actions
export const productListReducer = productListSlice.reducer
export default productListSlice