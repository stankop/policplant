import { orderPayActions } from './orderPay-slice'
import axios from 'axios'


export const payOrder = (id, paymentResult) => {
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
            
            const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
           
            return data;
        }

        try {
            dispatch(orderPayActions.orderPayRequest())
            const data = await fetchData()
            
            dispatch(orderPayActions.orderPaySuccess(data))
           

        } catch (error) {
            
            dispatch(
                orderPayActions.orderPayFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}


