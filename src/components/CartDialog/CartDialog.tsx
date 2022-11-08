import Styles from './CartDialog.module.css';
import { FiX } from 'react-icons/fi';
import { CartDialogRow } from './CartDialogRow/CartDialogRow';

interface IProps {
  closeCallback: () => void;
}

const ExampleProduct = {
  image: 'https://i.ibb.co/jGc94N2/1.jpg',
  title: 'Aceite esencial de coco',
  units: '12ML',
  onCart: 1,
  price: 7.99,
};

export function CartDialog(props: IProps) {
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
        <CartDialogRow product={ExampleProduct} />
        <CartDialogRow product={ExampleProduct} />
        <CartDialogRow product={ExampleProduct} />
      </div>
      <div className={Styles.dialog__subtotal}>
        <p>Subtotal</p>
        <p>38,40</p>
      </div>
      <div className={Styles.dialog__total}>
        <p className={Styles.rowText}>Total</p>
        <p>38,40</p>
      </div>
      <button className={Styles.dialog__button}>Ir al carrito</button>
      <button className={Styles.dialog__button}>Realizar pedido</button>
    </article>
  );
}
