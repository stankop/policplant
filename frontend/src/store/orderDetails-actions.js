import { orderDetailsActions } from './orderDetails-slice'
import axios from 'axios'


export const getOrderDetails = (id) => {
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
            const { data } = await axios.get(`/api/orders/${id}`, config)
            console.log('Fetched data:',data)
            return data;
        }

        try {
            dispatch(orderDetailsActions.orderDetailsRequest())
            const data = await fetchData()
            console.log('This is a data:',data)
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
