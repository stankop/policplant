import classes from './OrderModal.module.css'
import OrderModal from './OrderModal'
import { useSelector } from 'react-redux'
import CartItem from '../Cart/CartItem'

const Order = (props) => {

    const orderDetail = useSelector((state) => state.orderDetail);
    const { cartItems } = orderDetail;

    const ord = useSelector((state) => state.order);
    const { order } = ord;

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


    return <OrderModal onClose={props.onClose} >
        {cartitems}
        <div className={classes.total}>
            <span>Ukupan iznos</span>
            <span>RSD {totalAmount?.toFixed(2)}</span>
        </div>
        <div className={classes.total}>
            <span>Order number:</span>
            <span>{order.id}</span>
        </div>
        <div>
            <p>Vase poruzdzbina je poslata na obradu. Mozete se vratiti na pocetnu stranu i  kreirati novu porudzbinu ukoliko zelite.</p>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>

        </div>
    </OrderModal>
}

export default Order