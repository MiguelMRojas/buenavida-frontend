import Styles from './Favorites.module.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import { GetDetailedFavoritesService } from '../../services/user.services';
import { GetProductImageFromEndpointService } from '../../services/products.service';
import { Iproduct } from '../../interfaces/interfaces';
import { ProductCard } from '../../components/productCard/ProductCard';
import { ModalProduct } from '../../components/modalproducts/ModalProducts';

import { toast } from 'react-toastify';

export function Favorites() {
  const { isSessionLoading, isLoggedIn } = useContext(SessionContext);
  const [favorites, setFavorites] = useState(Array<Iproduct>);
  const [viewModal, setViewModal] = useState(false);
  const navigate = useNavigate();

  // Redirect to home if is not logged in
  useEffect(() => {
    console.log(isSessionLoading, isLoggedIn);
    if (!isSessionLoading && !isLoggedIn) {
      // Show an information alert
      toast.warn('Please, log in to see your favorites', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });

      // Redirect to heme because there is an active session
      navigate('/login');
    }
  }, [isSessionLoading, isLoggedIn]);

  // Datos del producto actual que es mostrado en el modal
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

  useEffect(() => {
    const getCurrentFavorites = async () => {
      const response = await GetDetailedFavoritesService(1);
      const items = response.data.favorites;
      const products: Array<Iproduct> = [];

      if (response.status === 200) {
        for (let i = 0; i < items.length; i++) {
          const ireply = await GetProductImageFromEndpointService(items[i].image);
          products.push({ ...items[i], image: ireply.image });
        }

        setFavorites(products);
      }
    };

    getCurrentFavorites();
  }, []);

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

  return (
    <>
      <main className={Styles.products}>
        {favorites.map((product, index) => {
          return <ProductCard CallBack={handleAbrir} product={product} key={index} />;
        })}
      </main>
      {viewModal ? <ModalProduct CerrarCallBack={handleCerrar} product={modalData} /> : ''}
    </>
  );
}
