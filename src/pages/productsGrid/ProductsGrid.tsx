import Styles from './ProductsGrid.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/products.service.ts';
import { Iproduct } from '../../interfaces/interfaces.ts';

export function ProductsGrid() {
  const [products, setProducts] = useState(new Array<Iproduct>());
  console.log(products);

  {
    /*Request products on load*/
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
      <main className={Styles.products}></main>
    </div>
  );
}
