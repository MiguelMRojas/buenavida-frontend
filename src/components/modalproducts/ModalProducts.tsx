import Styles from './modalproducts.module.css';
import { Iproduct } from '../../interfaces/interfaces';
import { FiShoppingCart, FiHeart, FiStopCircle } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export function ModalProduct ({producto, CerrarCallback}){

	const navigate = useNavigate();

    return (
        <div className={Styles.modal_product}>
			<button onClick={CerrarCallback} type="button" className={Styles.modal_btn_cerrar}>X</button>
            <article className="">
				<div className="">
					<h2 className="">{producto.name}</h2>
					<h4 className="">{producto.description}</h4>
					<hr></hr>
				</div>
				<img className="" src={producto.image} alt={producto.name} />

				<div className="">
					<p>Subtotal</p>
					<p id="">{producto.price} €</p>
				</div>

				<div className="">
					<p id="">Total (IVA incluído)</p>
					<p id="">{producto.price} €</p>
				</div>

				<button onClick={()=>{navigate('/carrito')}} className="">Ir al carito</button>
				<button type="button" className="">Realizar pedido</button>
			</article>
        </div>
    )

}

