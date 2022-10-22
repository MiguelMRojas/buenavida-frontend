import Styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className={Styles.navbarBlock}>
      <div className={`${Styles.navbarContainer} container`}>
        <div className={Styles.navbar__brand}>
          <img src='/images/logo.jpg' alt='Buenavida store logo' />
        </div>
        {/* Searchbar and navigation container*/}
        <div className={Styles.navbar__right}>
          <div className={Styles.navbar__inputContainer}>
            <input type='text' placeholder='Search products here' autoFocus></input>
          </div>
          <ul className={Styles.navigation}>
            <li>
              <NavLink to='#'>Favorites</NavLink>
            </li>
            <li>
              <NavLink to='#'>Account</NavLink>
            </li>
            <li>
              <NavLink to='#'>Cart</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
