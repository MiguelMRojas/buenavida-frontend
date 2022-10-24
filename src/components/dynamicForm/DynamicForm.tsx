// Props interfaces
interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface Props {
  fields: Array<Field>;
  submitLabel: string;
}

export function DynamicForm(props: Props) {
  // Generate fields
  const generateFields = props.fields.map((field, index) => {
    return (
      <div key={index}>
        <label htmlFor={field.name}>{field.label}</label>
        <input
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
    <form>
      {generateFields}
      <input type='submit' value={props.submitLabel}></input>
    </form>
  );
}
