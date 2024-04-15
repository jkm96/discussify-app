'use client';

import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';
import { verifyUserEmailAsync } from '@/lib/services/auth/userAuthService';
import MainNavbar from '@/components/site/sections/MainNavbar';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyUser() {
  const { clearAuthToken } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);

  const verifyUserEmail = async (token: string) => {
    setIsLoading(true);
    await verifyUserEmailAsync(token)
      .then((response) => {
        if (response.statusCode === 200) {
          clearAuthToken();
          setStatus('verified');
          setMessage(response.message);
        } else {
          setStatus('unverified');
          setMessage(response.message);
        }
      })
      .catch((error) => {
        console.error('Error verifying your email', error);
        toast.error(`Error verifying your email: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams?.get('token') ?? '';
    verifyUserEmail(token);
  }, []);

  useEffect(() => {
    if (status === 'verified') {
      setTimeout(() => {
        router.push(NAVIGATION_LINKS.LOGIN);
      }, 5000);
    }
  }, [status]);

  return (
    <>
      <MainNavbar />
      <div className='grid place-items-center text-black-2 mt-4'>
        {isLoading ? (
          <CircularProgress
            color={'primary'}
            className={'p-4'}
            label='Verifying your email address...Please wait.'
          />
        ) : (
          <>
            {status === 'verified' ? (
              <p>
                {message}
                Redirecting you shortly...
              </p>
            ) : (
              <p>
                {message} Please contact support.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}