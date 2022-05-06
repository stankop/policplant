import { userListActions } from './userList-slice'
import axios from 'axios'

export const listUsers = () => {
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
            const { data } = await axios.get(`/api/users/`, config)
            return data;
        }

        try {
            dispatch(userListActions.userListRequest())
            const data = await fetchData()
            
            dispatch(userListActions.userListSuccess(data))
 

        } catch (error) {
            
            dispatch(
                userListActions.userListFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

