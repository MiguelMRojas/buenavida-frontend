import Styles from './CartDialog.module.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import { FiX } from 'react-icons/fi';
import { CartDialogRow } from './CartDialogRow/CartDialogRow';
import { toast } from 'react-toastify';

interface IProps {
  closeCallback: () => void;
}

export function CartDialog(props: IProps) {
  const { isLoggedIn, cart, makeOrder } = useContext(SessionContext);
  const navigate = useNavigate();

  const GetCartTotal = () => {
    const price = cart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    return price.toFixed(2);
  };

  return (
    <article className={Styles.dialog}>
      <div className={Styles.dialog__header}>
        <h2 className={Styles.dialog__title}>Mi carrito</h2>
        <FiX
          className={Styles.dialog__close}
          size={'1.2em'}
          onClick={() => props.closeCallback()}
        />
      </div>
      <div className={Styles.dialog__body}>
        {cart.map((item, index) => {
          return <CartDialogRow product={item} key={index} />;
        })}
      </div>
      {/*<div className={Styles.dialog__subtotal}>
        <p>Subtotal</p>
        <p>38,40</p>
      </div>
      */}
      <div className={Styles.dialog__total}>
        <p className={Styles.rowText}>Total</p>
        <p>{GetCartTotal()}</p>
      </div>
      <Link className={Styles.dialog__button} to='/cart'>
        Ir al carrito
      </Link>
      <button
        className={Styles.dialog__button}
        onClick={() => {
          // Redirects to login if the user is not authenticated
          if (!isLoggedIn) {
            toast.warn('Log in to create orders.', {
              position: 'top-right',
              autoClose: 2500,
              pauseOnHover: true,
              theme: 'light',
            });

            navigate('/login');
            return;
          }

          // Function to create an order
          const process = async () => {
            const done = await makeOrder();
            if (done) {
              toast.success('Order was created successfully', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
                theme: 'light',
              });
            } else {
              toast.error('Unable to create a new order. Try again.', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
                theme: 'light',
              });
            }
          };

          // Use the function if there are somethint in the cart
          if (cart.length > 0) {
            process();
          } else {
            toast.warn(
              'Your cart is empty, please, add some product before trying to create a new order',
              {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
                theme: 'light',
              },
            );
          }
        }}
      >
        Realizar pedido
      </button>
    </article>
  );
}
