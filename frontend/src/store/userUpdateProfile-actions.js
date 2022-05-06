import { userUpdateProfileActions } from './userUpdateProfile-slice' 
import { userActions } from './user_slice'
import axios from 'axios'

export const updateUserProfile = (user) => {
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
            const { data } = await axios.put(`/api/users/profile/update/`, user, config)
            return data;
        }

        try {
            dispatch(userUpdateProfileActions.userUpdateProfileRequest())
            const data = await fetchData()
            
            dispatch(userUpdateProfileActions.userUpdateProfileSuccess(data))

            dispatch(userActions.userLoginSuccess())

            localStorage.setItem('userInfo', JSON.stringify(data))

        } catch (error) {
            
            dispatch(
                userUpdateProfileActions.userUpdateProfileFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}