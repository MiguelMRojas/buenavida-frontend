import Styles from './ProductCard.module.css';
import { Iproduct, ICartItem } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { isLoggedIn, addToCart, favorites, addToFavorites, removeFromFavorites } =
    useContext(SessionContext);

  const navigate = useNavigate();

  console.log(props.product.discount);

  const HandleAddToCart = async () => {
    const CartItem: ICartItem = {
      id: props.product.id,
      name: props.product.name,
      units: props.product.units,
      quantity: 0,
      price: props.product.price,
      image: props.product.image,
    };

    const wasAdded = await addToCart(CartItem);

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
      {favorites.some((id) => id === props.product.id) ? (
        <FaHeart
          className={Styles.product__heart}
          color={'red'}
          size={'1.4em'}
          onClick={() => {
            removeFromFavorites(props.product.id);
          }}
        />
      ) : (
        <FiHeart
          className={Styles.product__heart}
          color={'red'}
          size={'1.4em'}
          onClick={() => {
            if (isLoggedIn) {
              addToFavorites(props.product.id);
            } else {
              navigate('/login');

              toast.warn('Log in to manage your favorites', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
                theme: 'light',
              });
            }
          }}
        />
      )}
      {props.product.discount !== 0 ? (
        <span className={Styles.product__discount}>-{props.product.discount}%</span>
      ) : (
        ''
      )}
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
      <span className={Styles.product__price}>{props.product.price + '???'}</span>
      <button
        className={Styles.product__button}
        onClick={() => {
          if (isLoggedIn) {
            HandleAddToCart();
          } else {
            navigate('/login');

            toast.warn('Log in to manage your cart', {
              position: 'top-right',
              autoClose: 2500,
              pauseOnHover: true,
              theme: 'light',
            });
          }
        }}
      >
        <FiShoppingCart /> Add to cart
      </button>
    </article>
  );
}
