import { reviewCreateActions } from './review-slice'
import axios from 'axios'

export const createReview = (productId, review) => {
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
            const { data } = await axios.post(
                `/api/products/${productId}/reviews/`,
                review,
                config)
            return data;
        }

        try {
            dispatch(reviewCreateActions.reviewCreateRequest ())
            const data = await fetchData()
            
            dispatch(reviewCreateActions.reviewCreateSuccess(data))
 

        } catch (error) {
            
            dispatch(
                reviewCreateActions.reviewCreateFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

