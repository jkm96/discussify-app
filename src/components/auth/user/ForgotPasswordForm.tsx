'use client';

import React, { useState } from 'react';
import { ForgotPasswordRequest } from '@/boundary/interfaces/auth';
import { Input } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import { Button } from '@nextui-org/button';
import { validateForgotPassFormInputErrors } from '@/helpers/validationHelpers';
import { requestPasswordReset } from '@/lib/services/auth/userAuthService';
import { toast } from 'react-toastify';
import MainNavbar from "@/components/shared/navs/MainNavbar";

const initialFormState: ForgotPasswordRequest = {
  email: '',
};

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPassFormData, setForgotPassFormData] = useState(initialFormState);
  const [status, setStatus] = useState<any>(null);
  const [inputErrors, setInputErrors] = useState({
    email: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForgotPassFormData({ ...forgotPassFormData, [name]: value });
  };

  const handleForgotPasswordSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateForgotPassFormInputErrors(forgotPassFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await requestPasswordReset(forgotPassFormData);
    if (response.statusCode === 200) {
      toast.success(response.message);
      setIsSubmitting(false);
      setForgotPassFormData(initialFormState);
      setStatus(response.message);
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  return (
    <>
      <MainNavbar />

      <div className='flex items-center justify-center bg-white'>
        <div className='md:w-1/2 lg:w-1/2 w-full place-items-center p-4 sm:p-12.5 xl:p-17.5'>

          {status ? (
            <>
              <div className="bg-column-200 border-t border-b border-column-500 text-black-2 px-4 py-3" role="alert">
                <p className="font-bold">Password Reset Request Succeeded</p>
                <p className="text-sm">{status}</p>
              </div>
            </>
          ) : (
            <>
              <div className='text-center'>
                <span className='mb-1.5 block font-medium'>Request Password Reset</span>
              </div>

              <form onSubmit={handleForgotPasswordSubmit}>
                <h2 className='mb-3 text-black-2'>
                  Enter the email associated with your account to initiate a password reset!
                </h2>
                <div className='mb-4'>
                  <Input type='email'
                         onChange={handleChange}
                         value={forgotPassFormData.email}
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