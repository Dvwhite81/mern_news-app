import { SyntheticEvent, useState } from 'react';
import AuthForm from '../components/forms/AuthForm';

interface RegisterProps {
  handleRegister: (
    username: string,
    password: string,
    confirmation: string
  ) => void;
}

const Register = ({ handleRegister }: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleRegisterSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleRegister(username, password, confirmation);
  };

  const fields = [
    {
      name: 'register-username-input',
      label: 'Username',
      inputType: 'text',
      value: username,
      setValue: setUsername,
    },
    {
      name: 'register-password-input',
      label: 'Password',
      inputType: 'password',
      value: password,
      setValue: setPassword,
    },
    {
      name: 'register-confirmation-input',
      label: 'Confirm',
      inputType: 'password',
      value: confirmation,
      setValue: setConfirmation,
    },
  ];

  return (
    <div className="page register-page">
      <h2>Register</h2>
      <AuthForm
        formType="register"
        fields={fields}
        handleSubmit={handleRegisterSubmit}
      />
    </div>
  );
};

export default Register;
