import { createProductActions} from './createProduct-slice'
import axios from 'axios'

export const createProduct = () => {
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
            const { data } = await axios.post(`/api/products/create/`,{}, config)
            return data;
        }

        try {
            dispatch(createProductActions.createProductRequest())
            const cartData = await fetchData()
            dispatch(createProductActions.createProductSuccess(cartData))

        } catch (error) {
            dispatch(
                createProductActions.createProductFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const productReset = () => {
    return async (dispatch) => {

        dispatch(createProductActions.createProductReset())
    }
}



       

     
