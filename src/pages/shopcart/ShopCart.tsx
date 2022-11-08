import Styles from './ShopCart.module.css';
import { ShopCartPageRow } from './ShopCartPageRow/ShopCartPageRow';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

export function ShopCart() {
  const { cart } = useContext(SessionContext);

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
        <button className={Styles.dialog__button}>Realizar pedido</button>
        <a href="" className={Styles.pregunta}>¿Quieres añadir más productos?</a>
      </aside>
    </div>
  );
}
