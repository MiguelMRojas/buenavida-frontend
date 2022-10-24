import { DynamicForm } from '../../components/dynamicForm/DynamicForm';

export function Signup() {
  const loginFields = [
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      placeholder: 'Foo',
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Bar',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'foo@bar.com',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '********',
    },
    {
      label: 'Confirm Password',
      name: 'password2',
      type: 'password',
      placeholder: '********',
    },
  ];

  return <DynamicForm title='Signup' fields={loginFields} submitLabel='Login' />;
}
