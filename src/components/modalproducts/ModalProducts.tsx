import Styles from './modalproducts.module.css';
import { Iproduct } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
//import { useNavigate } from 'react-router-dom';

interface props {
  product: Iproduct;
  // eslint-disable-next-line no-unused-vars
  CerrarCallBack: (product: Iproduct) => void;
}

export function ModalProduct(props: props) {
  return (
    <div className={Styles.modal_product}>
      <div className={Styles.modal_productmodal}>
        <button
          onClick={() => props.CerrarCallBack(props.product)}
          type='button'
          className={Styles.modal_btn_cerrar}
        >
          X
        </button>
        <FiHeart className={Styles.corazon} />
        <img className={Styles.imagen} src={props.product.image} />
        <article className=''>
          <div>
            <h2 className={Styles.titulo}>{props.product.name}</h2>
            <h4 className={Styles.unidades}>{props.product.units}</h4>
            <p className={Styles.price}>{props.product.price} €</p>
            <p className={Styles.description}>{props.product.description}</p>
            <button className={Styles.boton}>
              <FiShoppingCart />
              Añadir a la canasta
            </button>
          </div>

          {/* <button
                onClick={() => {
                  navigate('/carrito');
                }}
                className=''
              >
                Ir al carito
              </button>
              <button type='button' className=''>
                Realizar pedido
              </button> */}
        </article>
      </div>
    </div>
  );
}
