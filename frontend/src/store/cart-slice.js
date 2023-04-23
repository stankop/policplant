import { createSlice } from '@reduxjs/toolkit'

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//                              ? JSON.parse(localStorage.getItem('cartItems'))
//                              : []
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems:[], // cartItemsFromStorage,
        dostava:'',
        placanje:''
    },
    reducers:{
        addCartItem(state, action){
           
            const newItem = action.payload
            const existItem = state.cartItems.find(x => x.id === newItem.id)
            if(existItem){
                    state.cartItems.find(item => item.id === existItem.id).qty = newItem.qty

            }else{
                
                    state.cartItems.push(newItem) 
            }
        },

        removeCartItem(state, action) {
                const id = action.payload
                const excludeCartItem = state.cartItems.filter(x => x.id !== id)
                state.cartItems = excludeCartItem
        },

       cleanCartItems(state, action) {
            
            state.cartItems=[]
       },

       addDostavaAndPlacanje(state, action) {
            const obj = action.payload
            state.dostava = obj.dostava
            state.placanje = obj.placanje
       },

       removeCartItemByOne(state, action){
            const id = action.payload
            state.cartItems.find(x => x.id === id).qty -= 1
       },
       addCartItemByOne(state, action){
        const id = action.payload
        state.cartItems.find(x => x.id === id).qty += 1
   }

    }
})
export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
export default cartSlice