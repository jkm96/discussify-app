'use client';

import {useAuth} from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {deleteAccessToken} from '@/lib/services/token/tokenService';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {CircularProgress} from "@nextui-org/react";

export default function LogoutForm() {
    const router = useRouter();
    const {clearAuthToken} = useAuth();
    const [status, setStatus] = useState<any>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    async function handleLogout() {
        const response = await deleteAccessToken();
        if (response.statusCode === 200) {
            setIsLoggingOut(false)
            clearAuthToken();
            setStatus('deleted');
            toast.success('Logged out successfully.');
        }
    }

    useEffect(() => {
        handleLogout()
    }, []);

    useEffect(() => {
        if (status === 'deleted') {
            setTimeout(() => {
                router.push(NAVIGATION_LINKS.LOGIN);
            }, 5000);
        }
    }, [status]);

    return (
        <>
            {isLoggingOut ?
                (
                    <div className='grid place-items-center'>
                        <CircularProgress color='primary' className='p-4' label='Logging you out...'/>
                    </div>
                )
                :
                (
                    <div className='grid place-items-center'>
                        You have been logged out successfully
                    </div>
                )}
        </>
    );
}