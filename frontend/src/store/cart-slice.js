import { createSlice } from '@reduxjs/toolkit'

const cartItemsFromStorage = localStorage.getItem('cartItems')
                             ? JSON.parse(localStorage.getItem('cartItems'))
                             : []
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems:cartItemsFromStorage
    },
    reducers:{
        addCartItem(state, action){
           
            const newItem = action.payload
            const existItem = state.cartItems.find(x => x.id === newItem.id)
            if(existItem){
                    state.cartItems.find(item => item.id === existItem.id).qty += newItem.qty

            }else{
                
                    state.cartItems.push(newItem) 
            }
        },

        removeCartItem(state, action) {
                const id = action.payload
                const existItem = state.cartItems.find(x => x.id === id)
                state.cartItems.remove(existItem.id)
        },

       cleanCartItems(state, action) {
            
            state.cartItems=[]
    },

    }
})
export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
export default cartSlice