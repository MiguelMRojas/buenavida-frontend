import Styles from './ProductsGrid.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductImage, getPageproducts } from '../../services/products.service';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';
import { ModalProduct } from '../../components/modalproducts/ModalProducts';

export function ProductsGrid() {
  const [inventory, setInventory] = useState(new Array<Iproduct>());
  const [products, setProducts] = useState(new Array<Iproduct>());

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

  //PAGINATION PRODUCTS

  //Hook para obtener el parametro opcional "page"
  const [params, setParams] = useSearchParams();
  const [page404, setPage404] = useState(false);

  //Funcion para cambiar la pagina y refrescar la pagina para que vaya al inicio
  const changePage = (e: Event)=>{
    setParams({page: (e.target as HTMLButtonElement).innerHTML});
    window.location.reload();
  };

  {
    /* Get products on load */
  }
  useEffect(() => {
    const load = async () => {
      try{
        // Variable que me obtiene la pagina del parametro si no existe pone 1
        const page = params.get('page') || '1';
        // Trae los productos de dicha pagina
        const response = await getPageproducts(parseInt(page));
        const products: Array<Iproduct> = response.products;
        setPage404(false);
        setInventory(products);
        setProducts(products);
      }catch(error){
        setPage404(true);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      inventory.forEach(async (item) => {
        const response = await getProductImage(item.serial);

        const updatedProducts = products.map((product) => {
          if (product.id === item.id) {
            product.image = response.image;
          }

          return product;
        });

        setProducts(updatedProducts);
      });
    };

    loadImages();
  }, [inventory]);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div className={Styles.gridLayout}>
      {/* Todo: Filters content by @SilviaPabon */}
      <aside className={Styles.productsFilters}></aside>
      <main className={Styles.products}>
        {page404?<p>No hay productos en esta pagina</p>:products.map((product, index) => {
          return <ProductCard CallBack={handleAbrir} product={product} key={index} />;
        })}
        <div className={Styles.paginacion_barra}>
          <button onClick={changePage} className={Styles.paginacion}>1</button>
          <button onClick={changePage} className={Styles.paginacion}>2</button>
          <button onClick={changePage} className={Styles.paginacion}>3</button>
        </div>
      </main>
      {viewModal ? <ModalProduct CerrarCallBack={handleCerrar} product={modalData} /> : ''}
    </div>
  );
}
