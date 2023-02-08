import { productListActions} from './product-slice'
import { productDetailsActions} from './productDetails-slice'
import axios from 'axios'

export const listProducts = (keyword = '', page) => {
    return async (dispatch) => {

        const fetchData = async () => {

            if(keyword === null){
                keyword = ''
            }
           
            const { data } = await axios.get(`/api/products/?keyword=${keyword}&page=${page}`)
            return data;
        }

        try {
            dispatch(productListActions.productListRequest())
            const cartData = await fetchData()
            dispatch(productListActions.productListSuccess(cartData))

        } catch (error) {
            dispatch(
                productListActions.productListFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const productDetails = (id) => {
    return async (dispatch) => {


        const fetchData = async () => {
           
            const { data } = await axios.get(`/api/products/${id}`)
            return data;
        }

        try {
            dispatch(productDetailsActions.productDetailsRequest())
            const cartData = await fetchData()
            dispatch(productDetailsActions.productDetailsSuccess(cartData))

        } catch (error) {
            dispatch(
                productDetailsActions.productDetailsFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}

export const listFilterProducts = (value) => {
    return async (dispatch) => {

        
        const val = {
                color: value.color,
                high: value.high,
                type: value.type,
                category: value.category,
                flow: value.flow,
                place: value.place,
                search: value.search,
                keyword: value.keyword
            }
            
        
        const fetchData = async () => {
            
            const { data } = await axios.post(`/api/products/filter/`,val)
            return data;
        }

        try {
            dispatch(productListActions.productListRequest())
            const prodData = await fetchData()
            dispatch(productListActions.productListSuccess(prodData))

        } catch (error) {
            dispatch(
                productListActions.productListFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}




       

     
