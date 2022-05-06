import { orderOrdersProfileActions } from './orderOrdersProfile-slice'
import axios from 'axios'


export const listMyOrders = () => {
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
            
            const { data } = await axios.get(`/api/orders/myorders`, config)
            
            return data;
        }

        try {
            dispatch(orderOrdersProfileActions.orderOrdersProfileRequest())
            const data = await fetchData()
           
            dispatch(orderOrdersProfileActions.orderOrdersProfileSuccess(data))
           

        } catch (error) {
            
            dispatch(
                orderOrdersProfileActions.orderOrdersProfileFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}
