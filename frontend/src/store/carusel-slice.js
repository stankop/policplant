import { createSlice } from '@reduxjs/toolkit'

const caruselSlice = createSlice({
    name: 'carusel',
    initialState: {
        products: [],
        loading: false,
        error: null,
        
    },
    reducers:{
        caruselRequest(state){
            state.loading = true
            state.products = []
        },

        caruselSuccess(state, action) {
                    state.loading = false
                    state.products = action.payload
                    
        },

        caruselFail(state, action) {
            state.loading = false
            state.error = action.payload
        }

    }
})
export const caruselActions = caruselSlice.actions
export const caruselReducer = caruselSlice.reducer
export default caruselSlice