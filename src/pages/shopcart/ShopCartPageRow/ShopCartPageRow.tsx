import Styles from './ShopCartPageRow.module.css';
import { useContext } from 'react';
import { SessionContext } from '../../../context/SessionContext';
import { FiTrash2 } from 'react-icons/fi';

interface IProduct {
  id: string;
  image: string;
  name: string;
  units: string;
  quantity: number;
  price: number;
}

interface IProps {
  product: IProduct;
}

export function ShopCartPageRow(props: IProps) {
  const { removeFromCart } = useContext(SessionContext);

  return (
    <article className={Styles.product}>
      <img className={Styles.product__image} src={props.product.image} alt={props.product.name} />
      <div className={Styles.product__details}>
        <h3 className={Styles.product__title}>{props.product.name}</h3>
        <p className={Styles.product__units}>Unidades: {props.product.units}</p>
      </div>
      <div className={Styles.product__group}>
        <label className={Styles.product__label} htmlFor={props.product.name}>
          Cantidad
        </label>
        <input
          className={Styles.product__input}
          type='number'
          id={props.product.name}
          name={props.product.name}
          value={props.product.quantity}
        />
      </div>
      <div className={Styles.product__col}>
        <p className={Styles.product__price}>{props.product.price}€</p>
      </div>
      <div className={Styles.product__col}>
        <FiTrash2
          color='red'
          size={'1.2em'}
          onClick={() => {
            removeFromCart(props.product.id);
          }}
        />
      </div>
    </article>
  );
}
