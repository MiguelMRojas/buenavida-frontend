import Styles from './Navbar.module.css';
import { useContext, ChangeEvent, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import {
  FiHeart,
  FiUser,
  FiShoppingCart,
  FiSearch,
  FiLock,
  FiUserCheck,
  FiUserX,
} from 'react-icons/fi';
import { FilterContext } from '../../context/FilterContext';
import { CartDialog } from '../CartDialog/CartDialog';

export function Navbar() {
  // Fucntion from the provider
  const { setCriteria, filterProducts } = useContext(FilterContext);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const { isLoggedIn, logout, cart } = useContext(SessionContext);

  const floatingOptions = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();

  // Update provider's criteria
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCriteria(value);
  };

  // Const handle dropdown click
  const handleDropDownClick = () => {
    if (!floatingOptions) return;
    if (!floatingOptions.current) return;

    floatingOptions.current.classList.toggle(`${Styles.navigation__floatVisible}`);
  };

  // Float options for logged in user
  const LoggedInOptions = () => {
    return (
      <>
        <li>
          <Link className={Styles.navigation__floatItem} to='#'>
            <FiUser color={'#2f2f2f'} />
            <span>Mi Cuenta</span>
          </Link>
        </li>
        <li>
          <Link className={Styles.navigation__floatItem} to='/favorites'>
            <FiHeart color={'#2f2f2f'} />
            <span>Mis favoritos</span>
          </Link>
        </li>
        <li>
          <Link className={Styles.navigation__floatItem} to='/cart'>
            <FiShoppingCart color={'#2f2f2f'} />
            <span>Mi Carrito</span>
          </Link>
        </li>
        <li>
          <div
            className={Styles.navigation__floatItem}
            onClick={() => {
              logout();
            }}
          >
            <FiUserX color={'#2f2f2f'} />
            <span>Cerrar sesi??n</span>
          </div>
        </li>
      </>
    );
  };

  // Float options for not logged in user
  const NotLoggedInOptions = () => {
    return (
      <>
        <li>
          <Link className={Styles.navigation__floatItem} to='/login'>
            <FiLock color={'#2f2f2f'} />
            <span>Entrar</span>
          </Link>
        </li>
        <li>
          <Link className={Styles.navigation__floatItem} to='/signup'>
            <FiUserCheck color={'#2f2f2f'} />
            <span>Crear cuenta</span>
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
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
                    navigate('/');
                  }
                }}
              ></input>
              <FiSearch
                className={Styles.navbar__search}
                color={'#21a764'}
                id={Styles.searchIcon}
                onClick={() => {
                  filterProducts();
                  navigate('/');
                }}
              />
            </div>
            <ul className={Styles.navigation}>
              <li>
                <NavLink to='/favorites' className={Styles.navigation__item}>
                  <FiHeart color={'#21a764'} />
                  <span>Favorites</span>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  handleDropDownClick();
                }}
              >
                <div className={Styles.navigation__item}>
                  <FiUser color={'#21a764'} />
                  <span>Account</span>
                  <ul className={Styles.navigation__float} ref={floatingOptions}>
                    {isLoggedIn ? LoggedInOptions() : NotLoggedInOptions()}
                  </ul>
                </div>
              </li>
              <li
                onClick={() => {
                  setOpenCartDialog(!openCartDialog);
                }}
              >
                <div className={`${Styles.navigation__item} ${Styles.navigation__cart}`}>
                  <FiShoppingCart color={'#21a764'} />
                  <span>Cart</span>
		  <span className={Styles.navigation__cartNotification}>{cart.length}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {openCartDialog ? (
        <CartDialog
          closeCallback={() => {
            setOpenCartDialog(false);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}
