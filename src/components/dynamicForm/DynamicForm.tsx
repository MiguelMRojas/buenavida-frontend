import Styles from './DynamicForm.module.css';

// Props interfaces
interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface Props {
  title: string;
  fields: Array<Field>;
  submitLabel: string;
}

export function DynamicForm(props: Props) {
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
          required
        ></input>
      </div>
    );
  });

  return (
    <form className={Styles.form}>
      <h3 className={Styles.form__title}>{props.title}</h3>
      {generateFields}
      <input className={Styles.form__submit} type='submit' value={props.submitLabel}></input>
    </form>
  );
}
