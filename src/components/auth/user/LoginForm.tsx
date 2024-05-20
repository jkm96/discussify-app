'use client';

import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {validateLoginFormInputErrors} from '@/helpers/validationHelpers';
import {useAuth} from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {LoginUserRequest} from '@/boundary/interfaces/auth';
import {AccessTokenModel} from '@/boundary/interfaces/token';
import {loginUser} from '@/lib/services/auth/userAuthService';
import {Input} from '@nextui-org/react';
import {EyeFilledIcon, EyeSlashFilledIcon} from '@nextui-org/shared-icons';
import {Button} from '@nextui-org/button';
import {toast} from 'react-toastify';
import Spinner from '@/components/shared/icons/Spinner';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import useLocalStorage from "@/hooks/useLocalStorage";

const initialFormState: LoginUserRequest = {
  username: '', password: '',
};

export default function LoginForm() {
  const { storeAuthToken } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialFormState);
  const [inputErrors, setInputErrors] = useState({
    username: '', password: '',
  });
  const [user, setUser] = useLocalStorage('user', {});
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [status, setStatus] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateLoginFormInputErrors(loginFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    if (
      loginFormData.username.trim() === '' ||
      loginFormData.password.trim() === ''
    ) {
      setIsSubmitting(false);
      return;
    }

    let response = await loginUser(loginFormData);
    if (response.statusCode === 200) {
      toast.success(response.message ?? "Logged in successfully");
      setIsSubmitting(false);
      setLoginFormData(initialFormState);
      let responseData: AccessTokenModel = response.data;
      setUser(responseData.user)
      const success = await storeAuthToken(responseData);
      if (success)
        setStatus('user_logged');
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  useEffect(() => {
    if (status === 'user_logged') {
      router.push(NAVIGATION_LINKS.HOME);
    }
  }, [status]);

  return (
    <>
      <div className='flex items-center justify-center bg-white dark:bg-black'>
        <div className='dark:bg-boxdark-mode shadow-medium mt-3 md:w-1/2 lg:w-1/2 w-full place-items-center p-4 sm:p-12.5 xl:p-17.5'>
          <div className='text-center'>
            <span className='mb-1.5 block font-medium'>Start for free</span>
            <span className='mb-1.5 block font-medium'>or</span>
            <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
              Sign In To Your Account
            </h2>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className='flex flex-wrap md:flex-nowrap gap-4 m-2'>
              <Input type='text'
                     color='default'
                     onChange={handleChange}
                     value={loginFormData.username}
                     label='Username'
                     name='username'
                     variant={'bordered'}
                     placeholder='Enter your username/email'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, username: '' });
                     }}
                     isInvalid={inputErrors.username !== ''}
                     errorMessage={inputErrors.username}
              />
            </div>

            <div className='flex flex-wrap md:flex-nowrap gap-4 m-2'>
              <Input type={isVisible ? 'text' : 'password'}
                     color='default'
                     onChange={handleChange}
                     value={loginFormData.password}
                     label='Password'
                     name='password'
                     variant='bordered'
                     placeholder='Enter your password'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, password: '' });
                     }}
                     isInvalid={inputErrors.password !== ''}
                     errorMessage={inputErrors.password}
                     endContent={
                       <button className='focus:outline-none' type='button'
                               onClick={toggleVisibility}>
                         {isVisible ? (
                           <EyeSlashFilledIcon
                             className='text-2xl text-default-400 pointer-events-none' />
                         ) : (
                           <EyeFilledIcon
                             className='text-2xl text-default-400 pointer-events-none' />
                         )}
                       </button>
                     }
              />
            </div>

            <div className='flex flex-wrap md:flex-nowrap gap-4 m-2'>
              <Button
                type='submit'
                value='Sign In'
                isLoading={isSubmitting}
                spinner={<Spinner />}
                size='lg'
                className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
              >
                {isSubmitting ? 'Submitting...' : 'Sign In'}
              </Button>
            </div>

            <div className='mt-6 text-center flex justify-between'>

                <Link href={NAVIGATION_LINKS.FORGOT_PASSWORD} className='text-primary ml-1 md:ml-3'>
                  <span className="text-black-2">Forgot your password?</span> Reset
                </Link>

                <Link href={NAVIGATION_LINKS.REGISTER} className='text-primary mr-1 md:mr-3'>
                  <span className="text-black-2">Don’t have any account?</span> Sign Up
                </Link>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}