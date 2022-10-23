import Styles from './ProductCard.module.css';
import { Iproduct } from '../../interfaces/interfaces.ts';

export function ProductCard(props: Iproduct) {
  console.log(props);
  return (
    <article className={Styles.product}>
      <img className={Styles.product__image} src={props.image} alt={props.name} />
      <h3 className={Styles.product__name}>{props.name}</h3>
      {props.units !== '' && <span className={Styles.product__units}>{props.units}</span>}
      <span className={Styles.product__price}>{props.price + '€'}</span>
    </article>
  );
}
