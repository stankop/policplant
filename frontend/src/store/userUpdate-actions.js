import { userUpdateActions } from './userUpdate-slice' 
import { userListActions } from './userList-slice'
import { listUsers } from '../store/userList-actions'
import axios from 'axios'

export const updateUser = (user) => {
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
            const { data } = await axios.put(`/api/users/update/${user._id}/`,
            user, config)
            return data;
        }

        try {
            dispatch(userUpdateActions.userUpdateRequest())
            const data = await fetchData()
           
            dispatch(userUpdateActions.userUpdateSuccess())
            dispatch(listUsers())

        } catch (error) {
            
            dispatch(
                userUpdateActions.userUpdateFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}


export const updateUserReset = () => {
    return async (dispatch) => {

       

        try {
            dispatch(userUpdateActions.userUpdateReset())

        } catch (error) {
            
            dispatch(
                userUpdateActions.userUpdateFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}