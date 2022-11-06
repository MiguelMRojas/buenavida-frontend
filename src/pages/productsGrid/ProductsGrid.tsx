import Styles from './ProductsGrid.module.css';
import { useState, useContext, useEffect } from 'react';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';
import { ModalProduct } from '../../components/modalproducts/ModalProducts';
import ReactPaginate from 'react-paginate';
import { Slider } from '../../components/slider/Slider';

import { FilterContext } from '../../context/FilterContext';

export function ProductsGrid() {

  const { products, inventory, setProducts } = useContext(FilterContext);

  // Estado que guarda los datos del producto
  const [modalData, setModalData] = useState({
    id: '',
    serial: 0,
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

  //PAGINATION

  const handlePageClick = async (data: { selected: number }) => {
    const start: number = data.selected * 12;
    const end: number = start + 12;
    const page: Array<Iproduct> = inventory.slice(start, end);
    setProducts(page);
  };

  //setinventario y setcontext setproducts vienen del contexto
  useEffect(() => {
    setProducts(inventory.slice(0, 12));
  }, [inventory]);

  return (
    <div className={Styles.gridLayout}>
      <aside className={Styles.productsFilters}>
        <Slider />
      </aside>
      <main className={Styles.products}>
        {products.map((product, index) => {
          return <ProductCard CallBack={handleAbrir} product={product} key={index} />;
        })}
      </main>
      <div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={Math.ceil(inventory.length / 12)}
          breakLabel={'...'}
          onPageChange={handlePageClick}
          containerClassName={Styles.pagination}
          pageClassName={Styles.pagination__item}
          previousClassName={Styles.pagination__item}
          nextClassName={Styles.pagination__item}
          activeClassName={Styles.pagination__active}
        />
      </div>
      {viewModal ? <ModalProduct CerrarCallBack={handleCerrar} product={modalData} /> : ''}
    </div>
  );
}
