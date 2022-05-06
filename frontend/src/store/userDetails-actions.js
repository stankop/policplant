import { userDetailsActions } from './userDetails-slice' 
import { userActions } from './user_slice'
import axios from 'axios'

export const getUserDetails = (id) => {
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
            const { data } = await axios.get(`/api/users/${id}/`, config)
            return data;
        }

        try {
            dispatch(userDetailsActions.userDetailsRequest())
            const data = await fetchData()
            console.log('---------------------------------')
            dispatch(userDetailsActions.userDetailsSuccess(data))


        } catch (error) {
            
            dispatch(
                userDetailsActions.userDetailsFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}