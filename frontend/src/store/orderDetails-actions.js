import { orderDetailsActions } from './orderDetails-slice'
import axios from 'axios'


export const getOrderDetails = (id) => {
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
            
            const { data } = await axios.get(`/api/orders/${id}`, config)
            
            return data;
        }

        try {
            dispatch(orderDetailsActions.orderDetailsRequest())
            const data = await fetchData()
            
            dispatch(orderDetailsActions.orderDetailsSuccess(data))
           

        } catch (error) {
            
            dispatch(
                orderDetailsActions.orderDetailsFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}
