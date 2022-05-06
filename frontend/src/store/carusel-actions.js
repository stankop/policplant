import { caruselActions } from './carusel-slice'
import axios from 'axios'

export const caruselTop = () => {
    return async (dispatch, getState) => {

       

        const fetchData = async () => {

            
            const { data } = await axios.get(
                `/api/products/carusel/top/`)
            return data;
        }

        try {
            dispatch(caruselActions.caruselRequest())
            const data = await fetchData()
            
            dispatch(caruselActions.caruselSuccess(data))
 

        } catch (error) {
            
            dispatch(
                caruselActions.caruselFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

