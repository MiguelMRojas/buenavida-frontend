import { useState, ChangeEvent } from 'react';
import Styles from './DynamicForm.module.css';
import { toast } from 'react-toastify';

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
  done: boolean;
}

interface Props {
  title: string;
  fields: Array<Field>;
  submitLabel: string;
  // Callback to handle input submit
  // eslint-disable-next-line
  callback: (payload: any) => Promise<void>;
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

    // Return if no validation rules were given
    if (!props.rules) return;

    // Get the field rule
    const rule: Rule = props.rules.filter((rule) => rule.name === key)[0];
    // Return if the field has no rule to validate it
    if (!rule) return;

    const ruleIndex: number = props.rules.indexOf(rule);
    const correct = rule.regexp.test(value);

    if (!correct) {
      const err: HTMLElement | null = document.getElementById(`error-${key}`);
      if (err != null) {
        err.textContent = rule.message;
        err.classList.add(`${Styles.form__error__active}`);

        // Update the done field on the rule to false
        props.rules[ruleIndex].done = false;
      }
    } else {
      const err: HTMLElement | null = document.getElementById(`error-${key}`);
      if (err != null) err.classList.remove(`${Styles.form__error__active}`);

      // Update the done field on the rule to false
      props.rules[ruleIndex].done = true;
    }
  };

  // Verify all the fields with the regular expressions
  // and use the callback
  const handleSubmit = () => {
    let allFieldsOk = true;
    const isSignup = props.fields.some((field) => field.name === 'password2');

    if (isSignup) {
      if (values['password'] != values['password2']) {
        toast.error('Passords are not equals', {
          position: 'top-right',
          autoClose: 2500,
          pauseOnHover: true,
          theme: 'light',
        });

	return;
      }
    }

    if (props.rules) {
      props.rules.forEach((rule) => {
        if (!rule.done) {
          allFieldsOk = false;
          return; // Breaks the foreach
        }
      });

      if (!allFieldsOk) {
        // Show an information alert
        toast.warn('Please, fill all the fields correctly before sending again.', {
          position: 'top-right',
          autoClose: 2500,
          pauseOnHover: true,
          theme: 'light',
        });
      } else {
        props.callback(values);
      }
    } else {
      props.callback(values);
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
        handleSubmit();
      }}
    >
      <h3 className={Styles.form__title}>{props.title}</h3>
      {generateFields}
      <input className={Styles.form__submit} type='submit' value={props.submitLabel}></input>
    </form>
  );
}
