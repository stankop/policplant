import { shippingActions } from './shipping-slice'
import axios from 'axios'


export const saveShippingAddress = (data) => {
    return  (dispatch) => {

            dispatch(shippingActions.saveShippingAdress(data))
           
            localStorage.setItem('shippingAddress', JSON.stringify(data))

    }
}