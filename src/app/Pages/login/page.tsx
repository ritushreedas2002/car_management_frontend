"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/User/LoginForm';
import { loginUser } from '../../lib/api';
import { setAuthToken } from '../../lib/auth';

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token } = await loginUser(email, password);
      setAuthToken(token);
      router.push('/Pages/carlisting');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default Login;