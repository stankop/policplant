import { orderActions } from './order-slice'
import axios from 'axios'
import { cartActions } from './cart-slice'

export const createOrder = (order) => {
    return async (dispatch, getState) => {

        const {
            userLogin:{ userInfo }
        } = getState()

        const fetchData = async () => {

            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                
            }
            const { data } = await axios.post(`/api/orders/add/`, order, config)
            return data;
        }

        try {
            dispatch(orderActions.orderCreateRequest())
            const data = await fetchData()
            
            dispatch(orderActions.orderCreateSuccess(data))
            dispatch(cartActions.cleanCartItems())

            console.log('Pre localstorage remove')
            localStorage.removeItem('cartItems')
            console.log('Posle localstorage remove')


        } catch (error) {
            
            dispatch(
                orderActions.orderCreateFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

export const resetOrder = () => {
    return async (dispatch) => {

       
        dispatch(orderActions.orderCreateReset())
       
           
    }
}