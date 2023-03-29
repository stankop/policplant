import CartIcon  from './Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import {  useEffect, useState } from 'react';
import {  useSelector } from 'react-redux'
import useScreenType from "react-screentype-hook";

const HeaderCartButton = (props) => {

    const [btnIsHihg, setBtnIsHigh] = useState(false)
    const screenType = useScreenType();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    
    const numberOfCartItems = cartItems?.reduce((currentNumber, item)=>{
        return currentNumber +  item.qty
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHihg ?  classes.bump : ''}`

    
    useEffect(() => {

        if(cartItems?.length === 0 ){
            return;
        }
        setBtnIsHigh(true)

        const timer = setTimeout(() => {
            setBtnIsHigh(false)
        }, 400)

        return () => {
            clearTimeout(timer)
        }

    }, [cartItems])

   
    return(
        <button  style={ screenType ? { width:'8rem', height:'4rem'} : {}}  className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon ></CartIcon>
            </span>
            <span>Vasa Korpa</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton