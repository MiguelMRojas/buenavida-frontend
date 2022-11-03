import { useState, ChangeEvent } from 'react';
import Styles from './DynamicForm.module.css';

// Props interfaces
interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  minlength?: number;
}

interface Rule {
  name: string;
  regexp: RegExp;
  message: string;
}

interface Props {
  title: string;
  fields: Array<Field>;
  submitLabel: string;
  // Optional field to validate with regular expressions
  rules?: Array<Rule>;
}

export function DynamicForm(props: Props) {
  // Store form current values
  const [values, setValues] = useState({});

  // Update form values state when some input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update value on state
    const key = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [key]: value });

    // Validate value as needed
    if (props.rules) {
      const rule: Rule = props.rules.filter((rule) => rule.name === key)[0];
      if (rule) {
        const correct = rule.regexp.test(value);
        console.log(correct);
        if (!correct) {
          const err: HTMLElement = document.getElementById(`error-${key}`);
          err.textContent = rule.message;
          err.classList.add(`${Styles.form__error__active}`);
        } else {
          const err: HTMLElement = document.getElementById(`error-${key}`);
          err.classList.remove(`${Styles.form__error__active}`);
        }
      }
    }
  };

  // Generate fields
  const generateFields = props.fields.map((field, index) => {
    return (
      <div className={Styles.form__group} key={index}>
        <label className={Styles.form__label} htmlFor={field.name}>
          {field.label}
        </label>
        <input
          className={Styles.form__input}
          key={field.name}
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          onChange={handleInputChange}
          minLength={field.minlength}
          required
        ></input>
        <p className={Styles.form__error} id={`error-${field.name}`}></p>
      </div>
    );
  });

  return (
    <form
      className={Styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        // callback();
      }}
    >
      <h3 className={Styles.form__title}>{props.title}</h3>
      {generateFields}
      <input className={Styles.form__submit} type='submit' value={props.submitLabel}></input>
    </form>
  );
}
