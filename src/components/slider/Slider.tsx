import Styles from './Slider.module.css';
/* import { getProductsFiltrated } from '../../services/products.service';
 */
import { FilterContext } from '../../context/FilterContext';
import { useContext, useRef } from 'react';

export function Slider() {
  // Value from the provider
  const { min, max, filterProducts, setMax, setMin } = useContext(FilterContext);

  const rangeInput = useRef<HTMLInputElement | null>(null);
  const firstNumInput = useRef<HTMLInputElement | null>(null);
  const secndNumInput = useRef<HTMLInputElement | null>(null);

  let timeout = -1;
  let timeout_2 = -1;

  //adding event to range input
  const onRangeListener = () => {
    if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;

    const minVal = rangeInput.current.value;

    //if value from inputdesde is >= to inputhasta
    if (parseFloat(rangeInput.current.value) >= parseFloat(secndNumInput.current.value)) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;

        firstNumInput.current.value = `${parseFloat(secndNumInput.current.value) - 1}`;
        rangeInput.current.value = `${parseFloat(secndNumInput.current.value) - 1}`;
        setMin(parseFloat(firstNumInput.current.value));
        setMax(parseFloat(secndNumInput.current.value));
      }, 820);
    } else {
      firstNumInput.current.value = minVal;
      setMin(parseFloat(firstNumInput.current.value));
      setMax(parseFloat(secndNumInput.current.value));
    }

  };

  //adding event to inputs desde and hasta
  const onInputListener = () => {
    // string
    if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;
    const minVal = parseFloat(firstNumInput.current.value);

    clearTimeout(timeout_2);
    if (
      parseFloat(firstNumInput.current.value) >= parseFloat(secndNumInput.current.value) &&
      parseFloat(secndNumInput.current.value) != 0
    ) {
      timeout_2 = setTimeout(function () {
        if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;
        rangeInput.current.value = `${parseFloat(secndNumInput.current.value) - 1}`;
        firstNumInput.current.value = `${parseFloat(secndNumInput.current.value) - 1}`;
        setMin(parseFloat(firstNumInput.current.value));
        setMax(parseFloat(secndNumInput.current.value));
      }, 820);
    } else {
      rangeInput.current.value = `${minVal}`;
      setMin(parseFloat(rangeInput.current.value));
      setMax(parseFloat(secndNumInput.current.value));
    }

    if (parseFloat(secndNumInput.current.value) > 81.8) {
      secndNumInput.current.value = `${81.8}`;
      setMax(parseFloat(secndNumInput.current.value));
    }

    if (parseFloat(firstNumInput.current.value) < 0) {
      firstNumInput.current.value = `${0}`;
      setMin(parseFloat(firstNumInput.current.value));
    }


  };

  return (
    <div className={Styles.filterContainer}>
      <form method='post' id='filter-form' onSubmit={(e) => {
        e.preventDefault();
        filterProducts();
      }}>
        <div className={Styles.rangeContainer}>
          <label htmlFor='sliderprice'>Precio</label>
          <input
            ref={rangeInput}
            onChange={onRangeListener}
            type='range'
            id='sliderprice'
            name='from'
            min='0'
            max='81.8'
            defaultValue='50'
            step='0.01'
            className={Styles.slider}
          />
        </div>
        <div className={Styles.inputPrices}>
          <div>
            <label htmlFor='from'>Desde:</label>
            <input
              ref={firstNumInput}
              onInput={onInputListener}
              name='from'
              id='from'
              step='0.01'
              min='0'
              max='81.8'
              type='number'
              placeholder={String(min) + '$'}
              defaultValue={min}
            />
          </div>
          <div>
            <label htmlFor='to'>Hasta:</label>
            <input
              ref={secndNumInput}
              onInput={onInputListener}
              id='to'
              name='to'
              step='0.01'
              type='number'
              min='0'
              max='81.8'
              placeholder={String(max) + '$'}
              defaultValue={max}
            />
          </div>
        </div>
        <button type='submit' className={Styles.filterButton}>Filtrar</button>
      </form>
    </div>
  );
}
