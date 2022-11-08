import Styles from './ShopCart.module.css';

export function ShopCart() {
  return (
    <div className={Styles.cartContainer}>
      <main className={Styles.productsContainer}>
        <h2>Esta es tu cesta de la compra</h2>
      </main>
      <aside className={Styles.resumeContainer}></aside>
    </div>
  );
}
