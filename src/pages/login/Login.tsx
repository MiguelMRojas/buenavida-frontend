import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { DynamicForm } from '../../components/dynamicForm/DynamicForm';
import { ILoginPayload } from '../../interfaces/interfaces.services';
import { LoginService } from '../../services/session.services.ts';

export function Login() {
  // Get login function from provider
  const { login } = useContext(SessionContext);

  // Prepare callback
  const HandleLoginSubmit = async (payload: ILoginPayload) => {
    const response = await LoginService(payload);
    login(response);
  };

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

  // Regular expressions to validate fields
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
