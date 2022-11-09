import Styles from './ShopCart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShopCartPageRow } from './ShopCartPageRow/ShopCartPageRow';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../../context/SessionContext';

import { toast } from 'react-toastify';

export function ShopCart() {
  const { isSessionLoading, isLoggedIn, cart, makeOrder } = useContext(SessionContext);
  const navigate = useNavigate();

  // Redirect to home if is not logged in
  useEffect(() => {
    if (!isSessionLoading && !isLoggedIn) {
      // Show an information alert
      toast.warn('Please, log in to manage your cart', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });

      // Redirect to heme because there is an active session
      navigate('/');
    }
  }, [isSessionLoading, isLoggedIn]);

  const GetCartTotal = () => {
    const price = cart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    return price.toFixed(2);
  };

  const GetCartTotalIva = () => {
    const price = cart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity * 0.19 + curr.price * curr.quantity;
    }, 0);

    return price.toFixed(2);
  };

  return (
    <div className={Styles.cartContainer}>
      <main className={Styles.cart__items}>
        <h1 className={Styles.cart__title}>Esta es tu cesta de la compra</h1>
        <h2 className={Styles.cart__subtitle}>{cart.length} Products:</h2>
        <section className={Styles.cart__grid}>
          {cart.map((item, index) => {
            return <ShopCartPageRow product={item} key={index} />;
          })}
        </section>
      </main>
      <aside className={Styles.resumeContainer}>
        <h1 className={Styles.ResumeTitle}>Resumen de tu pedido:</h1>
        <div className={Styles.containerprices}>
          <div className={Styles.subtotal}>
            <p>SUBTOTAL:</p>
            <p>{GetCartTotal()} €</p>
          </div>
          <div className={Styles.total}>
            <p>TOTAL:</p>
            <p>{GetCartTotalIva()} €</p>
          </div>
          <p className={Styles.iva}>(Iva incluído)</p>
        </div>
        <button
          className={Styles.dialog__button}
          onClick={() => {
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

            // Use the function if there are something in the cart
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
        <Link className={Styles.pregunta} to='/'>
          Añadir más productos al carrito
        </Link>
      </aside>
    </div>
  );
}
