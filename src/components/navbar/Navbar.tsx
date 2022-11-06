import Styles from './Navbar.module.css';
import { useContext, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHeart, FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi';
import { FilterContext } from '../../context/FilterContext';

export function Navbar() {
  // Fucntion from the provider
  const { setCriteria } = useContext(FilterContext);

  // Update provider's criteria
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCriteria(value);
  };

  return (
    <nav className={Styles.navbarBlock}>
      <div className={`${Styles.navbarContainer} container`}>
        <div className={Styles.navbar__brand}>
          <img src='/images/logo.jpg' alt='Buenavida store logo' />
        </div>
        {/* Searchbar and navigation container*/}
        <div className={Styles.navbar__right}>
          <div className={Styles.navbar__inputContainer}>
            <input
              type='text'
              placeholder='Search products here'
              autoFocus
              onChange={handleInputChange}
            ></input>
            <FiSearch color={'#21a764'} id={Styles.searchIcon} />
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
