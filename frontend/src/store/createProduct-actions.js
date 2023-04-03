import { createProductActions} from './createProduct-slice'
import axios from 'axios'

export const createProduct = (prod, images, items) => {
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
            const { data } = await axios.post(`/api/products/create/`,prod,config)
            return data;
        }


        const uploadData = async (product_id, img, itms) => {

            const items = itms
            const files = img //e.target.files
            const formData = new FormData()
            if(items){
                formData.append('items', JSON.stringify(items))
            }
            if(files){
                const arr = Array.from(files)
                arr?.forEach(x => 
                    formData.append('images', x)
                )
            }
           
            
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
            //const imageData = await uploadData(100, images) // ovo obrisati


            dispatch(createProductActions.createProductRequest())
            const productData = await fetchData()
            dispatch(createProductActions.createProductSuccess(productData))
            const {
                createProduct:{ product, success }
            } = getState()
            if(success){
                const imageData = await uploadData(product._id, images, items)
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

export const changeStanjeValue = (id, value) => {
    return async (dispatch) => {

        const formData = new FormData()
        formData.append('product_id', id)
        formData.append('value', value)
        const { data } = await axios.post('/api/products/changestate/', formData)
    }
}



       

     
