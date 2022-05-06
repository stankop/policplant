import {configureStore} from '@reduxjs/toolkit'
import { productListReducer } from './product-slice'
import { productDetailsReducer } from './productDetails-slice'
import { cartReducer } from './cart-slice'
import { userReducer } from './user_slice'
import { userRegisterReducer } from './userRegister-slice'
import { userDetailsReducer } from './userDetails-slice'
import { userUpdateProfileReducer } from './userUpdateProfile-slice'
import { shippingReducer } from './shipping-slice'
import { paymentReducer } from './payment-slice'
import { orderReducer } from './order-slice'
import { orderDetailsReducer} from './orderDetails-slice'
import { orderPayReducer} from './orderPay-slice'
import { orderOrdersProfileReducer} from './orderOrdersProfile-slice'
import { userListReducer} from './userList-slice'
import { userDeleteReducer} from './userDelete-slice'
import { reviewCreateReducer } from './review-slice'
import { caruselReducer} from './carusel-slice'

const store = configureStore({
    reducer:{
        productList: productListReducer,
        product: productDetailsReducer,
        cart: cartReducer,
        userLogin: userReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        shipping: shippingReducer,
        payment: paymentReducer,
        order: orderReducer,
        orderDetail: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderOrdersProfile: orderOrdersProfileReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        reviewCreate: reviewCreateReducer,
        carusel: caruselReducer
    }
})

export default store