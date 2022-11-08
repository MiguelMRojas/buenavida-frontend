import Styles from './CartDialogRow.module.css';

interface IProduct {
  image: string;
  name: string;
  units: string;
  quantity: number;
  price: number;
}

interface Iprops {
  product: IProduct;
}

export function CartDialogRow(props: Iprops) {
  return (
    <div className={Styles.cartItem}>
      <img className={Styles.cartItem__image} src={props.product.image} alt={props.product.name} />
      <div className={Styles.cartItem__content}>
        <h3 className={Styles.cartItem__title}>{props.product.name}</h3>
        <span className={Styles.cartItem__amount}>{props.product.units}</span>
        <div className={Styles.cartItem__footer}>
          <div className={Styles.cartItem__inputGroup}>
            <label htmlFor={props.product.name}>Cantidad</label>
            <input
              type='number'
              name={props.product.name}
              id={props.product.name}
              value={props.product.quantity}
            ></input>
          </div>
          <span className={Styles.cartItem__price}>{props.product.price}</span>
        </div>
      </div>
    </div>
  );
}
