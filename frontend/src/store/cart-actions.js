import { cartActions } from './cart-slice'
import axios from 'axios'

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {

        const fetchData = async () => {

            const { data } = await axios.get(`/api/products/${id}`)
            return data;
        }

        try {

            const data = await fetchData()
            const product = {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: qty
            }
            dispatch(cartActions.addCartItem(product))
           
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
           

        } catch (error) {
            
        }

    }
}

export const removeFromCart = (id) => {
    return  (dispatch, getState) => {

            dispatch(cartActions.removeCartItem(id))
           
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    }
}

export const addDostavaAndPlacanjeCart = (dostava, placanje) => {
    return  (dispatch) => {
            console.log("ovo je actions");
            const item = {
                dostava,
                placanje
            }
            dispatch(cartActions.addDostavaAndPlacanje(item))

    }
}