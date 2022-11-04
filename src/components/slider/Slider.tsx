import Styles from './Slider.module.css';

import { FilterContext } from '../../context/FilterContext';
import { useContext } from 'react';

export function Slider() {
  // Value from the provider
  const { criteria } = useContext(FilterContext);
  console.log(criteria);

  return (
    <div className={Styles.filterContainer}>
      <div className={Styles.rangeContainer}>
        <p>{criteria}</p>
        <p>Precio</p>
        <input type='range' min='1' max='100' defaultValue='50' className={Styles.slider} />
      </div>
      <div className={Styles.inputPrices}>
        <div>
          <p>Desde:</p>
          <input type='number' placeholder='€' />
        </div>
        <div>
          <p>Hasta:</p>
          <input type='number' placeholder='€' />
        </div>
      </div>
      <button className={Styles.filterButton}>Filtrar</button>
    </div>
  );
}
