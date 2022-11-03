import Styles from './ProductCard.module.css';
import { Iproduct } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface props {
  product: Iproduct;
  // eslint-disable-next-line no-unused-vars
  CallBack: (product: Iproduct) => void;
}

// producto: producto
// dialogcallback: funcion para abrir el modal
export function ProductCard(props: props) {
  return (
    <article className={Styles.product}>
      <FiHeart className={Styles.product__heart} color={'red'} size={'1.4em'} />
      <img
        onClick={() => {
          props.CallBack(props.product);
        }}
        className={Styles.product__image}
        src={props.product.image}
        alt={props.product.name}
      />
      <h3 className={Styles.product__name}>{props.product.name}</h3>
      {props.product.units !== '' && (
        <span className={Styles.product__units}>{props.product.units}</span>
      )}
      <span className={Styles.product__price}>{props.product.price + '€'}</span>
      <button className={Styles.product__button}>
        <FiShoppingCart /> Add to cart
      </button>
    </article>
  );
}
