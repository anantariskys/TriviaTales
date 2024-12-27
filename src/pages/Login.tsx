import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/useAuthStore';
import { getProfile } from '../api/services/auth';
import { TokenResponse } from '../types/user';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';




const Login: React.FC = () => {
  const {setAuth} = useAuthStore();
  const navigate = useNavigate();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const userInfo = await getProfile(tokenResponse.access_token);
        setAuth(userInfo);
        localStorage.setItem('token', tokenResponse.access_token);
        navigate('/');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    onError: () => {
      console.error('Login Failed');
    },
  });

  return (
    <div className='h-screen flex items-center justify-center container'>
      <main className='max-w-md w-full bg-black bg-opacity-20 space-y-2 p-4 rounded-lg'>
      <h1 className='text-4xl font-semibold'>Welcome to Quiz-App</h1>
      <Button onClick={() => loginWithGoogle()}  variant='dark'>Login with Google</Button>

      </main>
    </div>
  );
};

export default Login;
