import Styles from './ProductsGrid.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/products.service';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';
import { ModalProduct } from '../../components/modalproducts/ModalProducts';

export function ProductsGrid() {
  const [products, setProducts] = useState(new Array<Iproduct>());

  // Estado que guarda los datos del producto
  const [modalData, setModalData] = useState({
    id: '',
    name: '',
    image: '',
    units: '',
    annotations: '',
    discount: 0,
    price: 0,
    description: '',
  });

  // Estado que indica si el modal esta abierto o no
  const [viewModal, setViewModal] = useState(false);

  // Funcion para abrir el modal
  const handleAbrir = (data: Iproduct) => {
    // Se cambian los datos del modal con los datos del producto
    setModalData({ ...data });
    // Se cambia la vista del modal a true
    setViewModal(true);
  };

  // Funcion para cerrar el modal
  const handleCerrar = () => {
    setViewModal(false);
  };

  {
    /* Get products on load */
  }
  useEffect(() => {
    const load = async () => {
      const response = await getProducts();
      const products: Array<Iproduct> = response.products;
      setProducts(products);
    };

    load();
  }, []);

  return (
    <div className={Styles.gridLayout}>
      {/* Todo: Filters content by @SilviaPabon */}
      <aside className={Styles.productsFilters}></aside>
      <main className={Styles.products}>
        {products.map((product, index) => {
          return <ProductCard CallBack={handleAbrir} product={product} key={index} />;
        })}
      </main>
      {viewModal ? <ModalProduct CerrarCallBack={handleCerrar} product={modalData} /> : ''}
    </div>
  );
}
