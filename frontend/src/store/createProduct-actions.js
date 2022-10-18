import { createProductActions} from './createProduct-slice'
import axios from 'axios'

export const createProduct = (prod, image) => {
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
            const { data } = await axios.post(`/api/products/create/`,prod, config)
            return data;
        }


        const uploadData = async (product_id, img) => {

            const file = img //e.target.files[0]
         
            const formData = new FormData()

            formData.append('image', file)
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
            dispatch(createProductActions.createProductRequest())
            const productData = await fetchData()
            dispatch(createProductActions.createProductSuccess(productData))
            const {
                createProduct:{ product, success }
            } = getState()
            if(success){
                const imageData = await uploadData(product._id, image)
            }
            dispatch(createProductActions.createProductReset())

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



       

     
