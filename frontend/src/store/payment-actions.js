import { paymentActions } from './payment-slice'
import axios from 'axios'

export const savePaymentMethod = (data) => {
    return async (dispatch) => {


            dispatch(paymentActions.savePaymentMethod(data))
           
            localStorage.setItem('paymentMethod', JSON.stringify(data))
           

    }
}


