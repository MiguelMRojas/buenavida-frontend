import { DynamicForm } from '../../components/dynamicForm/DynamicForm';
import { ILoginPayload } from '../../interfaces/interfaces.services';

const HandleLoginSubmit = (payload: ILoginPayload) => {
  console.table(payload);
};

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
      minlength: 8,
    },
  ];

  const loginRules = [
    {
      name: 'password',
      regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
      message:
        'Password must have minimal length of 8 characters, contains at least one number, one letter and one special character',
    },
  ];

  return (
    <DynamicForm
      title='Login'
      fields={loginFields}
      rules={loginRules}
      callback={HandleLoginSubmit}
      submitLabel='Login'
    />
  );
}
