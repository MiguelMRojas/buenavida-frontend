import Styles from './Navbar.module.css';
import { useContext, ChangeEvent } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { SessionContext } from '../../context/SessionContext';
import { FiHeart, FiUser, FiShoppingCart, FiSearch, FiLock, FiUserCheck } from 'react-icons/fi';
import { FilterContext } from '../../context/FilterContext';

export function Navbar() {
  // Fucntion from the provider
  const { setCriteria, filterProducts } = useContext(FilterContext);

  // Update provider's criteria
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCriteria(value);
  };

  return (
    <nav className={Styles.navbarBlock}>
      <div className={`${Styles.navbarContainer} container`}>
        <div className={Styles.navbar__brand}>
          <Link to='/'>
            <img src='/images/logo.jpg' alt='Buenavida store logo' />
          </Link>
        </div>
        {/* Searchbar and navigation container*/}
        <div className={Styles.navbar__right}>
          <div className={Styles.navbar__inputContainer}>
            <input
              type='text'
              placeholder='Search products here'
              autoFocus
              onChange={handleInputChange}
              onKeyDownCapture={(e) => {
                if (e.key == 'Enter') {
                  console.log('Filtering because of enter key pressed');
                  filterProducts();
                }
              }}
            ></input>
            <FiSearch
	      className={Styles.navbar__search}
              color={'#21a764'}
              id={Styles.searchIcon}
              onClick={() => {
                filterProducts();
              }}
            />
          </div>
          <ul className={Styles.navigation}>
            <li>
              <NavLink to='#' className={Styles.navigation__item}>
                <FiHeart color={'#21a764'} />
                <span>Favorites</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='#' className={Styles.navigation__item}>
                <FiUser color={'#21a764'} />
                <span>Account</span>
                <ul className={Styles.navigation__float}>
                  <li>
                    <Link className={Styles.navigation__floatItem} to='/'>
                      <FiUser color={'#2f2f2f'} />
                      <span>Mi Cuenta</span>
                    </Link>
                  </li>
                  <li>
                    <Link className={Styles.navigation__floatItem} to='/'>
                      <FiHeart color={'#2f2f2f'} />
                      <span>Mis favoritos</span>
                    </Link>
                  </li>
                  <li>
                    <Link className={Styles.navigation__floatItem} to='/'>
                      <FiShoppingCart color={'#2f2f2f'} />
                      <span>Mi Carrito</span>
                    </Link>
                  </li>
                  <li>
                    <Link className={Styles.navigation__floatItem} to='/'>
                      <FiLock color={'#2f2f2f'} />
                      <span>Entrar</span>
                    </Link>
                  </li>
                  <li>
                    <Link className={Styles.navigation__floatItem} to='/'>
                      <FiUserCheck color={'#2f2f2f'} />
                      <span>Crear cuenta</span>
                    </Link>
                  </li>
                </ul>
              </NavLink>
            </li>
            <li>
              <NavLink to='#' className={Styles.navigation__item}>
                <FiShoppingCart color={'#21a764'} />
                <span>Cart</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
