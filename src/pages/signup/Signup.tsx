import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';

import { SignupService } from '../../services/user.services';
import { ISignupPayload } from '../../interfaces/interfaces.services';
import { DynamicForm } from '../../components/dynamicForm/DynamicForm';

import { toast } from 'react-toastify';

export function Signup() {
  const { isLoggedIn, isSessionLoading } = useContext(SessionContext);
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
    }
  }, [isLoggedIn]);

  const HandleSignupSubmit = async (payload: ISignupPayload) => {
    // Get response from back-end
    const response = await SignupService(payload);
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
      toast.success('User was created successfully', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: true,
        theme: 'light',
      });

      navigate('/login');
    }
  };

  const signupRules = [
    {
      name: 'password',
      done: false,
      regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
      message:
        'Password must have minimal length of 8 characters, contains at least one number, one letter and one special character',
    },
    {
      name: 'password2',
      done: false,
      regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
      message:
        'Password must have minimal length of 8 characters, contains at least one number, one letter and one special character',
    },
  ];

  const signupFields = [
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      placeholder: 'Foo',
      minlength: 5,
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Bar',
      minlength: 5,
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
      minlength: 8,
    },
    {
      label: 'Confirm Password',
      name: 'password2',
      type: 'password',
      placeholder: '********',
      minlength: 8,
    },
  ];

  return (
    <DynamicForm
      title='Signup'
      fields={signupFields}
      rules={signupRules}
      callback={HandleSignupSubmit}
      submitLabel='Create user'
    />
  );
}
