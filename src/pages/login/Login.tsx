import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import { DynamicForm } from '../../components/dynamicForm/DynamicForm';
import { ILoginPayload } from '../../interfaces/interfaces.services';
import { LoginService } from '../../services/session.services';

import { toast } from 'react-toastify';

export function Login() {
  // Get login function from provider
  const { login, isLoggedIn, isSessionLoading } = useContext(SessionContext);
  const navigate = useNavigate();

  // Redirect to heme if is logged in
  useEffect(() => {
    if (!isSessionLoading && isLoggedIn) {
      // Show an information alert
      toast.warn('You already have an active session', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });

      // Redirect to heme because there is an active session
      navigate('/');
    }
  }, [isLoggedIn]);

  // Prepare callback
  const HandleLoginSubmit = async (payload: ILoginPayload) => {
    // Get response from backk-end
    const response = await LoginService(payload);
    const data = response?.data;

    if (response?.status !== 200) {
      // Shows an error alert
      toast.error(data.message, {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });
    } else {
      // Update the session on the provider component
      login(response);

      toast.success('Login successfully completed', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });

      navigate('/');
    }
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
