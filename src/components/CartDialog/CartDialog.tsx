import Styles from './CartDialog.module.css';
import { FiX } from 'react-icons/fi';
import { CartDialogRow } from './CartDialogRow/CartDialogRow';

const ExampleProduct = {
  image: 'https://i.ibb.co/jGc94N2/1.jpg',
  title: 'Aceite esencial de coco',
  units: '12ML',
  onCart: 1,
  price: 7.99,
};

export function CartDialog() {
  return (
    <article className={Styles.dialog}>
      <div className={Styles.dialog__header}>
        <h2 className={Styles.dialog__title}>Mi carrito</h2>
        <FiX size={'1.2em'} />
      </div>
      <div className={Styles.dialog__body}>
        <CartDialogRow product={ExampleProduct} />
        <CartDialogRow product={ExampleProduct} />
        <CartDialogRow product={ExampleProduct} />
      </div>
    </article>
  );
}
