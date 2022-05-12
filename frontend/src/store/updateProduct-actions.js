import { updateProductActions} from './updateProduct-slice'
import { productDetails } from './product-actions'
import axios from 'axios'

export const updateProduct = (product) => {
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
            const { data } = await axios.put(`/api/products/update/${product._id}/`,
            product, config)
            return data;
        }

        try {
            dispatch(updateProductActions.updateProductRequest())
            const cartData = await fetchData()
            dispatch(updateProductActions.updateProductSuccess(cartData))
            dispatch(productDetails(product._id))

        } catch (error) {
            dispatch(
                updateProductActions.updateProductFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const updateProductReset = () => {
    return async (dispatch) => {

        dispatch(updateProductActions.updateProductReset())
    }
}



       

     
