import Styles from './ProductsGrid.module.css';
import { useState, useEffect } from 'react';
import { getProducts, getProductImage  } from '../../services/products.service';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';
import { ModalProduct } from '../../components/modalproducts/ModalProducts';
import ReactPaginate from 'react-paginate';


export function ProductsGrid() {
  const [inventory, setInventory] = useState(new Array<Iproduct>());
  const [products, setProducts] = useState(new Array<Iproduct>());
  const [productsPages, setProductsPages] = useState([]);

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

  const handlePageClick = async (data: { selected: any; }) => {
    setProducts(productsPages[data.selected]);
    setInventory(productsPages[data.selected]);
  };


  {
    /* Get products on load */
  }
  useEffect(() => {
    const load = async () => {
      const response = await getProducts();
      const products: Array<Iproduct> = response.products;

      const pages = ()=>{
        const allPages = [];
        for(let i=0,c=0;i<Math.ceil(products.length/12);i++){
          const pp = [];
          for(let j=0;j<12;j++){
            pp.push(products[c]);
            c++;
            if(c==products.length){
              allPages.push(pp);
              return allPages;
            }
          }
          allPages.push(pp);
        }
      };
      const allPages = pages();
      setProductsPages(allPages);
      setInventory(allPages[0]);
      setProducts(allPages[0]);
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
    <div className={Styles.gridLayout}>
      {/* Todo: Filters content by @SilviaPabon */}
      <aside className={Styles.productsFilters}></aside>
      <main className={Styles.products}>
        {products.map((product, index) => {
          return <ProductCard CallBack={handleAbrir} product={product} key={index} />;
        })}
        <div>  
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'} 
            pageCount  = {productsPages.length} 
            breakLabel = {'...'}
            onPageChange={handlePageClick}
            containerClassName={Styles.pagination}
            pageClassName={Styles.pagination1}
            pageLinkClassName={Styles.pagination2}
          />
        </div>
      </main>
      {viewModal ? <ModalProduct CerrarCallBack={handleCerrar} product={modalData} /> : ''}
    </div>
  );
}