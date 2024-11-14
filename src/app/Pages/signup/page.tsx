"use client"
import { useRouter } from 'next/navigation';
import SignUpForm from '@/app/components/User/SignUpForm';
import { registerUser } from '../../lib/api';
import { setAuthToken } from '../../lib/auth';
import { useState } from 'react';

const SignUp: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (username: string, email: string, password: string) => {
    try {
      const { token } = await registerUser(username, email, password);
      setAuthToken(token);
      router.push('/Pages/login');
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
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={handleSignUp} error={error} />
    </div>
  );
};

export default SignUp;

