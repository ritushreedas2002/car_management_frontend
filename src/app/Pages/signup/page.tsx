
"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SignUpForm from '@/app/components/User/SignUpForm'
import { registerUser } from '../../lib/api'


const SignUp: React.FC = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (username: string, email: string, password: string) => {
    try {
    await registerUser(username, email, password)

      router.push('/Pages/login')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <UserPlus className="mr-2 h-6 w-6" />
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to start browsing cars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm onSubmit={handleSignUp} error={error} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/Pages/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp;

