import Styles from './ShopCartPageRow.module.css';
import { useContext } from 'react';
import { SessionContext } from '../../../context/SessionContext';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
  const { removeFromCart, updateCart } = useContext(SessionContext);

  const HandleRemoveFromCart = async () => {
    const wasDeleted = await removeFromCart(props.product.id);

    if (wasDeleted) {
      toast.success(`Successfully remove ${props.product.name} from the cart`, {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });
    } else {
      toast.error(`Unable to remove ${props.product.name} from the cart. Try again.`, {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });
    }
  };

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
          onChange={(e) => {
            // Update value on session
            const value = e.target.value;
            updateCart({ id: props.product.id, amount: value });
          }}
        />
      </div>
      <div className={`${Styles.product__col} ${Styles.product__priceContainer}`}>
        <p className={Styles.product__price}>{props.product.price}€</p>
      </div>
      <div className={`${Styles.product__col} ${Styles.product__trashContainer}`}>
        <FiTrash2
          color='red'
          size={'1.2em'}
          onClick={() => {
            HandleRemoveFromCart();
          }}
        />
      </div>
    </article>
  );
}
