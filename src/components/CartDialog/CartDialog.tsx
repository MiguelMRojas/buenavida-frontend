import Styles from './CartDialog.module.css';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { FiX } from 'react-icons/fi';
import { CartDialogRow } from './CartDialogRow/CartDialogRow';

interface IProps {
  closeCallback: () => void;
}

export function CartDialog(props: IProps) {
  const { cart } = useContext(SessionContext);

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
