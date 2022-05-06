import { orderPayActions } from './orderPay-slice'
import axios from 'axios'


export const payOrder = (id, paymentResult) => {
    return async (dispatch, getState) => {

        const {
            userLogin:{ userInfo }
        } = getState()

        console.log('starting fething data.........')
        const fetchData = async () => {

            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                
            }
            console.log('Before axios.........:',`/api/orders/${id}`)
            const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
            console.log('Fetched data:',data)
            return data;
        }

        try {
            dispatch(orderPayActions.orderPayRequest())
            const data = await fetchData()
            console.log('This is a data:',data)
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


