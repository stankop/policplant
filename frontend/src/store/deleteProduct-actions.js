import { deleteProductActions} from './deleteProduct-slice'
import axios from 'axios'

export const deleteProduct = (id) => {
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
            const { data } = await axios.delete(`/api/products/delete/${id}`, config)
            return data;
        }

        try {
            dispatch(deleteProductActions.deleteProductRequest())
            const cartData = await fetchData()
            dispatch(deleteProductActions.deleteProductSuccess(cartData))

        } catch (error) {
            dispatch(
                deleteProductActions.deleteProductFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const deleteProductReset = () => {
    return async (dispatch) => {

        dispatch(deleteProductActions.deleteProductReset())
    }
}




       

     
