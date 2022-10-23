import Styles from './ProductCard.module.css';
import { Iproduct } from '../../interfaces/interfaces.ts';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

export function ProductCard(props: Iproduct) {
  return (
    <article className={Styles.product}>
      <FiHeart className={Styles.product__heart} color={'red'} size={'1.4em'} />
      <img className={Styles.product__image} src={props.image} alt={props.name} />
      <h3 className={Styles.product__name}>{props.name}</h3>
      {props.units !== '' && <span className={Styles.product__units}>{props.units}</span>}
      <span className={Styles.product__price}>{props.price + '€'}</span>
      <button className={Styles.product__button}>
        <FiShoppingCart /> Add to cart
      </button>
    </article>
  );
}
