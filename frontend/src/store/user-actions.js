import { userActions} from './user_slice'
import { userDetailsActions } from './userDetails-slice'
import axios from 'axios'
import { orderOrdersProfileActions } from './orderOrdersProfile-slice'
import { userListActions } from './userList-slice'


export const login = (email, password) => {
    return async (dispatch) => {

        
        const fetchData = async () => {

            const config = {
                headers:{
                    'Content-type':'application/json'
                }
            }
            const { data } = await axios.post('/api/users/login/',
            {
                'username': email,
                'password': password
            }, config)
            return data;
        }

        try {
            dispatch(userActions.userLoginRequest())
            const data = await fetchData()
            dispatch(userActions.userLoginSuccess(data))

            localStorage.setItem('userInfo', JSON.stringify(data))


        } catch (error) {
            
            dispatch(
                userActions.userLoginFail(
                  error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message
                )
              );
        }
    }
}

export const logout =  () => {

    return (dispatch) => {

        localStorage.removeItem('userInfo')
        dispatch(userActions.userLogout())
        dispatch(userDetailsActions.userDetailsReset())
        dispatch(orderOrdersProfileActions.orderOrdersProfileReset())
        dispatch(userListActions.userDetailsReset())
    }
}

// export const productDetails = (id) => {
//     return async (dispatch) => {


//         const fetchData = async () => {
           
//             const { data } = await axios.get(`/api/products/${id}`)
//             return data;
//         }

//         try {
//             dispatch(productDetailsActions.productDetailsRequest())
//             const cartData = await fetchData()
//             dispatch(productDetailsActions.productDetailsSuccess(cartData))

//         } catch (error) {
//             dispatch(
//                 productDetailsActions.productDetailsFail(
//                   error.response && error.response.data.detail
//                   ? error.response.data.detail
//                   : error.message
//                 )
//               );
//         }

//     }
// }



       

     
