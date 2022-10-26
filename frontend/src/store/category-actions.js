import { categoryListActions} from './category-slice'

import axios from 'axios'

export const listCategories = (keyword = '', page) => {
    return async (dispatch) => {

        const fetchData = async () => {

            if(keyword === null){
                keyword = ''
            }
           
            const { data: categories } = await axios.get(`/api/products/categories/`)
            const { data: allcategories } = await axios.get(`/api/products/allcategories/`)

            return { categories, allcategories };
        }

        try {
            dispatch(categoryListActions.categoryListRequest())
            const cartData = await fetchData()
            dispatch(categoryListActions.categoryListSuccess(cartData))

        } catch (error) {
            dispatch(
                categoryListActions.categoryListFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}





       

     
