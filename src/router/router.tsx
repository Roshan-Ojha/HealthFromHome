import AuthLayout from '@/pages/onboarding/authLayout';
import { Login } from '@/pages/onboarding/login';
import { SignUp } from '@/pages/onboarding/signup';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    // TODO Change this later based on authentication status
    element: <Navigate to="/auth/signup" />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
]);
