import Styles from './Slider.module.css';

export function Slider() {
  return (
    <div className={Styles.filterContainer}>
      <div className={Styles.rangeContainer}>
        <p>Precio</p>
        <input type='range' min='1' max='100' defaultValue='50' className={Styles.slider}/>
      </div>
      <div className={Styles.inputPrices}>
        <div>
          <p>Desde:</p>
          <input type='number' placeholder="€"/>
        </div>
        <div>
          <p>Hasta:</p>
          <input type='number' placeholder="€"/>
        </div>
      </div>
      <button className={Styles.filterButton}>Filtrar</button>
    </div>
  );
}
