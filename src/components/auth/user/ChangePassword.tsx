'use client';

import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { Input } from '@nextui-org/react';
import { changeUserPasswordAsync } from '@/lib/services/auth/userAuthService';
import { Button } from '@nextui-org/button';
import { validateResetPassFormInputErrors } from '@/helpers/validationHelpers';
import { ResetPasswordRequest } from '@/boundary/interfaces/auth';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import Link from 'next/link';
import MainNavbar from "@/components/shared/navs/MainNavbar";
import Spinner from "@/components/shared/icons/Spinner";

const initialFormState: ResetPasswordRequest = {
  confirmPassword: '', password: '', token: '',
  email: '',
};

export default function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetPasswordRequest, setResetPasswordRequest] = useState(initialFormState);
  const [status, setStatus] = useState<{ code: number | null, message: string }>({ code: null, message: '' });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [inputErrors, setInputErrors] = useState({
    confirmPassword: '', password: '', token: '',
    email: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setResetPasswordRequest({ ...resetPasswordRequest, [name]: value });
  };

  const handleResetPasswordSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateResetPassFormInputErrors(resetPasswordRequest);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await changeUserPasswordAsync(resetPasswordRequest);

    if (response.statusCode === 200) {
      toast.success(response.message);
      setIsSubmitting(false);
      setResetPasswordRequest(initialFormState);
      setStatus({ code: 200, message: response.message });
    } else if (response.statusCode === 400) {
      setStatus(response.message);
      setStatus({ code: 400, message: response.message });
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams?.get('token') ?? '';
    const email = urlParams?.get('email') ?? '';
    setResetPasswordRequest({ ...resetPasswordRequest, token: token, email: email });
  }, []);

  return (
    <>
      <MainNavbar />

      <div className='flex items-center justify-center bg-white'>
        <div className='md:w-1/2 lg:w-1/2 w-full place-items-center p-4 sm:p-12.5 xl:p-17.5'>

          {status.code !== null ? (
            <>
              {status.code === 200 && (
                <div className='bg-column-200 border-t border-b border-column-500 text-black-2 px-4 py-3' role='alert'>
                  <p className='font-bold'>Password Reset Request Succeeded</p>
                  <p className='text-sm'>{status.message}<Link href={NAVIGATION_LINKS.LOGIN}><span
                    className='font-bold'>You can now login</span></Link></p>
                </div>
              )}
              {status.code === 400 && (
                <div className='bg-danger-200 border-t border-b border-danger-500 text-black-2 px-4 py-3' role='alert'>
                  <p className='font-bold'>Password Reset Request Failed</p>
                  <p className='text-sm'>{status.message}<Link href={NAVIGATION_LINKS.FORGOT_PASSWORD}><span
                    className='font-bold'> Request Again</span></Link></p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className='text-center'>
                <span className='mb-1.5 block font-medium'>Password Reset</span>
              </div>

              <form onSubmit={handleResetPasswordSubmit}>
                <h2 className='mb-3 text-black-2'>
                  Fill the form to reset your password!
                </h2>
                <div className='mb-4'>
                  <Input type='email'
                         onChange={handleChange}
                         value={resetPasswordRequest.email}
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
                         value={resetPasswordRequest.password}
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
                         value={resetPasswordRequest.confirmPassword}
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
                         } />
                </div>

                <div className='flex justify-center items-center'>
                  <Button
                    type='submit'
                    value='Sign In'
                    isLoading={isSubmitting}
                    spinner={<Spinner />}
                    size='lg'
                    className='w-1/2 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}