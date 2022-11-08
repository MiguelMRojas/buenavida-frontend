import Styles from './ProductCard.module.css';
import { Iproduct } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { toast } from 'react-toastify';

interface props {
  product: Iproduct;
  // eslint-disable-next-line no-unused-vars
  CallBack: (product: Iproduct) => void;
}

// producto: producto
// dialogcallback: funcion para abrir el modal
export function ProductCard(props: props) {
  const { addToCart } = useContext(SessionContext);

  const HandleAddToCart = () => {
    const wasAdded = addToCart(props.product);

    if (wasAdded) {
      toast.success(`Successfully added ${props.product.name} to the cart`, {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });
    } else {
      toast.error(`Unable to add ${props.product.name} to the cart. Try again.`, {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });
    }
  };

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
      <button
        className={Styles.product__button}
        onClick={() => {
          HandleAddToCart();
        }}
      >
        <FiShoppingCart /> Add to cart
      </button>
    </article>
  );
}
