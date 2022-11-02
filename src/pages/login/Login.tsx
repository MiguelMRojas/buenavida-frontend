import { DynamicForm } from '../../components/dynamicForm/DynamicForm';

export function Login() {
  const loginFields = [
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
  ];

  return <DynamicForm title='Login' fields={loginFields} submitLabel='Signup' />;
}
