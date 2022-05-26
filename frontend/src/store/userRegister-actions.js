import { userRegisterActions } from './userRegister-slice' 
import { userActions } from './user_slice'
import axios from 'axios'

export const register = (username, email, password, fullname, place, address, self_phone, fix_phone) => {
    return async (dispatch) => {


        const fetchData = async () => {

            const config = {
                headers:{
                    'Content-type':'application/json'
                }
            }
            const { data } = await axios.post('/api/users/register/',
            {
                'name':username,
                'email': email,
                'username': fullname,
                'place': place,
                'address': address,
                'self_phone': self_phone,
                'fix_phone': fix_phone,
                'password': password
            }, config)
            return data;
        }

        try {
            dispatch(userRegisterActions.userRegisterRequest())
            const data = await fetchData()
            dispatch(userRegisterActions.userRegisterSuccess(data))

            dispatch(userActions.userLoginSuccess(data))

            localStorage.setItem('userInfo', JSON.stringify(data))

        } catch (error) {
            
            dispatch(
                userRegisterActions.userRegisterFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}