'use client';

import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import {useAuth} from '@/hooks/useAuth';

export function Footer() {
    const {user} = useAuth();

    return (
        <footer className='bg-white dark:bg-boxdark-mode footer' style={{position: "sticky", bottom: 0, width: '100%'}}>

            <div className='relative pb-4 pt-4'>

                <div className='flex mx-auto w-full px-4 sm:px-6'>
                    <div className='md:flex md:justify-between gap-2 items-center'>
                        <div className='mb-6 md:mb-0'>
                            <a href={NAVIGATION_LINKS.HOME} className='flex items-center'>
                                {/*<img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="PetDiaries Logo" />*/}
                                <span
                                    className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Discussify</span>
                            </a>
                        </div>

                        <a href={NAVIGATION_LINKS.HOME} className='hover:underline'>Home</a>

                        {user ? (<></>) : (
                            <>
                                <a href={NAVIGATION_LINKS.LOGIN} className='hover:underline'>Login</a>
                                <a href={NAVIGATION_LINKS.REGISTER} className='hover:underline'>Register</a>
                            </>
                        )}

                        <a href={NAVIGATION_LINKS.PRIVACY_POLICY} className='hover:underline'>Privacy Policy</a>

                        <a href={NAVIGATION_LINKS.TERMS_CONDITIONS}
                           className='hover:underline'>Terms &amp; Conditions</a>

                        <a href={NAVIGATION_LINKS.CUSTOMER_FEEDBACK} className='hover:underline'>Customer Feedback</a>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-full px-4 sm:px-6'>
                <hr className='text-white'/>
            </div>

            <div className='text-center mb-4 p-4'>
                  <span className='text-sm text-gray-500 dark:text-gray-400 pt-6'>
                    © {new Date().getFullYear()}
                      <a href={NAVIGATION_LINKS.HOME} className='hover:underline ml-1'>PetDiaries™</a>. All Rights Reserved.
                  </span>
            </div>

        </footer>
    );
}