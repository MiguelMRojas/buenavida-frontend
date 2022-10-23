import Styles from './ProductsGrid.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/products.service';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';

export function ProductsGrid() {
  const [products, setProducts] = useState(new Array<Iproduct>());

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
          return <ProductCard {...product} key={index} />;
        })}
      </main>
    </div>
  );
}
