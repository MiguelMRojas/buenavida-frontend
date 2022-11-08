import Styles from './CartDialogRow.module.css';

interface IProduct {
  image: string;
  title: string;
  units: string;
  onCart: number;
  price: number;
}

interface Iprops {
  product: IProduct;
}

export function CartDialogRow(props: Iprops) {
  console.table(props.product);
  return (
    <div className={Styles.cartItem}>
      <img className={Styles.cartItem__image} src={props.product.image} alt={props.product.title} />
      <div className={Styles.cartItem__content}>
        <h3 className={Styles.cartItem__title}>{props.product.title}</h3>
        <span className={Styles.cartItem__amount}>{props.product.units}</span>
        <div className={Styles.cartItem__footer}>
          <div className={Styles.cartItem__inputGroup}>
            <label htmlFor={props.product.title}>Cantidad</label>
            <input
              type='number'
              name={props.product.title}
              id={props.product.title}
              value={props.product.onCart}
            ></input>
          </div>
          <span className={Styles.cartItem__price}>{props.product.price}</span>
        </div>
      </div>
    </div>
  );
}
