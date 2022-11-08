import Styles from './ShopCart.module.css';
import { ShopCartPageRow } from './ShopCartPageRow/ShopCartPageRow';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

export function ShopCart() {
  const { cart } = useContext(SessionContext);

  return (
    <div className={Styles.cartContainer}>
      <main className={Styles.cart__items}>
        <h2 className={Styles.cart__title}>Esta es tu cesta de la compra</h2>
        <section className={Styles.cart__grid}>
          {cart.map((item, index) => {
            return <ShopCartPageRow product={item} key={index} />;
          })}
        </section>
      </main>
      <aside className={Styles.resumeContainer}></aside>
    </div>
  );
}
