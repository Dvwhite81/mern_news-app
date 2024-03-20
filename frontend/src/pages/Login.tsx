import { SyntheticEvent, useState } from 'react';
import AuthForm from '../components/forms/AuthForm';

interface LoginProps {
  handleLogin: (username: string, password: string) => void;
}

const Login = ({ handleLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const fields = [
    {
      name: 'login-username-input',
      label: 'Username',
      inputType: 'text',
      value: username,
      setValue: setUsername,
    },
    {
      name: 'login-password-input',
      label: 'Password',
      inputType: 'password',
      value: password,
      setValue: setPassword,
    },
  ];

  return (
    <div className="page login-page">
      <h2>Log In</h2>
      <AuthForm
        formType="login"
        fields={fields}
        handleSubmit={handleLogInSubmit}
      />
    </div>
  );
};

export default Login;
