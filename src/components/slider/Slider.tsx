import Styles from './Slider.module.css';
import { getProductsFiltrated } from '../../services/products.service';

import { FilterContext } from '../../context/FilterContext';
import { useContext, useRef } from 'react';

export function Slider() {
  // Value from the provider
  const { criteria, min, max } = useContext(FilterContext);

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
    if (parseInt(rangeInput.current.value) >= parseInt(secndNumInput.current.value)) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;

        firstNumInput.current.value = `${parseInt(secndNumInput.current.value) - 1}`;
        rangeInput.current.value = `${parseInt(secndNumInput.current.value) - 1}`;
      }, 820);
    } else {
      firstNumInput.current.value = minVal;
    }
    //console.log(firstNumInput.current);
  };

  //adding event to inputs desde and hasta
  const onInputListener = () => {
    // string
    if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;
    const minVal = parseInt(firstNumInput.current.value);

    clearTimeout(timeout_2);
    if (
      parseInt(firstNumInput.current.value) >= parseInt(secndNumInput.current.value) &&
      parseInt(secndNumInput.current.value) != 0
    ) {
      timeout_2 = setTimeout(function () {
        if (!firstNumInput.current || !secndNumInput.current || !rangeInput.current) return;
        rangeInput.current.value = `${parseInt(secndNumInput.current.value) - 1}`;
        firstNumInput.current.value = `${parseInt(secndNumInput.current.value) - 1}`;
      }, 820);
    } else {
      rangeInput.current.value = `${minVal}`;
    }

    if (parseInt(secndNumInput.current.value) > 81.7) {
      secndNumInput.current.value = `${81.7}`;
    }

    if (parseInt(firstNumInput.current.value) < 0) {
      firstNumInput.current.value = `${0}`;
    }
  };

  const load = async (e: any) => {
    e.preventDefault();
    if (!firstNumInput.current || !secndNumInput.current) return;
    const response = await getProductsFiltrated(
      firstNumInput.current.value,
      `${secndNumInput.current.value}`,
      criteria
    );
    console.log(response);
  };

  return (
    <div className={Styles.filterContainer}>
      <form method='post' id='filter-form' onSubmit={load}>
        <div className={Styles.rangeContainer}>
          <input
            id='hiddenCriteria'
            name='search-criteria'
            type='hidden'
            defaultValue={criteria} />
          <label htmlFor='sliderprice'>Precio</label>
          <input
            ref={rangeInput}
            onChange={onRangeListener}
            type='range'
            id='sliderprice'
            name='from'
            min={min}
            max={max}
            defaultValue='50'
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
              step='0.1'
              min={min}
              max={max}
              type='number'
              placeholder={String(min) + '$'}
              defaultValue='0'
            />
          </div>
          <div>
            <label htmlFor='to'>Hasta:</label>
            <input
              ref={secndNumInput}
              onInput={onInputListener}
              id='to'
              name='to'
              step='0.1'
              min={min}
              type='number'
              placeholder={String(max) + '$'}
              max={max}
              defaultValue='81.7'
            />
          </div>
        </div>
        <button type='submit' className={Styles.filterButton}>Filtrar</button>
      </form>
    </div>
  );
}
