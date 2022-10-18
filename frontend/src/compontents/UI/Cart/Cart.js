import classes from './Cart.module.css'
import CartModal from '../CartModal'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { removeItem , addItem} from '../../../store/cart-actions'

const Cart = (props) => {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch()

    const totalAmount = cartItems?.reduce((total, item) => 
        {
            return total + item.qty * item.price
        }, 0)
    
    const hasItems = cartItems?.length >0

    const cartItemRemoveHanlder= id => {

        dispatch(removeItem(id))
    }

    const cartItemAddHanlder = id => {

        dispatch(addItem(id))
    }
    const cartitems = 
    <ul className={classes['cart-items']}>
        {
        cartItems?.map(order => 
            (<CartItem key={order.id} 
                       name={order.name}
                       qty={order.qty} 
                       price={order.price}
                       onRemove={() => cartItemRemoveHanlder(order.id)} 
                       onAdd={() => cartItemAddHanlder(order.id)}>

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