import { updateProductActions} from './updateProduct-slice'
import { productDetails } from './product-actions'
import axios from 'axios'

export const updateProduct = (product, images) => {
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
            product)
            return data;
        }

        const uploadData = async (product_id, images) => {

            const files = images //e.target.filesconsole.log('form fils:', files)
            const formData = new FormData()
            const arr = Array.from(files)
            arr?.forEach(x => 
                formData.append('images', x)
            )
            //formData.append('image', files)
            formData.append('product_id', product_id)
            
            try {
                const config = {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = await axios.post('/api/products/upload/', formData, config)

            } catch (error) {
           
            }
        }

        try {
            dispatch(updateProductActions.updateProductRequest())
            const cartData = await fetchData()
            dispatch(updateProductActions.updateProductSuccess(cartData))
            const imageData = await uploadData(product._id, images)
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

export const updateProductDetails = (id) => {
    return async (dispatch) => {


        const fetchData = async () => {
           
            const { data } = await axios.get(`/api/products/${id}`)
            return data;
        }

        try {
            dispatch(updateProductActions.updateProductRequest())
            const cartData = await fetchData()
            dispatch(updateProductActions.updateProductSuccess(cartData))

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



       

     
