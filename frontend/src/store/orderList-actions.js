import { orderListActions} from './orderList-slice'
import axios from 'axios'

export const listOrders = () => {
    return async (dispatch, getState ) => {

        const {userLogin: {userInfo}} = getState()
       
        const fetchData = async () => {

            const config = {
                headers:{
                    'Content-type':'application/jspon',
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
           
           
            const { data } = await axios.get(`/api/orders/`, config)
            
            return data;
        }

        try {
            dispatch(orderListActions.orderListRequest())
            const cartData = await fetchData()
            dispatch(orderListActions.orderListSuccess(cartData))

        } catch (error) {
            dispatch(
                orderListActions.orderListFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const addOrder = () => {
    return async (dispatch, getState ) => {}

}

export const removeOrder = () => {
    return async (dispatch, getState ) => {}

}



       

     
