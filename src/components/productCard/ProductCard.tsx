import Styles from './ProductCard.module.css';
import { Iproduct } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

// producto: producto
// dialogcallback: funcion para abrir el modal
export function ProductCard({producto, DialogCallback}) {

  return (
    <article className={Styles.product}>
      <FiHeart className={Styles.product__heart} color={'red'} size={'1.4em'} />
      <img onClick={()=>{DialogCallback(producto)}} className={Styles.product__image} src={producto.image} alt={producto.name} />
      <h3 className={Styles.product__name}>{producto.name}</h3>
      {producto.units !== '' && <span className={Styles.product__units}>{producto.units}</span>}
      <span className={Styles.product__price}>{producto.price + '€'}</span>
      <button className={Styles.product__button}>
        <FiShoppingCart /> Add to cart
      </button>
    </article>
  );
}


