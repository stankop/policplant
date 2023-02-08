import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `RSD ${props.price}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.qty}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove} disabled={props.qty === 0}>−</button>
        <button onClick={props.onAdd}>+</button>
        <button onClick={props.removeItem}>X</button>
      </div>
    </li>
  );
};

export default CartItem;
