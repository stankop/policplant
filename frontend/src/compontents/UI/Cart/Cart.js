import classes from './Cart.module.css'
import CartModal from '../CartModal'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = (props) => {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const totalAmount = cartItems?.reduce((total, item) => 
        {
            return total + item.qty * item.price
        }, 0)
    
    const hasItems = cartItems?.length >0

    const cartItemRemoveHanlder= id => {

        //cartCtx.removeItem(id)
    }

    const cartItemAddHanlder = item => {

        //cartCtx.addItem({...item, amount:1})
    }
    const cartitems = 
    <ul className={classes['cart-items']}>
        {
        cartItems?.map(order => 
            (<CartItem key={order.id} 
                       name={order.name}
                       qty={order.qty} 
                       price={order.price}
                       onRemove={cartItemRemoveHanlder.bind(null, order._id)} 
                       onAdd={cartItemAddHanlder.bind(null, order)}>

            </CartItem>
 
        ))}
    
    </ul>
    

    return <CartModal onClose={props.onClose} >
        {cartitems}
        <div className={classes.total}>
            <span>Ukupan iznos</span>
            <span>RSD {totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}> Narudzba</button>}
        </div>
    </CartModal>
}

export default Cart