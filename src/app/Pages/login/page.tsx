

"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <LogIn className="mr-2 h-6 w-6" />
            Log In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} error={error} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Dont have an account?{' '}
            <Link href="/Pages/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;