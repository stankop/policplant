import { userDeleteActions } from './userDelete-slice'
import axios from 'axios'

export const deleteUser = (id) => {
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
            const { data } = await axios.delete(`/api/users/delete/${id}`, config)
            return data;
        }

        try {
            dispatch(userDeleteActions.userDeleteRequest())
            const data = await fetchData()
            
            dispatch(userDeleteActions.userDeleteSuccess())
 

        } catch (error) {
            
            dispatch(
                userDeleteActions.userDeleteFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

