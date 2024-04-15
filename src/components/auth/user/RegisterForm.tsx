'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterUserRequest } from '@/boundary/interfaces/auth';
import { validateRegisterFormInputErrors } from '@/helpers/validationHelpers';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { registerUser } from '@/lib/services/auth/userAuthService';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';
import Spinner from '@/components/shared/icons/Spinner';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { AccessTokenModel } from '@/boundary/interfaces/token';
import { useAuth } from '@/hooks/useAuth';
import MainNavbar from '@/components/site/sections/MainNavbar';

const initialFormState: RegisterUserRequest = {
  email: '', username: '', password: '', confirmPassword: '',
};
export default function RegisterForm() {
  const router = useRouter();
  const { storeAuthToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [registerFormData, setRegisterFormData] = useState(initialFormState);
  const [inputErrors, setInputErrors] = useState({
    email: '', username: '', password: '', confirmPassword: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateRegisterFormInputErrors(registerFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await registerUser(registerFormData);
    if (response.statusCode === 200) {
      let responseData: AccessTokenModel = response.data;
      await storeAuthToken(responseData);
      setIsSubmitting(false);
      setRegisterFormData(initialFormState);
      toast.success('Registered successfully');
      setStatus('registered');
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  useEffect(() => {
    if (status === 'registered') {
      setTimeout(() => {
        router.push(NAVIGATION_LINKS.PAYMENTS);
      }, 5000);
    }
  }, [status]);

  return (
    <>
      <MainNavbar />

      <div className='flex items-center justify-center bg-white'>
        <div className='md:w-1/2 lg:w-1/2 w-full place-items-center p-4 sm:p-12.5 xl:p-17.5'>

          <div className='text-center'>
            <span className='mb-1.5 block font-medium'>Register for free</span>
            <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
              Create An account with us!
            </h2>
          </div>

          <form onSubmit={handleRegisterSubmit}>

            <div className='mb-4'>
              <Input type='text'
                     onChange={handleChange}
                     value={registerFormData.username}
                     label='Username'
                     name='username'
                     variant={'bordered'}
                     placeholder='Enter your username'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, username: '' });
                     }}
                     isInvalid={inputErrors.username !== ''}
                     errorMessage={inputErrors.username} />
            </div>

            <div className='mb-4'>
              <Input type='email'
                     onChange={handleChange}
                     value={registerFormData.email}
                     label='Email'
                     name='email'
                     variant={'bordered'}
                     placeholder='Enter your email'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, email: '' });
                     }}
                     isInvalid={inputErrors.email !== ''}
                     errorMessage={inputErrors.email} />
            </div>

            <div className='mb-4'>
              <Input type={isVisible ? 'text' : 'password'}
                     onChange={handleChange}
                     value={registerFormData.password}
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

            <div className='mb-4'>
              <Input type={isVisible ? 'text' : 'password'}
                     onChange={handleChange}
                     value={registerFormData.confirmPassword}
                     label='Confirm Password'
                     name='confirmPassword'
                     variant='bordered'
                     placeholder='Confirm your password'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, confirmPassword: '' });
                     }}
                     isInvalid={inputErrors.confirmPassword !== ''}
                     errorMessage={inputErrors.confirmPassword}
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

            <div className='mb-5'>
              <Button
                type='submit'
                value='Create account'
                isLoading={isSubmitting}
                spinner={<Spinner />}
                className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
              >
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </Button>
            </div>

            <div className='mt-6 text-center'>
              <p>
                Already have an account?{' '}
                <Link href={NAVIGATION_LINKS.LOGIN} className='text-primary'>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}