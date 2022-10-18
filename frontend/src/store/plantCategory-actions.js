import { plantCategoryActions} from './plantCategory-slice'
import axios from 'axios'

export const plantCategories = () => {
    return async (dispatch) => {

        const fetchData = async () => {
           
            const { data } = await axios.get(`/api/products/categories/`)
            return data;
        }

        try {
            dispatch(plantCategoryActions.plantCategoryRequest())
            const categoriesData = await fetchData()
            dispatch(plantCategoryActions.plantCategorySuccess(categoriesData))

        } catch (error) {
            dispatch(
                plantCategoryActions.plantCategoryFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }

    }
}




       

     
